import prisma from "~~/lib/prisma";

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id') as string;

    //Todo: revisar sesion de usuario
    // const session = await requireUserSession(event);
    // const hasAdminRole = session.user.roles.includes('admin');

    // if (!hasAdminRole) {
    //     throw createError({
    //         statusCode: 401,
    //         message: 'Unauthorized',
    //     });
    // }

    if (id === 'new') {
        return {
            id: 0,
            slug: '',
            name: '',
            description: '',
            price: 0,
            images: [],
            tags: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        } as unknown as Product;
    }

    const product = await prisma.product.findUnique({
        where: {
            id: +id,
        }
    });

    if (!product) {
        throw createError({
            statusCode: 404,
            message: `Product with id ${id} not found`,
        });
    }

    return product
});