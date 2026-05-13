import { validate } from "class-validator";
import { AppDataSource } from "../data-source";
import { Products } from "../entities/Products";
import { formatErrors } from "../helpers/formatErrors";
import { BadRequestError, NotFoundError } from "../helpers/apiError";

export class ProductServices {
  private productRepo = AppDataSource.getRepository(Products);

  validateSchema = async (data: Partial<Products>, partial = false) => {
    const temp = this.productRepo.create(data);
    const errors = await validate(temp, { skipMissingProperties: partial });
    if (errors.length > 0) {
      const formattedErrors = formatErrors(errors);
      throw new BadRequestError("falha de validação", formattedErrors);
    }
  };

  listAll = async () => {
    return await this.productRepo.find();
  };

  create = async (productData: Partial<Products>) => {
    return await this.productRepo.save(productData);
  };

  update = async (id: number, productData: Partial<Products>) => {
    const product = await this.productRepo.findOneBy({ id: id });
    if (!product) {
      throw new NotFoundError("Produto não encontrado");
    }

    this.productRepo.merge(product, productData);

    return await this.productRepo.save(product);
  };

  delete = async (id: number) => {
    const product = await this.productRepo.findOneBy({ id });
    if (!product) {
      throw new NotFoundError("Produto não encontrado");
    }
    return this.productRepo.delete(id);
  };
}
