import { z } from 'zod';
import prisma from '~~/lib/prisma';
import bcrypt from 'bcryptjs';

const bodySchema = z.object({
  email: z
    .string()
    .toLowerCase()
    .trim()
    .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: 'Email is not valid',
    }),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export default defineEventHandler(async (event) => {

  const { email, password } = await readValidatedBody(event, bodySchema.parse);

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    throw createError({
      status: 401,
      message: 'Bad Credentials (email)',
    });
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    throw createError({
      status: 401,
      message: 'Bad Credentials (password)',
    });
  }

  const userSession = {
    id: user.id.toString(),
    name: user.name,
    email: user.email,
    roles: user.roles,
  };

  await setUserSession(event, {
    user: userSession,
    loggedInAt: new Date(),
  });

  return {
    message: 'Login Successful',
    user: userSession,
  };
})
