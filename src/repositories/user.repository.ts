import { prisma } from "@/db/prisma";

type User = {
  id: string;
  email: string;
  password: string;
};
export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  createUser(data: Omit<User, "id">): Promise<User>;
}

export class PrismaUserRepository implements UserRepository {
  findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  createUser(data: Omit<User, "id">): Promise<User> {
    return prisma.user.create({ data });
  }
}

const users: User[] = [];

export class MockUserRepository implements UserRepository {
  findByEmail(email: string): Promise<User | null> {
    const user = users.find((user) => user.email === email);
    return Promise.resolve(user || null);
  }

  createUser(data: Omit<User, "id">): Promise<User> {
    const user = { id: "1", ...data };
    users.push(user);
    return Promise.resolve(user);
  }
}

// export const userRepository = {
//   findByEmail(email: string): Promise<User | null> {
//     return prisma.user.findUnique({
//       where: { email },
//     });
//   },
//   createUser(RegisterDto: RegisterDto): Promise<User> {
//     return prisma.user.create({ data: RegisterDto });
//   },
// };

// export const mockUserRepository = {
//   findByEmail(
//     email: string
//   ): { id: string; email: string; password: string } | null {
//     return { id: "1", email, password: "hashed_password" };
//   },
//   createUser(RegisterDto: RegisterDto): {
//     id: string;
//     email: string;
//     password: string;
//   } {
//     return {
//       id: "1",
//       email: RegisterDto.email,
//       password: RegisterDto.password,
//     };
//   },
// };
