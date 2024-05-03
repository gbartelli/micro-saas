"use client";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

export function AuthForm() {
  const form = useForm();

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await signIn("nodemailer", { email: data.email, redirect: false });
      toast.success(
        "Magic Link Sent. Check your email for the magic link to log in."
      );
    } catch (error) {
      toast.error("An error ocurred. Please try again.");
    }
    console.log(handleSubmit);
    console.log(signIn);
  });
  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center items-center h-screen"
    >
      <Card className="w-full max-w-md mx-auto justify-center items-center ">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-3xl">Login</CardTitle>
          <CardDescription>
            Enter your email to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="m@example.com"
              required
              type="email"
              {...form.register("email")}
            />
          </div>
          <Button
            className="w-full"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Sending..." : "Send magic link"}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
