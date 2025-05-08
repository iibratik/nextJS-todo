'use client'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { darkTheme, lightTheme } from '@/theme'
import { useEffect } from 'react';
import { useThemeStore } from '@/app/features/themeStore'

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const { setCurrentTheme, currentTheme } = useThemeStore.getState()
  const theme: string = currentTheme
  useEffect(() => {
    if (theme === 'dark') {
      setCurrentTheme('light')
    } else {
      setCurrentTheme('dark')
    }
    console.log(theme);

  }, [setCurrentTheme, theme])

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme == 'light' ? lightTheme : darkTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  )
}