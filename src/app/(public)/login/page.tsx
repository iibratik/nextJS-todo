"use client"

import { Container, TextField, Button, Grid, Box } from "@mui/material";
import loginStyle from './login.module.scss'
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Field } from "@/types/field";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuthStore } from "../../features/authStore";


export default function Login() {
    const router = useRouter()
    const loginFieldsArr = [
        { size: 12, autoComplete: 'username', name: 'email', type: 'email', label: 'Email', value: '', error: '' },
        { size: 12, autoComplete: 'current-password', name: 'password', type: 'password', label: 'Пароль', value: '', error: '' },
    ]
    const [loginFields, setLoginFields] = useState(loginFieldsArr)





    function handleInput(name: string, newValue: string) {
        setLoginFields(prevFields =>
            prevFields.map(field =>
                field.name === name
                    ? { ...field, value: newValue } // заменяем только нужное поле
                    : field                         // остальным ничего не делаем
            )
        );
    }
    function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        if (validateFields()) {
            signInFirebase()
        }

    }


    function validateFields(): boolean {
        const updatedFields = [...loginFields];
        let validFields = false;
        updatedFields.forEach((field) => {
            if (field.name === 'email' && !field.value.includes('@')) {
                field.error = 'Некорректный email';
                validFields = false;
                setLoginFields(updatedFields);
                return validFields;
            }
            else if (field.name === 'password' && field.value.length < 6) {
                field.error = 'Минимум 6 символов';
                validFields = false;
                setLoginFields(updatedFields);
                return validFields;
            } else {
                field.error = ''
                setLoginFields(updatedFields);
                validFields = true;
                return validFields;
            }
        });
        return validFields
    }
    async function signInFirebase() {
        const email = loginFields.find(field => {
            if (field.name === 'email') {
                return field
            }
        })?.value
        const password = loginFields.find(field => {
            if (field.name === 'password') {
                return field
            }
        })?.value
        const { login, } = useAuthStore.getState()
        await login(email!, password!)

        router.replace('/')
    }
    function switchPassType(newfield: Field) {
        const updatesFields = loginFields.map(field => {
            if (field.name === newfield.name) {
                return {
                    ...field,
                    type: field.type === 'password' ? 'text' : 'password'
                };
            }
            return field;
        })
        setLoginFields(updatesFields)
    }



    return (
        <Container className={loginStyle.login} maxWidth="md" >
            <Box className={loginStyle['login-content']}>
                <form onSubmit={handleSubmit} className={loginStyle["login-form"]}>
                    <h2 className={loginStyle['login-title']}>Вход</h2>
                    <div className={loginStyle["login-inputs"]}>
                        {loginFields.map((field) => {
                            return (
                                <Grid key={field.name} size={field.size} className={loginStyle['login-input-content']}>
                                    <TextField
                                        onChange={(event) => { handleInput(field.name, event.target.value) }}
                                        value={field.value}
                                        error={Boolean(field.error)}
                                        helperText={field.error}
                                        autoComplete={field.autoComplete}
                                        label={field.label}
                                        type={field.type}
                                    />
                                    {
                                        field.name === 'confirm-password' || field.name === 'password' ?
                                            <div onClick={() => {
                                                switchPassType(field)
                                            }} className={loginStyle['login-switch-pass']}>
                                                {field.type === 'password' ? <Visibility /> : <VisibilityOff />}
                                            </div>
                                            : null
                                    }
                                </Grid>
                            )

                        })}
                    </div>
                    <Button variant="contained" type="submit">Войти</Button>
                </form>
                <span>Нет с нами? <Button variant="text" onClick={() => {
                    router.replace('/register')
                }}> Регистрация</Button></span>
            </Box>
        </Container>
    )
}