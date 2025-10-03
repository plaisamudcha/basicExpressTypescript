import { prisma } from "@/db/prisma";
import { RegisterDto } from "@/dtos/auth.dto";
import { User } from "@/generated/prisma";
import { id } from "zod/v4/locales";

export const userRepository = {
  findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  },
  createUser(RegisterDto: RegisterDto): Promise<User> {
    return prisma.user.create({ data: RegisterDto });
  },
};

export const mockUserRepository = {
  findByEmail(
    email: string
  ): { id: string; email: string; password: string } | null {
    return { id: "1", email, password: "hashed_password" };
  },
  createUser(RegisterDto: RegisterDto): {
    id: string;
    email: string;
    password: string;
  } {
    return {
      id: "1",
      email: RegisterDto.email,
      password: RegisterDto.password,
    };
  },
};
