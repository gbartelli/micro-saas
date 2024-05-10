import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Todo } from "@prisma/client";

export function TodoModalOnClick({ todo }: { todo: Todo }) {
  return (
    <div className="h-screen bg-black/50">
      <Sheet>
        <SheetContent>teste</SheetContent>
      </Sheet>
    </div>
  );
}
