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
import { Label } from "@/components/ui/label";
import { FormProvider, useForm } from "react-hook-form";
import { Todo } from "../types";
import { upsertTodo } from "../actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { editTodoSchema, upsertTodoSchema } from "../schema";
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

const data: Todo[] = [];

type TodoModalOnClick = {
  children?: React.ReactNode;
  defaultValue?: Todo;
};

export function TodoModalOnClick({ todo }: { todo: Todo }) {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(editTodoSchema),
  });
  const onSubmit = form.handleSubmit(async (data) => {
    await upsertTodo(data);
    router.refresh();

    ref.current?.click();
    toast.success("The todo item has been updated.");
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
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
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </FormProvider>
    </Dialog>
  );
}
