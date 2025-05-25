'use client'

import Navbar from '@/components/Navbar'

export default function Home() {
    return (
        <>
            <Navbar />
            <div className="pt-20 flex-col flex gap-5 justify-center items-center h-screen bg-cprimary text-cprimary">
                <h3>Coming Soon!</h3>
                <p>This app will be updated regularly ASAP.</p>
            </div>
        </>
    )
}
