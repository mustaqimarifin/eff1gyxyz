import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import supabase from "lib/utils/supaPublic";

export const AUTHMF = () => (
  <Auth
    supabaseClient={supabase}
    appearance={{ theme: ThemeSupa }}
    providers={["google", "github"]}
    theme="dark"
  />
);
