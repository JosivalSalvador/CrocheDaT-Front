import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapClient from "./components/BootstrapClient";
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar/Navbar";
import { FavoritosProvider } from "./components/favoritosProvider/favoritosProvider";
import { ReactQueryClientProvider } from './components/ReactQueryClient/ReactQueryClient';

export const metadata: Metadata = {
  title: "WA Loja",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <ReactQueryClientProvider>
            <FavoritosProvider>
              <Navbar />
              {children}
              <BootstrapClient />
              <ToastContainer />
            </FavoritosProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
