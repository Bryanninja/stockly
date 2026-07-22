"use client";

import { upsertProduct } from "@/app/_actions/product/create-product";
import { upsertProductSchema } from "@/app/_actions/product/create-product/schema";
import { Button } from "@/app/_components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from "lucide-react";
import { flattenValidationErrors } from "next-safe-action";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { toast } from "sonner";
import z from "zod";

interface UpsertProductDialogContent {
  defaultValues?: upsertProductSchema;
  onSuccessSubmit?: () => void;
}

const UpsertProductDialogContent = ({
  defaultValues,
  onSuccessSubmit,
}: UpsertProductDialogContent) => {
  const isEditing = !!defaultValues;

  const form = useForm({
    shouldUnregister: true,
    resolver: zodResolver(upsertProductSchema),
    defaultValues: defaultValues ?? {
      name: "",
      price: 0,
      stock: 1,
    },
  });

  const { execute: executeUpsertProduct } = useAction(upsertProduct, {
    onSuccess: () => {
      isEditing
        ? toast.success("Produto editado com sucesso!")
        : toast.success("Produto criado com sucesso!");
      onSuccessSubmit?.();
    },

    onError: ({ error: { validationErrors, serverError } }) => {
      const flattenedErrors = flattenValidationErrors(validationErrors);
      const errorMessage = serverError ?? flattenedErrors.formErrors[0];
      toast.error(errorMessage);

      // Mostra também embaixo do campo nome
      if (errorMessage?.includes("already exists")) {
        form.setError("name", {
          message: "Já existe um produto com esse nome",
        });
      }
    },
  });

  const onSubmit = async (data: z.infer<typeof upsertProductSchema>) => {
    executeUpsertProduct({
      ...data,
      id: defaultValues?.id,
    });
  };

  return (
    <DialogContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Editar" : "Criar"} produto</DialogTitle>
            <DialogDescription>Insira as informações abaixo!</DialogDescription>
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

            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && (
                <LoaderIcon className="animate-spin" />
              )}
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default UpsertProductDialogContent;
