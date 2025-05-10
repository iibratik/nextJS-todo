
import { useTaskStore } from "@/app/features/tasksStore";
import { Task } from "@/types/task";
import { Delete, Edit } from "@mui/icons-material";
import { Box, Button, Checkbox, IconButton, ListItem, ListItemAvatar, ListItemText, Modal, TextField } from "@mui/material";
import { useState } from "react";
import taskItemStyle from './taskItem.module.scss'
type PropsType = {
    task: Task,
    onTaskChange: () => void
}

export default function TaskItem({ task, onTaskChange }: PropsType) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { setTaskStatus, editTask, deleteTask } = useTaskStore.getState()
    const [taskName, setTaskName] = useState('')

    function handleInput(value: string) {
        setTaskName(value)
    }
    function openModal(task: Task) {
        setTaskName(task.title)
        setIsModalOpen(!isModalOpen)
    }

    function saveTask(oldTask: Task) {
        if (taskName && taskName !== '') {
            editTask(taskName, oldTask)
            onTaskChange()
            setIsModalOpen(!isModalOpen)
        }
    }
    function deleteCurrentTask(currentTaskId: string) {
        deleteTask(currentTaskId)
        onTaskChange()
    }

    return (
        <ListItem key={task.taskId} secondaryAction={
            <div className={taskItemStyle['task-list-action']}>
                <span>{task.timestamp.toString()}</span>
                <IconButton onClick={() => openModal(task)} edge="end" aria-label="comments">
                    <Edit />
                </IconButton>
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
                            <Button onClick={() => { saveTask(task) }}>Сохранить</Button>
                        </div>
                    </Box>
                </Modal>
                <IconButton onClick={() => { deleteCurrentTask(task.taskId) }} edge="end" aria-label="delete">
                    <Delete />
                </IconButton>
            </div>
        } >
            <ListItemAvatar>
                <Checkbox onChange={() => {
                    setTaskStatus(task.taskId, task.status)
                    onTaskChange()
                }} checked={task.status} />
            </ListItemAvatar>
            <ListItemText primary={task.title} />
        </ListItem>
    )
}