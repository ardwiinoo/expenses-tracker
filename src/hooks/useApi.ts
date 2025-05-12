/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import axios, { AxiosRequestConfig } from 'axios'
import { useCallback, useState } from 'react'

export function useApi<T = any>() {
    const [loading, set_loading] = useState(false)
    const [error, set_error] = useState<string | null>(null)
    const [data, set_data] = useState<T | null>(null)

    const request = useCallback(
        async (url: string, config?: AxiosRequestConfig) => {
            set_loading(true)

            try {
                const response = await axios(url, config)
                set_data(response.data)
                return response.data
            } catch (err: any) {
                set_error(err.response?.data?.message || 'An error occurred')
                throw err
            } finally {
                set_loading(false)
            }
        },
        []
    )

    return [loading, error, data, request]
}
