import { Task } from "../domain/entities/Task"

export interface ITaskRepository {
  getAll(): Promise<Task[]>
  getById(id: string): Promise<Task | null>
  create(task: Omit<Task, "id">): Promise<Task>
  update(task: Task): Promise<Task>
  delete(id: string): Promise<void>
}