import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function PublicLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <header className="bg-primary sticky top-0 z-50">
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
