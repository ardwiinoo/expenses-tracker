import { prisma } from '@/lib/prisma'
import { createResponse } from '@/lib/response'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
    const { email } = await req.json()
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
        return createResponse('fail', 'User not found', null, 404)
    }

    return createResponse(
        'success',
        'User data fetched',
        {
            isActive: user.active,
        },
        200
    )
}
