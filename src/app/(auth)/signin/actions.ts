"use server";
import { db } from "@/server/db";

export const checkExistingUser = async (email: string) => {
  const existingUser = await db.user.findUnique({
    where: { email },
    select: { email: true, name: true },
  });

  return existingUser;
};
