interface ReactProps {
  children: ReactNode
}

interface INotion {
  Oauth: {
    access_token: string
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
          slack_webhook_url: string | null
          notion_token: string | null
          notion_database_id: string | null
          discord_webhook_url: string | null
          telegram_chatting_id: number | null
          jandi_webhook_url: string | null
          email: string | null
        }
        Insert: {
          id?: number
          created_at?: string
          slack_webhook_url?: string | null
          notion_token?: string | null
          notion_database_id?: string | null
          discord_webhook_url?: string | null
          telegram_chatting_id?: number | null
          jandi_webhook_url?: string | null
          email?: string | null
        }
        Update: {
          id?: number
          created_at?: string
          slack_webhook_url?: string | null
          notion_token?: string | null
          notion_database_id?: string | null
          discord_webhook_url?: string | null
          telegram_chatting_id?: number | null
          jandi_webhook_url?: string | null
          email?: string | null
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
      histories: {
        Row: {
          id: string
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
      likes: {
        Row: {
          id: number
          created_at: string
          ip_address: string
          product_id: string
        }
        Insert: {
          id?: number
          created_at?: string
          ip_address?: string
          product_id?: string
        }
        Update: {
          id?: number
          created_at?: string
          ip_address?: string
          product_id?: string
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

namespace Table {
  type Reserve = Database['public']['Tables']['reserves']['Row']
  type Tag = Database['public']['Tables']['tags']['Row']
  type Like = Database['public']['Tables']['likes']['Row']
  type History = Database['public']['Tables']['histories']['Row']
}
