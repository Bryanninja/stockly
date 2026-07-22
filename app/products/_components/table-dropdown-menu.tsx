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

import { AlertDialog } from "@/app/_components/ui/alert-dialog";

import {
  ClipboardCopyIcon,
  EditIcon,
  MoreHorizontalIcon,
  TrashIcon,
} from "lucide-react";
import DeleteProductsDialogContent from "./delete-dialog-content";
import { Dialog } from "@/app/_components/ui/dialog";
import UpsertProductDialogContent from "./upsert-dialog-content";
import { useState } from "react";
import { Product } from "@prisma/client";

interface ProductsTableDropdownMenuProps {
  product: Product;
}

const ProductsTableDropdownMenu = ({
  product,
}: ProductsTableDropdownMenuProps) => {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  return (
    <>
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <UpsertProductDialogContent
          defaultValues={{
            id: product.id,
            name: product.name,
            price: Number(product.price),
            stock: product.stock,
          }}

          onSuccessSubmit={() => setEditOpen(false)}
        />
      </Dialog>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DeleteProductsDialogContent productId={product.id} />
      </AlertDialog>

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
              <ClipboardCopyIcon className="mr-2 h-4 w-4" />
              Copiar ID
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setEditOpen(true)}>
              <EditIcon className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            className="w-full cursor-pointer"
            onClick={() => setDeleteOpen(true)}
          >
            <TrashIcon className="mr-2 h-4 w-4" />
            Deletar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProductsTableDropdownMenu;
