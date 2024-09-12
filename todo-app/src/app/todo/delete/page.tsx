'use client'
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "~/components/ui/alert-dialog"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"


type Task = {
  id: string
  title: string
  description: string
  from: Date
  to: Date
  status: boolean
}

// Sample data (replace this with your actual data fetching logic)
const initialTasks: Task[] = [
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

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)

  const handleDelete = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
    toast("delete task...");
  }

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
            <TableHead>Actions</TableHead>
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
                <Badge variant={task.status ? "default" : "destructive"}>
                  {task.status ? "Completed" : "Pending"}
                </Badge>
              </TableCell>
              <TableCell>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the task.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(task.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
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