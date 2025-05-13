import { hashPassword } from '@/lib/hash'
import { prisma } from '@/lib/prisma'
import { createResponse } from '@/lib/response'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
    const { email, password } = await req.json()

    if (!email || !password)
        return createResponse(
            'fail',
            'Email and password are required',
            null,
            400
        )

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) return createResponse('fail', 'User not found', null, 404)

    const hashedPass = await hashPassword(password)

    await prisma.user.update({
        where: { email },
        data: {
            password: hashedPass,
            active: true,
        },
    })

    return createResponse('success', 'Password set successfully', null, 200)
}
