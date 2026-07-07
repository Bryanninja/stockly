"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { CircleAlert, CircleIcon } from "lucide-react";

const getStatusLabel = (status: string) => {
  return status === "IN STOCK" ? "Em estoque" : "Fora de estoque";
};

export const productTableColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Produto",
  },
  {
    accessorKey: "price",
    header: "Valor unitário",
  },
  {
    accessorKey: "stock",
    header: "Estoque",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row) => {
      const product = row.row.original;
      const status = product.stock > 0 ? "IN STOCK" : "OUT OF STOCK";
      const label = getStatusLabel(status);
      return (
        <Badge variant={status === "IN STOCK" ? "default" : "destructive"}>
          {status === "IN STOCK" ? (
            <CircleIcon className="fill-primary-foreground" />
          ) : (
            <CircleAlert />
          )}
          {label}
        </Badge>
      );
    },
  },
];
