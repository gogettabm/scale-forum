import { createClient } from "@supabase/supabase-js";

// The Supabase URL and anon key are PUBLIC, client-safe values — the anon key
// is designed to be shipped in the browser (row-level security, not secrecy,
// protects the data). We read them from env vars when available (e.g. local
// dev via .env), and fall back to the project's public values so the deployed
// build always has a working connection regardless of host env-var config.
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://dfljeuxdjprpilvltzyk.supabase.co";

const supabaseKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmbGpldXhkanBycGlsdmx0enlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQzOTQ5NTMsImV4cCI6MjA5OTk3MDk1M30.kaDDID_YcAPK6z9xvmdMbz20EhxU38DLT8UnXyfdwSg";

export const supabase = createClient(supabaseUrl, supabaseKey);
