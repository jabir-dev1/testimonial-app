'use client'

import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from './lib/supabase'

export default function Home() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [testimonials, setTestimonials] = useState<any[]>([])

  useEffect(() => {
    if (isLoaded && user) {
      router.push('/dashboard')
    }
  }, [isLoaded, user])

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data } = await supabase
        .from('testimonials')
        .select('*')
        .eq('featured', true)
      setTestimonials(data || [])
    }
    fetchTestimonials()
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      
      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-white/10">
        <h1 className="text-lg md:text-xl font-bold text-white">
          ✦ TestimonialApp
        </h1>
        <div className="flex gap-2 md:gap-4 items-center">
          <SignInButton mode="modal">
            <button className="text-gray-300 hover:text-white text-sm md:text-base transition">
              Login
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg text-sm md:text-base transition">
              Get Started
            </button>
          </SignUpButton>
          <UserButton />
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-4 md:px-8 py-20 md:py-32">
        <div className="inline-block bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs md:text-sm px-4 py-1 rounded-full mb-6">
          🚀 Trusted by coaches.
        </div>
        <h2 className="text-3xl md:text-6xl font-bold text-white max-w-3xl leading-tight">
          Collect Testimonials That
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"> Win More Clients</span>
        </h2>
        <p className="mt-6 text-base md:text-xl text-gray-200 max-w-xl">
          The easiest way for coaches to collect, manage and display social proof.
        </p>
        <div className="mt-8 flex gap-4 flex-wrap justify-center">
          <SignUpButton mode="modal">
            <button className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-lg text-base md:text-lg font-medium transition">
              Start For Free →
            </button>
          </SignUpButton>
        </div>
        <p className="mt-4 text-gray-300 text-sm">No credit card required</p>
      </section>

      {/* Testimonials */}
      <section className="px-4 md:px-8 py-16 max-w-6xl mx-auto">
        <p className="text-center text-gray-200 text-sm uppercase tracking-widest mb-10">
          What people are saying
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials?.map((t) => (
            <div key={t.id} className="bg-white/5 border border-white/10 backdrop-blur p-6 rounded-2xl hover:bg-white/10 transition">
              <p className="text-gray-300 text-sm md:text-base">"{t.message}"</p>
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
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-400 text-sm border-t border-white/10">
        © 2026 TestimonialApp. Built for coaches who want more clients.
      </footer>

    </main>
  )
}