'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { Badge } from "~/components/ui/badge"

// This type represents the Task model you provided
type Task = {
  id: string
  title: string
  description: string
  from: Date
  to: Date
  status: boolean
}

// Sample data (replace this with your actual data fetching logic)
const tasks: Task[] = [
  {
    id: "1",
    title: "Complete project proposal",
    description: "Draft and finalize the project proposal for the client",
    from: new Date("2023-06-01"),
    to: new Date("2023-06-07"),
    status: false
  },
  {
    id: "2",
    title: "Team meeting",
    description: "Weekly team sync-up",
    from: new Date("2023-06-05T10:00:00"),
    to: new Date("2023-06-05T11:00:00"),
    status: true
  },
  // Add more sample tasks as needed
]

export function TaskList() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Task List</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>{formatDate(task.from)}</TableCell>
              <TableCell>{formatDate(task.to)}</TableCell>
              <TableCell>
                <Badge variant={task.status ? "success" : "destructive"}>
                  {task.status ? "Completed" : "Pending"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(date)
}