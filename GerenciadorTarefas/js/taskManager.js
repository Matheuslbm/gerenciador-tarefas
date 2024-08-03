import {Task} from './task.js';

export class TaskManager {
    constructor() {
        this.tasks = this.loadTasks();
    }

    addTask(taskTitle) {
        const task = new Task(taskTitle);
        this.tasks.push(task)
        this.saveTasks()
    }

    removeTask(index) {
        this.tasks.splice(index, 1);
        this.saveTasks()
    }

    toggleTaskCompleted(index) {
        this.tasks[index].toggleCompleted();
        this.saveTasks()
    }

    editTask(index, newTitle) {
        this.tasks[index].editTitle(newTitle);
        this.saveTasks()
    }

    getTasks() {
        return this.tasks;
    }

    saveTasks() {
        const tasksToSave = this.tasks.map(task => ({
            title: task.title,
            completed: task.completed
        }));
        localStorage.setItem('tasks', JSON.stringify(tasksToSave))
    }

    loadTasks() {
        const tasks = localStorage.getItem('tasks');
        if (tasks) {
            const parsedTasks = JSON.parse(tasks);
            return parsedTasks.map(taskData => new Task(taskData.title, taskData.completed));
        }
        return []
    }

} 