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

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  /**
   * @default "max-w-lg"
   */
  maxWidth?:
    | 'max-w-screen-2xl'
    | 'max-w-screen-xl'
    | 'max-w-screen-lg'
    | 'max-w-screen-md'
    | 'max-w-screen-sm'
    | 'max-w-full'
    | 'max-w-7xl'
    | 'max-w-6xl'
    | 'max-w-5xl'
    | 'max-w-4xl'
    | 'max-w-3xl'
    | 'max-w-2xl'
    | 'max-w-xl'
    | 'max-w-lg'
    | 'max-w-md'
    | 'max-w-sm'
    | 'max-w-xs'
  description?: ReactNode
  padding?: boolean
  footer?: ReactNode
}

namespace NToast {
  type Type = 'success' | 'info' | 'warn' | 'error'
  interface Emit {
    message: string
    type: NToast.Type
  }
  interface Item {
    id: string
    message: string
    type: NToast.Type
  }
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
      reserves: {
        Row: {
          id: number
          url: string
          icon_url: string
          cover_url: string
          name: string
          title: string
          intro: string
          core: string
          platform: string
          pricing: string
          tags: string[]
          created_at: string
        }
        Insert: {
          id?: number
          url?: string
          icon_url?: string
          cover_url?: string
          name?: string
          title?: string
          intro?: string
          core?: string
          platform?: string
          pricing?: string
          tags?: string[]
          created_at?: string
        }
        Update: {
          id?: number
          url?: string
          icon_url?: string
          cover_url?: string
          name?: string
          title?: string
          intro?: string
          core?: string
          platform?: string
          pricing?: string
          tags?: string[]
          created_at?: string
        }
      }
      tags: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name?: string
        }
        Update: {
          id?: number
          name?: string
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
