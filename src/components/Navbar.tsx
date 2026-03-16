import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X, Search, User, Shield } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/logo.jpeg";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/categories", label: "Categories" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, isAdmin, signOut } = useAuth();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Harpre Naturals" className="h-10 w-auto rounded-full" />
          <span className="font-display text-lg font-semibold text-foreground hidden sm:block">Harpre Naturals</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`font-body text-sm transition-colors hover:text-primary ${location.pathname === l.to ? "text-primary font-semibold" : "text-muted-foreground"}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 text-muted-foreground hover:text-primary transition-colors">
            <Search className="h-5 w-5" />
          </button>
          <Link to="/cart" className="relative p-2 text-muted-foreground hover:text-primary transition-colors">
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-sans font-semibold">
                {totalItems}
              </span>
            )}
          </Link>
          {isAdmin && (
            <Link to="/admin" className="p-2 text-muted-foreground hover:text-primary transition-colors" title="Admin">
              <Shield className="h-5 w-5" />
            </Link>
          )}
          {user ? (
            <button onClick={signOut} className="p-2 text-muted-foreground hover:text-primary transition-colors" title="Sign Out">
              <User className="h-5 w-5" />
            </button>
          ) : (
            <Link to="/login" className="p-2 text-muted-foreground hover:text-primary transition-colors" title="Sign In">
              <User className="h-5 w-5" />
            </Link>
          )}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-muted-foreground">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-border px-4 py-3 bg-background">
          <div className="container mx-auto">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded-full border border-border bg-muted/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 font-body text-sm"
              autoFocus
            />
          </div>
        </div>
      )}

      {mobileOpen && (
        <nav className="md:hidden border-t border-border bg-background px-4 py-4 space-y-3">
          {navLinks.map(l => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMobileOpen(false)}
              className={`block font-body text-sm py-2 transition-colors ${location.pathname === l.to ? "text-primary font-semibold" : "text-muted-foreground"}`}
            >
              {l.label}
            </Link>
          ))}
          {isAdmin && (
            <Link to="/admin" onClick={() => setMobileOpen(false)} className="block font-body text-sm py-2 text-muted-foreground">Admin Dashboard</Link>
          )}
          {!user && (
            <Link to="/login" onClick={() => setMobileOpen(false)} className="block font-body text-sm py-2 text-muted-foreground">Sign In</Link>
          )}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
