import { prisma } from '@/lib/prisma'
import { createResponse } from '@/lib/response'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
    const { email, code } = await req.json()

    if (!email || !code)
        return createResponse('fail', 'Email or Code is required', null, 400)

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) return createResponse('fail', 'User not found', null, 404)

    const latestCode = await prisma.verificationCode.findFirst({
        where: {
            userId: user.id,
            code,
            expiresAt: {
                gt: new Date(),
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    })

    if (!latestCode)
        return createResponse('fail', 'Invalid or expired code', null, 400)

    return createResponse('success', 'Code verified successfully', null, 200)
}
