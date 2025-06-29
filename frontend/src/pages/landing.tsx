import Proyectos from "@/components/landing/Proyectos";
import Header from "@/components/landing/Header";
import Carousel from "@/components/landing/Carousel";
import Servicios from "@/components/landing/Servicios";
import Nosotros from "@/components/landing/Nosotros";
import Footer from "@/components/landing/Footer";

export default function Landing() {
  return (
    <>
      <Header />

      <main className="p-4">
        <Carousel />
        <Servicios />
        <Nosotros />
        <Proyectos />
        <Footer />
      </main>
    </>
  );
}
