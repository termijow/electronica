"use client";

import { useState } from "react";
import { useEscClose } from "@/hooks/useEscClose"; // ✅ Hook personalizado
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalLogin({ isOpen, onClose }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Hook para cerrar con tecla Escape
  useEscClose(isOpen, onClose);

  const handleGoogleLogin = () => {
    // Aquí va la lógica real con Firebase, NextAuth, etc.
    alert("Iniciar sesión con Google aún no implementado.");
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
            className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full relative"
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
              <h1 className="text-xl font-semibold text-blue-700">MMAGVOS SAS</h1>
            </div>

            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Iniciar Sesión
            </h2>

            <form className="space-y-4">
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />

              <div className="text-right text-sm">
                <a href="#" className="text-blue-600 hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
              >
                Ingresar
              </button>
            </form>

            <div className="my-4 flex items-center">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-3 text-gray-500 text-sm">o</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            <button
              onClick={handleGoogleLogin}
              className="w-full border border-gray-300 py-2 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-100 transition"
            >
              <Image
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                width={20}
                height={20}
              />
              <span className="text-sm font-medium text-gray-700">
                Continuar con Google
              </span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
