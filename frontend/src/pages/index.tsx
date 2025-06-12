import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div>

<html lang="es">
<head>

  <title>Hola Mundo</title>
</head>
<body>
  <h1>¡Hola Mundo!</h1>
</body>
</html>

    </div>
  );
}
