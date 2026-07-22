import { DataTable } from "../_components/ui/data-table";
import { getProducts } from "../_data-access/product/get-products";
import { getSales } from "../_data-access/sales/get-sales";
import CreateSaleButton from "./_components/create-sale-button";
import { saleTableColumns } from "./_components/table-columns";

const SalesPage = async () => {
  const sales = await getSales();

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

        <CreateSaleButton products={products} />
      </div>

      <DataTable columns={saleTableColumns} data={sales} />
    </div>
  );
};

export default SalesPage;
