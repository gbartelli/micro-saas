import { prisma } from "@/lib/db"; // Assuming the correct path to the db module
import { NextResponse } from "next/server";
import * as z from "zod";

// input validation için schema tanımlama
const userSchema = z.object({
  email: z.string().min(1, "Email is required!").email("Invalid email!"),
  //   username: z
  //     .string()
  //     .min(2, "Username is required!")
  //     .max(15, "Username must have than 15 characters!"),
  //   password: z
  //     .string()
  //     .min(1, "Password is required!")
  //     .min(8, "Password must have than 8 characters!"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = userSchema.parse(body);

    // e-postanın zaten var olup olmadığını kontrol et
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "User with this email already exists!" },
        { status: 409 }
      );
    }

    // Check if the username already exists
    // const existingUserByUsername = await prisma.user.findUnique({
    //   where: { user.name: user.name },
    // });

    // if (existingUserByUsername) {
    //   return NextResponse.json(
    //     { user: null, message: "User with this username already exists!" },
    //     { status: 409 }
    //   );
    // }

    const newUser = await prisma.user.create({
      data: {
        email,
      },
    });

    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      {
        user: rest,
        message: "User created successfully!",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong!",
      },
      { status: 500 }
    );
  }
}
