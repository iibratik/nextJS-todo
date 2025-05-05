"use client"

import { Paper, Container, TextField, Button } from "@mui/material";
import loginStyle from './login.module.scss'
import { useState } from "react";

export default function Login() {


    const loginFieldsArr = [
        { autoComplete: 'username', name: 'email', type: 'email', label: 'Email', value: '', error: '' },
        { autoComplete: 'current-password', name: 'password', type: 'password', label: 'Пароль', value: '', error: '' },
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
        validateFields()
    }


    function validateFields() {
        const updatedFields = [...loginFields];
        let validFields = true;
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

    }




    return (
        <Container className={loginStyle.login} maxWidth="md" >
            <Paper variant="elevation" className={loginStyle['login-content']}>
                <form onSubmit={handleSubmit} className={loginStyle["login-form"]}>
                    <h2 className={loginStyle['login-title']}>Вход</h2>
                    <div className={loginStyle["login-inputs"]}>
                        {loginFields.map((field) => {
                            return (
                                <TextField
                                    onChange={(event) => { handleInput(field.name, event.target.value) }}
                                    value={field.value}
                                    key={field.name}
                                    error={Boolean(field.error)}
                                    helperText={field.error}
                                    autoComplete={field.autoComplete}
                                    label={field.label}
                                    type={field.type}
                                />
                            )
                        })}
                    </div>
                    <Button variant="contained" type="submit">Войти</Button>
                </form>
            </Paper>
        </Container>
    )
}