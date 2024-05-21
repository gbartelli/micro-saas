import { auth } from "@/services/auth";
import AddCollaboratorForm from "./_components/add-collaborator-form";

export default async function Page() {
  const session = await auth();

  return <AddCollaboratorForm />;
}
