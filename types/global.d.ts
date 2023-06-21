declare namespace NodeJS {
  interface Process {
    env: ProcessEnv
  }
  interface ProcessEnv {
    NODE_ENV: string
    NEXT_PUBLIC_ADMIN_EMAIL: string

    NEXT_PUBLIC_SLACK_TOKEN: string
    NEXT_PUBLIC_SLACK_CLIENT_ID: string
    NEXT_PUBLIC_SLACK_CLIENT_SECRET: string

    NEXT_PUBLIC_NOTION_SECRET_KEY: string
    NEXT_PUBLIC_NOTION_CLIENT_ID: string
    NEXT_PUBLIC_NOTION_CLIENT_SECRET: string
    NEXT_PUBLIC_NOTION_DATABASE_ID: string

    NEXT_PUBLIC_SUPABASE_URL: string
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string

    NEXT_PUBLIC_TISTORY_APP_ID: string
    NEXT_PUBLIC_TISTORY_SECRET_KEY: string
    NEXT_PUBLIC_TISTORY_ACCESS_TOKEN: string
  }
}
