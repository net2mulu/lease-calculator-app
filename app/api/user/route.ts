import { NextResponse } from "next/server";
import db from "@/lib/db";
import { hash } from "bcrypt";
import * as z from "zod";

//define zod schema for request body
const userSchema = z.object({
  username: z.string().min(1, "Username is required").max(100),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { email, password, username } = userSchema.parse(body);

    // check for existing email
    const existingUserByEmail = await db.user.findUnique({ where: { email } });

    if (existingUserByEmail) {
      return NextResponse.json({
        user: null,
        message: "Email already exists",
        status: 409,
      });
    }

    // check for existing username
    const existingUserByUsername = await db.user.findUnique({
      where: { username },
    });

    if (existingUserByUsername) {
      return NextResponse.json({
        user: null,
        message: "Username already exists",
        status: 409,
      });
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    const { password: _, ...user } = newUser;

    return NextResponse.json(
      {
        user: user,
        message: "User created successfully",
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
