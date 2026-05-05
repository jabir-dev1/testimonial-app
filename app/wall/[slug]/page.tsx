'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '../../lib/supabase'
import { Marquee } from '@/app/components/Marquee'

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
        .eq('is_approved', true)
        .order('created_at', { ascending: false })
      setTestimonials(data || [])
      setLoading(false)
    }
    fetchTestimonials()
  }, [slug])

  const textTestimonials = testimonials.filter(t => !t.before_image && !t.after_image)
  const transformations = testimonials.filter(t => t.before_image && t.after_image)

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <p className="text-slate-500">Loading...</p>
    </div>
  )

  if (testimonials.length === 0) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <p className="text-slate-500">More 5-star reviews coming soon...</p>
    </div>
  )

  return (
    <main className="relative min-h-screen bg-slate-50 flex flex-col items-center justify-center overflow-hidden">

      {/* Background Effects */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50 pointer-events-none"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-400/20 blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-400/20 blur-[120px] pointer-events-none z-0"></div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="text-center mb-10 mt-12 px-4">
          <div className="inline-block mb-3 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold tracking-wider uppercase">
            Real Results
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Loved by our clients
          </h2>
          <p className="text-lg text-slate-500 mt-4 max-w-xl mx-auto">
            Don't just take our word for it. Here is what people are actually saying.
          </p>
        </div>

        {/* Transformations */}
        {transformations.length > 0 && (
          <div className="max-w-5xl mx-auto px-4 mb-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6">✨ Transformations</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {transformations.map((t: any) => (
                <div key={t.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="grid grid-cols-2">
                    <div className="relative">
                      <p className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">Before</p>
                      <img src={t.before_image} alt="Before" className="w-full h-48 object-cover" />
                    </div>
                    <div className="relative">
                      <p className="absolute top-2 left-2 bg-blue-500/80 text-white text-xs px-2 py-1 rounded-full">After</p>
                      <img src={t.after_image} alt="After" className="w-full h-48 object-cover" />
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 text-sm">"{t.message}"</p>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                        <p className="text-yellow-500 text-xs">{'⭐'.repeat(t.rating)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Scrolling Testimonials */}
        {textTestimonials.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-6"> What People Are Saying</h3>
            <Marquee items={textTestimonials} />
          </div>
        )}

      </div>
    </main>
  )
}