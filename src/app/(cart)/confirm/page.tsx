"use client";

import { PacificoFont } from "@/config/fonts";
import useCartStore from "@/store/useCartstore";
import { useAddressStore } from "@/store/useAddressStore";
import Link from "next/link";
import { StoreOrden } from "@/actions/orden-actions";
import { useRouter } from "next/navigation";
import { ErrorProps } from "next/error";
import { useState } from "react";

export default function Home() {
  const [error,setError]=useState('');
  const address = useAddressStore((state) => state.address);
  const cartItems = useCartStore((state) => state.cart);
  const totalItems = useCartStore((state) => state.totalItems);
  const getTotal = useCartStore((state) => state.getTotalCost);
  const total = getTotal();
  const router = useRouter();

  const handleButton = async () => {
    try {
      const orden = await StoreOrden(address, cartItems);
      if (orden.ok) {
        router.push(`/checkout/${orden.id}`);
      } else {
        setError(orden.message);
      }
    } catch (error: any) {
      console.error("Error al procesar la orden:", error.message);
      
    }
  };

  return (
    <div className="w-11/12 mx-auto py-20">
      <h1 className={`${PacificoFont.className} text-center text-4xl`}>
        Carrito
      </h1>
      <div className="grid grid-cols-8 gap-">
        <div className="col-span-6">
          <div className="grid grid-cols-3 gap-2">
            {cartItems.map((p) => (
              <div key={p.id} className="p-2">
                <img src={p.imagen} alt={p.nombre} className="w-28 mx-auto" />
                <Link href={`/product/${p.id}`}>
                  <p className="text-center font-bold underline truncate">
                    {p.nombre}
                  </p>
                </Link>
                <p className="text-center">Precio: {p.precio}</p>
                <p className="text-center">Cantidad: {p.quantity}</p>
                <p className="text-center">
                  Subtotal: {(p.quantity * p.precio).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-2">
          <div className="border-2 border-gray-400 rounded-md p-4 mx-auto mb-2">
            <h2 className="text-2xl text-center font-bold">Dirección</h2>
            <p>
              <b>Nombre:</b> {address.nombre}
            </p>
            <p>
              <b>Apellidos:</b> {address.apellidos}
            </p>
            <p>
              <b>Calle:</b> {address.calle}
            </p>
            <p>
              <b>Número:</b> {address.numero}
            </p>
            <p>
              <b>Escalera:</b> {address.escalera}
            </p>
            <p>
              <b>Piso:</b> {address.piso}
            </p>
            <p>
              <b>Puerta:</b> {address.puerta}
            </p>
            <p>
              <b>Población:</b> {address.poblacion}
            </p>
            <p>
              <b>Provincia:</b> {address.provincia}
            </p>
            <p>
              <b>Teléfono:</b> {address.telefono}
            </p>
          </div>
          <div className="border-2 border-gray-400 rounded-md p-4 mx-auto">
            <h2 className="text-2xl text-center font-bold">Total</h2>
            <p>
              <b>Artículos:</b> {totalItems}
            </p>
            <p>
              <b>Subtotal:</b> {(total / 1.21).toFixed(2)}
            </p>
            <p>
              <b>IVA:</b> {(total - total / 1.21).toFixed(2)}
            </p>
            <p>
              <b>Total:</b> {total.toFixed(2)}
            </p>
          </div>
          <div className="flex flex-col space-y-2 mt-2">
            
            <span className="text-red-600 text-sm">{error}</span>
            <button className="btn-primary mt-2" onClick={handleButton}>
              Confirmar orden
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
