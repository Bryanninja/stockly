"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";

import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import {
  CircleAlert,
  CircleIcon,
  ClipboardCopyIcon,
  EditIcon,
  MoreHorizontalIcon,
  TrashIcon,
} from "lucide-react";

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

  {
    accessorKey: "actions",
    header: "Ações",
    cell: (row) => {
      const product = row.row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" />}>
            <MoreHorizontalIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(product.id)}
              >
                <ClipboardCopyIcon />
                Copiar ID
              </DropdownMenuItem>

              <DropdownMenuItem>
                <EditIcon />
                Editar
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-400 hover:text-red-700">
              <TrashIcon />
              Deletar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
