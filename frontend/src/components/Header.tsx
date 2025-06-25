import Link from "next/link";
import { motion } from "framer-motion";

const navItems = [
  { name: "Inicio", href: "/" },
  { name: "Nosotros", href: "#nosotros" },
  { name: "Servicios", href: "#servicios" },
  { name: "Productos", href: "#productos" },
];

export default function Header() {
  return (
    <header className="bg-blue-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo + Nombre */}
        <div className="flex items-center space-x-3">
          <img src="/logo.svg" alt="Logo" className="h-10 w-10" />
          <h1 className="text-xl font-bold text-white">Mi Empresa</h1>
        </div>

        {/* Navegación */}
        <nav className="flex items-center space-x-6">
          {navItems.map((item) => (
            <motion.div
              key={item.name}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="transition-colors duration-300"
            >
              <Link href={item.href} className="text-white hover:text-yellow-300 font-medium">
                {item.name}
              </Link>
            </motion.div>
          ))}
          {/* Botones */}
          <Link href="/login" className="text-white hover:text-green-300 font-medium">
            Ingresar
          </Link>
          <Link
            href="/registro"
            className="bg-white text-blue-600 px-3 py-1 rounded-xl hover:bg-yellow-300 hover:text-blue-800 transition"
          >
            Registrarse
          </Link>
        </nav>
      </div>
    </header>
  );
}
