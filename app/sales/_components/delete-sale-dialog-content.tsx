"use client";

import { deleteSale } from "@/app/_actions/sale/delete-sale";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";

interface DeleteSaleDialogContentProps {
  saleId: string;
}

const DeleteSaleDialogContent = ({ saleId }: DeleteSaleDialogContentProps) => {
  const { execute: executeDeleteSale } = useAction(deleteSale, {
    onSuccess: () => {
      toast.success("Venda cancelada! Os produtos retornaram ao estoque.");
    },
    onError: () => {
      toast.error("Ocorreu um erro ao cancelar a venda.");
    },
  });

  const handleContinueClick = () => executeDeleteSale({ id: saleId });

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
        <AlertDialogDescription>
          Você está prestes a excluir esta venda. Esta ação irá devolver as quantidades dos produtos ao estoque e não pode ser desfeita. Deseja continuar?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction onClick={handleContinueClick}>
          Continuar
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteSaleDialogContent;
