'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '../lib/supabase'
import { motion } from 'framer-motion'

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
      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-slate-900">Thank You!</h1>
          <p className="mt-4 text-slate-500">Your testimonial has been submitted.</p>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 md:px-8 py-12">

      {/* Background Grid */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50 pointer-events-none"></div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-sm p-6 md:p-8"
      >
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-1">
            Share Your Experience
          </h1>
          <p className="text-slate-500 text-sm">Your feedback means the world 💜</p>
        </div>

        {/* Name */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-4"
        >
          <label className="block text-slate-700 text-sm font-medium mb-2">Your Name</label>
          <input
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-4"
        >
          <label className="block text-slate-700 text-sm font-medium mb-2">Your Testimonial</label>
          <textarea
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 h-32 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            placeholder="Share your experience..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </motion.div>

        {/* Rating */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-4"
        >
          <label className="block text-slate-700 text-sm font-medium mb-2">Rating</label>
          <select
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
            <option value={4}>⭐⭐⭐⭐ Good</option>
            <option value={3}>⭐⭐⭐ Average</option>
            <option value={2}>⭐⭐ Poor</option>
            <option value={1}>⭐ Terrible</option>
          </select>
        </motion.div>

        {/* Before/After Photos */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-6 bg-slate-50 border border-slate-200 rounded-xl p-4"
        >
          <p className="text-slate-700 text-sm font-medium mb-1">Before & After Photos</p>
          <p className="text-slate-400 text-xs mb-3">Optional — only for transformation results</p>

          <div className="mb-3">
            <label className="block text-slate-500 text-xs mb-1">Before Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setBeforeImage(e.target.files?.[0] || null)}
              className="w-full text-slate-500 text-xs file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-indigo-600 file:text-white file:text-xs hover:file:bg-indigo-500"
            />
          </div>

          <div>
            <label className="block text-slate-500 text-xs mb-1">After Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAfterImage(e.target.files?.[0] || null)}
              className="w-full text-slate-500 text-xs file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-indigo-600 file:text-white file:text-xs hover:file:bg-indigo-500"
            />
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white py-3 rounded-xl text-base font-semibold transition"
        >
          {loading ? 'Submitting...' : 'Submit Testimonial →'}
        </motion.button>

      </motion.div>
    </main>
  )
}

export default function SubmitPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500">
        Loading...
      </div>
    }>
      <SubmitForm />
    </Suspense>
  )
}