import bcrypt from "bcryptjs";

export const hashBcryptService = {
  hash(plainText: string): Promise<string> {
    return bcrypt.hash(plainText, 10);
  },
};

// export const hashArgonService = {
//   hash(plainText: string): Promise<string> {
//     return argon2.hash(plainText, 10);
//   },
// };
