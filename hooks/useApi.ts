import { useSupabaseClient } from "components/Tits/CommentsProvider";
import { useMemo } from "react";
import { createApiClient } from "./api";

const useApi = () => {
  const supabase = useSupabaseClient();
  const api = useMemo(() => createApiClient(supabase), [supabase]);
  return api;
};

export default useApi;
