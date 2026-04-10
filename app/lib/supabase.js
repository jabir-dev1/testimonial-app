import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yaotiqldqkpkjoolnwev.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlhb3RpcWxkcWtwa2pvb2xud2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3Mzk4MjMsImV4cCI6MjA5MTMxNTgyM30.4OzcuCci2ripS4D6KlfAKervOreCfFDhBaQevvR7RfM'

export const supabase = createClient(supabaseUrl, supabaseKey)