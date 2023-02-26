import { SupabaseClient } from "@supabase/supabase-js";

export function getOrganizationById(
  client: SupabaseClient,
  organizationId: number
) {
  return client
    .from("organizations")
    .select(
      `
      id,
      name
    `
    )
    .eq("id", organizationId)
    .throwOnError()
    .single();
}
