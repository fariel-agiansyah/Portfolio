import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = url && key ? createClient(url, key) : null;
export const isSupabaseConfigured = Boolean(url && key);

export function getStorageUrl(path,bucket="portfolio-media"){
  if(!path)return "";
  if(/^https?:\\/\\//i.test(path))return path;
  return supabase?.storage.from(bucket).getPublicUrl(path).data.publicUrl||"";
}
