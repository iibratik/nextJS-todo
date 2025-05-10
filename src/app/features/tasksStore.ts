import { db } from '@/lib/firebase'
import { Task } from '@/types/task'
import { FirebaseError } from 'firebase/app'
import { collection, deleteDoc, doc, getDocs, query, setDoc, Timestamp, updateDoc, where } from 'firebase/firestore'
import { create } from 'zustand'

interface TaskStore {
    tasksList: Array<Task> | null,
    loading: boolean,
    getTasks: (userId: string) => Promise<void>,
    deleteTask: (currentTask: string) => Promise<void>,
    createTask: (userId: string, taskName: string) => Promise<void>,
    setTaskStatus: (taskId: string, taskStatus: boolean) => Promise<void>,
    editTask: (newTaskName: string, oldTask: Task) => Promise<void>
}
export const useTaskStore = create<TaskStore>((set) => ({
    tasksList: [] as Array<Task>,
    loading: false,
    getTasks: async (userId) => {
        set({ loading: true })
        if (userId) {
            try {
                const tasksRef = collection(db, 'tasks')
                const searchQuery = query(tasksRef, where('userId', '==', userId))
                const taskDoc = await getDocs(searchQuery)
                const tasks: Task[] = taskDoc.docs.map(doc => {
                    const data = doc.data()
                    return {
                        title: data.title as string,
                        userId: data.userId as string,
                        taskId: data.taskId as string,
                        status: data.status as boolean,
                        timestamp: data.timestamp.toDate().toLocaleString() || ''
                    }
                })
                set({ tasksList: [...tasks] })
            } catch (error) {
                console.error(error);
            } finally {
                set({ loading: false })

            }
        }
    },
    setTaskStatus: async (taskId, taskStatus) => {
        try {
            const taskRef = doc(db, 'tasks', taskId);
            await updateDoc(taskRef, {
                status: !taskStatus,
            });
        } catch (error) {
            if (error instanceof FirebaseError) {
                alert(error.code)
            }
        }
    },
    editTask: async (newTaskName, oldTask) => {
        const newTask: Task = {
            status: oldTask.status,
            taskId: oldTask.taskId,
            timestamp: Timestamp.now(),
            title: newTaskName,
            userId: oldTask.userId
        }
        const taskRef = doc(db, 'tasks', newTask.taskId)
        try {
            await setDoc(taskRef, newTask)
        } catch (error) {
            if (error instanceof FirebaseError) {
                alert(error.code)
            }
        }

    },
    deleteTask: async (currentTask) => {
        try {
            await deleteDoc(doc(db, 'tasks', currentTask))
        } catch (error) {
            if (error instanceof FirebaseError) {
                alert(error.code)
            }
        }
    },
    createTask: async (userId, taskName) => {
        try {
            const newTaskRef = doc(collection(db, 'tasks'))
            const newTask = {
                taskId: newTaskRef.id,
                userId: userId,
                status: false,
                timestamp: Timestamp.now(),
                title: taskName,
            };
            await setDoc(newTaskRef, newTask)
        } catch (error) {
            if (error instanceof FirebaseError) {
                alert(error.code)
            }
        }
    }
}))