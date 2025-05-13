'use client'

import { useRouter } from 'next/navigation'
import { useApi } from '@/hooks/useApi'
import FormBuilder from '@/components/FormBuilder'

export default function Home() {
    const router = useRouter()
    const [loading, , , request] = useApi()

    const handleLogout = async () => {
        await request('/api/auth/logout', {
            method: 'POST',
        })

        router.push('/auth/signin')
    }

    return (
        <div className="flex-col flex gap-5 justify-center items-center h-screen">
            <h3>Coming Soon!</h3>
            <p>This app will be updated regularly ASAP.</p>

            <FormBuilder
                fields={[]}
                onSubmit={handleLogout}
                submitLabel="Logout"
                loading={loading}
            />
        </div>
    )
}
