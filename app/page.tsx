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
    <main className="min-h-screen bg-white dark:bg-[#1a1a1a]">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 md:px-12 py-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a]">
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">
          TestimonialApp
        </h1>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-600 dark:text-gray-400">
          <a href="#features" className="hover:text-gray-900 dark:hover:text-white transition">Features</a>
          <a href="#how-it-works" className="hover:text-gray-900 dark:hover:text-white transition">How it works</a>
          <a href="#pricing" className="hover:text-gray-900 dark:hover:text-white transition">Pricing</a>
        </div>
        <div className="flex gap-2 md:gap-4 items-center">
          <SignInButton mode="modal">
            <button className="text-gray-600 dark:text-gray-300 hover:text-gray-900 text-sm transition">
              Login
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="bg-[#4A90D9] hover:bg-[#3a80c9] text-white px-4 py-2 rounded-lg text-sm transition">
              Try FREE now
            </button>
          </SignUpButton>
          <UserButton />
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-4 md:px-8 py-16 md:py-24">
        <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white max-w-3xl leading-tight">
          Get testimonials from your customers with ease
        </h2>
        <p className="mt-6 text-base md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl">
          Collecting testimonials is hard, we get it! So we built TestimonialApp. In minutes, you can collect text testimonials and before/after photos from your customers with no need for a developer or website hosting.
        </p>

        {/* Checkmarks */}
        <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
          <span className="flex items-center gap-2">
            <span className="text-green-500">✅</span> No coding skill required
          </span>
          <span className="flex items-center gap-2">
            <span className="text-green-500">✅</span> Start in under 2 minutes
          </span>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <SignUpButton mode="modal">
            <button className="bg-[#4A90D9] hover:bg-[#3a80c9] text-white px-8 py-3 rounded-lg text-base font-medium transition">
              Try FREE now
            </button>
          </SignUpButton>
          <a href="#pricing" className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-lg text-base hover:bg-gray-50 dark:hover:bg-gray-800 transition">
            See our pricing →
          </a>
        </div>
        <p className="mt-4 text-gray-400 text-sm">Get started with free credits on us.</p>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="px-4 md:px-12 py-16 bg-gray-50 dark:bg-[#111111]">
        <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
          How it works
        </h3>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-12 max-w-xl mx-auto">
          Get started in 3 simple steps. No technical skills required.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-[#4A90D9] text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Create your page</h4>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Sign up and get your unique collection link in seconds</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-[#4A90D9] text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Share with clients</h4>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Send your link to clients and they submit testimonials and photos</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-[#4A90D9] text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Display everywhere</h4>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Share your wall link or embed testimonials on your website</p>
          </div>
        </div>
      </section>

      {/* Embed Section */}
      <section className="px-4 md:px-12 py-16 bg-white dark:bg-[#1a1a1a]">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Add testimonials to your website with no coding!
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Copy and paste our HTML code to add the Wall Of Love to your website. We support any no-code platform (Webflow, WordPress, Wix, you name it!)
          </p>
          <SignUpButton mode="modal">
            <button className="bg-[#4A90D9] hover:bg-[#3a80c9] text-white px-8 py-3 rounded-lg text-base font-medium transition">
              Get started for free →
            </button>
          </SignUpButton>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 md:px-12 py-16 bg-gray-50 dark:bg-[#111111]">
        <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          What people are saying
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {testimonials?.map((t) => (
            <div key={t.id} className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
              <p className="text-gray-600 dark:text-gray-300 text-sm">"{t.message}"</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#4A90D9] flex items-center justify-center text-white text-sm font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-sm">{t.name}</p>
                  <p className="text-yellow-500 text-xs">{'⭐'.repeat(t.rating)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-4 md:px-12 py-16 bg-white dark:bg-[#1a1a1a]">
        <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
          Simple pricing
        </h3>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-12">Start free. Upgrade when you're ready.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-8">
            <h4 className="font-bold text-gray-900 dark:text-white text-xl mb-2">Free</h4>
            <p className="text-4xl font-bold text-gray-900 dark:text-white mb-4">$0</p>
            <ul className="text-gray-500 dark:text-gray-400 text-sm space-y-2 mb-8">
              <li>✅ Up to 10 testimonials</li>
              <li>✅ Public wall page</li>
              <li>✅ Submit link</li>
              <li>✅ Before/after photos</li>
            </ul>
            <SignUpButton mode="modal">
              <button className="w-full border border-[#4A90D9] text-[#4A90D9] py-3 rounded-lg hover:bg-blue-50 transition">
                Get started free
              </button>
            </SignUpButton>
          </div>
          <div className="border-2 border-[#4A90D9] rounded-2xl p-8 relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#4A90D9] text-white text-xs px-4 py-1 rounded-full">Most Popular</span>
            <h4 className="font-bold text-gray-900 dark:text-white text-xl mb-2">Pro</h4>
            <p className="text-4xl font-bold text-gray-900 dark:text-white mb-4">$20<span className="text-lg font-normal text-gray-500">/mo</span></p>
            <ul className="text-gray-500 dark:text-gray-400 text-sm space-y-2 mb-8">
              <li>✅ Unlimited testimonials</li>
              <li>✅ Embed widget</li>
              <li>✅ Only show 4-5 star reviews</li>
              <li>✅ Before/after photos</li>
              <li>✅ Priority support</li>
            </ul>
            <SignUpButton mode="modal">
              <button className="w-full bg-[#4A90D9] hover:bg-[#3a80c9] text-white py-3 rounded-lg transition">
                Start free trial
              </button>
            </SignUpButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-400 text-sm border-t border-gray-200 dark:border-gray-800">
        © 2026 TestimonialApp. Built for coaches who want more clients.
      </footer>

    </main>
  )
}