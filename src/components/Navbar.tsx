import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Reach Out", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50">
      {/* Brick Header Section */}
      <div 
        className="relative py-4 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/brick-wall.webp')" }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="container-wide relative z-10">
          <div className="flex items-center justify-between">
            {/* Left Logo */}
            <Link to="/" className="flex-shrink-0">
              <img 
                src={logo} 
                alt="The Grounds Logo" 
                className="w-16 h-16 md:w-20 md:h-20 bg-cream rounded-full p-1"
              />
            </Link>

            {/* Center Text */}
            <div className="text-center flex-1 px-4">
              <h1 className="font-display text-xl md:text-3xl lg:text-4xl text-cream tracking-wider uppercase">
                The Grounds Meat & Deli
              </h1>
              <p className="text-cream/90 text-xs md:text-sm tracking-[0.3em] uppercase mt-1">
                Tradition Tastes Better
              </p>
            </div>

            {/* Right Logo */}
            <Link to="/" className="flex-shrink-0 hidden md:block">
              <img 
                src={logo} 
                alt="The Grounds Logo" 
                className="w-16 h-16 md:w-20 md:h-20 bg-cream rounded-full p-1"
              />
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-cream hover:bg-cream/20"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-background border-b border-border">
        <div className="container-wide">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center gap-2 py-3">
            {navLinks.map((link, index) => (
              <div key={link.path} className="flex items-center">
                <Link
                  to={link.path}
                  className={`px-4 py-1 font-medium tracking-wider uppercase text-sm transition-colors duration-200 ${
                    isActive(link.path)
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  {link.name}
                </Link>
                {index < navLinks.length - 1 && (
                  <span className="text-muted-foreground">|</span>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden py-4 border-t border-border animate-fade-up">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`font-medium py-2 tracking-wider uppercase text-sm transition-colors duration-200 ${
                      isActive(link.path)
                        ? "text-primary"
                        : "text-foreground hover:text-primary"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
