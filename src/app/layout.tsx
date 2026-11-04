import type { Metadata } from "next";
import { CartProvider } from "@/features/cart/cart-context";
import { InputMode } from "@/components/input-mode";
import "./globals.css";

export const metadata: Metadata = {
  title: "Los Patricios Gourmet · Piloto experimental",
  description:
    "Experiencia piloto de Los Patricios Gourmet para Perú y Chile. Fotografías y precios de muestra; sin compras reales.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <head>
        <link
          rel="preload"
          href="/fonts/bebas-0.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/montserrat-0.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <InputMode />
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
