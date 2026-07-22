"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { upsertProductSchema } from "./schema";
import { actionClient } from "@/app/_lib/safe-action";
import { returnValidationErrors } from "next-safe-action";

export const upsertProduct = actionClient
  .inputSchema(upsertProductSchema)
  .action(async ({ parsedInput: product }) => {
    const findNameProduct = await db.product.findFirst({
      where: {
        name: product?.name,
        NOT: { id: product?.id },
      },
    });

    if (findNameProduct) {
      returnValidationErrors(upsertProductSchema, {
        _errors: ["Product already exists."],
      });
    }

    await db.product.upsert({
      where: { id: product?.id ?? "" },
      update: product,
      create: product,
    });

    revalidatePath("/products");
  });
