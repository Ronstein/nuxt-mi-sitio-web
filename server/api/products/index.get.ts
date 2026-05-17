import prisma from "~~/lib/prisma"

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  // console.log({ query });
  let limit = parseInt(query.limit as string);
  let offset = parseInt(query.offset as string);

  //!Validaciones
  if (isNaN(limit) || limit <= 1) limit = 10;
  if (isNaN(offset) || offset < 0) offset = 0;
  // console.log({ limit });

  const products = await prisma.product.findMany({
    take: limit,
    skip: offset,
  });

  const total = await prisma.product.count();
  const totalPages = (Math.ceil(total / limit));


  return {
    products,
    totalPages,
    currentPage: offset / limit + 1,
    perPage: limit,
    total,
  };
})
