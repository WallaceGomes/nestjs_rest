import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async indexUsers() {
    return this.userRepository.find();
  }

  public async createUser(data: CreateUserDto) {
    const createdUser = this.userRepository.create({
      ...data,
      createdAt: new Date(),
    });

    return this.userRepository.save(createdUser);
  }

  public async updateUser(data: UpdateUserDto) {
    const updatedUser = await this.userRepository.update(
      { id: data.id },
      { ...data },
    );

    return updatedUser;
  }

  public async deleteUser(id: number) {
    const userToDelte = await this.userRepository.findOne({
      where: { id },
    });

    if (!userToDelte) {
      throw new Error('User not found');
    }

    await this.userRepository.remove(userToDelte);
  }
}
