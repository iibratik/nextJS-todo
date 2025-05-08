import { db } from "@/lib/firebase"
import { User } from "@/types/field"
import { FirebaseError } from "firebase/app"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { create } from "zustand"
import { persist } from "zustand/middleware"
interface UserState {
    userId: string | null,
    user: User | null,
    setUserId: (newUserId: string) => void,
    setUser: (userId: string) => Promise<void>,
    createUser: (value: string, firstName: string, secondName: string, username: string) => Promise<void>
}
export const useUserStore = create<UserState>()(
    persist((set) => ({
        userId: null,
        user: null,
        setUserId: (newUserId) => {
            set({ userId: newUserId })
        },
        setUser: async (userId) => {
            if (userId) {
                const userRef = doc(db, 'users', userId)
                const userDocSnap = await getDoc(userRef)
                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data() as User
                    set({ user: userData })

                }
            }
        },
        createUser: async (userId, firstName, secondName, username) => {
            try {
                await setDoc(doc(db, 'users', userId), {
                    userId, firstName, secondName, username
                })
            } catch (error) {
                if (error instanceof FirebaseError) {
                    return alert(error);
                }
            }
        }
    }), {
        name: 'auth-store',
        partialize: (state) => ({ userId: state.userId })
    }
    ))