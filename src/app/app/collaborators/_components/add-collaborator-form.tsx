"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";

export default function AddCollaboratorForm() {
  const FormSchema = z.object({
    email: z.string().min(1, "Email is required!").email("Invalid email!"),
    // username: z
    //   .string()
    //   .min(2, "Username is required!")
    //   .max(15, "Username must have than 15 characters!"),
  });

  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  const methods = useForm();
  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    console.log("submitou");

    const response = await fetch("/api/auth/[...nextauth]", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
      }),
    });

    if (response.ok) {
      router.push("/app");
    } else {
      toast({
        title: "Error",
        description: "Oops! Something went wrong!",
      });
    }
  };

  return (
    <Form {...methods}>
      <form className="space-y-8 p-6" onSubmit={form.handleSubmit(onSubmit)}>
        {/* <Card>
          <CardHeader>
            <CardTitle>User Name</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={methods.control}
              name="username" // Changed from 'name' to 'username' to match schema
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card> */}

        <Card>
          <CardHeader>
            <CardTitle>User Email</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={methods.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <SheetFooter className="mt-auto">
          <Button type="submit">Save</Button>
        </SheetFooter>
      </form>
    </Form>
  );
}
