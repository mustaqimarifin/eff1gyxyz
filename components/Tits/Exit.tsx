import Comments from "./Comments";
import CommentsProvider from "./CommentsProvider";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
const FCKME = ({ slug }: { slug: string }) => {
  const supabase = useSupabaseClient();
  return (
    <CommentsProvider
      supabaseClient={supabase}
      onAuthRequested={() => {
        window.location.href = "/auth";
      }}
    >
      <Comments topic={slug} />
    </CommentsProvider>
  );
};

export default FCKME;
