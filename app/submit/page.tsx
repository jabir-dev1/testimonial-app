'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '../lib/supabase'

function SubmitForm() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [rating, setRating] = useState(5)
  const [submitted, setSubmitted] = useState(false)
  const searchParams = useSearchParams()
  const userId = searchParams.get('user_id')

  const handleSubmit = async () => {
    const { error } = await supabase
      .from('testimonials')
      .insert([{ name, message, rating, user_id: userId }])
    if (!error) setSubmitted(true)
  }

  if (submitted) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-white">Thank You!</h1>
          <p className="mt-4 text-gray-400">Your testimonial has been submitted.</p>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 md:px-8">
      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Share Your Experience</h1>
        <p className="text-gray-400 text-sm mb-6">Your feedback means the world 💜</p>

        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-2">Your Name</label>
          <input
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-2">Your Testimonial</label>
          <textarea
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 h-32 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            placeholder="Share your experience..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-400 text-sm mb-2">Rating</label>
          <select
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <option value={5} className="bg-slate-900">⭐⭐⭐⭐⭐ Excellent</option>
            <option value={4} className="bg-slate-900">⭐⭐⭐⭐ Good</option>
            <option value={3} className="bg-slate-900">⭐⭐⭐ Average</option>
            <option value={2} className="bg-slate-900">⭐⭐ Poor</option>
            <option value={1} className="bg-slate-900">⭐ Terrible</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-lg text-base font-medium transition"
        >
          Submit Testimonial →
        </button>
      </div>
    </main>
  )
}

export default function SubmitPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Loading...</div>}>
      <SubmitForm />
    </Suspense>
  )
}