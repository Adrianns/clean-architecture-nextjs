import { Task } from "@/core/domain/entities/Task"
import { ITaskRepository } from "@/core/repositories/ITaskRepository"

export class TaskUseCases {
  constructor(private taskRepository: ITaskRepository) {}

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.getAll()
  }

  async createTask(title: string): Promise<Task> {
    return this.taskRepository.create({ title, completed: false })
  }

  async toggleTaskCompletion(id: string): Promise<Task> {
    const task = await this.taskRepository.getById(id)
    if (!task) throw new Error("Task not found")
    const updatedTask = { ...task, completed: !task.completed }
    return this.taskRepository.update(updatedTask)
  }

  async deleteTask(id: string): Promise<void> {
    await this.taskRepository.delete(id)
  }
}

