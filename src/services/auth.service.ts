import { LoginDto, RegisterDto } from "@/dtos/auth.dto";
import { hashBcryptService } from "./hash.service";
import { EmailAlreadyExistsException } from "@/exceptions/base.exception";
import { UserRepository } from "@/repositories/user.repository";

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.userRepository.findByEmail(
      registerDto.email
    );

    if (existingUser) {
      throw new EmailAlreadyExistsException();
    }

    registerDto.password = await hashBcryptService.hash(registerDto.password);
    await this.userRepository.createUser(registerDto);
  }

  async login(loginDto: LoginDto) {
    // Implement login logic here
  }
}

// import { mockUserRepository as userRepository } from "@/repositories/user.repository";

// export const authService = {
//   async register(registerDto: RegisterDto) {
//     const existingUser = await userRepository.findByEmail(registerDto.email);

//     if (existingUser) {
//       throw new EmailAlreadyExistsException();
//     }

//     registerDto.password = await hashBcryptService.hash(registerDto.password);

//     await userRepository.createUser(registerDto);
//   },
//   async login() {},
// };
