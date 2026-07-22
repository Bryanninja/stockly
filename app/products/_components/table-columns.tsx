"use client";

import { Badge } from "@/app/_components/ui/badge";

import { ColumnDef } from "@tanstack/react-table";
import { CircleAlert, CircleIcon } from "lucide-react";
import ProductsTableDropdownMenu from "./table-dropdown-menu";
import { ProductDto } from "@/app/_data-access/product/get-products";

const getStatusLabel = (status: string) => {
  return status === "IN_STOCK" ? "Em estoque" : "Fora de estoque";
};

export const productTableColumns: ColumnDef<ProductDto>[] = [
  {
    accessorKey: "name",
    header: "Produto",
  },
  {
    accessorKey: "price",
    header: "Valor unitário",
    cell: (row) => {
      const product = row.row.original;
      return Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(product.price));
    },
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
      const label = getStatusLabel(product.status);
      return (
        <Badge variant={label === "Em estoque" ? "default" : "destructive"}>
          {label === "Em estoque" ? (
            <CircleIcon className="fill-primary-foreground" />
          ) : (
            <CircleAlert />
          )}
          {label}
        </Badge>
      );
    },
  },

  {
    accessorKey: "actions",
    header: "Ações",
    cell: (row) => <ProductsTableDropdownMenu product={row.row.original} />,
  },
];
