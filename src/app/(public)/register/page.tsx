'use client';

import { Paper, Container, TextField, Button, Grid } from "@mui/material";
import registerStyle from './register.module.scss'
import { useState, } from "react";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import type { Field } from "@/types/field";
import { useRouter } from 'next/navigation';
import { useAuthStore } from "../../features/authStore";

export default function Register() {
    const router = useRouter()

    const registerInputs = [
        {
            size: 6,
            name: 'first-name',
            label: 'Имя',
            type: 'name',
            value: '',
            error: ''
        },
        {
            size: 6,
            name: 'last-name',
            label: 'Фамилия',
            type: 'name',
            value: '',
            error: ''
        },
        {
            size: 12,
            name: 'username',
            label: 'Имя пользователя',
            type: 'text',
            value: '',
            error: ''
        },
        {
            size: 12,
            name: 'email',
            label: 'Email',
            type: 'email',
            autoComplete: 'username',
            value: '',
            error: ''
        },
        {
            size: 12,
            name: 'password',
            label: 'Пароль',
            type: 'password',
            autoComplete: 'current-password',
            value: '',
            error: ''
        },
        {
            size: 12,
            name: 'confirm-password',
            label: 'Подтвердите пароль',
            type: 'password',
            autoComplete: 'new-password',
            value: '',
            error: ''
        }

    ]
    const [registerFields, setRegisterFields] = useState(registerInputs)

    function validateFields(): boolean {
        const updatedFields = [...registerFields];
        let validFields = true;

        // Функция для получения значения поля по name
        const getFieldValue = (name: string): string => {
            const field = updatedFields.find(f => f.name === name);
            return field?.value.trim().replace(/[<>"']/g, '') || '';
        };

        const sanitizedFields = updatedFields.map((field) => {
            const sanitizedValue = field.value.trim().replace(/[<>"']/g, '');
            let error = '';

            switch (field.name) {
                case 'first-name':
                case 'last-name':
                    if (!sanitizedValue) {
                        error = 'Поле не может быть пустым';
                        validFields = false;
                    }
                    break;

                case 'email':
                    if (!sanitizedValue) {
                        error = 'Email обязателен';
                        validFields = false;
                    } else if (!sanitizedValue.includes('@')) {
                        error = 'Некорректный email';
                        validFields = false;
                    }
                    break;

                case 'password':
                    if (!sanitizedValue) {
                        error = 'Пароль обязателен';
                        validFields = false;
                    } else if (sanitizedValue.length < 6) {
                        error = 'Минимум 6 символов';
                        validFields = false;
                    }
                    break;

                case 'confirm-password':
                    const passwordValue = getFieldValue('password');
                    if (!sanitizedValue) {
                        error = 'Подтверждение пароля обязательно';
                        validFields = false;
                    } else if (sanitizedValue !== passwordValue) {
                        error = 'Пароли не совпадают';
                        validFields = false;
                    }
                    break;
            }

            return {
                ...field,
                value: sanitizedValue,
                error,
            };
        });

        setRegisterFields(sanitizedFields);
        return validFields;
    }

    async function signUpFirebase() {
        const { register } = useAuthStore.getState()
        const email = registerFields.find(field => {
            if (field.name === 'email') {
                return field
            }
        })?.value
        const password = registerFields.find(field => {
            if (field.name === 'password') {
                return field
            }
        })?.value
        const firstName = registerFields.find(field => {
            if (field.name === 'first-name') {
                return field
            }
        })?.value
        const secondName = registerFields.find(field => {
            if (field.name === 'first-name') {
                return field
            }
        })?.value
        const username = registerFields.find(field => {
            if (field.name === 'first-name') {
                return field
            }
        })?.value
        const res = await register(firstName!, secondName!, username!, email!, password!)
        if (res == 'success') {
            router.replace('/')
        }
    }
    function submitForm(event: React.FormEvent) {
        event.preventDefault()
        if (validateFields()) {
            signUpFirebase()
        }
    }
    function handleInput(name: string, newValue: string) {
        setRegisterFields(prevFields =>
            prevFields.map(field =>
                field.name === name
                    ? { ...field, value: newValue } // заменяем только нужное поле
                    : field                         // остальным ничего не делаем
            )
        );
    }

    function switchPassType(newfield: Field) {
        const updatesFields = registerFields.map(field => {
            if (field.name === newfield.name) {
                return {
                    ...field,
                    type: field.type === 'password' ? 'text' : 'password'
                };
            }
            return field;
        })
        setRegisterFields(updatesFields)
    }
    return (
        <Container className={registerStyle.register} maxWidth="md" >
            <Paper variant="elevation" className={registerStyle['register-content']}>
                <form onSubmit={submitForm} className={registerStyle["register-form"]}>
                    <h2 className={registerStyle['register-title']}>Регистрация</h2>
                    <Grid container spacing={2}>
                        {registerFields.map(field => {
                            return (
                                <Grid key={field.name} size={field.size} className={
                                    registerStyle['register-input-content']
                                }>
                                    <TextField
                                        className={registerStyle['register-input']}
                                        autoComplete={field.autoComplete}
                                        label={field.label}
                                        type={field.type}
                                        error={Boolean(field.error)}
                                        helperText={field.error}
                                        onChange={(event) => { handleInput(field.name, event.target.value) }}

                                    />
                                    {
                                        field.name === 'confirm-password' || field.name === 'password' ?
                                            <div onClick={() => {
                                                switchPassType(field)
                                            }} className={registerStyle['register-switch-pass']}>
                                                {field.type === 'password' ? <Visibility /> : <VisibilityOff />}
                                            </div>
                                            : null
                                    }
                                </Grid>
                            )
                        })}
                    </Grid>
                    <span>Уже с нами? <Button onClick={() => {
                        router.replace('/login')
                    }}>Войти</Button></span>
                    <Button variant="contained" type="submit">Зарегестрироваться</Button>
                </form>
            </Paper>
        </Container>
    )
}
