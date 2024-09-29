'use server'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Filtra las poblaciones por un código que comienza con un valor parcial.
 * @param partialCode - Parte inicial del código que quieres buscar.
 * @returns - Lista de poblaciones que coinciden con el filtro.
 */
export async function filterPoblacionByCodigo(partialCode: string) {
  try {
    const poblaciones = await prisma.poblacion.findMany({
      where: {
        codigo: {
          startsWith: partialCode, // Coincide solo con el inicio del código
                 },
      },
    });
    return poblaciones;
  } catch (error) {
    console.error('Error fetching poblaciones:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
