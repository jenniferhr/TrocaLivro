import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BooksService } from '../../application/services/books.service';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { FindBookByTitleAndAuthorDto } from '../dto/find-book-by-title-and-author.dto';
import { BookEntity } from 'src/infrastructure/persistence/typeorm/entities/book.entity';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new book',
    description: 'Add a new book to the collection.',
  })
  @ApiBody({
    description: 'Details of the book to be created',
    type: CreateBookDto,
  })
  @ApiCreatedResponse({
    description: 'Book created successfully.',
    type: BookEntity,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  @ApiConflictResponse({ description: 'The book already exists.' })
  async create(@Body() createBookDto: CreateBookDto) {
    return await this.booksService.create(createBookDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all books',
    description: 'Retrieve a list of all books in the collection.',
  })
  @ApiOkResponse({
    description: 'List of books retrieved successfully.',
    type: Array<BookEntity>,
  })
  async findAll() {
    return await this.booksService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a book by ID',
    description: 'Retrieve a book by its unique identifier.',
  })
  @ApiOkResponse({
    description: 'Book retrieved successfully.',
    type: BookEntity,
  })
  @ApiNotFoundResponse({ description: 'Book not found.' })
  async findOne(@Param('id') id: string) {
    return await this.booksService.findById(+id);
  }

  @Post('search')
  @ApiOperation({
    summary: 'Find a book by title and author',
    description: 'Search for a book using its title and author name.',
  })
  @ApiBody({
    description: 'Details for searching the book',
    type: FindBookByTitleAndAuthorDto,
  })
  @ApiOkResponse({
    description: 'Book found successfully.',
    type: BookEntity,
  })
  @ApiNotFoundResponse({ description: 'No book found matching the criteria.' })
  async findByTitleAndAuthor(@Body() findBookDto: FindBookByTitleAndAuthorDto) {
    return await this.booksService.findByTitleAndAuthor(
      findBookDto.title,
      findBookDto.author,
    );
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a book by ID',
    description: 'Modify the details of an existing book.',
  })
  @ApiOkResponse({
    description: 'Book updated successfully.',
    type: BookEntity,
  })
  @ApiNotFoundResponse({ description: 'Book not found.' })
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return await this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a book by ID',
    description: 'Remove a book from the collection using its ID.',
  })
  @ApiOkResponse({ description: 'Book deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Book not found.' })
  async remove(@Param('id') id: string) {
    return await this.booksService.remove(+id);
  }
}
