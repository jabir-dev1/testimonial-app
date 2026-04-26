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

    const fetchTestimonials = async () => {
      const { data } = await supabase
        .from('testimonials')
        .select('*')
        .eq('user_id', slug)
        .gte('rating', 4)

      setTestimonials(data || [])
      setLoading(false)
    }

    fetchTestimonials()
  }, [slug])

  const textTestimonials = testimonials.filter(t => !t.before_image && !t.after_image)
  const transformations = testimonials.filter(t => t.before_image && t.after_image)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 md:px-8 py-8 md:py-16">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Wall of Love 💜
          </h1>
          <p className="text-gray-400">Real results from real people</p>
        </div>

        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : testimonials.length === 0 ? (
          <p className="text-center text-gray-400">No testimonials yet!</p>
        ) : (
          <>
            {/* Transformations Section */}
            {transformations.length > 0 && (
              <div className="mb-16">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <span>✨</span> Transformations
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {transformations.map((t: any) => (
                    <div key={t.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition">
                      <div className="grid grid-cols-2">
                        <div className="relative">
                          <p className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">Before</p>
                          <img
                            src={t.before_image}
                            alt="Before"
                            className="w-full h-48 object-cover"
                          />
                        </div>
                        <div className="relative">
                          <p className="absolute top-2 left-2 bg-purple-600/80 text-white text-xs px-2 py-1 rounded-full">After</p>
                          <img
                            src={t.after_image}
                            alt="After"
                            className="w-full h-48 object-cover"
                          />
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-gray-300 text-sm">"{t.message}"</p>
                        <div className="mt-3 flex items-center gap-3">
                          <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-bold">
                            {t.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-white text-sm">{t.name}</p>
                            <p className="text-yellow-400 text-xs">{'⭐'.repeat(t.rating)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Text Testimonials Section */}
            {textTestimonials.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <span>💬</span> What People Are Saying
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  {textTestimonials.map((t: any) => (
                    <div key={t.id} className="bg-white/5 border border-white/10 backdrop-blur p-6 rounded-2xl hover:bg-white/10 transition">
                      <p className="text-gray-300 text-sm">"{t.message}"</p>
                      <div className="mt-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-bold">
                          {t.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-white text-sm">{t.name}</p>
                          <p className="text-yellow-400 text-xs">{'⭐'.repeat(t.rating)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}