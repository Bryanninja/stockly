import z from "zod";

export class ProductsIsOutOfStockError extends Error {
  constructor() {
    super("Product out of stock");
  }
}

export const createSaleSchema = z.object({
  products: z.array(
    z.object({
      id: z.uuid(),
      quantity: z.number().int().positive(),
    }),
  ),
});

export type CreateSaleSchema = z.infer<typeof createSaleSchema>;
