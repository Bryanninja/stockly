"use server";

import { db } from "@/app/_lib/prisma";
import { createProductSchema } from "./schema";
import { revalidateTag } from "next/cache";

export const createProduct = async (data: createProductSchema) => {
  createProductSchema.parse(data);
  await db.product.create({
    data,
  });

  // @ts-ignore: Ignorando a exigência de profile do Next.js 16 para testar a tag
  revalidateTag("get-products");
};
