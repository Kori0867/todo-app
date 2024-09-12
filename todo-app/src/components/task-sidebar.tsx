'use client'

import { useState } from 'react'
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Checkbox } from "~/components/ui/checkbox"
import { PlusIcon, XIcon } from 'lucide-react'

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export function TaskSidebar() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Create project proposal', completed: false },
    { id: 2, text: 'Design user interface', completed: true },
    { id: 3, text: 'Implement authentication', completed: false },
  ]);
  const [newTask, setNewTask] = useState('');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask.trim(), completed: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <aside className="w-64 bg-gray-100 h-screen p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Tasks</h2>
      <form onSubmit={addTask} className="mb-4">
        <div className="flex space-x-2">
          <Input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
            className="flex-grow"
          />
          <Button type="submit" size="icon">
            <PlusIcon className="h-4 w-4" />
            <span className="sr-only">Add task</span>
          </Button>
        </div>
      </form>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center space-x-2 bg-white p-2 rounded-md shadow-sm">
            <Checkbox
              id={`task-${task.id}`}
              checked={task.completed}
              onCheckedChange={() => toggleTask(task.id)}
            />
            <label
              htmlFor={`task-${task.id}`}
              className={`flex-grow ${task.completed ? 'line-through text-gray-500' : ''}`}
            >
              {task.text}
            </label>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteTask(task.id)}
              className="text-gray-500 hover:text-red-500"
            >
              <XIcon className="h-4 w-4" />
              <span className="sr-only">Delete task</span>
            </Button>
          </li>
        ))}
      </ul>
    </aside>
  );
}