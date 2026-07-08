import { db } from "@/app/_lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("teste");
  console.log({ query });

  const { id } = await params;
  const product = await db.product.findUnique({
    where: {
      id: id,
    },
  });

  if (!product) {
    return Response.json(
      { message: "Produto não encontrado" },
      { status: 404 },
    );
  }
  return Response.json(product, { status: 200 });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  await db.product.delete({
    where: {
      id: id,
    },
  });
  return new Response(null, { status: 204 });
}
