"use client";

import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
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
import DeleteProductsDialogContent from "./delete-dialog-content";

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
        <AlertDialog>
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
              <AlertDialogTrigger
                nativeButton={false}
                render={
                  <DropdownMenuItem variant="destructive" className="w-full cursor-pointer">
                    <TrashIcon className="mr-2 h-4 w-4" />
                    Deletar
                  </DropdownMenuItem>
                }
              />
            </DropdownMenuContent>
          </DropdownMenu>
          <DeleteProductsDialogContent productId={product.id} />
        </AlertDialog>
      );
    },
  },
];
