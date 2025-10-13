"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";

interface Props {
  nombre?: string; // ahora es opcional
  editando?: boolean;
}

export default function PortadaPerfil({ nombre = "Usuario", editando = true }: Props) {
  const [portada, setPortada] = useState<File | null>(null);
  const [vistaPrevia, setVistaPrevia] = useState<string | null>(null);

  const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPortada(file);
      setVistaPrevia(URL.createObjectURL(file));
    }
  };

  return (
    <div className="relative w-full h-48 md:h-60 overflow-hidden shadow-lg rounded-b-xl">
      {/* Imagen de portada o fondo por defecto */}
      {vistaPrevia ? (
        <Image
          src={vistaPrevia}
          alt="Portada"
          fill
          className="object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-r from-blue-600 to-indigo-700" />
      )}

      {/* Texto de bienvenida */}
      <div className="absolute bottom-4 left-6 text-white drop-shadow">
        <h1 className="text-2xl md:text-3xl font-bold">
          Bienvenido, {nombre}
        </h1>
        <p className="text-sm text-gray-200">
          Personaliza tu espacio y comparte tus ideas
        </p>
      </div>

      {/* Botón de cambiar portada (más sutil) */}
      {editando && (
        <>
          <label
            htmlFor="portadaInput"
            className="absolute top-4 right-4 flex items-center gap-1 text-xs bg-black bg-opacity-30 text-white px-2 py-1 rounded-md cursor-pointer hover:bg-opacity-50 transition z-10"
            title="Cambiar imagen de portada"
          >
            <Camera size={16} /> Editar
          </label>
          <input
            id="portadaInput"
            type="file"
            accept="image/*"
            onChange={handleImagenChange}
            className="hidden"
          />
        </>
      )}
    </div>
  );
}
