import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Todo } from "@prisma/client";

export function TodoModalOnClick({ todo }: { todo: Todo }) {
  return (
    <Sheet>
      <SheetContent>teste</SheetContent>
    </Sheet>
  );
}
