"use client";
import React from "react";
import { Producto } from "@/interfaces/Product";
import Link from "next/link";
import useCartStore from "@/store/useCartstore"; // Asegúrate de usar la ruta correcta
import { useRouter } from 'next/navigation'

const ProductView = ({
  id,
  imagen,
  nombre,
  precio,
  graduacion,
  ano,
}: Producto) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const router = useRouter();

  const handleAddToCart = () => {
    const productToAdd = {
      id: Number(id),
      nombre,
      precio: Number(precio),
      imagen,
    };

    addToCart(productToAdd);
    router.push(`/cartcontend`);
  };

  return (
    <div
      key={id.toString()}
      className="bg-white h-full rounded-md p-4 flex flex-col justify-between"
    >
      <div>
        <Link href={`/product/${id.toString()}`}>
          <div>
            <img
              src={imagen}
              alt={nombre}
              width={100}
              height={100}
              className="mx-auto transform transition duration-300 ease-in-out hover:scale-110"
            />
          </div>
          <div>
          <p className="text-center text-shadow-title text-2xl font-bold italic text-red-600 mb-4">
            {precio.toString()} €
          </p>
         
            <h2 className="text-lg font-bold text-center truncate">{nombre}</h2>

            <p>Graduación: {graduacion.toString()}</p>
            <p className="mb-3">Año: {ano}</p>
          </div>
        </Link>
      </div>

      <button
        className="btn-primary flex items-center justify-center space-x-2 mt-4"
        onClick={handleAddToCart}
      >
            <span>Añadir al carrito</span>
      </button>
    </div>
  );
};

export default ProductView;
