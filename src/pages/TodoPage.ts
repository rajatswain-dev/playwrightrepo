import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class TodoPage extends BasePage {
  readonly newTodoInput: Locator;
  readonly todoItems: Locator;
  readonly todoCount: Locator;
  readonly clearCompletedButton: Locator;
  readonly allFilter: Locator;
  readonly activeFilter: Locator;
  readonly completedFilter: Locator;
  readonly toggleAllCheckbox: Locator;

  constructor(page: Page) {
    super(page);
    this.newTodoInput = page.getByPlaceholder('What needs to be done?');
    this.todoItems = page.getByTestId('todo-item');
    this.todoCount = page.getByTestId('todo-count');
    this.clearCompletedButton = page.getByRole('button', { name: 'Clear completed' });
    this.allFilter = page.getByRole('link', { name: 'All' });
    this.activeFilter = page.getByRole('link', { name: 'Active' });
    this.completedFilter = page.getByRole('link', { name: 'Completed' });
    this.toggleAllCheckbox = page.getByLabel('Mark all as complete');
  }

  async goto(): Promise<void> {
    await this.navigate('/');
    await this.page.waitForSelector('.todoapp', { timeout: 10000 });
  }

  async addTodo(text: string): Promise<void> {
    await this.newTodoInput.fill(text);
    await this.newTodoInput.press('Enter');
  }

  async addMultipleTodos(items: string[]): Promise<void> {
    for (const item of items) {
      await this.addTodo(item);
    }
  }

  async completeTodo(index: number): Promise<void> {
    await this.todoItems.nth(index).getByRole('checkbox').check();
  }

  async deleteTodo(index: number): Promise<void> {
    const item = this.todoItems.nth(index);
    await item.hover();
    await item.getByRole('button', { name: 'Delete' }).click();
  }

  async editTodo(index: number, newText: string): Promise<void> {
    await this.todoItems.nth(index).dblclick();
    const editInput = this.todoItems.nth(index).getByRole('textbox');
    await editInput.clear();
    await editInput.fill(newText);
    await editInput.press('Enter');
  }

  async filterByActive(): Promise<void> {
    await this.activeFilter.click();
  }

  async filterByCompleted(): Promise<void> {
    await this.completedFilter.click();
  }

  async filterByAll(): Promise<void> {
    await this.allFilter.click();
  }

  async clearCompleted(): Promise<void> {
    await this.clearCompletedButton.click();
  }

  async toggleAll(): Promise<void> {
    await this.toggleAllCheckbox.check();
  }

  async expectTodoCount(count: number): Promise<void> {
    await expect(this.todoItems).toHaveCount(count);
  }

  async expectTodoText(index: number, text: string): Promise<void> {
    await expect(this.todoItems.nth(index)).toContainText(text);
  }

  async expectItemCountText(text: string): Promise<void> {
    await expect(this.todoCount).toContainText(text);
  }

  async getTodoCount(): Promise<number> {
    return this.todoItems.count();
  }
}
