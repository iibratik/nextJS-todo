import { AppBar, Box, Toolbar, Typography, Container, IconButton, Button } from "@mui/material"
import { useUserStore } from "@/app/features/userStore"
import { useAuthStore } from "@/app/features/authStore";
import { useThemeStore } from "@/app/features/themeStore";
import { LightMode, DarkMode } from '@mui/icons-material/';
import navbarStyle from "./navbar.module.scss"
import { useRouter } from "next/navigation";

export default function Navbar() {
    const user = useUserStore((state) => state.user);
    const router = useRouter()
    const { logout } = useAuthStore.getState()
    const { mode, toggleMode } = useThemeStore();
    function getOut() {
        logout()
        router.replace('/login')
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" className={navbarStyle['navbar']}>
                <Toolbar>
                    <Container className={navbarStyle['navbar-content']}>
                        <div className="navbar-title">
                            <Typography variant="h6">
                                Добро пожаловать! {user?.username}
                            </Typography>
                        </div>
                        <div className="navbar-actions">
                            <IconButton onClick={toggleMode} sx={{ color: 'white' }}>
                                {mode == 'dark' ? <LightMode /> : <DarkMode />}
                            </IconButton>
                            <Button onClick={getOut} variant="outlined" sx={{ color: 'white', border: '1px solid white' }} >Выйти</Button>
                        </div>
                    </Container>
                </Toolbar>
            </AppBar>
        </Box>
    )
}