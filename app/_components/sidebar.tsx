const Sidebar = () => {
  return (
    <div className="w-64 bg-white">
      <div>
        <h1 className="font-bold text-2xl px-8 py-6">STOCKLY</h1>
      </div>

      {/* BOTÕES */}
      <div className="flex gap-2 p-2 flex-col">
        <button className="px-6 py-3">Dashboard</button>
        <button className="px-6 py-3">Produtos</button>
        <button className="px-6 py-3">Vendas</button>
      </div>
    </div>
  );
};

export default Sidebar;
