"use client";

import { useState } from "react";
import Image from "next/image";

export default function PerfilInfo() {
  const [editando, setEditando] = useState(false);
  const [descripcion, setDescripcion] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const [vistaPrevia, setVistaPrevia] = useState<string | null>(null);

  const [datosUsuario, setDatosUsuario] = useState({
    nombre: "Juan",
    apellido: "Pérez",
    edad: "28",
    email: "juan@example.com",
    departamento: "Meta",
    ciudad: "Villavicencio",
  });

  const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFoto(file);
      setVistaPrevia(URL.createObjectURL(file));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDatosUsuario({ ...datosUsuario, [e.target.name]: e.target.value });
  };

  const handleGuardar = () => {
    console.log("Guardando datos...", datosUsuario, descripcion, foto);
    setEditando(false);
    // Aquí podrías enviar los datos al backend
  };

  return (
    <section className="bg-white p-6 rounded-2xl shadow-lg max-w-3xl mx-auto text-gray-800 border border-gray-200">
      <div className="flex flex-col items-center">
        {/* FOTO DE PERFIL CON ICONO + */}
        <div className="relative w-32 h-32 mb-4 group">
          <Image
            src={vistaPrevia || "/user-placeholder.png"}
            alt="Foto de perfil"
            fill
            className="object-cover rounded-full border-4 border-blue-500"
          />

          {editando && (
            <>
              <div className="absolute inset-0 bg-black bg-opacity-20 rounded-full group-hover:bg-opacity-40 transition" />
              <label
                htmlFor="fotoPerfil"
                className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-1 cursor-pointer hover:bg-blue-700 transition"
                title="Cambiar foto de perfil"
              >
                <span className="text-white text-xl leading-none">+</span>
              </label>
              <input
                id="fotoPerfil"
                type="file"
                accept="image/*"
                onChange={handleImagenChange}
                className="hidden"
              />
            </>
          )}
        </div>

        {/* NOMBRE */}
        {editando ? (
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              name="nombre"
              value={datosUsuario.nombre}
              onChange={handleChange}
              className="border rounded px-2 py-1 w-36 text-center"
              placeholder="Nombre"
            />
            <input
              type="text"
              name="apellido"
              value={datosUsuario.apellido}
              onChange={handleChange}
              className="border rounded px-2 py-1 w-36 text-center"
              placeholder="Apellido"
            />
          </div>
        ) : (
          <h2 className="text-2xl font-bold text-blue-800 mb-1">
            {datosUsuario.nombre} {datosUsuario.apellido}
          </h2>
        )}

        {/* DESCRIPCIÓN */}
        {editando ? (
          <input
            type="text"
            maxLength={50}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="border rounded px-3 py-1 w-full max-w-md text-center text-sm"
            placeholder="Escribe una breve descripción (máx. 50 caracteres)"
          />
        ) : (
          <p className="text-gray-600 italic text-sm mb-2">
            {descripcion || "Sin descripción personal"}
          </p>
        )}

        {/* DATOS PERSONALES */}
        <div className="w-full mt-4 space-y-3 text-left">
          {editando ? (
            <>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="edad"
                  value={datosUsuario.edad}
                  onChange={handleChange}
                  className="border rounded px-3 py-1 w-1/2"
                  placeholder="Edad"
                />
                <input
                  type="email"
                  name="email"
                  value={datosUsuario.email}
                  onChange={handleChange}
                  className="border rounded px-3 py-1 w-1/2"
                  placeholder="Email"
                />
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="departamento"
                  value={datosUsuario.departamento}
                  onChange={handleChange}
                  className="border rounded px-3 py-1 w-1/2"
                  placeholder="Departamento"
                />
                <input
                  type="text"
                  name="ciudad"
                  value={datosUsuario.ciudad}
                  onChange={handleChange}
                  className="border rounded px-3 py-1 w-1/2"
                  placeholder="Ciudad"
                />
              </div>
            </>
          ) : (
            <>
              <p><strong>Edad:</strong> {datosUsuario.edad}</p>
              <p><strong>Email:</strong> {datosUsuario.email}</p>
              <p><strong>Departamento:</strong> {datosUsuario.departamento}</p>
              <p><strong>Ciudad:</strong> {datosUsuario.ciudad}</p>
            </>
          )}
        </div>

        {/* BOTONES */}
        <div className="mt-6 flex gap-4">
          {editando ? (
            <button
              onClick={handleGuardar}
              className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition"
            >
              Guardar cambios
            </button>
          ) : (
            <button
              onClick={() => setEditando(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
            >
              Editar perfil
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
