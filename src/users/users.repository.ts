import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  //creating an new user in db
  async create(data) {
    return this.userModel.create(data);
  }

  //searching user by email
  async findByEmail(email) {
    return this.userModel.findOne({ email: email });
  }

  //finding user by id
  async findById(id: string) {
    return this.userModel.findById(id);
  }

  //update existing user
  async update() {}

  //remoce user
  async remove() {}
}
