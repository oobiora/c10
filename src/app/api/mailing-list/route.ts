import prisma from "@/lib/prisma"
import { sign } from "jsonwebtoken"
import { NextResponse } from "next/server"

const JWT_SECRET = process.env.JWT_SECRET!

export async function POST(request: Request) {
    try {
        const { email } = await request.json()

        await prisma.mailingList.create({
            data: { email },
        })

        const token = sign(
            { email, joinedMailingList: true },
            JWT_SECRET,
            {expiresIn: '30d'}
        )

        return NextResponse.json(
            { success: true, token },
            {
                status: 200,
                headers: {
                    'Set-Cookie': `mailingList=${token}; Path=/; Max-Age=${60 * 60 * 24 * 30}; HttpOnly; SameSite=Strict`,
                  },
            }
        )
    } catch (error: unknown) {
        if (error instanceof Error && 'code' in error && error.code === 'P2002') {
            return NextResponse.json(
              { success: false, error: 'Email already exists' },
              { status: 400 }
            )
          }
          return NextResponse.json(
            { success: false, error: 'Something went wrong' },
            { status: 500 }
          )
    }
}