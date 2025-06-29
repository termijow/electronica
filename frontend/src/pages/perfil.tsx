"use client";

import Header from "@/components/landing/Header";
import PortadaPerfil from "@/components/perfil/PortadaPerfil";
import SidebarPerfil from "@/components/perfil/SidebarPerfil";
import PerfilInfo from "@/components/perfil/Comperfil";
import PanelJuegos from "@/components/perfil/PanelJuegos";

export default function PerfilPage() {
  return (
    <>
      <Header isAuthenticated={true} />

      <main
        className="pt-[70px] min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/img/bg-perfil.jpg")' }}
      >
        <PortadaPerfil nombre="Sebastián" />

        <div className="max-w-7xl mx-auto px-4 mt-8 flex flex-col md:flex-row gap-6">
          <SidebarPerfil />
          <div className="flex-1 space-y-6">
            <PerfilInfo />
            <PanelJuegos />
          </div>
        </div>
      </main>
    </>
  );
}
