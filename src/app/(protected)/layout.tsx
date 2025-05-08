"use client"
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';
import { useUserStore } from '../features/userStore';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const { userId, setUser } = useUserStore.getState()
    // const user = useUserStore((s) => s.user);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (!userId) {
                router.replace('/login')
            } else {
                async function loadUser() {
                    await setUser(userId!)
                    router.replace('/dashboard')
                }
                loadUser()
            }
        }

    }, [router, userId, setUser])
    return (
        <>{children}</>
    )
}