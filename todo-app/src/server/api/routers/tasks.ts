import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc"; // Ajusta la ruta según tu proyecto

// Definir el router de las tareas (TasksRouter)
export const useTasksRouter = createTRPCRouter({
  // Procedimiento para obtener una tarea por su `id`
  getAllTasks: publicProcedure.query(async ({ ctx }) => {
    const tasks = await ctx.db.tasks.findMany();
    return tasks.map(task => ({
      id: task.id,
      title: task.title,
      description: task.description,
      from: task.from.toISOString(),
      to: task.to.toISOString(),
      status: task.status,
    }));
  }),

  // Procedimiento para crear una nueva tarea
  createTask: publicProcedure
    .input(
      z.object({
        title: z.string().min(1, "Title is required"),
        description: z.string().min(1, "Description is required"),
        from: z.date(), // Validar fecha con `z.date()`
        to: z.date(), // Validar fecha con `z.date()`
        status: z.boolean(), // Validar el estado de la tarea
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Crear una nueva tarea con Prisma
      try {
        const newTask = await ctx.db.tasks.create({
          data: {
            title: input.title,
            description: input.description,
            from: input.from,
            to: input.to,
            status: input.status,
            
          },
        });
  
        return {
          error : null,
          code: 200,
          result: newTask,
          message: "Task created successfully"
        };
      } catch (error) {
        return {
          error : new Error("Error creating task"),
          code: 500,
          result: null,
          message: "Error creating task"
        };
      }
      
    }),

  // Procedimiento para actualizar una tarea existente
  updateTask: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(), // El `id` de la tarea a actualizar
        title: z.string().min(1).optional(),
        description: z.string().min(1).optional(),
        from: z.date().optional(),
        to: z.date().optional(),
        status: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Actualizar la tarea existente con Prisma
      try {
        const updatedTask = await ctx.db.tasks.update({
          where: { id: input.id },
          data: {
            title: input.title ?? undefined,
            description: input.description ?? undefined,
            from: input.from ?? undefined,
            to: input.to ?? undefined,
            status: input.status ?? undefined,
          },
        });
  
        return {
          error : null,
          code: 200,
          result: updatedTask,
          message: "Task updated successfully"
        };
      }
      catch (error) {
        return {
          error : new Error("Error updating task"),
          code: 500,
          result: null,
          message: "Error updating task"
        };
      }
    }),

  // Procedimiento para eliminar una tarea
  deleteTask: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(), // El `id` de la tarea a eliminar
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Eliminar la tarea con Prisma
      await ctx.db.tasks.delete({
        where: { id: input.id },
      });

      return { success: true };
    }),
});
