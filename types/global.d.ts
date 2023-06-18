declare namespace NodeJS {
  interface Process {
    env: ProcessEnv
  }
  interface ProcessEnv {
    NODE_ENV: string
    BASE_URL: string
    SLACK_TOKEN: string
    SLACK_CLIENT_ID: string
    SLACK_CLIENT_SECRET: string
    NOTION_SECRET_KEY: string
    NOTION_CLIENT_ID: string
    NOTION_CLIENT_SECRET: string
  }
}
