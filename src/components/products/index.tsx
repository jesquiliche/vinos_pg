"use client";

import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import {
    getFilteredProducts,
} from "@/actions/productos-actions";
import { getAllTipos } from "@/actions/tpos-action";
import { getAllDenominaciones } from "@/actions/denominacines-actions";
import { Producto } from "@/interfaces/Product";
import ProductView from "./productView";

import { PacificoFont } from "@/config/fonts";

// Definir la interfaz de opciones de filtro
interface FilterOptions {
  nombre?: string;
  bodega?: string;
  descripcion?: string;
  maridaje?: string;
  precioMin?: number;
  precioMax?: number;
  graduacionMin?: number;
  graduacionMax?: number;
  ano?: number;
  sabor?: string;
  tipo_id?: bigint;
  denominacion_id?: bigint;
}

// Definir los props para el componente
interface ProductsIndexProps {
  initialFilters?: FilterOptions; // Props para valores de filtro iniciales
}

export const ProductsIndex: React.FC<ProductsIndexProps> = ({
  initialFilters = {},
}) => {
  const [products, setProducts] = useState<Producto[]>([]);
  const [tipos, setTipos] = useState<any[]>([]);
  const [dop, setDop] = useState<any[]>([]);

  // Estado del formulario con valores iniciales desde props
  const [formData, setFormData] = useState<FilterOptions>({
    nombre: initialFilters.nombre || "",
    bodega: initialFilters.bodega || "",
    descripcion: initialFilters.descripcion || "",
    maridaje: initialFilters.maridaje || "",
    precioMin: initialFilters.precioMin ?? 0, // Valor predeterminado
    precioMax: initialFilters.precioMax ?? 50, // Valor predeterminado
    graduacionMin: initialFilters.graduacionMin ?? 0, // Valor predeterminado
    graduacionMax: initialFilters.graduacionMax ?? 20, // Valor predeterminado
    ano: initialFilters.ano ?? undefined,
    sabor: initialFilters.sabor || "",
    tipo_id: initialFilters.tipo_id ?? undefined,
    denominacion_id: initialFilters.denominacion_id ?? undefined,
  });

  // Cargar los datos al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProducts = await getFilteredProducts(initialFilters);
        const fetchedTipos = await getAllTipos();
        const fetchedDop = await getAllDenominaciones();

        setProducts(fetchedProducts);
        setTipos(fetchedTipos);
        setDop(fetchedDop);
      } catch (error) {
        console.error("Error al obtener los datos", error);
      }
    };

    fetchData();
  }, []);

  // Maneja los cambios en los campos del formulario
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    setFormData((prevData) => {
      // Convertir valores a tipo adecuado
      const parsedValue =
        name === "precioMin" || name === "precioMax"
          ? parseFloat(value) || undefined
          : name === "graduacionMin" || name === "graduacionMax"
          ? parseFloat(value) || undefined
          : name === "ano"
          ? parseInt(value) || undefined
          : value;

      return {
        ...prevData,
        [name]: parsedValue,
      };
    });
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Preparar los filtros para la llamada a la API
      const filters: FilterOptions = {
        ...formData,
        tipo_id: formData.tipo_id ? BigInt(formData.tipo_id) : undefined,
        denominacion_id: formData.denominacion_id
          ? BigInt(formData.denominacion_id)
          : undefined,
      };

      const filteredProducts = await getFilteredProducts(filters);
      setProducts(filteredProducts);
    } catch (error) {
      console.error("Error al obtener los productos filtrados:", error);
    }
  };

  // Función para resetear el formulario
  const handleReset = () => {
    setFormData({
      nombre: "",
      bodega: "",
      descripcion: "",
      maridaje: "",
      precioMin: 0,
      precioMax: 50,
      graduacionMin: 0,
      graduacionMax: 20,
      ano: undefined,
      sabor: "",
      tipo_id: undefined,
      denominacion_id: undefined,
    });
  };

  return (
    <>
      <div className="py-10">
        <h1
          className={`${PacificoFont.className} text-center text-4xl italic text-gray-900 font-bold`}
        >
          Catálogo
        </h1>
      </div>

      <div className="flex space-x-4">
        <div className="w-1/4 border-gray-400">
          <h2 className="text-2xl font-bold text-center mb-2">Filtro</h2>
          <form onSubmit={handleSubmit}>
          <div className="flex justify-between mb-4">
              <label className="font-semibold">Tipo : </label>
              <select
                name="tipo_id"
                value={formData.tipo_id?.toString() || ""}
                onChange={handleChange}
                className="border-gray-400 bg-gray-100 rounded-md"
              >
                <option value="">Seleccione tipo</option>
                {tipos.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-between">
              <label className="font-semibold">D.O.P : </label>
              <select
                name="denominacion_id"
                value={formData.denominacion_id?.toString() || ""}
                onChange={handleChange}
                className="border-gray-400 bg-gray-100 rounded-md mb-5"
              >
                <option value="">Seleccione D.O.P</option>
                {dop.map((deno) => (
                  <option key={deno.id} value={deno.id}>
                    {deno.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-between">
              <label className="font-semibold">Nombre : </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre || ""}
                onChange={handleChange}
                className="border-gray-400 bg-gray-100 rounded-md mb-4"
              />
            </div>
            
            <div className="flex justify-between">
              <label className="font-semibold">Bodega : </label>
              <input
                type="text"
                name="bodega"
                value={formData.bodega || ""}
                onChange={handleChange}
                className="border-gray-400 bg-gray-100 rounded-md mb-4"
              />
            </div>
            
            <div className="flex justify-between">
              <label className="font-semibold">Precio min : </label>
              <input
                type="range"
                name="precioMin"
                max="50"
                value={formData.precioMin ?? 0}
                onChange={handleChange}
                className="border-gray-400 bg-gray-100 rounded-md mb-4"
              />
              <p className="text-blue-600">{formData.precioMin ?? 0}</p>
            </div>
            <div className="flex justify-between">
              <label className="font-semibold">Precio max : </label>
              <input
                type="range"
                step="0.10"
                max="50"
                name="precioMax"
                value={formData.precioMax ?? 50}
                onChange={handleChange}
                className="border-gray-400 bg-gray-100 rounded-md mb-4"
              />
              <p className="text-blue-600">{formData.precioMax ?? 50}</p>
            </div>
            <div className="flex justify-between">
              <label className="font-semibold">Graduación min : </label>
              <input
                type="range"
                step="0.1"
                max="20"
                name="graduacionMin"
                value={formData.graduacionMin ?? 0}
                onChange={handleChange}
                className="border-gray-400 bg-gray-100 rounded-md mb-4"
              />
              <p className="text-blue-600">{formData.graduacionMin ?? 0}</p>
            </div>
            <div className="flex justify-between">
              <label className="font-semibold">Graduación max : </label>
              <input
                type="range"
                step="0.1"
                name="graduacionMax"
                max="20"
                value={formData.graduacionMax ?? 20}
                onChange={handleChange}
                className="border-gray-400 bg-gray-100 rounded-md mb-4"
              />
              <p className="text-blue-600">{formData.graduacionMax ?? 20}</p>
            </div>
            <div className="flex justify-between">
              <label className="font-semibold">Año : </label>
              <input
                type="number"
                name="ano"
                value={formData.ano ?? ""}
                onChange={handleChange}
                className="border-gray-400 bg-gray-100 rounded-md mb-4"
              />
            </div>
           
            <div className="flex space-x-2 items-center">
              <button type="submit" className="btn-primary">
                Filtrar
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="btn-primary"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
        <div className="grid grid-cols-4 w-9/12 mx-auto">
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
      </div>
    </>
  );
};
