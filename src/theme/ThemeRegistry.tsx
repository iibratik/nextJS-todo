'use client'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { darkTheme, lightTheme } from '@/theme'

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const theme: string = 'darkTheme'
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme == 'lightTheme' ? lightTheme : darkTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  )
}