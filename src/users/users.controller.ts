import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  public async getAllUsers() {
    try {
      return await this.usersService.getAllUsers();
    } catch (error) {
      throw error;
    }
  }

  @Public()
  @Post()
  public async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.createUser(createUserDto);
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  public async findOneUser(@Param('id') id: number) {
    try {
      return await this.usersService.findUserById(id);
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  public async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      return await this.usersService.updateUser(id, updateUserDto);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  public async deleteUser(@Param('id') id: number) {
    try {
      console.log(id);
      return await this.usersService.deleteUser(id);
    } catch (error) {
      throw error;
    }
  }
}
