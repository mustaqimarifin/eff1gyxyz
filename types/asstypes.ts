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
      comments: {
        Row: {
          authorId: string;
          createdAt: string;
          id: string;
          parentId: string | null;
          slug: string;
          text: string;
          updatedAt: string | null;
        };
        Insert: {
          authorId: string;
          createdAt?: string;
          id?: string;
          parentId?: string | null;
          slug: string;
          text: string;
          updatedAt?: string | null;
        };
        Update: {
          authorId?: string;
          createdAt?: string;
          id?: string;
          parentId?: string | null;
          slug?: string;
          text?: string;
          updatedAt?: string | null;
        };
      };
      pages: {
        Row: {
          slug: string;
          view_count: number;
        };
        Insert: {
          slug: string;
          view_count?: number;
        };
        Update: {
          slug?: string;
          view_count?: number;
        };
      };
      users: {
        Row: {
          email: string | null;
          id: string;
          image: string | null;
          isAdmin: boolean;
          name: string | null;
          role: Database["public"]["Enums"]["role"];
        };
        Insert: {
          email?: string | null;
          id: string;
          image?: string | null;
          isAdmin?: boolean;
          name?: string | null;
          role?: Database["public"]["Enums"]["role"];
        };
        Update: {
          email?: string | null;
          id?: string;
          image?: string | null;
          isAdmin?: boolean;
          name?: string | null;
          role?: Database["public"]["Enums"]["role"];
        };
      };
    };
    Views: {
      userComments: {
        Row: {
          author: Json | null;
          authorId: string | null;
          createdAt: string | null;
          id: string | null;
          image: string | null;
          name: string | null;
          parentId: string | null;
          slug: string | null;
          text: string | null;
          updatedAt: string | null;
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
      nanoid: {
        Args: {
          size?: number;
          alphabet?: string;
        };
        Returns: string;
      };
      uuid_v7: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      uuid_v8: {
        Args: Record<PropertyKey, never>;
        Returns: string;
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
      role: "BLOCKED" | "USER" | "ADMIN";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
