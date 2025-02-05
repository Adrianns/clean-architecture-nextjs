"use client"

import { TaskUseCases } from "@/core/application/usecases/taskUseCases"
import { InMemoryTaskRepository } from "@/core/data/repositories/TaskRepository"
import type React from "react"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "./redux/store"
import { addTask, removeTask, setTasks, updateTask } from "./redux/taskSlice"

const taskRepository = new InMemoryTaskRepository()
const taskUseCases = new TaskUseCases(taskRepository)

export default function Home() {
  const dispatch = useDispatch()
  const tasks = useSelector((state: RootState) => state.tasks.tasks)
  const [newTaskTitle, setNewTaskTitle] = useState("")

  useEffect(() => {
    loadTasks()
  }, [])

  async function loadTasks() {
    const loadedTasks = await taskUseCases.getAllTasks()
    dispatch(setTasks(loadedTasks))
  }

  async function handleCreateTask(e: React.FormEvent) {
    e.preventDefault()
    if (newTaskTitle.trim()) {
      const newTask = await taskUseCases.createTask(newTaskTitle)
      dispatch(addTask(newTask))
      setNewTaskTitle("")
    }
  }

  async function handleToggleTask(id: string) {
    const updatedTask = await taskUseCases.toggleTaskCompletion(id)
    dispatch(updateTask(updatedTask))
  }

  async function handleDeleteTask(id: string) {
    await taskUseCases.deleteTask(id)
    dispatch(removeTask(id))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <form onSubmit={handleCreateTask} className="mb-4">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Enter a new task"
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Task
        </button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleTask(task.id)}
              className="mr-2"
            />
            <span className={task.completed ? "line-through" : ""}>{task.title}</span>
            <button onClick={() => handleDeleteTask(task.id)} className="ml-2 text-red-500">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

