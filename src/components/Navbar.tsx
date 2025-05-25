'use client'

import { useApi } from '@/hooks/useApi'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import NProgress from 'nprogress'

export default function Navbar() {
    const router = useRouter()
    const [showMenu, set_showMenu] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)
    const [, , , request] = useApi()

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                set_showMenu(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleLogout = async () => {
        NProgress.start()
        await request('/api/auth/logout', {
            method: 'POST',
        })
        NProgress.done()
        router.push('/auth/signin')
    }

    return (
        <nav className="fixed top-0 w-full bg-cprimary shadow-md z-50 p-4 flex justify-between items-center">
            <div className="text-xl font-bold text-cprimary">
                Expenses Tracker
            </div>

            <div className="relative" ref={menuRef}>
                <div
                    className="w-10 h-10 bg-gray-300 rounded-full cursor-pointer flex items-center justify-center hover:ring-2 hover:ring-gray-400 transition"
                    onClick={() => set_showMenu((prev) => !prev)}
                >
                    <span className="font-semibold text-sm">U</span>
                </div>

                {showMenu && (
                    <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md overflow-hidden">
                        <button
                            onClick={handleLogout}
                            className="w-full px-4 py-2 text-left hover:bg-gray-100 hover:cursor-pointer"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    )
}
