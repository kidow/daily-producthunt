interface ReactProps {
  children: ReactNode
}

interface INotion {
  Oauth: {
    access_token: string
    token_type: string
    bot_id: string
    workspace_name: string
    workspace_icon: string
    workspace_id: string
    owner: {
      type: string
      user: {
        object: string
        id: string
        name: string
        avatar_url: string
        type: string
        person: {
          email: string
        }
      }
    }
    duplicated_template_id: string
  }
  Database: {}
}

interface Database {
  public: {
    Tables: {
      connections: {
        Row: {
          id: number
          created_at: string
          email: string | null
          slack_token: string | null
          slack_channel_id: string | null
          notion_token: string | null
          notion_database_id: string | null
          discord_webhook_url: string | null
        }
        Insert: {
          id?: number
          created_at?: string
          email?: string | null
          slack_token?: string | null
          slack_channel_id?: string | null
          notion_token?: string | null
          notion_database_id?: string | null
          discord_webhook_url?: string | null
        }
        Update: {
          id?: number
          created_at?: string
          email?: string | null
          slack_token?: string | null
          slack_channel_id?: string | null
          notion_token?: string | null
          notion_database_id?: string | null
          discord_webhook_url?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
