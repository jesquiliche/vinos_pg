'use server'
import { PrismaClient, users as User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { auth, currentUser } from '@clerk/nextjs/server';

const prisma = new PrismaClient();

// Definir una interfaz para los datos del usuario
interface UserData {
  userId: string,
  name: string;
  email: string;
  password: string;
}

// Definir una interfaz para los datos del usuario que se devuelven al iniciar sesión
interface LoggedInUser {
  id: bigint;
  name: string;
  email: string;
}

/**
 * Registra un nuevo usuario.
 * @param userData - Datos del usuario (nombre, email, contraseña).
 * @returns - Usuario creado.
 * @throws - Si los campos están vacíos o hay un error en la base de datos.
 */
export async function registerUser({ name, email, password,userId }: UserData): Promise<User | undefined> {
  if (!name || !email || !password) {
    throw new Error('All fields are required');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    return await prisma.users.create({
      data: {
        userId,
        name,
        email,
        password: hashedPassword,
      },
    });
  } catch (error: any) {
    // Manejo específico de errores de Prisma
    if (error.code === 'P2002') {
      // P2002 es el código de error de Prisma para violación de la restricción única (email ya registrado)
      console.error('Error: Email already in use');
      throw new Error('Email already in use');
    } else {
      console.error('Error creating user:', error);
      throw new Error('An error occurred while creating the user');
    }
  }
}

/**
 * Inicia sesión de un usuario.
 * @param email - El email del usuario.
 * @param password - Contraseña ingresada por el usuario.
 * @returns - Usuario encontrado y autenticado o null si no es válido.
 * @throws - Si hay un error en la base de datos o al verificar la contraseña.
 */
export async function loginUser(email: string, password: string): Promise<LoggedInUser | null> {
  try {
    // Encuentra el usuario por su correo electrónico
    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (user && await bcrypt.compare(password, user.password)) {
      // Devuelve el usuario si la contraseña es correcta
      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    }

    // Devuelve null si el usuario no existe o la contraseña no coincide
    return null;
  } catch (error) {
    throw new Error('Error logging in user: ');
  }
}

/**
 * Encuentra un usuario por su email.
 * @param email - El email del usuario.
 * @returns - Usuario encontrado o null si no existe.
 * @throws - Si hay un error en la base de datos.
 */
export async function findUserByEmail(email: string): Promise<User | null> {
  try {
    return await prisma.users.findUnique({
      where: { email },
    });
  } catch (error) {
    throw new Error('Error finding user: ');
  }
}




export async function syncUser() {
  const user = await currentUser();

  if (user) {
    await prisma.users.upsert({
      where: { userId:user.id },
      update: {
        email: user.primaryEmailAddress?.emailAddress,
        name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
      },
      create: {
        userId: user.id,
        password:"123456",
        email: user.primaryEmailAddress?.emailAddress ?? "",
        name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
      },
    });
  }
}
