import { getProductDetailsById } from "@/actions/productos-actions";
import { titleFont } from "@/config/fonts";
import Link from "next/link";
import { Interface } from "readline";

interface Props {
  params: {
    id: string;
  };
}

export default async function Home({ params }: Props) {
  const id = params.id;
  
  const product = await getProductDetailsById(id);

  return (
    <div className="w-10/12 mx-auto">
      <div className="py-20 grid grid-cols-3 gap-4 mx-auto">
        <div className="p-14">
          <img
            src={product?.imagen}
            alt={product?.nombre}
            className="h-full w-full mx-auto transform transition duration-300 ease-in-out hover:scale-125"
          />
        </div>
        <div className="mt-16 col-span-2 mx-auto w-10/12 ">
          <h1 className={`${titleFont.className} text-shadow-title text-4xl font-semibold`}>{product?.nombre}</h1>
          <h1 className={`${titleFont.className} text-shadow-title text-3xl font-semibold mt-5`}>
            {product?.denominaciones.nombre}
          </h1>
          <p className="mt-2  text-lg">{product?.descripcion}</p>
          <div className="grid grid-cols-3 border border-gray-400 rounded-md p-4 mt-5 bg-gray-200">
            <div className="col-span-3">
              <h2 className={`${titleFont.className} text-shadow-title text-3xl font-semibold`}>Características</h2>
            </div>
            <p className="mt-5  text-xl">
              <b>Precio : </b>
              {product?.precio.toString()}
            </p>
            <p className="mt-5  text-xl">
              <b>Graduación : </b>
              {product?.graduacion.toString()}
            </p>
            <p className="mt-5  text-xl">
              <b>Bodega : </b>
              {product?.bodega}
            </p>
            <p className="mt-5  text-xl">
              <b>Maridaje : </b>
              {product?.maridaje}
            </p>
            <p className="mt-5  text-xl">
              <b>Tipo : </b>
              {product?.tipos.nombre}
            </p>
            <p className="mt-5  text-xl">
              <b>Año : </b>
              {product?.ano}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-5">
            <div>
              <Link href="/" className="btn-primary">
                Comprar
              </Link>
            </div>
            <div>
              <Link href="/" className="btn-primary">
                Volver
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
