'use client'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { darkTheme, lightTheme } from '@/theme'
import { useThemeStore } from '@/app/features/themeStore'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const mode = useThemeStore((s) => s.mode);

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}