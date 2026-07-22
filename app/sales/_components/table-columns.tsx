"use client";

import { Button } from "@/app/_components/ui/button";
import { SaleDto } from "@/app/_data-access/sales/get-sales";
import { formatCurrency } from "@/app/_helper/currency";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";

export const saleTableColumns: ColumnDef<SaleDto>[] = [
  {
    accessorKey: "productNames",
    header: "Produtos",
  },
  {
    accessorKey: "totalProducts",
    header: "Quantidade de Produtos",
  },

  {
    accessorKey: "totalAmount",
    header: "Valor total",
    cell: ({
      row: {
        original: { totalAmount },
      },
    }) => formatCurrency(totalAmount),
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({
      row: {
        original: { date },
      },
    }) => new Date(date).toLocaleDateString("pt-BR"),
  },

  {
    header: "Ações",
    cell: () => (
      <Button variant="ghost">
        <MoreHorizontalIcon />
      </Button>
    ),
  },
];
