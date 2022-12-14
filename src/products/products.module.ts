import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImage, Product } from './entities/index';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService, TypeOrmModule],
  imports: [TypeOrmModule.forFeature([Product, ProductImage])],
})
export class ProductsModule {}
