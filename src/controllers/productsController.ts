import { ProductServices } from "../services/productService";
import type { Request, Response, NextFunction } from "express";

export class ProductsController {
  private productService = new ProductServices();

  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await this.productService.listAll();
      return res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.productService.validateSchema(req.body);
      const newProduct = await this.productService.create(req.body);

      return res
        .status(201)
        .json({ message: "Produto criado com sucesso", product: newProduct });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.productService.validateSchema(req.body, true);

      const id: number = Number(req.params.id);
      const updatedProduct = await this.productService.update(id, req.body);
      return res.status(200).json({
        message: "produto atualizado com sucesso",
        product: updatedProduct,
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    const id: number = Number(req.params.id);
    try {
      await this.productService.delete(id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
