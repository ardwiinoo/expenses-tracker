/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse } from 'next/server'

type StatusType = 'success' | 'fail' | 'error'

export const createResponse = (
    status: StatusType,
    message: string,
    data: any = null,
    statusCode: number = 200
) => {
    const res = NextResponse.json(
        {
            status,
            message,
            data,
            timestamp: new Date().toISOString(),
        },
        { status: statusCode }
    )
    return res
}
