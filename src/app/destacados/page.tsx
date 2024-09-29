'use server';

import { getFeaturedProducts } from "@/actions/productos-actions";
import ProductView from "@/components/products/productView";
import Producto from "../../interfaces/Product";
import { PacificoFont } from "@/config/fonts";


// Definimos el componente Home
const Home:  React.FC = async () => {
  const products = await getFeaturedProducts();
 
  
  return (
    <main className="py-20">
      
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
        Destacados
      </h1>  
      <div className="w-11/12 grid grid-cols-4 mx-auto">
      
      {products.map((p: Producto) => (
            <div key={p.id}>
              <ProductView
                id={p.id}
                nombre={p.nombre}
                maridaje={p.maridaje}
                descripcion={p.descripcion}
                precio={p.precio}
                graduacion={p.graduacion}
                imagen={p.imagen}
                ano={p.ano}
              />
            </div>
          ))}
        
      </div>
     
    </main>
  );
}

export default Home;
