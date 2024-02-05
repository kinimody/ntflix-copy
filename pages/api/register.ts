import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";




export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method !== "POST") return response.status(405).end();

  try {
    const { email, name, password } = request.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });  
    if (existingUser)
      return response.status(422).json({ message: "Email already taken" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    return response.status(201).json({ message: "User created!", user });
  } catch (error: any) {
    console.error(error);
    return response.status(400).end();
  }
}
