"use server";

import { deleteTodoSchema, editTodoSchema, upsertTodoSchema } from "./schema";
import { prisma } from "./../../../services/database/index";
import { auth } from "@/services/auth";
import { z } from "zod";
import { log } from "console";

export async function getUserTodos() {
  const session = await auth();
  const todos = await prisma.todo.findMany({
    where: {
      userId: session?.user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return todos;
}

export async function upsertTodo(input: z.infer<typeof upsertTodoSchema>) {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      error: "Not  authorized",
      data: null,
    };
  }

  if (input.id) {
    const todo = await prisma.todo.findUnique({
      where: {
        id: input.id,
        userId: session?.user?.id,
      },
      select: {
        id: true,
      },
    });

    if (!todo)
      return {
        error: "Not  authorized",
        data: null,
      };

    const updatedTodo = await prisma.todo.update({
      where: {
        id: input.id,
        userId: session?.user?.id,
      },
      data: {
        title: input.title,
        doneAt: input.doneAt,
      },
    });

    return {
      error: null,
      data: updatedTodo,
    };
  }

  if (!input.title) {
    return {
      error: "Title is required",
      data: null,
    };
  }
  const todo = await prisma.todo.create({
    data: {
      title: input.title,
      userId: session?.user?.id,
      doneAt: null, // Set the default status to "waiting"
    },
  });
  return todo;
}

export async function deleteTodo(input: z.infer<typeof deleteTodoSchema>) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "Not authorized",
      data: null,
    };
  }

  const todo = await prisma.todo.findUnique({
    where: {
      id: input.id,
      userId: session?.user?.id,
    },
    select: {
      id: true,
    },
  });

  if (!todo) {
    return {
      error: "Not found",
      data: null,
    };
  }

  await prisma.todo.delete({
    where: {
      id: input.id,
      userId: session?.user?.id,
    },
  });

  return {
    error: null,
    data: "Todo deleted successfully",
  };
}

export async function updateTodo(input: z.infer<typeof editTodoSchema>) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "Not authorized",
      data: null,
    };
  }

  const todo = await prisma.todo.findUnique({
    where: {
      id: input.id,
      title: input.title || "",
      userId: session?.user?.id,
    },
    select: {
      id: true,
    },
  });

  if (!todo) {
    return {
      error: "Not found",
      data: null,
    };
  }

  const updatedTodo = await prisma.todo.update({
    where: {
      id: input.id,
      userId: session?.user?.id,
    },
    data: {
      title: input.title || "",
    },
  });
  console.log(updateTodo);

  return {
    error: null,
    data: updatedTodo,
  };
  console.log(updateTodo);
  console.log(todo);
}
