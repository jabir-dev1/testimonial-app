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
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('user_id', user.id)

      setTestimonials(data || [])
      setLoading(false)
    }

    fetchTestimonials()
  }, [isLoaded, user?.id])

  if (!isLoaded) return (
    <main className="flex min-h-screen items-center justify-center">
      <p className="text-gray-500">Loading...</p>
    </main>
  )

  if (!user) return (
    <main className="flex min-h-screen items-center justify-center">
      <p className="text-gray-500">Please sign in to view your dashboard</p>
    </main>
  )

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white border-b">
        <h1 className="text-xl font-bold text-blue-600">TestimonialApp</h1>
        <UserButton />
      </nav>

      <div className="px-8 py-12 max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold text-gray-900">
          Welcome, {user.firstName || user.emailAddresses[0].emailAddress} 👋
        </h1>
        <p className="mt-2 text-gray-500">Manage your testimonials below</p>

        {/* Your Wall Link */}
        <div className="mt-6 bg-white p-4 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">Your public wall link:</p>
          <p className="mt-1 font-mono text-blue-600">
            {window.location.origin}/wall/{user.id}
          </p>
        </div>

        {/* Submit Link */}
        <div className="mt-4 bg-white p-4 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">Share this to collect testimonials:</p>
          <p className="mt-1 font-mono text-green-600">
            {window.location.origin}/submit?user_id={user.id}
          </p>
        </div>

        {/* Testimonials */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Your Testimonials ({testimonials.length})
          </h2>

          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : testimonials.length === 0 ? (
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <p className="text-gray-500">No testimonials yet!</p>
              <p className="mt-2 text-sm text-gray-400">
                Share your submit link to start collecting
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {testimonials.map((t: any) => (
                <div key={t.id} className="bg-white p-6 rounded-xl shadow-sm">
                  <p className="text-gray-600">"{t.message}"</p>
                  <p className="mt-3 font-bold text-gray-900">{t.name}</p>
                  <p className="text-yellow-500">{'⭐'.repeat(t.rating)}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  )
}