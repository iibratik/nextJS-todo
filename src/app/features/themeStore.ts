import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeMode = 'light' | 'dark';

interface ThemeState {
    mode: ThemeMode;
    setMode: (mode: ThemeMode) => void;
    toggleMode: () => void;
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set, get) => ({
            mode: 'light',
            setMode: (mode) => set({ mode }),
            toggleMode: () => set({ mode: get().mode === 'light' ? 'dark' : 'light' }),
        }),
        {
            name: 'theme-store',
        }
    )
);