"use client"

// React Hook Form
import {  useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod"
import { format } from "date-fns"

import { Button } from "~/components/ui/button"
import { Calendar } from "~/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"
import { Switch } from "~/components/ui/switch"

import { toast } from "sonner";
import { api } from "~/trpc/react";
import { useEffect } from "react";

const formSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  from: z.date(),
  to: z.date(),
  status: z.boolean(),
})
type FormValues = z.infer<typeof formSchema>



export default function UpdateTaskForm({ params }: { params: { id: string } }) {

    const taskUpdateMutation = api.useTasksRouter.updateTask.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: params.id,
      title: "",
      description: "",
      from: new Date(),
      to: new Date(),
      status: false,
    },
  })

 
  async function onSubmit(data: FormValues) {
    toast.loading("Updating task...")
    console.log(data);
    

    // Aqui se hacer muchas cosas validas if muchos ifs

    const res = await taskUpdateMutation.mutateAsync(data);

    if (res.code === 200) {
        toast.success(res.message)
    } else {
        toast.error(res.message)
    }    
  }

  useEffect(() => {
    if (form.formState.errors.title) {
      toast.error(form.formState.errors.title.message);
    }
    if (form.formState.errors.description) {
      toast.error(form.formState.errors.description.message);
    }
    if (form.formState.errors.from) {
      toast.error(form.formState.errors.from.message);
    }
    if (form.formState.errors.to) {
      toast.error(form.formState.errors.to.message);
    }
    if (form.formState.errors.status) {
      toast.error(form.formState.errors.status.message);
    }
  }, [form.formState.errors]);
  
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Update Task</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Task title" {...field} />
                </FormControl>
                <FormDescription>
                  Enter a brief title for your task.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Task description"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide a detailed description of the task.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="from"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>From</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={
                          "w-[240px] pl-3 text-left font-normal"
                        }
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  The start date of the task.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="to"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>To</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={
                          "w-[240px] pl-3 text-left font-normal"
                        }
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  The end date of the task.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Task Status
                  </FormLabel>
                  <FormDescription>
                    Mark the task as completed if it&#39;s done.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
        
          >
            Update Task
          </Button>
        </form>
      </Form>
    </div>
  )
}