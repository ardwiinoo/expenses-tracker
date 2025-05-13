'use client'

import FormBuilder from '@/components/FormBuilder'
import { useApi } from '@/hooks/useApi'
import { useState } from 'react'

export default function SignForm() {
    const [step, set_step] = useState<
        'email' | 'code' | 'set-password' | 'login-password'
    >('email')
    const [email, set_email] = useState('')
    const [code, set_code] = useState('')
    const [password, set_password] = useState('')
    const [confirmPassword, set_confirmPassword] = useState('')

    const [loading, error, , request] = useApi()

    const handleSendCode = async () => {
        await request('/api/auth/send-code', {
            method: 'POST',
            data: { email },
        })

        set_step('code')
    }

    const handleVerifyCode = async () => {
        await request('/api/auth/verify-code', {
            method: 'POST',
            data: { email, code },
        })

        const res = await request('/api/auth/check-user', {
            method: 'POST',
            data: { email },
        })

        if (res?.data?.isActive) {
            set_step('login-password')
        } else {
            set_step('set-password')
        }
    }

    const handleSetPassword = async () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match')
            return
        }

        await request('/api/auth/set-password', {
            method: 'POST',
            data: { email, password },
        })

        // Langsung login
        set_step('login-password')
    }

    const handleLogin = async () => {
        const res = await request('/api/auth/login', {
            method: 'POST',
            data: { email, password },
        })

        if (res?.status === 'success') {
            window.location.href = '/dashboard'
        }
    }

    const stepsUI = {
        email: (
            <FormBuilder
                fields={[
                    {
                        name: 'email',
                        label: 'Email',
                        type: 'email',
                        value: email,
                        onChange: (e) => set_email(e.target.value),
                        placeholder: 'you@example.com',
                    },
                ]}
                onSubmit={handleSendCode}
                submitLabel="Send Code"
                loading={loading}
            />
        ),
        code: (
            <FormBuilder
                fields={[
                    {
                        name: 'code',
                        label: 'Enter Verification Code',
                        type: 'text',
                        value: code,
                        onChange: (e) => set_code(e.target.value),
                    },
                ]}
                onSubmit={handleVerifyCode}
                submitLabel="Verify Code"
                loading={loading}
            />
        ),
        'set-password': (
            <FormBuilder
                fields={[
                    {
                        name: 'password',
                        label: 'New Password',
                        type: 'password',
                        value: password,
                        onChange: (e) => set_password(e.target.value),
                    },
                    {
                        name: 'confirmPassword',
                        label: 'Confirm Password',
                        type: 'password',
                        value: confirmPassword,
                        onChange: (e) => set_confirmPassword(e.target.value),
                    },
                ]}
                onSubmit={handleSetPassword}
                submitLabel="Set Password"
                loading={loading}
            />
        ),
        'login-password': (
            <FormBuilder
                fields={[
                    {
                        name: 'email',
                        label: 'Email',
                        type: 'email',
                        value: email,
                        onChange: () => {},
                        disabled: true,
                    },
                    {
                        name: 'password',
                        label: 'Password',
                        type: 'password',
                        value: password,
                        onChange: (e) => set_password(e.target.value),
                    },
                ]}
                onSubmit={handleLogin}
                submitLabel="Login"
                loading={loading}
            />
        ),
    }

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-3xl font-bold mb-2">Expenses Tracker App</h1>
            <p className="text mb-10">Welcome! Few steps to get you started.</p>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            {stepsUI[step]}
        </div>
    )
}
