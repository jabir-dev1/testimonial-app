import { SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { supabase } from './lib/supabase'

export default async function Home() {
  const { data: testimonials } = await supabase
    .from('testimonials')
    .select('*')

  return (
    <main className="min-h-screen bg-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b">
        <h1 className="text-xl font-bold text-blue-600">TestimonialApp</h1>
        <div className="flex gap-4 items-center">
          <SignInButton mode="modal">
            <button className="text-gray-600 hover:text-blue-600">Login</button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Get Started
            </button>
          </SignUpButton>
          <UserButton />
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-8 py-24">
        <h2 className="text-5xl font-bold text-gray-900 max-w-2xl">
          Collect Testimonials That Win You More Clients
        </h2>
        <p className="mt-6 text-xl text-gray-500 max-w-xl">
          The easiest way for coaches and small businesses to collect and display social proof.
        </p>
        <button className="mt-8 bg-blue-600 text-white px-8 py-4 rounded-lg text-lg hover:bg-blue-700">
          Start For Free
        </button>
      </section>

      {/* Testimonials from Database */}
      <section className="px-8 py-16 bg-gray-50">
        <h3 className="text-2xl font-bold text-center mb-8">What People Are Saying</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials?.map((t) => (
            <div key={t.id} className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-gray-600">"{t.message}"</p>
              <p className="mt-4 font-bold text-gray-900">{t.name}</p>
              <p className="text-yellow-500">{'⭐'.repeat(t.rating)}</p>
            </div>
          ))}
        </div>
      </section>

    </main>
  )
}