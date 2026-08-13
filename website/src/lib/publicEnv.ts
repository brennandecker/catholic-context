/**
 * Publishable browser config. Anon keys are designed to be public.
 * Override at build time with PUBLIC_SUPABASE_URL / PUBLIC_SUPABASE_ANON_KEY.
 * Service-role and GitHub tokens must never be placed here.
 */
export const PUBLIC_SUPABASE_URL =
  (import.meta.env.PUBLIC_SUPABASE_URL as string | undefined) ||
  'https://ewpehbytlngdgbylwgcz.supabase.co';

export const PUBLIC_SUPABASE_ANON_KEY =
  (import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string | undefined) ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3cGVoYnl0bG5nZGdieWx3Z2N6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3NDkwNTksImV4cCI6MjA5MDMyNTA1OX0.RoqkWYARQdfHIXUR7fUHpuj4aU-LxqTLECgMH9RiONc';
