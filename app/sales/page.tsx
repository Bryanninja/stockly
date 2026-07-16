import { PlusIcon } from "lucide-react";
import { buttonVariants } from "../_components/ui/button";
import { Sheet, SheetTrigger } from "../_components/ui/sheet";
import UpsertSheetsContent from "./_components/upsert-sheets-content";
import { getProducts } from "../_data-access/product/get-products";

const SalesPage = async () => {
  const productsDb = await getProducts();

  const products = productsDb.map((product) => ({
    ...product,
    price: Number(product.price),
  })) as any;

  return (
    <div className="m-8 w-full space-y-8 rounded-lg bg-white p-8">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500">
            Gestão de Vendas
          </span>
          <h2 className="text-xl font-semibold">Vendas</h2>
        </div>

        <Sheet>
          <SheetTrigger className={buttonVariants()}>
            <PlusIcon /> Nova Venda
          </SheetTrigger>
          <UpsertSheetsContent productOptions={products} />
        </Sheet>
      </div>

      {/* <DataTable columns={productTableColumns} data={products} /> */}
    </div>
  );
};

export default SalesPage;
