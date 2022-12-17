import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column('text', {
    unique: true,
  })
  @ApiProperty()
  email: string;

  @Column('text', {
    select: false,
  })
  @ApiProperty()
  password: string;

  @Column('text')
  @ApiProperty()
  fullName: string;

  @Column('bool', {
    default: true,
  })
  @ApiProperty()
  isActive: boolean;

  @Column('text', {
    array: true,
    default: ['user'],
  })
  @ApiProperty()
  roles: string[];

  @OneToMany(() => Product, (product) => product.user)
  product: Product;

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
