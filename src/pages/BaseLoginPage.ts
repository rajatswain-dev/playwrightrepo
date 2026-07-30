import { BasePage } from './BasePage';

export abstract class BaseLoginPage extends BasePage {

    abstract login(username: string, password: string): Promise<void>;
}