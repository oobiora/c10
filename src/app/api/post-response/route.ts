// or if you have a singleton setup:
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import { z } from "zod"

// Validation schema for the request body
const responseSchema = z.object({
    postId: z.string().min(1),
    optionChosen: z.number().int().min(1).max(2)
})

export async function POST(request: Request) {
    try {
        const body = await request.json()
        
        // Validate the request body
        const validatedData = responseSchema.safeParse(body)
        
        if (!validatedData.success) {
            return NextResponse.json(
                { 
                    success: false, 
                    error: 'Invalid request data',
                    details: validatedData.error.errors 
                },
                { status: 400 }
            )
        }

        // Create the response in the database
        const response = await prisma.postResponse.create({
            data: {
                postId: validatedData.data.postId,
                optionChosen: validatedData.data.optionChosen,
            },
        })

        // Fetch updated statistics
        const [option1Count, option2Count] = await Promise.all([
            prisma.postResponse.count({
                where: {
                    postId: validatedData.data.postId,
                    optionChosen: 1
                }
            }),
            prisma.postResponse.count({
                where: {
                    postId: validatedData.data.postId,
                    optionChosen: 2
                }
            })
        ])

        return NextResponse.json(
            { 
                success: true, 
                response,
                statistics: {
                    option1Count,
                    option2Count,
                    total: option1Count + option2Count
                }
            },
            { status: 201 }
        )
    } catch (error) {
        console.error('Error creating post response:', error)
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        )
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const postId = searchParams.get('postId')

        if (!postId) {
            return NextResponse.json(
                { success: false, error: 'Post ID is required' },
                { status: 400 }
            )
        }

        const [option1Count, option2Count] = await Promise.all([
            prisma.postResponse.count({
                where: {
                    postId,
                    optionChosen: 1
                }
            }),
            prisma.postResponse.count({
                where: {
                    postId,
                    optionChosen: 2
                }
            })
        ])

        return NextResponse.json({
            success: true,
            statistics: {
                option1Count,
                option2Count,
                total: option1Count + option2Count
            }
        })
    } catch (error) {
        console.error('Error fetching response statistics:', error)
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        )
    }
} 