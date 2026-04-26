'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '../lib/supabase'

function SubmitForm() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [rating, setRating] = useState(5)
  const [beforeImage, setBeforeImage] = useState<File | null>(null)
  const [afterImage, setAfterImage] = useState<File | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const userId = searchParams.get('user_id')

  const uploadImage = async (file: File, path: string) => {
    const { data, error } = await supabase.storage
      .from('testimonial-images')
      .upload(path, file, { upsert: true })
    if (error) return null
    const { data: urlData } = supabase.storage
      .from('testimonial-images')
      .getPublicUrl(path)
    return urlData.publicUrl
  }

  const handleSubmit = async () => {
    if (!name || !message) return
    setLoading(true)

    let beforeUrl = null
    let afterUrl = null

    if (beforeImage) {
      beforeUrl = await uploadImage(beforeImage, `${userId}/${Date.now()}-before`)
    }
    if (afterImage) {
      afterUrl = await uploadImage(afterImage, `${userId}/${Date.now()}-after`)
    }

    const { error } = await supabase
      .from('testimonials')
      .insert([{
        name,
        message,
        rating,
        user_id: userId,
        before_image: beforeUrl,
        after_image: afterUrl
      }])

    if (!error) setSubmitted(true)
    setLoading(false)
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
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 md:px-8 py-12">
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

        <div className="mb-4">
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

        {/* Before/After Photos - Optional */}
        <div className="mb-4 bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-gray-300 text-sm font-medium mb-1">Before & After Photos</p>
          <p className="text-gray-500 text-xs mb-3">Optional — only for transformation results</p>

          <div className="mb-3">
            <label className="block text-gray-400 text-xs mb-1">Before Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setBeforeImage(e.target.files?.[0] || null)}
              className="w-full text-gray-400 text-xs file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white file:text-xs hover:file:bg-purple-500"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-xs mb-1">After Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAfterImage(e.target.files?.[0] || null)}
              className="w-full text-gray-400 text-xs file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white file:text-xs hover:file:bg-purple-500"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white py-3 rounded-lg text-base font-medium transition"
        >
          {loading ? 'Submitting...' : 'Submit Testimonial →'}
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