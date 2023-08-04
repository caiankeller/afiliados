import { Request, Response } from "express";
import { MD5 } from "crypto-js";
import { prisma } from "../database/prisma";
import ITransaction from "../models/transaction.model";

const transactionController = {
  create: async (request: Request, response: Response) => {
    if (!request.file) {
      return response
        .status(400)
        .json({ message: "No file uploaded.", ok: false });
    }

    if (
      request.file.originalname.slice(
        request.file.originalname.lastIndexOf(".")
      ) !== `.${import.meta.env.VITE_INPUT_FILE_TYPE}`
    ) {
      return response.status(400).json({
        message: `Please, make sure to be uploading a ${
          import.meta.env.VITE_INPUT_FILE_TYPE
        } file type.`,
        ok: false,
      });
    }

    const fileContent = request.file.buffer.toString();
    const rows = fileContent.split("\n");

    const nonEmptyRows = rows.filter((row) => row.trim().length > 0);
    let formattedRows: Omit<ITransaction, "typeReference" | "id">[] = [];

    try {
      formattedRows = nonEmptyRows.map((row) => {
        // i ain't proud of it
        const type = row.slice(0, 1).trim();
        const date = row.slice(1, 26).trim();
        const name = row.slice(26, 56).trim();
        const priceTag = parseInt(row.slice(56, 66));
        const seller = row.slice(66).trim();

        return { type, date, name, priceTag, seller };
      });
    } catch (error) {
      return response.json({
        message: "Please, verify errors within your file.",
        ok: false,
      });
    }

    let successfulInserts = 0;
    let duplicated = 0;

    try {
      for (const row of formattedRows) {
        const id = MD5(JSON.stringify(row)).toString(); // assign a hash for the row to the id, so i wont duplicated
        try {
          await prisma.transaction.create({
            data: { ...row, id },
          });
          successfulInserts++;
        } catch (error) {
          duplicated++;
        }
      }
    } catch (error) {
      console.log(error);
      return response
        .status(400)
        .json({ message: "Couldn't proceed with your inserts.", ok: false });
    }

    return response.status(200).json({ successfulInserts, duplicated });
  },
};

export default transactionController;
