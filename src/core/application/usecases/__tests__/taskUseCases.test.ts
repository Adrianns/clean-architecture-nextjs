import { Task } from "@/core/domain/entities/Task"
import { ITaskRepository } from "@/core/repositories/ITaskRepository"
import { TaskUseCases } from "../taskUseCases"

class MockTaskRepository implements ITaskRepository {
  private tasks: Task[] = []

  async getAll(): Promise<Task[]> {
    return this.tasks
  }

  async getById(id: string): Promise<Task | null> {
    return this.tasks.find((task) => task.id === id) || null
  }

  async create(task: Omit<Task, "id">): Promise<Task> {
    const newTask = { ...task, id: String(this.tasks.length + 1) }
    this.tasks.push(newTask)
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

describe("TaskUseCases", () => {
  let taskUseCases: TaskUseCases
  let mockRepository: MockTaskRepository

  beforeEach(() => {
    mockRepository = new MockTaskRepository()
    taskUseCases = new TaskUseCases(mockRepository)
  })

  test("getAllTasks should return all tasks", async () => {
    await mockRepository.create({ title: "Task 1", completed: false })
    await mockRepository.create({ title: "Task 2", completed: true })

    const tasks = await taskUseCases.getAllTasks()
    expect(tasks).toHaveLength(2)
    expect(tasks[0].title).toBe("Task 1")
    expect(tasks[1].title).toBe("Task 2")
  })

  test("createTask should add a new task", async () => {
    const newTask = await taskUseCases.createTask("New Task")
    expect(newTask.title).toBe("New Task")
    expect(newTask.completed).toBe(false)

    const tasks = await taskUseCases.getAllTasks()
    expect(tasks).toHaveLength(1)
    expect(tasks[0].title).toBe("New Task")
  })

  test("toggleTaskCompletion should toggle task completion status", async () => {
    const task = await mockRepository.create({ title: "Test Task", completed: false })
    const updatedTask = await taskUseCases.toggleTaskCompletion(task.id)
    expect(updatedTask.completed).toBe(true)

    const toggledAgain = await taskUseCases.toggleTaskCompletion(task.id)
    expect(toggledAgain.completed).toBe(false)
  })

  test("deleteTask should remove a task", async () => {
    const task = await mockRepository.create({ title: "Task to Delete", completed: false })
    await taskUseCases.deleteTask(task.id)

    const tasks = await taskUseCases.getAllTasks()
    expect(tasks).toHaveLength(0)
  })
})

