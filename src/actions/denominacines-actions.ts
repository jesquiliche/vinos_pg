'use server';

import { PrismaClient, denominaciones as DenominacionesType } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllDenominaciones(): Promise<DenominacionesType[]> {
  try {
    const denominaciones = await prisma.denominaciones.findMany();
    return denominaciones;
  } catch (error) {
    console.error("Error al obtener las denominaciones:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getDenominacionById(id: number): Promise<DenominacionesType | null> {
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
