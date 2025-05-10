"use client"
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import LightMode from '@mui/icons-material/LightMode';
import DarkMode from '@mui/icons-material/DarkMode';

import { useUserStore } from "@/app/features/userStore"
import { useAuthStore } from "@/app/features/authStore";
import { useThemeStore } from "@/app/features/themeStore";
import navbarStyle from "./navbar.module.scss"
import { useRouter } from "next/navigation";

export default function NavbarComponent() {
    const user = useUserStore((state) => state.user);
    const router = useRouter()
    const { logout } = useAuthStore.getState()
    const { mode, toggleMode } = useThemeStore();
    function getOut() {
        logout()
        router.push('/login')
    }
    return (
        <AppBar className={navbarStyle['navbar']} position="static">
            <Container className={navbarStyle['navbar-content']}>
                <Toolbar disableGutters>
                    <div className="navbar-title">
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Добро пожаловать! {user?.username}
                        </Typography>
                    </div>
                    <div className="navbar-actions">
                        <IconButton onClick={toggleMode} sx={{ color: 'white' }}>
                            {mode == 'dark' ? <LightMode /> : <DarkMode />}
                        </IconButton>
                        <Button onClick={getOut} variant="outlined" sx={{ color: 'white', border: '1px solid white' }} >Выйти</Button>
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    )
}