import { NextFunction, Request, Response } from 'express';
import { Product } from '../models/product.model'

export class ProductController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const results = await Product.findAll();
      res.status(200).json(results);
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  static async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Product.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Product.update(
        {
          ...req.body,
        },
        {
          where: {
            id: req.params.id,
          },
        },
      );
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Product.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}
