import { Task } from "@/core/domain/entities/Task"
import { ITaskRepository } from "@/core/repositories/ITaskRepository"
import { v4 as uuidv4 } from "uuid"

export class InMemoryTaskRepository implements ITaskRepository {
  private tasks: Task[] = []

  async getAll(): Promise<Task[]> {
    return this.tasks
  }

  async getById(id: string): Promise<Task | null> {
    return this.tasks.find((task) => task.id === id) || null
  }

  async create(task: Omit<Task, "id">): Promise<Task> {
    const newTask = { ...task, id: uuidv4() }
    this.tasks = [...this.tasks, newTask]
    return newTask
  }

  async update(task: Task): Promise<Task> {
    const index = this.tasks.findIndex((t) => t.id === task.id)
    if (index === -1) throw new Error("Task not found")
    this.tasks[index] = task
    return task
  }

  async delete(id: string): Promise<void> {
    this.tasks = this.tasks.filter((task) => task.id !== id)
  }
}