/* eslint-disable @typescript-eslint/no-explicit-any */

type StatusType = 'success' | 'fail' | 'error'

export const createResponse = (
    status: StatusType,
    message: string,
    data: any = null,
    statusCode: number = 200
) => {
    return new Response(
        JSON.stringify({
            status,
            message,
            data,
            timestamp: new Date().toISOString(),
        }),
        {
            status: statusCode,
            headers: { 'Content-Type': 'application/json' },
        }
    )
}
