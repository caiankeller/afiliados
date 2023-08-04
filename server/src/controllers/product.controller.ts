import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import ITransaction from "../models/transaction.model";
import IProduct from "../models/product.model";

const productController = {
  read: async (request: Request, response: Response) => {
    const name = request.params.name.trim();

    if (name === "") {
      return response
        .status(404)
        .json({ message: "Product not found", ok: false });
    }

    try {
      const transactions: ITransaction[] = await prisma.transaction.findMany({
        where: {
          name: {
            contains: name,
          },
        },
        include: {
          typeReference: {
            select: {
              type: true,
              description: true,
            },
          },
        },
      });

      if (transactions.length === 0) {
        return response
          .status(404)
          .json({ message: "Couldn't find any product", ok: false });
      }

      const product: IProduct = { name: "", sellers: [] };

      transactions.forEach((transaction) => {
        const sellerItem = product.sellers.find(
          (seller) => seller.name === transaction.seller
        );

        if (!sellerItem) {
          product.sellers.push({
            name: transaction.seller,
            total: 0,
            transactions: [],
          });
        }

        const productSeller = product.sellers.find(
          (seller) => seller.name === transaction.seller
        );

        if (!productSeller) return;
        if (
          transaction.type === "1" ||
          transaction.type === "2" ||
          transaction.type === "4"
        ) {
          productSeller.total += transaction.priceTag;
        } else if (transaction.type === "3") {
          productSeller.total -= transaction.priceTag;
        }

        productSeller.transactions.push({
          type: transaction.type,
          date: transaction.date,
          priceTag: transaction.priceTag,
          typeReference: transaction.typeReference,
        });
      });

      return response.json(product);
    } catch (error) {
      return response.json({ message: "Failed to fetch product", ok: false });
    }
  },
  readAll: async (_request: Request, response: Response) => {
    try {
      const transactions = await prisma.transaction.findMany();

      const products: string[] = [];

      transactions.forEach((transaction) => {
        if (!products.includes(transaction.name)) {
          products.push(transaction.name);
        }
      });

      return response.json(products);
    } catch (error) {
      return response.status(400).json({
        message: "Failed to load products, please try again later.",
        ok: false,
      });
    }
  },
};

export default productController;
