"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FormProvider, useForm } from "react-hook-form";
import { updateTodo } from "../actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { editTodoSchema } from "../schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useRef } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { handleUpdateTodo } from "./todo-data-table";
import { Todo } from "../types";

const data: Todo[] = [];

type TodoModalOnClick = {
  children?: React.ReactNode;
  defaultValue?: Todo;
};

export function TodoModal({ children }: TodoModalOnClick) {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(editTodoSchema),
  });
  const onSubmit = form.handleSubmit(async (data) => {
    await updateTodo(data);
    console.log(data);

    router.refresh();

    ref.current?.click();
    toast.success("The todo item has been updated.");

    console.log(onSubmit);
  });
  return (
    <Dialog>
      <FormProvider {...form}>
        <form onSubmit={onSubmit}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Todo</DialogTitle>
              <DialogDescription>
                Make changes to your Todo here. Click save when youre done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex grid-cols-4 items-center gap-4 text-left">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={"Enter the title for your todo"}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This will be the displayed title for the todo item.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => handleUpdateTodo}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </FormProvider>
    </Dialog>
  );
}
