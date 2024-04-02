import { db } from "@/server/db";
import { NextResponse } from "next/server";
import { hash } from 'bcrypt';
import { SignUpSchema } from "@/schemas";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, dateOfBirth, plan } = SignUpSchema.parse(body)

    // Check if email already exists
    const existingUserByEmail = await db.user.findUnique({
      where: {email: email}
    })

    if (existingUserByEmail) return NextResponse.json({user: null, message: 'Este email ja está sendo usado.'}, {status: 409})


    const hashedPassword = await hash(password, 10)

    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        dateOfBirth,
        plan
      }
    })

    const { password: newPassword, ...rest } = newUser;

    return NextResponse.json({ user: rest, message: 'Usuario criado com sucesso.'}, { status: 201})

  } catch (error) {
    return NextResponse.json({message: 'Algo errado não está certo', error}, { status: 500 })
  }
}