import { ProductImage } from './product-image.entity';
import { User } from '../../auth/entities/user.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    example: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
    description: 'Product ID',
    uniqueItems: true,
  })
  id: string;

  @Column('text', {
    unique: true,
  })
  @ApiProperty({
    example: `Men's 3D Wordmark Long Sleeve Tee`,
    description: 'Product Title',
  })
  title: string;

  @Column('numeric')
  @ApiProperty({
    example: 40,
    description: 'Product Price',
  })
  price: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  @ApiProperty({
    example: `Designed for fit, comfort and style, the Men's 3D Wordmark Long Sleeve Tee is made from 100% cotton and features an understated wordmark logo on the left chest.`,
    description: 'Product Description',
  })
  description: string;

  @Column('text', {
    unique: true,
  })
  @ApiProperty({
    example: 'men_3d_wordmark_long_sleeve_tee',
    description: 'Product Slug',
  })
  slug: string;

  @Column('int', {
    default: 0,
  })
  @ApiProperty({
    example: 15,
    description: 'Product Stock',
  })
  stock: number;

  @Column('text', {
    array: true,
  })
  @ApiProperty({
    example: `[
      "XL",
      "XXL"
  ]`,
    description: 'Product Sizes',
  })
  sizes: string[];

  @Column('text')
  @ApiProperty({
    example: 'men',
    description: 'Product Gender',
  })
  gender: string;

  @Column('text', {
    array: true,
    default: [],
  })
  @ApiProperty({
    example: `["shirt"]`,
    description: 'Product Tags',
  })
  tags: string[];

  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true, // ⬅️ this is to get all the relations when you make a get
  })
  @ApiProperty({
    example: `["8764813-00-A_0_2000.jpg", "8764813-00-A_1.jpg"]`,
    description: 'Product Images',
  })
  images?: ProductImage[];

  @ManyToOne(() => User, (user) => user.product, {
    cascade: true,
    eager: true, // ⬅️ this is to get all the relations when you make a get
  })
  user: User;

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }
    this.slug.toLowerCase().replaceAll(' ', '_').replaceAll("'", '');
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
}
