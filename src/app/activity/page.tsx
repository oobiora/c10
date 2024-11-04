import { TopBanner } from "@/components/ui/top-banner"
import { PostsLoader } from "@/components/articles/post-loader"

export default async function ActivityPage() {
  return (
    <div className="min-h-screen bg-black text-white font-mono flex flex-col">
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="max-w-xl w-full space-y-8 text-center">
          <TopBanner />
          <PostsLoader />
        </div>
      </main>
      
      <footer className="text-center p-6 text-sm">
        © 2024 Con10scious. All rights reserved.
      </footer>
    </div>
  )
}