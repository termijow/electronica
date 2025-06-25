import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      {/* Resto del landing page */}
      <main className="p-8 text-gray-700">
        <h2 className="text-3xl font-bold">Bienvenido a nuestra página</h2>
        <p className="mt-4">Aquí irá el contenido del landing...</p>
      </main>
    </>
  );
}
