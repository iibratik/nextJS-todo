import "@/app/styles/main.scss"
import React from "react"
import ThemeRegistry from '@/theme/ThemeRegistry'



export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru">
            <head>
                <title>NextJS To-do</title>
            </head>
            <body>
            <ThemeRegistry>
                {children}
            </ThemeRegistry>

            </body>
        </html>
    )
}