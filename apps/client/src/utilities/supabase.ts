import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rbsmrtbmrcuvicrninoo.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJic21ydGJtcmN1dmljcm5pbm9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA2MDIzOTcsImV4cCI6MjAzNjE3ODM5N30.EvRkh7VIswvanQyOT4n9vt_Z3L4MeDZCsNv0DfX4Bdw";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
