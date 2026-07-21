"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/app/_components/ui/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { formatCurrency } from "@/app/_helper/currency";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@prisma/client";
import { CheckIcon, PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

import SalesDropdownMenu from "./table-dropdown-menu";
import { createSale } from "@/app/_actions/sale/create-sale";
import { toast } from "sonner";

import { useAction } from "next-safe-action/hooks";
import { flattenValidationErrors } from "next-safe-action";

const formSchema = z.object({
  productId: z.uuid({
    message: "O produto é obrigatório",
  }),
  quantity: z.coerce.number().int().positive(),
});

interface UpsertSheetsContent {
  productOptions: Product[];
  onSubmitSuccess: () => void;
}

interface selectedProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const UpsertSheetsContent = ({
  productOptions,
  onSubmitSuccess,
}: UpsertSheetsContent) => {
  type FormSchema = z.infer<typeof formSchema>;

  const [selectedProducts, setSelectedProducts] = useState<selectedProduct[]>(
    [],
  );

  const { execute: executeCreateSale } = useAction(createSale, {
    onError: ({ error: { validationErrors, serverError } }) => {
      const flattenedErrors = flattenValidationErrors(validationErrors);
      toast.error(serverError ?? flattenedErrors.formErrors[0]);
    },

    onSuccess: () => {
      toast.success("Venda realizada com sucesso.");
      onSubmitSuccess();
    },
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      quantity: 1,
    } as FormSchema,
  });

  const onSubmit = (data: FormSchema) => {
    // 1. Fui na prateleira (banco de dados) e peguei o produto inteiro usando o ID do formulário.
    const selectedProduct = productOptions.find(
      (product) => product.id === data.productId,
    );
    if (!selectedProduct) return;

    // 2. Verifico se o produto já está no carrinho
    const existingProduct = selectedProducts.find(
      (product) => product.id === selectedProduct.id,
    );

    // 3. Se JÁ ESTAVA NO CARRINHO, verifico o estoque e somo a quantidade
    if (existingProduct) {
      const productIsOutOfStock =
        existingProduct.quantity + data.quantity > selectedProduct.stock;
      if (productIsOutOfStock) {
        form.setError("quantity", {
          message: "Quantidade indisponível em estoque",
        });
        return;
      }

      setSelectedProducts((currentProducts) =>
        currentProducts.map((product) => {
          if (product.id === selectedProduct.id) {
            return { ...product, quantity: product.quantity + data.quantity };
          }
          return product;
        }),
      );
    } else {
      // 4. Se NÃO ESTAVA NO CARRINHO, verifico o estoque e adiciono na lista
      const productIsOutOfStock = data.quantity > selectedProduct.stock;
      if (productIsOutOfStock) {
        form.setError("quantity", {
          message: "Quantidade indisponível em estoque",
        });
        return;
      }

      setSelectedProducts((currentProducts) => [
        ...currentProducts,
        {
          ...selectedProduct,
          price: Number(selectedProduct.price),
          quantity: data.quantity,
        },
      ]);
    }

    // 5. Só limpo o formulário depois de tudo resolvido
    form.reset();
  };

  const productsTotal = useMemo(() => {
    return selectedProducts.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
  }, [selectedProducts]);

  const onDelete = (productId: string) => {
    setSelectedProducts((currentProducts) => {
      return currentProducts.filter((product) => product.id !== productId);
    });
  };

  const onSubmitSale = async () => {
    executeCreateSale({
      products: selectedProducts.map((product) => ({
        id: product.id,
        quantity: product.quantity,
      })),
    });
  };

  return (
    <SheetContent className="!max-w-[700px]">
      <SheetHeader>
        <SheetTitle>Nova venda</SheetTitle>
        <SheetDescription>
          Insira as informações da venda abaixo.
        </SheetDescription>
      </SheetHeader>

      <Form {...form}>
        <form className="space-y-6 px-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2 block">Produto</FormLabel>
                <FormControl>
                  <Combobox
                    items={productOptions}
                    value={
                      productOptions.find((p) => p.id === field.value) || null
                    }
                    onValueChange={(val) => field.onChange(val?.id || "")}
                    itemToStringLabel={(product) => product.name}
                  >
                    <ComboboxInput placeholder="Selecione um produto" />
                    <ComboboxContent>
                      <ComboboxEmpty>Nenhum produto encontrado.</ComboboxEmpty>
                      <ComboboxList>
                        {(product) => (
                          <ComboboxItem key={product.id} value={product}>
                            {product.name}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2 block">Quantidade</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Digite a quantidade"
                    {...field}
                    value={field.value as string | number | undefined}
                  ></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" variant="secondary">
            <PlusIcon /> Adicionar produto à venda
          </Button>
        </form>
      </Form>

      <Table>
        <TableCaption>Lista dos produtos adicionados à venda.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead>Preço Unitário</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{formatCurrency(product.price)}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell className="text-right">
                {formatCurrency(product.price * product.quantity)}
              </TableCell>
              <TableCell className="text-right">
                <SalesDropdownMenu onDelete={onDelete} product={product} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">
              {formatCurrency(productsTotal)}
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <SheetFooter>
        <Button disabled={selectedProducts.length === 0} onClick={onSubmitSale}>
          <CheckIcon />
          Finalizar venda
        </Button>
      </SheetFooter>
    </SheetContent>
  );
};

export default UpsertSheetsContent;
