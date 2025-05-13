import { sendVerificationCode } from '@/lib/mailer'
import { prisma } from '@/lib/prisma'
import { createResponse } from '@/lib/response'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
    const { email } = await req.json()

    if (!email) {
        return createResponse('fail', 'Email is required', null, 400)
    }

    await prisma.user.upsert({
        where: { email },
        update: {},
        create: { email },
    })

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
        return createResponse('error', 'User not found after upsert', null, 500)
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString()
    const expiresAt = new Date(Date.now() + 1000 * 60 * 10) // 10 minutes

    await prisma.verificationCode.create({
        data: {
            code,
            userId: user.id,
            expiresAt,
        },
    })

    await sendVerificationCode(email, code)

    return createResponse('success', 'Verification code sent', null, 200)
}
