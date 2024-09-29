"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getAllProvincias } from "@/actions/provincias-actions";
import { PacificoFont } from "@/config/fonts";
import { useAddressStore } from "@/store/useAddressStore";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { provincia } from "@prisma/client";
import { filterPoblacionByCodigo } from "@/actions/poblacion-actions"; // Asegúrate de que esta ruta sea correcta

import { useUser } from "@clerk/nextjs";

interface FormValues {
  user_id: number;
  userId: string;
  nombre: string;
  apellidos: string;
  calle: string;
  numero: string;
  escalera: string;
  piso: string;
  puerta: string;
  telefono: string;
  provincia: string;
  poblacion: string;
}

const FormularioDireccion: React.FC = () => {
  const address = useAddressStore((state) => state.address);
  const setAddress = useAddressStore((state) => state.setAddress);
  const [provincias, setProvincias] = useState<provincia[]>([]);
  const [poblaciones, setPoblaciones] = useState<any[]>([]);
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
   

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset, // Añadido para resetear los valores
  } = useForm<FormValues>({
    defaultValues: {
      user_id: 1,
      userId: "",
      nombre: "",
      apellidos: "",
      calle: "",
      numero: "",
      escalera: "",
      piso: "",
      puerta: "",
      telefono: "",
      provincia: "",
      poblacion: "",
    },
  });

  // Cargar provincias cuando el componente se monte
  useEffect(() => {
    const fetchProvincias = async () => {
      const provinciasData: provincia[] = await getAllProvincias();
      setProvincias(provinciasData);
    };
    fetchProvincias();
  }, []);

  // Cargar datos del formulario desde Zustand
  useEffect(() => {
    if (address) {
      reset({
        user_id: address.user_id,
        userId: address.userId || (user?.id ?? ""),
        nombre: address.nombre || "",
        apellidos: address.apellidos || "",
        calle: address.calle || "",
        numero: address.numero || "",
        escalera: address.escalera || "",
        piso: address.piso || "",
        puerta: address.puerta || "",
        telefono: address.telefono || "",
        provincia: address.provincia || "",
        poblacion: address.poblacion || "",
      });

      // Cargar poblaciones si la provincia ya está definida
      if (address.provincia) {
        const fetchPoblaciones = async () => {
          const poblacionesData = await filterPoblacionByCodigo(
            address.provincia
          );
          setPoblaciones(poblacionesData);
          // Establecer la población en el formulario si está presente en los datos de dirección
          if (address.poblacion) {
            setValue("poblacion", address.poblacion);
          }
        };
        fetchPoblaciones();
      }
    }
  }, [address, reset, setValue]);

  // Manejar el cambio de provincia
  const handleProvinciaChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const provinciaSeleccionada = event.target.value;
    setValue("provincia", provinciaSeleccionada);
    setValue("poblacion", ""); // Limpiar el campo de población cuando cambie la provincia

    if (provinciaSeleccionada) {
      const poblacionesData = await filterPoblacionByCodigo(
        provinciaSeleccionada
      );
      setPoblaciones(poblacionesData);
    } else {
      setPoblaciones([]);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setAddress(data);
    router.push("/confirm");
  };

  return (
    <div className="w-10/12 mx-auto px-4 py-20 bg-white">
      <h1
        className={`${PacificoFont.className} text-4xl font-semibold mb-6 text-center`}
      >
        Dirección de entrega
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="mb-4">
            <label
              htmlFor="nombre"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              placeholder="Nombre"
              className="form-control"
              {...register("nombre", { required: "Este campo es obligatorio" })}
            />
            {errors.nombre && (
              <span className="text-red-500">{errors.nombre.message}</span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="apellidos"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Apellidos
            </label>
            <input
              type="text"
              id="apellidos"
              placeholder="Apellidos"
              className="form-control"
              {...register("apellidos", {
                required: "Este campo es obligatorio",
              })}
            />
            {errors.apellidos && (
              <span className="text-red-500">{errors.apellidos.message}</span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="calle"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Calle
            </label>
            <input
              type="text"
              id="calle"
              placeholder="Calle"
              className="form-control"
              {...register("calle", { required: "Este campo es obligatorio" })}
            />
            {errors.calle && (
              <span className="text-red-500">{errors.calle.message}</span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="numero"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Número
            </label>
            <input
              type="text"
              id="numero"
              placeholder="Número"
              className="form-control"
              {...register("numero", { required: "Este campo es obligatorio" })}
            />
            {errors.numero && (
              <span className="text-red-500">{errors.numero.message}</span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="escalera"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Escalera
            </label>
            <input
              type="text"
              id="escalera"
              placeholder="Escalera"
              className="form-control"
              {...register("escalera")}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="piso"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Piso
            </label>
            <input
              type="text"
              id="piso"
              placeholder="Piso"
              className="form-control"
              {...register("piso", { required: "Este campo es obligatorio" })}
            />
            {errors.piso && (
              <span className="text-red-500">{errors.piso.message}</span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="puerta"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Puerta
            </label>
            <input
              type="text"
              id="puerta"
              placeholder="Puerta"
              className="form-control"
              {...register("puerta")}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="telefono"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Teléfono
            </label>
            <input
              type="tel"
              id="telefono"
              placeholder="Teléfono"
              className="form-control"
              {...register("telefono", {
                required: "Este campo es obligatorio",
              })}
            />
            {errors.telefono && (
              <span className="text-red-500">{errors.telefono.message}</span>
            )}
          </div>

          <div className="mb-4 col-span-2 md:col-span-1">
            <label
              htmlFor="provincia"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Provincia
            </label>
            <select
              id="provincia"
              className="form-control text-xs md:text-sm"
              {...register("provincia", {
                required: "Este campo es obligatorio",
              })}
              onChange={handleProvinciaChange}
            >
              <option key="" value="">
                Seleccionar Provincia
              </option>
              {provincias.map((p) => (
                <option
                  key={p.id}
                  value={p.codigo}
                  selected={p.codigo === address.provincia}
                >
                  {p.nombre}
                </option>
              ))}
            </select>
            {errors.provincia && (
              <span className="text-red-500">{errors.provincia.message}</span>
            )}
          </div>

          <div className="mb-4 col-span-2 md:col-span-1">
            <label
              htmlFor="poblacion"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Población
            </label>
            <select
              id="poblacion"
              className="form-control text-xs md:text-sm"
              {...register("poblacion", {
                required: "Este campo es obligatorio",
              })}
            >
              <option key="" value="">
                Seleccionar Población
              </option>
              {poblaciones.map((p) => (
                <option
                  key={p.id}
                  value={p.codigo}
                  selected={p.codigo === address.poblacion}
                >
                  {p.nombre}
                </option>
              ))}
            </select>
            {errors.poblacion && (
              <span className="text-red-500">{errors.poblacion.message}</span>
            )}
          </div>
        </div>
        <div className="w-1/5 mx-auto">
          <button type="submit" className="btn-primary">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioDireccion;
