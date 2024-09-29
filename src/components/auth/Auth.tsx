"use client";

import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";
import { syncUser } from "@/actions/users-actions";
import useUserStore from "@/store/useUserStore"; // Importamos el store

const Auth = () => {
  const { setUserId } = useUserStore(); // Accedemos a la función para actualizar el userId
  const { user } = useUser(); // Hook de Clerk para obtener el usuario autenticado

  useEffect(() => {
    const handleSyncUser = async () => {
      await syncUser(); // Llamada a la Server Action para sincronizar el usuario
    };

    if (user) {
      console.log(user)
      setUserId(user.id); // Guardamos el userId en Zustand cuando el usuario esté autenticado
      handleSyncUser();
    }
  }, [user, setUserId]);

  return (
    <div className="relative">
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton /> {/* Muestra el botón de usuario */}
      </SignedIn>
    </div>
  );
};

export default Auth;
