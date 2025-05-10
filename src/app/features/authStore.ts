import { auth } from '../..//lib/firebase'
import { FirebaseError } from 'firebase/app'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { create } from 'zustand'
import { useUserStore } from './userStore'

interface AuthStore {
    login: (email: string, password: string) => Promise<string>,
    logout: () => Promise<void>
    register: (firstName: string, secondName: string, username: string, email: string, password: string) => Promise<string>
}

export const useAuthStore = create<AuthStore>(() => ({
    login: async (email: string, password: string) => {
        let resultReturn = 'fail'
        const userStore = useUserStore.getState()
        try {
            const result = await signInWithEmailAndPassword(auth, email, password)
            if (result.user.uid) {
                userStore.setUserId(result.user.uid)
                await userStore.setUser(result.user.uid)
                resultReturn = "success"
                return resultReturn
            }
        } catch (error) {
            if (error instanceof FirebaseError) {
                if (error.code === 'auth/invalid-credential') {
                    alert('Вас нет в системе или одно из полей не корректное')
                    resultReturn = 'fail'
                } else {
                    alert(error.code);
                    resultReturn = 'fail'
                }
            }
            return resultReturn
        }
        return resultReturn
    },
    register: async (firstName: string, secondName: string, username: string, email: string, password: string) => {
        const userStore = useUserStore.getState()
        let resultReturn = 'fail'
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password)
            if (result.user.uid) {
                await result.user.getIdToken(true);
                await userStore.createUser(result.user.uid, firstName, secondName, username)
                userStore.setUserId(result.user.uid)
                await userStore.setUser(result.user.uid)
                resultReturn = 'success'
                return resultReturn
            }
        } catch (error) {
            if (error instanceof FirebaseError) {
                if (error.code === 'auth/email-already-in-use') {
                    alert('Эта почта уже используется')
                    return resultReturn = 'fail'
                } else {
                    alert(error.code)
                }
                return resultReturn = 'fail'
            }
        }
        return resultReturn
    },
    logout: async () => {
        const userStore = useUserStore.getState()
        userStore.logout()
        try {
            await signOut(auth)
        } catch (error) {
            if (error instanceof FirebaseError) {
                alert(error.code)
            }
        }

    },
}))