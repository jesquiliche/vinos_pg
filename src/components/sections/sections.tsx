import Link from "next/link";
import React from "react";
/* eslint-disable no-console */
const Sections = () => {
  return (
    <>
      <div className="w-full grid grid-cols-3 gap-2 my-10">
        <div>
          <Link href="/onsale">
          <img src="portada2.jpg" className="h-64 w-96 rounded-lg mx-auto shadow-lg" />
          <h2 className="text-shadow-title text-4xl text-white text-center font-bold -mt-20">
            Ofertas
          </h2>
          </Link>
        </div>
        <div>
          <Link href="/destacados"> 
          <img src="portada4.jpg" className="h-64 w-96 rounded-lg mx-auto shadow-lg" />
          <h2 className="text-shadow-title text-4xl text-white text-center font-bold -mt-20">
            Destacados
          </h2>
          </Link>
        </div>
        <div>
          <img src="portada3.jpg" className="h-64 w-96 rounded-lg mx-auto shadow-lg" />
          <h2 className="text-shadow-title text-4xl text-white text-center font-bold -mt-20">
            Historia
          </h2>
        </div>
      </div>
    </>
  );
};

export default Sections;
