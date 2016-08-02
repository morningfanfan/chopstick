import * as note from "./note"

enum TaskType {
    Sequential,
    Parallel
}

export class Task<T extends note.Note> {
    start: Date
    due: Date
    note: T
    subTasks: Array<T>

    constructor(public name: String) {}

    isDue(date: Date = new Date()): boolean {
        return this.due >= date 
    }

    isStarted(date: Date = new Date()): boolean {
        return this.start >= date
    }
}