"use server";

import { ProductoDetalle } from "@/interfaces/Product";
import { PrismaClient, productos } from "@prisma/client";

const prisma = new PrismaClient();

export async function getProduct(id:any) {
  try {
    const producto = await prisma.productos.findUnique({where: { id:id }});
    return producto;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getAllProducts(): Promise<productos[]> {
  try {
    const productos = await prisma.productos.findMany();
    return productos;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getAllProductsDetails():Promise<ProductoDetalle[]>{
  try {
    const productos = await prisma.productos.findMany({
      include: { denominaciones: true, tipos: true },
    });
    return productos;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getProductDetailsById(id:any): Promise<ProductoDetalle | null> {
  try {
    const producto = await prisma.productos.findUnique({
      where: { id },
      include: { denominaciones: true, tipos: true },
    });
    return producto;
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}


export async function getProductDetailsByTipoId(id: any): Promise<ProductoDetalle[] | null> {
  try {
    const productos = await prisma.productos.findMany({
      where: {
        tipos: {
          id:id,
        },
      },
      include: { denominaciones: true, tipos: true },
    });
    return productos;
  } catch (error) {
    console.error("Error al obtener los productos por tipoId:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getProductsByDenominacionId(denominacionId: number): Promise<ProductoDetalle[]> {
  try {
    const productos = await prisma.productos.findMany({
      where: {
        denominacion_id: BigInt(denominacionId),
      },
      include: { denominaciones: true, tipos: true },
    });
    return productos;
  } catch (error) {
    console.error(`Error al obtener los productos con denominacionId ${denominacionId}:`, error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

interface FilterOptions {
  id?: bigint;
  nombre?: string;
  bodega?: string;
  descripcion?: string;
  maridaje?: string;
  precioMin?: number;
  precioMax?: number;
  graduacionMin?: number;
  graduacionMax?: number;
  ano?: number;
  sabor?: string;
  tipo_id?: bigint;
  denominacion_id?: bigint;
}

export async function getFilteredProducts(filters: FilterOptions) {
  const whereClause: any = {};

  // Filtrado por ID
  if (filters.id) {
    whereClause.id = filters.id;
  }
  
  // Filtrado por nombre (ejemplo de contains)
  if (filters.nombre) {
    whereClause.nombre = { contains: filters.nombre };
  }

  // Filtrado por bodega
  if (filters.bodega) {
    whereClause.bodega = { contains: filters.bodega };
  }

  // Filtrado por descripción
  if (filters.descripcion) {
    whereClause.descripcion = { contains: filters.descripcion };
  }

  // Filtrado por maridaje
  if (filters.maridaje) {
    whereClause.maridaje = { contains: filters.maridaje };
  }

  // Filtrado por precio
  if (filters.precioMin !== undefined || filters.precioMax !== undefined) {
    whereClause.precio = {
      ...(filters.precioMin !== undefined ? { gte: filters.precioMin } : {}),
      ...(filters.precioMax !== undefined ? { lte: filters.precioMax } : {}),
    };
  }

  // Filtrado por graduación
  if (filters.graduacionMin !== undefined || filters.graduacionMax !== undefined) {
    whereClause.graduacion = {
      ...(filters.graduacionMin !== undefined ? { gte: filters.graduacionMin } : {}),
      ...(filters.graduacionMax !== undefined ? { lte: filters.graduacionMax } : {}),
    };
  }

  // Filtrado por año
  if (filters.ano) {
    whereClause.ano = filters.ano;
  }

  // Filtrado por sabor
  if (filters.sabor) {
    whereClause.sabor = { contains: filters.sabor };
  }

  // Filtrado por tipo_id
  if (filters.tipo_id) {
    whereClause.tipo_id = filters.tipo_id;
  }

  // Filtrado por denominacion_id
  if (filters.denominacion_id) {
    whereClause.denominacion_id = filters.denominacion_id;
  }

  // Realizamos la consulta con el whereClause construido dinámicamente
  const products = await prisma.productos.findMany({
    where: whereClause,
  });

  return products;
}



// Función asíncrona para manejar la lógica
async function fetchFilteredProducts() {
  try {
    // Ejemplos de valores de filtros (algunos pueden ser undefined)
    const nombre = undefined; // Filtra por nombre
    const precioMin = 5.00;     // Filtra por precio mínimo
    const precioMax = undefined; // Ejemplo de campo no informado
    const graduacionMin = 15;  // Filtra por graduación mínima
    const graduacionMax = 15.0;  // Filtra por graduación máxima
    const ano = undefined;       // Ejemplo de campo no informado
    const sabor = undefined;     // Ejemplo de campo no informado
    const tipoIdString = "1";    // Filtra por tipo (como string)
    const denominacionIdNumber = 2; // Filtra por denominación (como número)

    // Conversión a BigInt
    const tipo_id = tipoIdString ? BigInt(tipoIdString) : undefined;
    const denominacion_id = denominacionIdNumber ? BigInt(denominacionIdNumber) : undefined;

    // Construir dinámicamente el objeto filters
    const filters: { [key: string]: any } = {};

    if (nombre) filters.nombre = { contains: nombre };
    if (precioMin) filters.precio = { gte: precioMin };
    if (precioMax) filters.precio = { ...filters.precio, lte: precioMax };
    if (graduacionMin) filters.graduacion = { gte: graduacionMin };
    if (graduacionMax) filters.graduacion = { ...filters.graduacion, lte: graduacionMax };
    if (ano) filters.ano = ano;
    if (sabor) filters.sabor = { contains: sabor };
    if (tipo_id) filters.tipo_id = tipo_id;
    if (denominacion_id) filters.denominacion_id = denominacion_id;

    // Llamada a la función con los filtros dinámicos
    const products = await getFilteredProducts(filters);

  } catch (error) {
    // Manejo del error
    console.error("Error al obtener los productos:", error);
  }
}

export const getProductsOnSale = async () => {
  try {
    const productsOnSale = await prisma.productos.findMany({
      where: {
        oferta: "S", // Asegúrate de que este valor coincide con lo que hay en la base de datos
      },
    });
  
    return productsOnSale;
  } catch (error) {
    console.error('Error fetching products on sale:', error);
    throw error; // Re-lanzar el error para manejarlo en un nivel superior si es necesario
  }
};

export const getFeaturedProducts = async () => {
  try {
    const productsDestacados = await prisma.productos.findMany({
      where: {
        destacado: "S", // Ensure this value matches what's in the database
      },
    });
    
    return productsDestacados;
  } catch (error) {
    console.error('Error fetching featured products:', error);
    throw error; // Rethrow the error to handle it further up the call stack if needed
  }
};

