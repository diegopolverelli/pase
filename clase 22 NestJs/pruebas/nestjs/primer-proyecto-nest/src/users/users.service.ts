import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  users: Array<User>;

  constructor() {
    this.users = [];
  }

  create(createUserDto: CreateUserDto) {
    let id = 1;
    if (this.users.length != 0) {
      const aux1 = this.users[this.users.length - 1].id;
      id = aux1 + 1;
    }

    this.users.push({
      id,
      first_name: createUserDto.first_name,
      last_name: '',
      avatar: '',
      email: createUserDto.email,
      password: createUserDto.password,
    });
    return `Se ha dado de alta al usuario ${createUserDto.first_name}, con id ${id}`;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
