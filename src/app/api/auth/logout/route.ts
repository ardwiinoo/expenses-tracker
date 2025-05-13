import { createResponse } from '@/lib/response'
import { NextRequest } from 'next/server'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(req: NextRequest) {
    const res = createResponse('success', 'Logged out successfully', null, 200)

    res.cookies.set('token', '', {
        maxAge: 0,
        path: '/',
    })

    return res
}
