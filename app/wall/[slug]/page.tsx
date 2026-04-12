'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '../../lib/supabase'

export default function WallPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    console.log('fetching for slug:', slug)

    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('user_id', slug)

      console.log('data:', data)
      setTestimonials(data || [])
      setLoading(false)
    }

    fetchTestimonials()
  }, [slug])

  return (
    <main className="min-h-screen bg-gray-50 px-4 md:px-8 py-8 md:py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
          Wall of Love 💛
        </h1>
        <p className="text-center text-gray-500 mb-12">
          Real testimonials from real people
        </p>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : testimonials.length === 0 ? (
          <p className="text-center text-gray-500">No testimonials yet!</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((t: any) => (
              <div key={t.id} className="bg-white p-6 rounded-xl shadow-sm">
                <p className="text-gray-600">"{t.message}"</p>
                <p className="mt-4 font-bold text-gray-900">{t.name}</p>
                <p className="text-yellow-500">{'⭐'.repeat(t.rating)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}