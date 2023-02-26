import { useAddComment } from "hooks";
import useAuthUtils from "hooks/useAuthUtils";
import supabase from "lib/utils/supaPublic";

async function sg() {
  return await supabase.auth.signInWithOAuth({
    provider: "google",
  });
}

export const Google = () => (
  <button
    className="py-1 px-2 rounded bg-indigo-500 font-semibold text-sm text-white disabled:opacity-40 hover:bg-indigo-700"
    onClick={() => sg()}
    aria-label="log in!"
  >
    Log In
  </button>
);
