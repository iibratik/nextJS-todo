"use client"
import { Paper, Container, TextField, Button, Grid } from "@mui/material";
import registerStyle from './register.module.scss'
import { useState } from "react";
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface Field {
    size: number,
    name: string,
    label: string,
    type: string,
    autoComplete?: string,
    value: string,
    error: string
}

export default function Register() {
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

    function validateFields() {
        const updatedFields = [...registerFields];
        let validFields = true;
        const getFieldValue = (name: string) =>
            updatedFields.find(f => f.name === name)?.value || '';
        updatedFields.forEach((field, index) => {
            const sanitized = field.value.trim().replace(/[<>"']/g, '');
            updatedFields[index].value = sanitized;

            switch (field.name) {
                case 'first-name':
                case 'last-name':
                    if (!sanitized) {
                        updatedFields[index].error = 'Поле не может быть пустым';
                        validFields = false;
                    } else {
                        updatedFields[index].error = '';
                    }
                    break;

                case 'email':
                    if (!sanitized) {
                        updatedFields[index].error = 'Email обязателен';
                        validFields = false;
                    } else if (!sanitized.includes('@')) {
                        updatedFields[index].error = 'Некорректный email';
                        validFields = false;
                    } else {
                        updatedFields[index].error = '';
                    }
                    break;

                case 'password':
                    if (!sanitized) {
                        updatedFields[index].error = 'Пароль обязателен';
                        validFields = false;
                    } else if (sanitized.length < 6) {
                        updatedFields[index].error = 'Минимум 6 символов';
                        validFields = false;
                    } else {
                        updatedFields[index].error = '';
                    }
                    break;

                case 'confirm-password':
                    const passwordValue = getFieldValue('password');
                    if (!sanitized) {
                        updatedFields[index].error = 'Подтверждение пароля обязательно';
                        validFields = false;
                    } else if (sanitized !== passwordValue) {
                        updatedFields[index].error = 'Пароли не совпадают';
                        validFields = false;
                    } else {
                        updatedFields[index].error = '';
                    }
                    break;

                default:
                    updatedFields[index].error = '';
            }
        });

        setRegisterFields(updatedFields);
        return validFields;
    }

    function submitForm(event: React.FormEvent) {
        event.preventDefault()
        validateFields()
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
                    <Button variant="contained" type="submit">Войти</Button>
                </form>
            </Paper>
        </Container>
    )
}