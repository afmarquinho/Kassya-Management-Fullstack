"use server";

import { UpdateUser, User } from "@/interfaces";
import { prisma } from "@/lib/db";
// import { Prisma } from "@prisma/client";

export const createUser = async (user: User) => {
  console.log("USUARIO RECIBIDO", user);
  try {
    const newUser = await prisma.user.create({
      data: {
        ...user,
      },
    });
    return { ok: true, data: newUser };
  } catch (error) {
    console.error(error);
    return { ok: false, data: null };
  }
};

export const updateUser = async (user: UpdateUser) => {
  try {
    const newUser = await prisma.user.update({
      where: {
        User_id: user.User_id,
      },
      data: user,
    });
    return { ok: true, data: newUser };
  } catch (error) {
    console.error(error);
    return { ok: false, data: null };
  }
};
