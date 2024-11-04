import { defineField, defineType } from "sanity";

export const postType = defineType({
    name: "post",
    title: "Post",
    type: "document",
    fields: [
        defineField({
            name: "title",
            type: "string"
        }),
        defineField({
            name: "slug",
            type: "slug"
        }),
        defineField({
            name: "publishedAt",
            type: "datetime"
        }),
        defineField({
            name: "content",
            type: "image",
            title: "Image",
        })
    ]
})