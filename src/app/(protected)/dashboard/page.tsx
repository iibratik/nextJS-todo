"use client";

import { Box, Button, CircularProgress, Container, List, ListSubheader, Modal, TextField, useTheme, } from '@mui/material';
import { useTaskStore } from '@/app/features/tasksStore';
import { useEffect, useState, } from "react";
import { useUserStore } from '@/app/features/userStore';

import TaskItem from "../../components/TaskItem"
import { Add } from '@mui/icons-material';

import dashboardStyle from "./dashboard.module.scss"
import taskItemStyle from "../../components/TaskItem/taskItem.module.scss"

export default function Dashboard() {
    const theme = useTheme();
    const userId = useUserStore((state) => state.userId);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskName, setTaskName] = useState('')
    const { getTasks, createTask } = useTaskStore.getState();
    const tasksList = useTaskStore((state) => state.tasksList);
    const loading = useTaskStore((state) => state.loading);

    useEffect(() => {
        if (userId) {
            getTasks(userId);
        }
    }, [getTasks, userId]);
    function openModal() {
        setIsModalOpen(!isModalOpen)
    }
    async function addNewTask(userId: string) {
        if (userId && taskName !== '') {
            createTask(userId, taskName)
            await getTasks(userId)
            setIsModalOpen(!isModalOpen)
        }
    }
    function handleInput(value: string) {
        setTaskName(value)
    }

    return (
        <section className={dashboardStyle["dashboard"]}>
            <Container className={dashboardStyle['dashboard-content']}>
                {loading ? <CircularProgress /> : <List className={dashboardStyle['dashboard-lists']} sx={{ width: '100%', bgcolor: 'background.paper' }}
                    subheader={
                        <ListSubheader component="div" className={dashboardStyle['dashboard-list__header']}>
                            <h3>Список задач</h3>
                            <Button onClick={() => { openModal() }} sx={{ color: theme.palette.secondary.contrastText }}>
                                <Add />
                                Создать задачу
                            </Button>
                            <Modal className={taskItemStyle['task-list-modal']} open={isModalOpen} onClose={() => { setIsModalOpen(!isModalOpen) }}>
                                <Box className={taskItemStyle['task-list-modal__content']} sx={{ bgcolor: 'background.paper' }}>
                                    <TextField
                                        className={taskItemStyle['task-list__input']}
                                        onChange={(event) => { handleInput(event.target.value) }}
                                        value={taskName}
                                        error={taskName === ''}
                                        helperText={taskName === '' ? 'Задача не может быть пустой!' : ''}
                                        label="Введите задачу"
                                        type="text"
                                    />
                                    <div className={taskItemStyle['task-list-edit__btns']}>
                                        <Button onClick={() => setIsModalOpen(!isModalOpen)}>Отменить</Button>
                                        <Button onClick={() => { addNewTask(userId!) }}>Сохранить</Button>
                                    </div>
                                </Box>
                            </Modal>
                        </ListSubheader>
                    }>
                    {
                        tasksList?.map((task) => {
                            return (
                                <TaskItem key={task.taskId} task={task} onTaskChange={() => { getTasks(userId!) }} />
                            )
                        })

                    }
                </List>}

            </Container>
        </section>
    );
}
