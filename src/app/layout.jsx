import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PreLoaderManager from "@/components/Loader/PreLoaderManager";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  metadataBase: new URL("https://kidz-joy.vercel.app/"), // ✅ required for og images to resolve
  title: {
    default: "Kidz Joy — Safe & Fun Toys for Kids",
    template: "%s | Kidz Joy", // ✅ auto appends on child pages
  },
  description:
    "Discover safe, imaginative and educational toys for children aged 3–12.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.className} h-full antialiased`}>
      <body className="min-h-svh">
        <PreLoaderManager />
        <Toaster />
        <header className="bg-primary">
          <Navbar />
        </header>
        <main className="w-full min-h-[calc(100dvh-475px)]">{children}</main>
        <footer className="bg-primary">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
