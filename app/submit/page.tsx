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
      <main className="flex min-h-screen flex-col items-center justify-center bg-white">
        <h1 className="text-3xl font-bold text-green-600">Thank You! 🎉</h1>
        <p className="mt-4 text-gray-500">Your testimonial has been submitted.</p>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-8">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Share Your Experience</h1>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Your Name</label>
          <input
            className="w-full border rounded-lg px-4 py-2 text-gray-900"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Your Testimonial</label>
          <textarea
            className="w-full border rounded-lg px-4 py-2 text-gray-900 h-32"
            placeholder="Share your experience..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Rating</label>
          <select
            className="w-full border rounded-lg px-4 py-2 text-gray-900"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <option value={5}>⭐⭐⭐⭐⭐ - Excellent</option>
            <option value={4}>⭐⭐⭐⭐ - Good</option>
            <option value={3}>⭐⭐⭐ - Average</option>
            <option value={2}>⭐⭐ - Poor</option>
            <option value={1}>⭐ - Terrible</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg hover:bg-blue-700"
        >
          Submit Testimonial
        </button>
      </div>
    </main>
  )
}

export default function SubmitPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SubmitForm />
    </Suspense>
  )
}