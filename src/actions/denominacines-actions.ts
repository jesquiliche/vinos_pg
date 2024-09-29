'use server'

import { PrismaClient, denominaciones } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllDenominaciones(): Promise<denominaciones[]> {
  try {
    const denominaciones = await prisma.denominaciones.findMany();
    return denominaciones;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getDenominacionById(id: number): Promise<denominaciones | null> {
  try {
    const denominacion = await prisma.denominaciones.findUnique({
      where: { id: BigInt(id) },
    });
    return denominacion;
  } catch (error) {
    console.error(`Error al obtener la denominación con id ${id}:`, error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Ejemplo de uso
