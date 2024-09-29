
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  address: {
    nombre:string;
    apellidos:string;
    calle: string;
    numero: string;
    escalera: string;
    piso: string;
    puerta: string;
    poblacion: string;
    provincia: string;
    user_id: number;
    userId: string;
    telefono: string;
  };

  // Methods
  setAddress: (address: State["address"]) => void;
}

export const useAddressStore = create<State>()(
  persist(
    (set, get) => ({
      address: {
        nombre:"",
        apellidos:"",
        calle: "",
        numero: "",
        escalera: "",
        piso: "",
        puerta: "",
        poblacion: "",
        provincia: "",
        user_id: 0,
        userId:"",
        telefono: ""
      },

      setAddress: (address) => {
        set({ address });
      },
    }),
    {
      name: "address-storage",
    }
  )
);
