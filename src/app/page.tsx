'use server';

import React from 'react';
import { titleFont } from '@/config/fonts';
import { ProductsIndex } from '@/components/products';
import Sections from '@/components/sections/sections';




// Definimos el componente Home
const Home:  React.FC = async () => {
  const userData = {
    name: 'jesus',
    email: 'jesquiliche@hotmail.com',
    password: '3434324324'
  };
 // await registerUser(userData)
 // console.log(await loginUser('jesquiliche@hotmail.com','3434324324'))

  return (
    <main className="py-22">
      <div className="w-12/12 py-20 mx-auto rounded-lg">
        <img
          src="/portada3.jpg"
          className="w-full shadow-lg object-cover h-[600px]"
          alt="Portada"
        />

        <h1
          className={`${titleFont.className} text-shadow-title -mt-80 text-center text-7xl italic text-yellow-200 font-bold`}
        >
          El rincón del vino
        </h1>
      </div>
      <div className="flex justify-center mx-auto w-10/12 mt-32">
        <img
          src="/logo.png"
          className="h-60 w-60 border border-gray-500 rounded-full shadow-xl"
          alt="logo"
        />
      </div>
      <Sections />
  
      <div className="w-11/12 mx-auto">
        <ProductsIndex/>
      </div>
     
    </main>
  );
}

export default Home;
