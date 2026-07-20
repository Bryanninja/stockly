"use client";

import { buttonVariants } from "@/app/_components/ui/button";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { PlusIcon } from "lucide-react";
import UpsertSheetsContent from "./upsert-sheets-content";
import { Product } from "@prisma/client";
import { useState } from "react";

interface CreateSaleButtonProps {
  products: Product[];
}

const CreateSaleButton = ({ products }: CreateSaleButtonProps) => {
  const [sheetsIsOpen, setSheetsIsOpen] = useState(false);
  return (
    <Sheet open={sheetsIsOpen} onOpenChange={setSheetsIsOpen}>
      <SheetTrigger className={buttonVariants()}>
        <PlusIcon /> Nova Venda
      </SheetTrigger>
      <UpsertSheetsContent
        onSubmitSuccess={() => setSheetsIsOpen(false)}
        productOptions={products}
      />
    </Sheet>
  );
};

export default CreateSaleButton;
