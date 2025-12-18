// Supabase Configuration
const SUPABASE_URL = 'https://xjemwxvvpfpigwkovbnv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqZW13eHZ2cGZwaWd3a292Ym52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwMjE2MTUsImV4cCI6MjA4MTU5NzYxNX0.9oC4_12sed05DxEnnK76VGeERbhnkJzE3HFDEUajDXU';

// Initialize Supabase Client
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
