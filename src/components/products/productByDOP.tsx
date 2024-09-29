import {
  getProductsByDenominacionId,
} from "@/actions/productos-actions";
import React from "react";

import { Producto } from "@/interfaces/Product";
import ProductView from "./productView";

interface Props {
  id: number;
}
export const ProductsByDOP = async ({ id }: Props) => {
  const products: Producto[] = await getProductsByDenominacionId(id);

  return (
    <>
      <div className="grid grid-cols-4 gap-4 mx-auto">
        {products.map((p: Producto) => (
          <ProductView
            key={p.id.toString()}
            id={p.id}
            nombre={p.nombre}
            maridaje={p.maridaje}
            descripcion={p.descripcion}
            precio={p.precio}
            graduacion={p.graduacion}
            imagen={p.imagen}
            ano={p.ano} // Asegúrate de incluir todas las propiedades necesarias
          />
        ))}
      </div>
    </>
  );
};
