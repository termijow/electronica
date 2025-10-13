import { Briefcase, FilePlus, BookOpen } from "lucide-react";

export default function SidebarPerfil() {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-white rounded-xl shadow-md p-4 space-y-4 border border-gray-200">
      <h2 className="text-lg font-semibold text-blue-800">Opciones</h2>
      <button className="flex items-center gap-2 text-left hover:bg-blue-100 px-3 py-2 rounded-md text-gray-700">
        <FilePlus size={18} /> Crear proyecto
      </button>
      <button className="flex items-center gap-2 text-left hover:bg-blue-100 px-3 py-2 rounded-md text-gray-700">
        <Briefcase size={18} /> Solicitar servicio
      </button>
      <button className="flex items-center gap-2 text-left hover:bg-blue-100 px-3 py-2 rounded-md text-gray-700">
        <BookOpen size={18} /> Mis proyectos
      </button>
    </aside>
  );
}
