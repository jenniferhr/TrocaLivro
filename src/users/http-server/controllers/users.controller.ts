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
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from 'src/infrastructure/persistence/typeorm/entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly userBooksService: UserBooksService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Add a new user to the system.',
  })
  @ApiBody({
    description: 'Details of the user to be created',
    type: CreateUserDto,
  })
  @ApiCreatedResponse({ description: 'User created successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  @ApiConflictResponse({ description: 'User with this email already exists.' })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    const createUserCommand = new CreateUserCommand(
      createUserDto.fullName,
      createUserDto.email,
      createUserDto.phoneNumber,
      createUserDto.address,
    );

    return await this.usersService.create(createUserCommand);
  }

  @Get()
  @ApiOperation({
    summary: 'Retrieve all users',
    description: 'Get a list of all users.',
  })
  @ApiOkResponse({ description: 'Users retrieved successfully.' })
  async findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a user by ID',
    description: 'Retrieve a user by their ID.',
  })
  @ApiParam({ name: 'id', description: 'The ID of the user' })
  @ApiOkResponse({ description: 'User retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update user by ID',
    description: 'Update the information of a specific user.',
  })
  @ApiParam({ name: 'id', description: 'The ID of the user' })
  @ApiOkResponse({ description: 'User updated successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a user by ID',
    description: 'Remove a user from the system by their ID.',
  })
  @ApiParam({ name: 'id', description: 'The ID of the user' })
  @ApiOkResponse({ description: 'User deleted successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  async remove(@Param('id') id: string): Promise<{ message }> {
    return this.usersService.remove(+id);
  }

  // UserBooks
  @Post(':userId/books')
  @ApiOperation({
    summary: 'Add a book to a user',
    description: "Add a book to the user's collection.",
  })
  @ApiParam({ name: 'userId', description: 'The ID of the user' })
  @ApiBody({
    description: 'Details of the book to be added',
    type: CreateUserBookDto,
  })
  @ApiCreatedResponse({ description: 'Book added to the user successfully.' })
  @ApiConflictResponse({ description: 'User already owns this book.' })
  @ApiNotFoundResponse({ description: 'Book or user not found.' })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
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
  @ApiOperation({
    summary: 'Get all books owned by a user',
    description: 'Retrieve a list of books owned by a specific user.',
  })
  @ApiParam({ name: 'userId', description: 'The ID of the user' })
  @ApiOkResponse({ description: 'Books retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  async findAllUserBooks(@Param('userId') userId: string) {
    return this.userBooksService.findAllByUserId(+userId);
  }

  @Get(':userId/books')
  @ApiOperation({
    summary: 'Get a specific book owned by a user',
    description: 'Retrieve details of a specific book owned by the user.',
  })
  @ApiParam({ name: 'userId', description: 'The ID of the user' })
  @ApiParam({ name: 'bookId', description: 'The ID of the book' })
  @ApiOkResponse({ description: 'Book details retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'Book or user not found.' })
  async findOneUserBook(
    @Param('userId') userId: string,
    @Query('bookId') bookId: string,
  ) {
    return this.userBooksService.findOnebyUserandBookId(+userId, +bookId);
  }

  @Get('books/:userBookId')
  @ApiOperation({
    summary: "Get details of a user's book by its ID",
    description:
      'Retrieve details of a specific book owned by a user using its unique ID.',
  })
  @ApiParam({ name: 'userBookId', description: "The ID of the user's book" })
  @ApiOkResponse({ description: 'Book details retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'Book not found.' })
  async findByUserBookId(
    @Param('userBookId', new ParseUUIDPipe()) userBookId: string,
  ) {
    return this.userBooksService.findOnebyUserBookId(userBookId);
  }

  @Patch('books/:userBookId')
  @ApiOperation({
    summary: "Update a user's book details",
    description: 'Update the details of a specific book owned by the user.',
  })
  @ApiParam({ name: 'userBookId', description: "The ID of the user's book" })
  @ApiOkResponse({ description: "User's book updated successfully." })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  @ApiNotFoundResponse({ description: 'Book not found.' })
  async updateUserBook(
    @Param('userBookId', new ParseUUIDPipe()) userBookId: string,
    @Body() updateUserBookDto: UpdateUserBookDto,
  ) {
    return this.userBooksService.updateUserBook(userBookId, updateUserBookDto);
  }

  @Delete('books/:userBookId')
  @ApiOperation({
    summary: "Remove a book from a user's collection",
    description: "Remove a book from a user's possession.",
  })
  @ApiParam({ name: 'userBookId', description: "The ID of the user's book" })
  @ApiOkResponse({
    description: "Book removed from the user's collection successfully.",
  })
  @ApiNotFoundResponse({ description: 'Book not found.' })
  async removeUserBook(
    @Param('userBookId', new ParseUUIDPipe()) userBookId: string,
  ) {
    return this.userBooksService.removeUserBook(userBookId);
  }
}
