"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../_components/ui/dialog";

import { PlusIcon } from "lucide-react";

import { z } from "zod";
import { NumericFormat } from "react-number-format";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "O Nome do Produto é obrigatório.",
  }),

  price: z.number().min(0.01, {
    message: "O preço do produto é obrigatório.",
  }),

  stock: z.coerce
    .number()
    .positive({
      message: "A quantidade deve ser maior que 0",
    })
    .int()
    .min(0, {
      message: "A quantidade em estoque é obrigatória.",
    }),
});

type FormSchema = z.infer<typeof formSchema>;

const AddProductButton = () => {
  const form = useForm({
    shouldUnregister: true,
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      stock: 1,
    },
  });

  const onSubmit = (data: FormSchema) => {
    console.log({ data });
  };

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button>
            <PlusIcon />
            Novo Produto
          </Button>
        }
      />

      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Criar produto</DialogTitle>
              <DialogDescription>
                Insira as informações abaixo!
              </DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2 block">Nome do produto</FormLabel>
                  <FormControl>
                    <Input placeholder="Insira o nome do produto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2 block">Preço</FormLabel>
                  <FormControl>
                    <NumericFormat
                      thousandSeparator="."
                      decimalSeparator=","
                      prefix="R$ "
                      decimalScale={2}
                      fixedDecimalScale
                      allowNegative={false}
                      customInput={Input}
                      onValueChange={(values) =>
                        field.onChange(values.floatValue)
                      }
                      {...field}
                      onChange={() => {}}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2 block">Estoque</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Insira o estoque do produto"
                      type="number"
                      {...field}
                      value={field.value as number}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose
                render={
                  <Button variant="secondary" type="reset">
                    Cancelar
                  </Button>
                }
              />

              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductButton;
