import { Timestamp } from "firebase/firestore";

export interface Task {
    status: boolean,
    taskId: string,
    timestamp: Timestamp,
    title: string,
    userId: string
}