import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: { main: '#1976d2' },
        secondary: { main: '#FF7300FF' },
        background: { default: '#fff', paper: '#f5f5f5' },
    }
})

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: { main: '#1976d2' },
        secondary: {
            main: '#ff7300',
            contrastText: '#ffffff',
        },
        background: { default: '#121212', paper: '#1e1e1e' },
    }
})