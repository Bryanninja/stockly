import { deleteSale } from "@/app/_actions/sale/delete-sale";
import { AlertDialog } from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { Dialog } from "@/app/_components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/app/_components/ui/dropdown-menu";
import DeleteSaleDialogContent from "./delete-sale-dialog-content";
import UpsertProductDialogContent from "@/app/products/_components/upsert-dialog-content";
import { Sale } from "@prisma/client";
import {
  MoreHorizontalIcon,
  ClipboardCopyIcon,
  EditIcon,
  TrashIcon,
} from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";

interface SalesTableDropdownMenuProps {
  sale: Pick<Sale, "id">;
}

const SalesTableDropdownMenu = ({ sale }: SalesTableDropdownMenuProps) => {
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleCopyToClipboardClick = () => {
    navigator.clipboard.writeText(sale.id);
    toast.success("ID copiado para a área de transferência.");
  };

  return (
    <>
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DeleteSaleDialogContent saleId={sale.id} />
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" />}>
          <MoreHorizontalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem onClick={handleCopyToClipboardClick}>
              <ClipboardCopyIcon className="mr-2 h-4 w-4" />
              Copiar ID
            </DropdownMenuItem>

            <DropdownMenuItem>
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

export default SalesTableDropdownMenu;
