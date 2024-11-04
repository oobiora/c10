import { defineField, defineType } from "sanity";

export const articleType = defineType({
    name: 'article',
    title: 'Article',
    type: 'document',
    fields: [
        defineField({
            name: 'articleTitle',
            type: 'string',
        }),
        defineField({
            name: 'imageContent',
            type: 'image',
            title: 'image' 
        }),
        defineField({
            name: 'publishedAt',
            type: 'datetime'
        })
    ]
})
