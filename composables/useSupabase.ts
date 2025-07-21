import { createClient } from "@supabase/supabase-js";

export const useSupabase = () => {
  const config = useRuntimeConfig();

  const supabaseUrl = config.public.supabaseUrl;
  const supabaseKey = config.public.supabaseKey;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "Supabase URL and Key are required. Check your environment variables."
    );
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  return supabase;
};
