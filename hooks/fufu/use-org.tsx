import { SupabaseClient } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { getOrganizationById } from "queries/getOrg";
import useSupabase from "./use-supabase";

function useOrganizationQuery(organizationId: number) {
  const client: SupabaseClient = useSupabase();
  const key = ["organization", organizationId];

  return useQuery(key, async () => {
    return getOrganizationById(client, organizationId).then(
      (result) => result.data
    );
  });
}

export default useOrganizationQuery;
