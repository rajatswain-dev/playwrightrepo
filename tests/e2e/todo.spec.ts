import { test, expect } from '../../src/fixtures';
import { todoItems } from '../../src/data/testData';

test.describe('Todo App - Core Functionality', () => {
  test('should display empty state on first load', async ({ todoPage }) => {
    await expect(todoPage.newTodoInput).toBeVisible();
    await expect(todoPage.newTodoInput).toHaveAttribute('placeholder', 'What needs to be done?');
  });

  test('should add a new todo item', async ({ todoPage }) => {
    await todoPage.addTodo('Buy groceries');
    await todoPage.expectTodoCount(1);
    await todoPage.expectTodoText(0, 'Buy groceries');
  });

  test('should add multiple todo items', async ({ todoPage }) => {
    await todoPage.addMultipleTodos(todoItems.slice(0, 3));
    await todoPage.expectTodoCount(3);
  });

  test('should mark a todo as complete', async ({ todoPage }) => {
    await todoPage.addTodo('Complete this task');
    await todoPage.completeTodo(0);

    const item = todoPage.todoItems.nth(0);
    await expect(item).toHaveClass(/completed/);
  });

  test('should edit a todo item', async ({ todoPage }) => {
    await todoPage.addTodo('Old text');
    await todoPage.editTodo(0, 'Updated text');
    await todoPage.expectTodoText(0, 'Updated text');
  });

  test('should delete a todo item', async ({ todoPage }) => {
    await todoPage.addMultipleTodos(['Item 1', 'Item 2']);
    await todoPage.deleteTodo(0);
    await todoPage.expectTodoCount(1);
    await todoPage.expectTodoText(0, 'Item 2');
  });

  test('should filter by active todos', async ({ todoPage }) => {
    await todoPage.addMultipleTodos(['Active task', 'Completed task']);
    await todoPage.completeTodo(1);
    await todoPage.filterByActive();
    await todoPage.expectTodoCount(1);
    await todoPage.expectTodoText(0, 'Active task');
  });

  test('should filter by completed todos', async ({ todoPage }) => {
    await todoPage.addMultipleTodos(['Active task', 'Completed task']);
    await todoPage.completeTodo(1);
    await todoPage.filterByCompleted();
    await todoPage.expectTodoCount(1);
    await todoPage.expectTodoText(0, 'Completed task');
  });

  test('should clear all completed todos', async ({ todoPage }) => {
    await todoPage.addMultipleTodos(['Keep this', 'Delete this']);
    await todoPage.completeTodo(1);
    await todoPage.clearCompleted();
    await todoPage.expectTodoCount(1);
    await todoPage.expectTodoText(0, 'Keep this');
  });

  test('should show item count', async ({ todoPage }) => {
    await todoPage.addTodo('Single item');
    await todoPage.expectItemCountText('1');
  });
});

test.describe('Todo App - Keyboard Navigation', () => {
  test('should add todo on Enter key', async ({ todoPage }) => {
    await todoPage.newTodoInput.fill('Keyboard todo');
    await todoPage.newTodoInput.press('Enter');
    await todoPage.expectTodoCount(1);
  });

  test('should cancel edit on Escape key', async ({ todoPage }) => {
    await todoPage.addTodo('Original text');
    const item = todoPage.todoItems.nth(0);
    await item.dblclick();
    const editInput = item.getByRole('textbox');
    await editInput.fill('Changed text');
    await editInput.press('Escape');
    await todoPage.expectTodoText(0, 'Original text');
  });
});
