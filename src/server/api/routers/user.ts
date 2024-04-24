import { SignUpSchema, TSignUpSchema } from "@/schemas";
import { publicProcedure, router } from "@/server/api/trpc";
import { db } from "@/server/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export const userRouter = router({
  create: publicProcedure.input(SignUpSchema).mutation(async (opts) => {
    try {
      const { input } = opts;
      const { name, email, password } = input;
      // Check if email already exists
      const existingUserByEmail = await db.user.findUnique({
        where: { email: email },
      });

      if (existingUserByEmail)
        return NextResponse.json(
          { user: null, message: "Este email ja está sendo usado." },
          { status: 409 },
        );

      const hashedPassword = await hash(password, 10);

      const newUser = await db.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          n,
        },
      });

      const { password: newPassword, ...rest } = newUser;

      return NextResponse.json(
        { user: rest, message: "Usuario criado com sucesso." },
        { status: 201 },
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Algo errado não está certo", error },
        { status: 500 },
      );
    }
  }),
});
