import { redirect } from 'next/navigation'

export default async function Home() {
  // Redirect root to splash page
  redirect('/splash')
}
