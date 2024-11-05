import Link from 'next/link'

export function TopBanner() {
    return (
        <div className="flex flex-col justify-between border border-zinc-800 rounded-md">
            <div className="flex justify-between bg-zinc-950 p-2">
                <Link 
                    href="/" 
                    className="text-gray-400 text-sm hover:text-blue-400 transition-colors"
                >
                    con10scious.com
                </Link>
                <Link 
                    href="/socials" 
                    className="text-white text-sm hover:text-blue-400 transition-colors"
                >
                    socials
                </Link>
            </div>
            <div className="bg-zinc-800 p-2 text-sm">
                <p>reason has always existed, but not always in reasonable form.</p>
            </div>
        </div>
    )
}