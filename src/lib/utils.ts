import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { type SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Sanity Image URL Builder function
const { projectId, dataset } = client.config();
export const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;