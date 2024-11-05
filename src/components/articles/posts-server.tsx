import { client } from "@/sanity/client"
import { type SanityDocument } from "next-sanity"
import { PostNavigator } from "./post-navigator"

// Fetch posts in batches with pagination
const POSTS_QUERY = `*[
    _type == "post"
    && defined(slug.current)
  ] | order(publishedAt desc)[0...20] {
    _id, 
    title, 
    slug, 
    content, 
    publishedAt,
    prompt,
    responses
  }`

const options = { next: { revalidate: 30 } }

export async function PostsServer() {
    const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options)
    return <PostNavigator initialPosts={posts} />
}
