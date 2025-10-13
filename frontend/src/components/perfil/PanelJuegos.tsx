"use client";

import { useState } from "react";
import { Gamepad2, Trophy } from "lucide-react";

export default function PanelJuegos() {
  const [nivel, setNivel] = useState(3); // puedes alimentarlo dinámicamente luego
  const [progreso, setProgreso] = useState(45); // porcentaje de nivel

  return (
    <section className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Tu progreso en Juegos Educativos</h2>
        {nivel >= 10 && <Trophy className="text-yellow-400 w-6 h-6" />}
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600">Nivel actual: <strong className="text-blue-700">Nivel {nivel}</strong></p>
        <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-green-500 h-4 rounded-full transition-all"
            style={{ width: `${progreso}%` }}
          />
        </div>
        <p className="text-xs text-right text-gray-500 mt-1">{progreso}% completado</p>
      </div>

      <button
        onClick={() => alert("Redirigir al juego...")}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition"
      >
        <Gamepad2 size={18} />
        Jugar ahora
      </button>
    </section>
  );
}
