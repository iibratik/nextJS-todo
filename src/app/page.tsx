import Button from '@mui/material/Button';
import { redirect } from 'next/navigation'

export default function App() {
    const isLogin = false
    if (!isLogin) {
        redirect('/login')
    }

    return (
        <Button variant="contained" color='secondary'>Hello world</Button>
    )
}
