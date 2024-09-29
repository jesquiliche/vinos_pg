import { getDenominacionById } from "@/actions/denominacines-actions";
import { ProductsIndex } from "@/components/products";
import { PacificoFont } from "@/config/fonts";

interface Props {
  params: {
    id: string;
  };
}

export default async function Home({ params }: Props) {
  const id = +params.id;
  const initialFilters = {
    denominacion_id: BigInt(id), // Suponiendo que 2 es el ID de una denominación
  };
  const tipo = await getDenominacionById(+id);

  return (
    <div className="w-11/12 mx-auto py-20">
      <div className="flex justify-center">
        <img
          src="/logo.png"
          className="h-28 w-28 border border-gray-500 rounded-full shadow-xl "
          alt="logo"
        />
      </div>
      <h1
        className={`${PacificoFont.className} py-4 text-shadow-title text-4xl font-bold text-center`}
      >
        D.O.P {tipo?.nombre}
      </h1>
      <h2 className="text-lg text-center">{tipo?.descripcion}</h2>
      <ProductsIndex initialFilters={initialFilters} />
    </div>
  );
}
