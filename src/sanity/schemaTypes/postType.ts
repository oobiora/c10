import { defineField, defineType } from "sanity";

export const postType = defineType({
    name: "post",
    title: "Post",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            description: "The title of the post",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "slug",
            type: "slug",
            options: {
                source: "title",
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "publishedAt",
            type: "datetime",
            title: "Published At",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "content",
            title: "Content",
            description: "Choose either an image or a tweet ID",
            type: "object",
            validation: (Rule) => Rule.required(),
            fields: [
                defineField({
                    name: "contentType",
                    title: "Content Type",
                    type: "string",
                    options: {
                        list: [
                            { title: "Image", value: "image" },
                            { title: "Tweet", value: "tweet" },
                        ],
                    },
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: "image",
                    type: "image",
                    title: "Image",
                    hidden: ({ parent }) => parent?.contentType !== "image",
                }),
                defineField({
                    name: "tweetId",
                    type: "string",
                    title: "Tweet ID",
                    hidden: ({ parent }) => parent?.contentType !== "tweet",
                }),
            ],
        }),
        defineField({
            name: "prompt",
            title: "Discussion Prompt",
            type: "string",
            description: "A question for users to answer about this post",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "responses",
            title: "Response Options",
            type: "object",
            description: "Configure two possible responses to the prompt",
            validation: (Rule) => Rule.required(),
            fields: [
                defineField({
                    name: "option1",
                    title: "Option 1",
                    type: "object",
                    validation: (Rule) => Rule.required(),
                    fields: [
                        defineField({
                            name: "text",
                            title: "Response Text",
                            type: "string",
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: "explanation",
                            title: "Explanation",
                            type: "text",
                            description: "Explain why this response might be chosen",
                            validation: (Rule) => Rule.required(),
                        }),
                    ],
                }),
                defineField({
                    name: "option2",
                    title: "Option 2",
                    type: "object",
                    validation: (Rule) => Rule.required(),
                    fields: [
                        defineField({
                            name: "text",
                            title: "Response Text",
                            type: "string",
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: "explanation",
                            title: "Explanation",
                            type: "text",
                            description: "Explain why this response might be chosen",
                            validation: (Rule) => Rule.required(),
                        }),
                    ],
                }),
            ],
        }),
    ]
})