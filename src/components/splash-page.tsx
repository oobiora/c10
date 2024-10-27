'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SplashPage() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your backend
    console.log('Email submitted:', email)
    // Reset the input field
    setEmail('')
  }

  return (
    <div className="min-h-screen bg-black text-white font-mono flex flex-col">
      <nav className="flex justify-between items-center p-6">
        <div className="text-xl font-bold">Con10cious</div>
        <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
          Contact
        </Button>
      </nav>
      
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8 text-center">
          <h1 className="text-4xl font-bold">Upcoming Publication</h1>
          <p className="text-xl">Be the first to know when we launch.</p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 bg-white text-black placeholder-gray-500"
            />
            <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200">
              Notify Me
            </Button>
          </form>
        </div>
      </main>
      
      <footer className="text-center p-6 text-sm">
        © 2023 Project Name. All rights reserved.
      </footer>
    </div>
  )
}