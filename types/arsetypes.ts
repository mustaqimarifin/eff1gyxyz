export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      comment_reactions: {
        Row: {
          comment_id: string;
          created_at: string | null;
          id: string;
          reaction_type: string;
          user_id: string;
        };
        Insert: {
          comment_id: string;
          created_at?: string | null;
          id?: string;
          reaction_type: string;
          user_id: string;
        };
        Update: {
          comment_id?: string;
          created_at?: string | null;
          id?: string;
          reaction_type?: string;
          user_id?: string;
        };
      };
      comments: {
        Row: {
          comment: string;
          created_at: string | null;
          id: string;
          mentioned_user_ids: string[];
          parent_id: string | null;
          topic: string;
          user_id: string;
        };
        Insert: {
          comment: string;
          created_at?: string | null;
          id?: string;
          mentioned_user_ids?: string[];
          parent_id?: string | null;
          topic: string;
          user_id: string;
        };
        Update: {
          comment?: string;
          created_at?: string | null;
          id?: string;
          mentioned_user_ids?: string[];
          parent_id?: string | null;
          topic?: string;
          user_id?: string;
        };
      };
      pages: {
        Row: {
          id: number;
          slug: string;
          updated_at: string;
          view_count: number;
        };
        Insert: {
          id?: number;
          slug: string;
          updated_at?: string;
          view_count?: number;
        };
        Update: {
          id?: number;
          slug?: string;
          updated_at?: string;
          view_count?: number;
        };
      };
      reactions: {
        Row: {
          created_at: string | null;
          label: string;
          metadata: Json | null;
          type: string;
          url: string;
        };
        Insert: {
          created_at?: string | null;
          label: string;
          metadata?: Json | null;
          type: string;
          url: string;
        };
        Update: {
          created_at?: string | null;
          label?: string;
          metadata?: Json | null;
          type?: string;
          url?: string;
        };
      };
    };
    Views: {
      comment_reactions_metadata: {
        Row: {
          active_for_user: boolean | null;
          comment_id: string | null;
          reaction_count: number | null;
          reaction_type: string | null;
        };
      };
      comments_with_metadata: {
        Row: {
          comment: string | null;
          created_at: string | null;
          id: string | null;
          mentioned_user_ids: string[] | null;
          parent_id: string | null;
          replies_count: number | null;
          topic: string | null;
          user_id: string | null;
        };
        Insert: {
          comment?: string | null;
          created_at?: string | null;
          id?: string | null;
          mentioned_user_ids?: string[] | null;
          parent_id?: string | null;
          replies_count?: never;
          topic?: string | null;
          user_id?: string | null;
        };
        Update: {
          comment?: string | null;
          created_at?: string | null;
          id?: string | null;
          mentioned_user_ids?: string[] | null;
          parent_id?: string | null;
          replies_count?: never;
          topic?: string | null;
          user_id?: string | null;
        };
      };
      display_users: {
        Row: {
          avatar: string | null;
          handle: string | null;
          id: string | null;
          name: string | null;
        };
        Insert: {
          avatar?: never;
          handle?: never;
          id?: string | null;
          name?: never;
        };
        Update: {
          avatar?: never;
          handle?: never;
          id?: string | null;
          name?: never;
        };
      };
    };
    Functions: {
      _xid_machine_id: {
        Args: Record<PropertyKey, never>;
        Returns: number;
      };
      increment_page_view: {
        Args: {
          page_slug: string;
        };
        Returns: undefined;
      };
      xid: {
        Args: {
          _at?: string;
        };
        Returns: unknown;
      };
      xid_counter: {
        Args: {
          _xid: unknown;
        };
        Returns: number;
      };
      xid_decode: {
        Args: {
          _xid: unknown;
        };
        Returns: number[];
      };
      xid_encode: {
        Args: {
          _id: number[];
        };
        Returns: unknown;
      };
      xid_machine: {
        Args: {
          _xid: unknown;
        };
        Returns: number[];
      };
      xid_pid: {
        Args: {
          _xid: unknown;
        };
        Returns: number;
      };
      xid_time: {
        Args: {
          _xid: unknown;
        };
        Returns: string;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
