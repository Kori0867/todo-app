'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "~/components/ui/button"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "~/components/ui/form"
import { Badge } from "~/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { api } from "~/trpc/react"
import Loading from "~/app/loading"


// Definir el esquema del formulario con Zod
const formSchema = z.object({
  id: z.string().uuid(),
})

type FormValues = z.infer<typeof formSchema>

export default function TaskList() {
  const taskQuery = api.useTasksRouter.getAllTasks.useQuery();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
    },
  })

  const { data: tasks, isLoading } = taskQuery

  
  if (isLoading) {
    return <Loading/>
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Lista de Tareas</h1>

      <Form {...form}>
        <form className="space-y-8">
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID de la Tarea</FormLabel>
                <FormControl>
                  <input placeholder="Ingrese el ID de la tarea" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Desde</TableHead>
            <TableHead>Hasta</TableHead>
            <TableHead>Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks?.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>{formatDate(new Date(task.from))}</TableCell>
              <TableCell>{formatDate(new Date(task.to))}</TableCell>
              <TableCell>
                <Badge variant={task.status ? "default" : "destructive"}>
                  {task.status ? "Completada" : "Pendiente"}
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
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(date)
}
