import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "alt_ctrl_ - Allt Under Kontroll AB",
  description:
    "Svenska bolag med 20-300 anstallda tappar hundratusentals kronor arligen pa processer som borde vara automatiserade. Vi hjalper er hitta och losa dem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:wght@400;500;700&family=DM+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
