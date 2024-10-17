import { UserBookEntity } from './../../../infrastructure/persistence/typeorm/entities/user-book.entity';

export const mapUserBookToResponse = (userBook: UserBookEntity) => {
  return {
    id: userBook.id,
    user: {
      id: userBook.user.id,
      fullName: userBook.user.fullName,
      email: userBook.user.email,
      phoneNumber: userBook.user.phoneNumber,
      address: userBook.user.address,
    },
    book: {
      id: userBook.book.id,
      title: userBook.book.title,
      author: userBook.book.author,
    },
    condition: userBook.condition,
    available: userBook.available,
    comment: userBook.comment,
    createdAt: userBook.createdAt,
    updatedAt: userBook.updatedAt,
  };
};
