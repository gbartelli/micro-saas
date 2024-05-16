import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageTitle,
  DashboardPageMain,
} from "@/components/dashboard/page";
import { TodoDataTable, handleTodoClick } from "./_components/todo-data-table";
import { Button } from "@/components/ui/button";
import { TodoUpsertSheet } from "./_components/todo-upsert-sheet";
import { PlusIcon } from "lucide-react";
import { getUserTodos } from "./actions";
import React from "react";

export default async function Page() {
  const todos = await getUserTodos();

  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageTitle>Tarefas</DashboardPageTitle>
        <DashboardPageHeader>
          <TodoUpsertSheet>
            <Button variant={"outline"} size="sm">
              <PlusIcon className="w-4 h-4 mr-3" />
              Add Todo
            </Button>
          </TodoUpsertSheet>
        </DashboardPageHeader>
      </DashboardPageHeader>
      <DashboardPageMain>
        <TodoDataTable data={todos} onTodoClick={handleTodoClick} />
      </DashboardPageMain>
    </DashboardPage>
  );
}
