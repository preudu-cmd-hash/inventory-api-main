import { AppDataSource } from "../data-source";
import { Products } from "../entities/Products";

export class ProductServices {
  private productRepo = AppDataSource.getRepository(Products);

  listAll = async () => {
    return await this.productRepo.find();
  };

  create = async (productData: Partial<Products>) => {
    return await this.productRepo.save(productData);
  };

  update = async (id: number, productData: Partial<Products>) => {
    const product = await this.productRepo.findOneBy({ id: id });

    this.productRepo.merge(product, productData);

    return await this.productRepo.save(product);
  };

  delete = async (id: number) => {
    return this.productRepo.delete(id);
  };
}
