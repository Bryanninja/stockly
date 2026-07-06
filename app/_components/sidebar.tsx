import { LayoutGrid, Package, ShoppingBasket } from "lucide-react";
import SidebarButton from "./sidebar-button";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white">
      <div>
        <h1 className="px-8 py-6 text-2xl font-bold">STOCKLY</h1>
      </div>

      {/* BOTÕES */}

      <div className="flex flex-col gap-2 p-2">
        <SidebarButton href="/">
          <LayoutGrid className="size-5" />
          Dashboard
        </SidebarButton>

        <SidebarButton href="/products">
          <Package className="size-5" />
          Produtos
        </SidebarButton>

        <SidebarButton href="/sales">
          <ShoppingBasket className="size-5" />
          Vendas
        </SidebarButton>
      </div>
    </div>
  );
};

export default Sidebar;
