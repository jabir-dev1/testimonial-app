import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  'https://yaotiqldqkpkjoolnwev.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlhb3RpcWxkcWtwa2pvb2xud2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3Mzk4MjMsImV4cCI6MjA5MTMxNTgyM30.4OzcuCci2ripS4D6KlfAKervOreCfFDhBaQevvR7RfM'
)

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('user_id')

  if (!userId) {
    return NextResponse.json([])
  }

  const { data } = await supabase
    .from('testimonials')
    .select('name, message, rating')
    .eq('user_id', userId)
    .gte('rating', 4)

  return NextResponse.json(data || [], {
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  })
}