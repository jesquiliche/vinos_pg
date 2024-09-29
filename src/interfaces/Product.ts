import { Decimal } from "@prisma/client/runtime/library";


export interface Producto {
    id: bigint;
    nombre: string;
    bodega?: string | null;
    descripcion: string;
    maridaje: string;
    precio: Decimal;
    graduacion: Decimal;
    ano?: number | null;
    sabor?: string | null;
    imagen: string;
   

  }

  export interface CartProduct {
    id: number;
    nombre: string;
    precio: number;
    imagen: string;
    quantity: number;
  }


  
  
  
export interface ProductoDetalle{
  id: bigint;
  nombre: string;
  bodega?: string | null;
  descripcion: string;
  maridaje: string;
  precio: Decimal;
  graduacion: Decimal;
  ano?: number | null;
  sabor?: string | null;
  tipo_id: bigint;
  imagen: string;
  denominacion_id: bigint;
  created_at: Date | null;
  updated_at: Date | null;
  denominaciones: {
    id: bigint;
    nombre: string;
    descripcion?: string | null;
    created_at: Date | null;
    updated_at: Date | null;
  };
  tipos: {
    id: bigint;
    nombre: string;
    descripcion?: string | null;
    created_at: Date | null;
    updated_at: Date | null;
  };
}

export default Producto;
