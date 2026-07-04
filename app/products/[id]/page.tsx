interface Params {
  id: string;
}

const ProductsDetails = async ({ params }: { params: Promise<Params> }) => {
  const { id } = await params;

  return <h1>Product ID: {id}</h1>;
};

export default ProductsDetails;
