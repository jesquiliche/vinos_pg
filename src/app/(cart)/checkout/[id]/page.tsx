import { getAddressByOrderId, getOrderById, getOrderDetailsById } from "@/actions/orden-actions";
import { getProductDetailsById } from "@/actions/productos-actions";
import { PacificoFont, titleFont } from "@/config/fonts";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

export default async function Home({ params }: Props) {
  const id = Number(params.id);
  // Ejecutar todas las llamadas asíncronas en paralelo
  const [articulos, address, order] = await Promise.all([
    getOrderDetailsById(id),
    getAddressByOrderId(id),
    getOrderById(id)
  ]);
  
  return (
    <div className="w-11/12 mx-auto py-20">
      <h1
        className={`${PacificoFont.className} text-4xl font-bold text-center`}
      >
        Pedido: {id}
      </h1>
      <div className="grid grid-cols-8 gap-2">
        <div className="col-span-6">
          <div className="grid grid-cols-3 gap-2">
            {articulos.map((a) => (
              <div key={a.id}>
                <img src={a.imagen ?? ""} className="w-28 mx-auto" />
                <h2 className="text-center font-bold">{a.nombre}</h2>
                <p className="text-center">Precio: {a.precio.toFixed(2)}</p>
                <p className="text-center">Cantidad: {a.cantidad}</p>
                <p className="text-center">
                  Subtotal: {(a.cantidad * Number(a.precio)).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-2">
          <div className="border-2 border-gray-400 rounded-md p-4 mx-auto mb-2">
            <h2 className="text-2xl text-center font-bold">Dirección</h2>
            <p>
              <b>Nombre:</b> {address?.nombre}
            </p>
            <p>
              <b>Apellidos:</b> {address?.apellidos}
            </p>
            <p>
              <b>Calle:</b> {address?.calle}
            </p>
            <p>
              <b>Número:</b> {address?.numero}
            </p>
            <p>
              <b>Escalera:</b> {address?.escalera}
            </p>
            <p>
              <b>Piso:</b> {address?.piso}
            </p>
            <p>
              <b>Puerta:</b> {address?.puerta}
            </p>
            <p>
              <b>Población:</b> {address?.poblacion}
            </p>
            <p>
              <b>Provincia:</b> {address?.provincia}
            </p>
            <p>
              <b>Teléfono:</b> {address?.telefono}
            </p>
          </div>
          <div className="border-2 border-gray-400 rounded-md p-4 mx-auto">
            <h2 className="text-2xl text-center font-bold">Total</h2>
            <p>
              <b>Artículos:</b> {order?.articulos}
            </p>
            <p>
              <b>Subtotal:</b> {order?.subtotal.toFixed(2)}
            </p>
            <p>
              <b>IVA:</b> {order?.iva.toFixed(2)}
            </p>
            <p>
              <b>Total:</b> {order?.total.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
