"use server";

import { Address } from "@/interfaces/address";
import { CartProduct } from "@/interfaces/Product";
import { getProduct } from "./productos-actions";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function StoreOrden(address: Address, cartProduct: CartProduct[]) {
  console.log(address);

  let total = 0;
  let articulos = 0;

  try {
    // Calcular el total y la cantidad de artículos
    for (const p of cartProduct) {
      const product = await getProduct(p.id);
      if (product) {
        total += Number(product.precio) * p.quantity;
        articulos += p.quantity;
      }
    }

    const subtotal = total / 1.21;
    const iva = total - subtotal;

    // Iniciar una transacción
    const nuevaOrden = await prisma.$transaction(async (tx) => {
      // Crear la nueva orden
      const orden = await tx.orden.create({
        data: {
          user_id: BigInt(address.user_id), // Asegúrate de usar BigInt si es necesario
          userId: address.userId, // Asegúrate de que 'userId' sea el nombre correcto
          subtotal: subtotal, // Decimal
          total: total, // Decimal
          iva: iva, // Decimal
          pagado: "N", // Pagado (1 char)
          entregado: "N", // No entregado (1 char)
          transactionId: null, // Opcional
          articulos: articulos, // Número de artículos
        },
      });

      // Crear los detalles de la orden
      for (const p of cartProduct) {
        const product = await getProduct(p.id);
        if (p.quantity > product!.stock) {
          throw new Error(`No hay suficiente stock para ${product!.nombre}`);
        }
        if (product) {
          console.log(product);
          await tx.detalle.create({
            data: {
              orden_id: orden.id, // ID de la orden (correctamente referenciado)
              product_id: product.id, // ID del producto asociado
              precio: product.precio, // Precio del artículo (decimal)
              cantidad: p.quantity, // Cantidad del artículo
              nombre: product.nombre,
              imagen: product.imagen,
            },
          });
          // Actualizar el stock del producto
          await tx.productos.update({
            where: { id: product.id },
            data: {
              stock: product.stock - p.quantity, // Restar la cantidad del stock
            },
          });
        }
      }

      // Crear la dirección en el modelo 'ordenDireccion'
      await tx.ordenDireccion.create({
        data: {
          orden_id: orden.id, // Relacionar con la orden
          nombre: address.nombre,
          apellidos: address.apellidos,
          calle: address.calle,
          numero: address.numero,
          escalera: address.escalera, // Campo opcional (puede ser null)
          piso: address.piso, // Campo opcional (puede ser null)
          puerta: address.puerta, // Campo opcional (puede ser null)
          poblacion: address.poblacion,
          provincia: address.provincia, // Código de la provincia (por ejemplo, Madrid)
          user_id: BigInt(address.user_id), // Asegúrate de usar BigInt si es necesario
          userId: address.userId,
          telefono: address.telefono, // Número de teléfono
        },
      });

      return orden; // Devuelve la orden creada para uso posterior
    });
    return { ok: true, id: nuevaOrden.id, message: "success" };
  } catch (error: any) {
    console.error("Error al procesar la orden:", error);
    return { ok: false, id: 0, message: error.message };
    //   throw error; // Lanza el error para que pueda ser manejado fuera de la función
  } finally {
    await prisma.$disconnect(); // Asegúrate de desconectar Prisma al final
  }
}

// Función para obtener todos los detalles de una orden por su ID
export async function getOrderDetailsById(ordenId: number | bigint) {
  try {
    const detalles = await prisma.detalle.findMany({
      where: {
        orden_id: BigInt(ordenId), // Buscar detalles relacionados con la orden_id
      },
    });

    return detalles; // Retornar los detalles encontrados
  } catch (error) {
    console.error("Error al obtener los detalles de la orden:", error);
    throw error; // Manejar errores si es necesario
  } finally {
    await prisma.$disconnect(); // Desconectar Prisma al final
  }
}

// Función para obtener la dirección de una orden por su ID
export async function getAddressByOrderId(ordenId: number) {
  try {
    const address = await prisma.ordenDireccion.findFirst({
      where: {
        orden_id: ordenId, // Buscar la dirección asociada a la orden_id
      },
    });

    return address; // Retornar la dirección encontrada
  } catch (error) {
    console.error("Error al obtener la dirección de la orden:", error);
    throw error; // Manejar errores si es necesario
  } finally {
    await prisma.$disconnect(); // Desconectar Prisma al final
  }
}

// Función para obtener una orden por su ID
export async function getOrderById(ordenId: number | bigint) {
  try {
    const orden = await prisma.orden.findUnique({
      where: {
        id: ordenId, // Buscar la orden usando su campo 'id' único
      },
    });

    return orden; // Retornar la orden encontrada
  } catch (error) {
    console.error("Error al obtener la orden:", error);
    throw error; // Manejar errores si es necesario
  } finally {
    await prisma.$disconnect(); // Desconectar Prisma al final
  }
}
