import { RegisterDto } from "@/dtos/auth.dto";
import { userRepository } from "@/repositories/user.repository";
import { hashBcryptService } from "./hash.service";
import { EmailAlreadyExistsException } from "@/exceptions/base.exception";

// import { mockUserRepository as userRepository } from "@/repositories/user.repository";

export const authService = {
  async register(registerDto: RegisterDto) {
    const existingUser = await userRepository.findByEmail(registerDto.email);

    if (existingUser) {
      throw new EmailAlreadyExistsException();
    }

    registerDto.password = await hashBcryptService.hash(registerDto.password);

    await userRepository.createUser(registerDto);
  },
  async login() {},
};
