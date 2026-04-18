'use client'

import { useUser, UserButton } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Dashboard() {
  const { user, isLoaded } = useUser()
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLoaded) return
    if (!user?.id) return

    const fetchTestimonials = async () => {
      const { data } = await supabase
        .from('testimonials')
        .select('*')
        .eq('user_id', user.id)
      setTestimonials(data || [])
      setLoading(false)
    }

    fetchTestimonials()
  }, [isLoaded, user?.id])

  if (!isLoaded) return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <p className="text-gray-400">Loading...</p>
    </main>
  )

  if (!user) return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <p className="text-gray-400">Please sign in to view your dashboard</p>
    </main>
  )

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">

      <nav className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-white/10">
        <h1 className="text-lg md:text-xl font-bold text-white">✦ TestimonialApp</h1>
        <UserButton />
      </nav>

      <div className="px-4 md:px-8 py-8 md:py-12 max-w-4xl mx-auto">

        <h1 className="text-xl md:text-3xl font-bold text-white">
          Welcome back 👋
        </h1>
        <p className="mt-2 text-sm md:text-base text-gray-400">Manage your testimonials below</p>

        {/* Wall Link */}
        <div className="mt-6 bg-white/5 border border-white/10 p-4 rounded-2xl">
          <p className="text-sm text-gray-400">Your public wall link</p>
          <p className="mt-1 text-xs md:text-sm font-mono text-purple-400 break-all">
            {typeof window !== 'undefined' ? window.location.origin : ''}/wall/{user.id}
          </p>
        </div>

        {/* Submit Link */}
        <div className="mt-4 bg-white/5 border border-white/10 p-4 rounded-2xl">
          <p className="text-sm text-gray-400">Share this to collect testimonials</p>
          <p className="mt-1 text-xs md:text-sm font-mono text-green-400 break-all">
            {typeof window !== 'undefined' ? window.location.origin : ''}/submit?user_id={user.id}
          </p>
        </div>

        {/* Testimonials */}
        <div className="mt-8">
          <h2 className="text-lg md:text-xl font-bold text-white mb-4">
            Your Testimonials ({testimonials.length})
          </h2>

          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : testimonials.length === 0 ? (
            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl text-center">
              <p className="text-gray-400">No testimonials yet!</p>
              <p className="mt-2 text-sm text-gray-500">Share your submit link to start collecting</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {testimonials.map((t: any) => (
                <div key={t.id} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition">
                  <p className="text-gray-300 text-sm md:text-base">"{t.message}"</p>
                  <div className="mt-3 flex items-center gap-3">
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
          )}
        </div>

      </div>
    </main>
  )
}