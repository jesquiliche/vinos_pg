'use server'

import { PrismaClient, provincia } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllProvincias(): Promise<provincia[]> {
  try {
    const provincias = await prisma.provincia.findMany();
    return provincias;
  } catch (error) {
    console.error("Error al obtener las provincias:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}