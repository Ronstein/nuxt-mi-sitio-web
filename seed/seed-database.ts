import prisma from '../lib/prisma.ts';
import { products } from './products.seed.ts';
import { siteReviews } from './site-reviews.seed.ts';
import { users } from './users.seed.ts';
import { productReviews } from './product-reviews.seed.ts';

import bcrypt from 'bcryptjs';

async function seedDatabase() {
    //! 1 Borrar Database
    await prisma.productReview.deleteMany();
    await prisma.product.deleteMany();
    await prisma.siteReview.deleteMany();
    await prisma.user.deleteMany();

    //! Hash de contraseñas
    const usersWithHashedPassword = users.map((user) => ({
        ...user,
        password: bcrypt.hashSync(user.password, bcrypt.genSaltSync(10)),
    }));

    //! 2 Insertar Registros
    await prisma.siteReview.createMany({
        data: siteReviews,
    });
    const dbProducts = await prisma.product.createMany({
        data: products,
    });
    await prisma.user.createMany({
        data: usersWithHashedPassword,
    });

    //Obtener los productos(usuarios) para tomar sus ids
    const productsCreated = await prisma.product.findMany();

    //Todo: usuarios
    const usersCreated = await prisma.user.findMany();

    const productReviewsCreated = productReviews.map((review) => ({
        ...review,
        productId: productsCreated[Math.floor(Math.random() * products.length)].id,
        userId: usersCreated[Math.floor(Math.random() * users.length)].id,
    }));

    await prisma.productReview.createMany({
        data: productReviewsCreated,
    });

    console.log('Database seeded succesfully');
}

seedDatabase();