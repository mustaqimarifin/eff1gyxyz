import { Session, SupabaseClient, User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import useSWR from "swr";
import supabase from "lib/utils/supaPublic";
import { definitions } from "types/supabase";
import { CommentType } from "types/interface";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
//import { useLatestRef } from './useLatestRef';
import { Database } from "types/arsetypes";
import { Comments } from "components/comments/CommentForm";
import { useMutation } from "@tanstack/react-query";
type Users = Database["public"]["Tables"]["users"]["Row"];
interface AuthSessionProps {
  user: User | null;
  session: Session | null;
  profile?: definitions["users"] | null;
  loading: boolean;
  refresh: any;
}
const UserContext = createContext<AuthSessionProps>({
  user: null,
  session: null,
  profile: null,
  loading: true,
  refresh: null,
});

interface Props {
  supabaseClient: SupabaseClient;
  [propName: string]: any;
}

export const UserContextProvider = (props: Props): JSX.Element => {
  const supabase = useSupabaseClient<Database>();
  //const user = useUser();
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const {
    data: profile,
    error,
    mutate,
  } = useMutation(
    user?.id ? ["user_data", user.id] : null,
    async (_: any, userId: Users["id"]) =>
      supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single()
        .then(({ data, error }) => {
          if (error) throw error;
          return data;
        }),
    { revalidateOnFocus: false }
  );

  if (error) {
    console.log(error);
  }

  useEffect(() => {
    const data = () => supabase.auth.getSession();

    if (data) {
      setSession(session);
      setUser(session?.user ?? null);
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    if (error) {
      throw error;
    }

    return () => {
      authListener.subscription.unsubscribe();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loading = !session || !user || isValidating;

  const value = {
    session,
    user,
    profile,
    loading,
    refresh: mutate,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = (): AuthSessionProps => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`);
  }
  return context;
};
