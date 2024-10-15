import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UsersService } from '../../application/services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserCommand } from '../../application/commands/create-user.command';
import { UserBooksService } from 'src/users/application/services/user-books.service';
import { UpdateUserBookDto } from '../dto/update-user-book.dto';
import { CreateUserBookDto } from '../dto/create-user-book.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly userBooksService: UserBooksService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const createUserCommand = new CreateUserCommand(
      createUserDto.fullName,
      createUserDto.email,
      createUserDto.phoneNumber,
      createUserDto.address,
    );

    return await this.usersService.create(createUserCommand);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  // UserBooks;
  @Post(':userId/books')
  async createUserBook(
    @Param('userId') userId: string,
    @Body() createUserBookDto: CreateUserBookDto,
  ) {
    return await this.userBooksService.createUserBook(
      +userId,
      createUserBookDto,
    );
  }

  @Get(':userId/books')
  async findAllUserBooks(@Param('userId') userId: string) {
    return this.userBooksService.findAllByUserId(+userId);
  }

  @Get(':userId/books')
  async findOneUserBook(
    @Param('userId') userId: string,
    @Query('bookId') bookId: string,
  ) {
    return this.userBooksService.findOnebyUserandBookId(+userId, +bookId);
  }

  @Get('books/:userBookId')
  async findByUserBookId(
    @Param('userBookId', new ParseUUIDPipe()) userBookId: string,
  ) {
    return this.userBooksService.findOnebyUserBookId(userBookId);
  }

  @Patch('books/:userBookId')
  async updateUserBook(
    @Param('userBookId', new ParseUUIDPipe()) userBookId: string,
    @Body() updateUserBookDto: UpdateUserBookDto,
  ) {
    return this.userBooksService.updateUserBook(userBookId, updateUserBookDto);
  }

  @Delete('books/:userBookId')
  async removeUserBook(
    @Param('userBookId', new ParseUUIDPipe()) userBookId: string,
  ) {
    return this.userBooksService.removeUserBook(userBookId);
  }
}
