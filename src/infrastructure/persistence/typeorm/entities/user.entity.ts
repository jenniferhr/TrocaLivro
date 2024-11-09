import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @ApiProperty({
    description: 'Unique identifier for the user',
    example: 1,
  })
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
  })
  @Column({
    name: 'full_name',
    nullable: false,
  })
  fullName: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'johndoe@example.com',
  })
  @Column({
    name: 'email',
    nullable: false,
  })
  email: string;

  @ApiProperty({
    description: 'Phone number of the user',
    example: '+1234567890',
  })
  @Column({
    name: 'phone_number',
    nullable: false,
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'Address of the user',
    example: '123 Main St, Anytown, USA',
  })
  @Column({
    name: 'address',
    nullable: false,
  })
  address: string;

  @ApiProperty({
    description: 'Password of the user',
  })
  @Column({
    name: 'password',
    nullable: false,
    select: false,
  })
  password: string;
}
