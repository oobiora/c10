import { client } from "@/sanity/client"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const cursor = searchParams.get('cursor')
        
        const query = `*[
            _type == "post" 
            && defined(slug.current)
            ${cursor ? `&& publishedAt < $cursor` : ''}
        ] | order(publishedAt desc)[0...10] {
            _id,
            title,
            slug,
            content,
            publishedAt,
            prompt,
            responses
        }`

        const posts = await client.fetch(query, cursor ? { cursor } : {})
        return NextResponse.json(posts)
    } catch (error) {
        console.error('Error fetching posts:', error)
        return NextResponse.json(
            { error: 'Failed to fetch posts' },
            { status: 500 }
        )
    }
} 