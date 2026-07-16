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
import { PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  productId: z.uuid({
    message: "O produto é obrigatório",
  }),
  quantity: z.coerce.number().int().positive(),
});

interface UpsertSheetsContent {
  productOptions: Product[];
}

interface selectedProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const UpsertSheetsContent = ({ productOptions }: UpsertSheetsContent) => {
  type FormSchema = z.infer<typeof formSchema>;

  const [selectedProducts, setSelectedProducts] = useState<selectedProduct[]>(
    [],
  );

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

    // 2. Vou mexer no meu carrinho de compras atual...
    setSelectedProducts((currentProducts) => {
      // 3. Olhei dentro do carrinho para ver se esse produto já foi adicionado antes
      const existingProduct = currentProducts.find(
        (product) => product.id === selectedProduct.id,
      );
      // 4. Se o produto JÁ ESTAVA NO CARRINHO...
      if (existingProduct) {
        // Uso a esteira (.map) para olhar item por item do carrinho...
        return currentProducts.map((product) => {
          // Quando eu achar o produto certo na esteira, crio um clone dele e somo a quantidade!
          if (product.id === selectedProduct.id) {
            return {
              ...product,
              quantity: product.quantity + data.quantity,
            };
          }
          // Se não for ele, só deixo passar direto.
          return product;
        });
      }

      // 5. Se o produto NÃO ESTAVA NO CARRINHO...
      // Pego tudo que já tinha (...currentProducts) e coloco o produto novo no final.
      return [
        ...currentProducts,
        {
          ...selectedProduct,
          price: Number(selectedProduct.price),
          quantity: data.quantity,
        },
      ];
    });

    // 6. Limpo a caixinha para o próximo produto
    form.reset();
  };

  const productsTotal = useMemo(() => {
    return selectedProducts.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
  }, [selectedProducts]);

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
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead>Preço Unitário</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Total</TableHead>
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
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">
              {formatCurrency(productsTotal)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </SheetContent>
  );
};

export default UpsertSheetsContent;
