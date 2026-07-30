export type EnvironmentName = 'todo' | 'playground' | 'hrm' | 'amazon' | 'saucedemo' |'automationblog';

interface EnvironmentConfig {
    url: string;
    requiresLogin: boolean;
    credentials?: {
        username: string | undefined;
        password: string | undefined;
    }
}

const AUTOMATION_CONFIG: Record<EnvironmentName, EnvironmentConfig> = {
    todo: {
        url: process.env.TODO_URL || 'https://demo.playwright.dev/todomvc',
        requiresLogin: false,
    },
    playground: {
        url: process.env.PLAYGROUND_URL || 'https://www.testmuai.com/selenium-playground/',
        requiresLogin: false,
    },
    automationblog:{
        url:process.env.AUTOMATION_BLOG_URL || 'https://testautomationpractice.blogspot.com/',
        requiresLogin: false,

    },
    amazon: {
        url: process.env.AMAZON_URL || 'https://www.amazon.in/',
        requiresLogin: true,
        credentials: {
            username: process.env.AMAZON_USERNAME,
            password: process.env.AMAZON_PASSWORD,
        }
    },
    hrm: {
        url: process.env.HRM_URL || 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
        requiresLogin: true,
        credentials: {
            username: process.env.HRM_USERNAME,
            password: process.env.HRM_PASSWORD,
        }
    },
    saucedemo: {
        url: process.env.SAUCE_URL || 'https://www.saucedemo.com/',
        requiresLogin: true,
        credentials: {
            username: process.env.SAUCE_USERNAME,
            password: process.env.SAUCE_PASSWORD,
        }
    },
    
}

export function getEnvironmentConfig(environment: string): EnvironmentConfig {
    const config = AUTOMATION_CONFIG[environment.toLowerCase() as EnvironmentName];
    if (!config) {
        throw new Error(`
            No config found for: "${environment}"
            Available: ${Object.keys(AUTOMATION_CONFIG).join(', ')}
        `);
    }
    return config;
}

export function getAutomationUrl(environment: string): string {
    return getEnvironmentConfig(environment).url;
}

export function getCurrentEnvironment(): string {
    return (process.env.ENVIRONMENT || 'amazon').toLowerCase();
}