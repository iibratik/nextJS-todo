import { create } from "zustand"
import { persist } from "zustand/middleware"
interface ThemeStore {
    currentTheme: 'dark' | 'light',
    setCurrentTheme: (newTheme: 'dark' | 'light') => void
}

export const useThemeStore = create<ThemeStore>()(
    persist((set) => ({
        currentTheme: 'light',
        setCurrentTheme(newTheme) {
            set({ currentTheme: newTheme })
        }
    }), {
        name: 'theme-store',
        partialize: (state) => ({ currentTheme: state.currentTheme })
    })
)