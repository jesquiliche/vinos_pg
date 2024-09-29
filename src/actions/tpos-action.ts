'use server'

import { PrismaClient, tipos } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllTipos(): Promise<tipos[]> {
  try {
    const tipos = await prisma.tipos.findMany();
    return tipos;
  } catch (error) {
    console.error("Error al obtener los tipos:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

  // Función para obtener un tipo por su ID
  export async function getTipoById(id: any): Promise<tipos | null> {
    try {
      const tipo = await prisma.tipos.findUnique({
        where: { id: BigInt(id) },
      });
      return tipo;
    } catch (error) {
      console.error(`Error al obtener el tipo con id ${id}:`, error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }
  
