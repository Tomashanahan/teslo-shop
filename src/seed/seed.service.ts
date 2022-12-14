import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { initialData } from './data/data-seed';

@Injectable()
export class SeedService {
  constructor(private readonly productsService: ProductsService) {}

  async runSeed() {
    await this.insertProducts();
    return `SEED EXCUTED`;
  }

  async insertProducts() {
    await this.productsService.deleteAllProducts();
    const products = initialData.products;

    const insertProductsPromise = products.map((prod) => {
      this.productsService.create(prod);
    });

    await Promise.all(insertProductsPromise);
  }
}
