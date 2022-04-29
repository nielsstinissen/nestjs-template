import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  public async getAllUsers() {
    return await this.usersRepository.find();
  }

  public async createUser(createUserDto: CreateUserDto) {
    const userExists = await this.findUserByEmail(createUserDto.email);
    if (userExists)
      throw new BadRequestException('User with given email already exists');
    const user: User = await this.convertCreateUserDto(createUserDto);
    const response = await this.usersRepository.save(user);
    return response;
  }

  public async findUserByEmail(email: string) {
    const user: User = await this.usersRepository.findOne({ email: email });
    return user;
  }

  public async findUserById(id: number) {
    const user: User = await this.usersRepository.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  public async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user: User = await this.usersRepository.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    const updatedUser: User = await this.convertUpdateUserDto(
      user,
      updateUserDto,
    );
    return await this.usersRepository.save(updatedUser);
  }

  public async deleteUser(id: number) {
    const user: User = await this.usersRepository.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    const response = await this.usersRepository.softDelete(id);
    return response;
  }

  private async convertCreateUserDto(createUserDto: CreateUserDto) {
    const user: User = new User();
    user.email = createUserDto.email;
    if (createUserDto.password !== createUserDto.password_confirm)
      throw new BadRequestException(
        'Password confirm is not the same as password',
      );

    user.password = await bcrypt.hash(createUserDto.password, 12);
    return user;
  }

  private async convertUpdateUserDto(user: User, updateUserDto: UpdateUserDto) {
    user.email = updateUserDto.email || user.email;
    return user;
  }
}
