import { comparePassword } from '@/lib/hash'
import { signToken } from '@/lib/jwt'
import { prisma } from '@/lib/prisma'
import { createResponse } from '@/lib/response'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
    const { email, password } = await req.json()

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user || !user.password)
        return createResponse(
            'fail',
            'User not found or password not set',
            null,
            404
        )

    const isMatch = await comparePassword(password, user.password)

    if (!isMatch)
        return createResponse('fail', 'Invalid credentials', null, 401)

    const token = signToken({ id: user.id })

    const res = createResponse(
        'success',
        'Login successful',
        { userId: user.id },
        200
    )

    res.cookies.set('token', token, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24, // 1 day
    })

    return res
}
