/* eslint-disable import/no-anonymous-default-export */
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
import GoogleSignInButton from "./googleSiginButton";
import { Children } from "react";

const nodemailer = require("nodemailer");

const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const requestBody = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  const transporter = nodemailer.createTransport({
    port: 2525,
    host: "sandbox.smtp.mailtrap.io",
    auth: {
      user: "210d8d2c0e4767",
      pass: "ef747aa6ee75cb",
    },
    secure: true,
  });

  await new Promise((resolve, reject) => {
    transporter.verify(function (error: any, success: unknown) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Server is ready to take our messages");
        resolve(success);
      }
    });
  });

  const mailData = {
    from: {
      name: `${requestBody.firstName} ${requestBody.lastName}`,
      address: "myEmail@gmail.com",
    },
    replyTo: requestBody.email,
    to: "recipient@gmail.com",
    subject: `form message`,
    text: requestBody.message,
    html: `${requestBody.message}`,
  };

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailData, (err: any, info: unknown) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });

  console.log("Form submitted successfully");
};

export default handleFormSubmit;

export function AuthForm() {
  const form = useForm();

  return (
    <form
      onSubmit={handleFormSubmit}
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
              type="email"
              {...form.register("email")}
            />
          </div>
          <div>
            <Button
              className="w-full"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Sending..." : "Send magic link"}
            </Button>
          </div>
          <div>
            <GoogleSignInButton>Login With Google</GoogleSignInButton>
            <button
              type="button"
              onClick={() => {
                signIn("google");
              }}
            >
              Google
            </button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
