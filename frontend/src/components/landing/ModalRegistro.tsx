"use client";

import { useState } from "react";
import { useEscClose } from "@/hooks/useEscClose";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const departamentosColombia: Record<string, string[]> = {
  "Amazonas": ["Leticia", "Puerto Nariño"],
  "Antioquia": ["Medellín", "Envigado", "Itagüí", "Bello", "Rionegro"],
  "Arauca": ["Arauca", "Saravena", "Tame"],
  "Atlántico": ["Barranquilla", "Soledad", "Malambo", "Puerto Colombia"],
  "Bolívar": ["Cartagena", "Magangué", "Turbaco"],
  "Boyacá": ["Tunja", "Duitama", "Sogamoso"],
  "Caldas": ["Manizales", "Villamaría", "La Dorada"],
  "Caquetá": ["Florencia", "San Vicente del Caguán"],
  "Casanare": ["Yopal", "Aguazul", "Villanueva"],
  "Cauca": ["Popayán", "Santander de Quilichao", "Puerto Tejada"],
  "Cesar": ["Valledupar", "Aguachica", "Codazzi"],
  "Chocó": ["Quibdó", "Istmina", "Tadó"],
  "Córdoba": ["Montería", "Cereté", "Lorica"],
  "Cundinamarca": ["Bogotá", "Soacha", "Zipaquirá", "Girardot"],
  "Guainía": ["Inírida"],
  "Guaviare": ["San José del Guaviare"],
  "Huila": ["Neiva", "Pitalito", "Garzón"],
  "La Guajira": ["Riohacha", "Maicao", "Uribia"],
  "Magdalena": ["Santa Marta", "Ciénaga", "Fundación"],
  "Meta": [
    "Villavicencio", "Acacías", "Granada", "Puerto López", "San Martín", "Restrepo", "Cumaral",
    "Castilla la Nueva", "Guamal", "San Juan de Arama", "El Dorado", "Lejanías", "Puerto Gaitán"
  ],
  "Nariño": ["Pasto", "Tumaco", "Ipiales"],
  "Norte de Santander": ["Cúcuta", "Ocaña", "Pamplona"],
  "Putumayo": ["Mocoa", "Puerto Asís", "Sibundoy"],
  "Quindío": ["Armenia", "Calarcá", "Montenegro"],
  "Risaralda": ["Pereira", "Dosquebradas", "La Virginia"],
  "San Andrés y Providencia": ["San Andrés"],
  "Santander": ["Bucaramanga", "Floridablanca", "Girón", "Piedecuesta"],
  "Sucre": ["Sincelejo", "Corozal", "Sampués"],
  "Tolima": ["Ibagué", "Espinal", "Melgar"],
  "Valle del Cauca": ["Cali", "Palmira", "Buenaventura", "Tuluá", "Buga"],
  "Vaupés": ["Mitú"],
  "Vichada": ["Puerto Carreño"]
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalRegistro({ isOpen, onClose }: Props) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [edad, setEdad] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [departamento, setDepartamento] = useState<string>("");
  const [ciudad, setCiudad] = useState<string>("");
  const [mensaje, setMensaje] = useState<string | null>(null);

  const ciudades = departamento ? departamentosColombia[departamento] : [];

  useEscClose(isOpen, onClose);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje(null);

    if (!nombre || !apellido || !edad || !departamento || !ciudad || !email || !emailConfirm) {
      setMensaje("Por favor completa todos los campos.");
      return;
    }

    if (email !== emailConfirm) {
      setMensaje("Los correos no coinciden.");
      return;
    }

    try {
      const res = await fetch("/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, apellido, edad, departamento, ciudad, email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.error || "Error al registrar");
      } else {
        setMensaje("Usuario registrado exitosamente");
        setNombre("");
        setApellido("");
        setEdad("");
        setDepartamento("");
        setCiudad("");
        setEmail("");
        setEmailConfirm("");
        onClose();
      }
    } catch (error) {
      setMensaje("Error del servidor. Intenta más tarde.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
            >
              <X size={24} />
            </button>

            <div className="flex items-center justify-center mb-6">
              <Image
                src="/logo.png"
                alt="Logo empresa"
                width={40}
                height={40}
                className="mr-2"
              />
              <h1 className="text-xl font-semibold text-blue-700">Mi Empresa S.A.S</h1>
            </div>

            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
              Registro de Usuario
            </h2>

            {mensaje && <p className="text-center text-sm text-red-500 mb-2">{mensaje}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-1/2 border border-gray-300 rounded-lg px-4 py-2"
                />
                <input
                  type="text"
                  placeholder="Apellido"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  className="w-1/2 border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              <input
                type="number"
                placeholder="Edad"
                value={edad}
                onChange={(e) => setEdad(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />

              {/* Departamento Combobox */}
              <Popover>
                <PopoverTrigger asChild>
                  <button type="button" className="w-full border border-gray-300 rounded-lg px-4 py-2 text-left">
                    {departamento || "Seleccione un departamento"}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="z-[1001] w-full p-0 rounded-2xl shadow-xl">
                  <Command>
                    <CommandInput placeholder="Buscar departamento..." className="px-3 py-2" />
                    <CommandEmpty>No se encontró ningún departamento.</CommandEmpty>
                    <CommandGroup>
                      {Object.keys(departamentosColombia).map((depto) => (
                        <CommandItem
                          key={depto}
                          onSelect={() => {
                            setDepartamento(depto);
                            setCiudad("");
                          }}
                        >
                          {depto}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>

              {/* Ciudad */}
              <select
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)}
                disabled={!departamento}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none disabled:opacity-50"
              >
                <option value="">
                  {departamento ? "Seleccione una ciudad" : "Seleccione un departamento primero"}
                </option>
                {ciudades.map((ciudad) => (
                  <option key={ciudad} value={ciudad}>
                    {ciudad}
                  </option>
                ))}
              </select>

              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                type="email"
                placeholder="Confirmar correo electrónico"
                value={emailConfirm}
                onChange={(e) => setEmailConfirm(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
              >
                Crear cuenta
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
