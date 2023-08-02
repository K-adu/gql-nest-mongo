import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { passwordHash } from 'src/utils/cryptography';

@Injectable()
export class UsersService {
  constructor(private userRepo: UserRepository) {}

  async create(data) {
    const user = await this.userRepo.findByEmail(data.email);
    if (user) {
      throw new BadRequestException('User with the email already exist');
    }
    data.password = passwordHash.to(data.password);

    return await this.userRepo.create(data);
  }

  async findUserByEmail(email) {
    return await this.userRepo.findByEmail(email);
  }
  async findUserById(id) {
    return await this.userRepo.findById(id);
  }
  async update() {}

  async remove() {}
}
