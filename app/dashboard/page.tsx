'use client'

import { useUser, UserButton } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Dashboard() {
  const { user, isLoaded } = useUser()
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLoaded || !user?.id) return

    const fetchTestimonials = async () => {
      const { data } = await supabase
        .from('testimonials')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      setTestimonials(data || [])
      setLoading(false)
    }

    fetchTestimonials()
  }, [isLoaded, user?.id])

  const toggleApproval = async (id: number, currentStatus: boolean) => {
    setTestimonials(testimonials.map(t => t.id === id ? { ...t, is_approved: !currentStatus } : t))
    await supabase
      .from('testimonials')
      .update({ is_approved: !currentStatus })
      .eq('id', id)
  }

  if (!isLoaded || !user) return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-10 w-10 bg-indigo-200 rounded-full mb-4"></div>
        <p className="text-slate-500 font-medium tracking-tight">Loading workspace...</p>
      </div>
    </main>
  )

  const submitLink = `${typeof window !== 'undefined' ? window.location.origin : ''}/submit?user_id=${user.id}`
  const wallLink = `${typeof window !== 'undefined' ? window.location.origin : ''}/wall/${user.id}`
  const embedCode = `<script src="${typeof window !== 'undefined' ? window.location.origin : ''}/embed.js?user_id=${user.id}"></script>`

  return (
    <main className="relative min-h-screen bg-slate-50 font-sans text-slate-900 pb-20 selection:bg-indigo-100">

      {/* Background Grid */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50 pointer-events-none"></div>

      {/* Frosted Glass Navbar */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-4 bg-white/70 backdrop-blur-md border-b border-slate-200 sticky top-0">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-1.5 rounded-lg">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
            Testimonial<span className="text-indigo-600">App</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">Free Plan</span>
          <UserButton />
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 px-4 md:px-8 py-10 max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Overview
          </h1>
          <p className="mt-2 text-slate-500 text-lg">Manage your reviews and copy your sharing links.</p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

          {/* Card 1: Collection Link */}
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-all group">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
              
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Collection Link</h3>
            <p className="text-sm text-slate-500 mb-4">Send this to your clients to collect reviews.</p>
            <input
              readOnly
              value={submitLink}
              className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-copy"
              onClick={(e) => {
                e.currentTarget.select()
                navigator.clipboard.writeText(submitLink)
                alert('Link copied!')
              }}
            />
          </div>

          {/* Card 2: Wall Link */}
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-all group">
            <div className="w-12 h-12 bg-pink-50 text-pink-600 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
              
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Wall of Love</h3>
            <p className="text-sm text-slate-500 mb-4">Share this link to show off your testimonials.</p>
            <input
              readOnly
              value={wallLink}
              className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 focus:outline-none focus:ring-2 focus:ring-pink-500 cursor-copy"
              onClick={(e) => {
                e.currentTarget.select()
                navigator.clipboard.writeText(wallLink)
                alert('Wall link copied!')
              }}
            />
          </div>

          {/* Card 3: Embed Code */}
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-all group">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
              
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Website Embed</h3>
            <p className="text-sm text-slate-500 mb-4">Paste this into your website HTML.</p>
            <input
              readOnly
              value={embedCode}
              className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono cursor-copy"
              onClick={(e) => {
                e.currentTarget.select()
                navigator.clipboard.writeText(embedCode)
                alert('Embed code copied!')
              }}
            />
          </div>

        </div>

        {/* Inbox */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Your Inbox</h2>
            <span className="px-3 py-1 bg-slate-200 text-slate-700 rounded-full text-sm font-bold">
              {testimonials.length}
            </span>
          </div>

          {loading ? (
            <div className="h-40 bg-slate-200 rounded-3xl animate-pulse"></div>
          ) : testimonials.length === 0 ? (
            <div className="bg-white p-10 rounded-3xl border-2 border-dashed border-slate-200 text-center flex flex-col items-center justify-center">
              <div className="text-5xl mb-4">👋</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Your inbox is empty!</h3>
              <p className="text-slate-500 max-w-sm mb-6">Copy your Collection Link above and send it to your clients to get your first review.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {testimonials.map((t: any) => (
                <div key={t.id} className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-6 justify-between items-start hover:border-indigo-200 transition-colors">

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold uppercase text-lg">
                        {t.name ? t.name.charAt(0) : '?'}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-lg">{t.name}</p>
                        <div className="flex gap-1 text-amber-400 text-xs">
                          {'⭐'.repeat(t.rating)}
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-md italic mt-4 border-l-4 border-slate-100 pl-4">"{t.message}"</p>

                    {/* Before/After Photos */}
                    {t.before_image && t.after_image && (
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <div className="relative">
                          <p className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">Before</p>
                          <img src={t.before_image} alt="Before" className="w-full h-32 object-cover rounded-xl" />
                        </div>
                        <div className="relative">
                          <p className="absolute top-2 left-2 bg-indigo-500/80 text-white text-xs px-2 py-1 rounded-full">After</p>
                          <img src={t.after_image} alt="After" className="w-full h-32 object-cover rounded-xl" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Toggle */}
                  <div className="shrink-0 w-full md:w-auto bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col items-center gap-3">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Website Status</p>
                    <button
                      onClick={() => toggleApproval(t.id, t.is_approved)}
                      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none ${t.is_approved ? 'bg-emerald-500' : 'bg-slate-300'}`}
                    >
                      <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition duration-300 ${t.is_approved ? 'translate-x-7' : 'translate-x-1'}`} />
                    </button>
                    <span className={`text-sm font-semibold ${t.is_approved ? 'text-emerald-600' : 'text-slate-500'}`}>
                      {t.is_approved ? 'Live' : 'Hidden'}
                    </span>
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