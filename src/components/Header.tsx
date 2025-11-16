import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto max-w-7xl px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-primary hover:text-primary/80">
            Socio-Guide
          </Link>
          
          <div className="flex items-center gap-2">
            <Link to="/simulador-bolsa-familia-2026">
              <Button variant="default" size="sm" className="hidden md:inline-flex">
                Simular 2026
              </Button>
            </Link>
            <Link to="/blog">
              <Button variant="ghost">Blog</Button>
            </Link>
            <Link to="/calculadoras">
              <Button variant="ghost">Calculadoras</Button>
            </Link>
            <Link to="/sobre">
              <Button variant="ghost">Sobre</Button>
            </Link>
            <Link to="/contato">
              <Button variant="ghost">Contato</Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
