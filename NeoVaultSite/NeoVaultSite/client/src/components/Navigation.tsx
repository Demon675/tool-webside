import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/hooks/useAuth';
import { Vault, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();
  const [location] = useLocation();

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navLinks = [
    { href: '/', label: 'Home', id: 'nav-home' },
    { href: '/docs', label: 'Documentation', id: 'nav-docs' },
    { href: '/downloads', label: 'Downloads', id: 'nav-downloads' },
    ...(isAuthenticated ? [
      { href: '/admin', label: 'Admin Panel', id: 'nav-admin' },
      { href: '/settings', label: 'Settings', id: 'nav-settings' },
    ] : []),
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-border" data-testid="navigation">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer" data-testid="logo">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center glow-text">
                <Vault className="text-accent-foreground font-bold" size={20} />
              </div>
              <span className="text-xl font-bold glow-text">NeoVault</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={`text-foreground hover:text-accent transition-colors duration-300 cursor-pointer ${
                    location === link.href ? 'text-accent' : ''
                  }`}
                  data-testid={link.id}
                >
                  {link.label}
                </span>
              </Link>
            ))}
            
            {!isLoading && (
              <>
                {!isAuthenticated ? (
                  <Link href="/login">
                    <Button
                      className="bg-accent text-accent-foreground neon-glow font-medium"
                      data-testid="button-login"
                    >
                      Admin Login
                    </Button>
                  </Link>
                ) : (
                  <Button
                    onClick={async () => {
                      try {
                        await fetch('/api/logout', { 
                          method: 'POST',
                          credentials: 'include'
                        });
                        window.location.href = '/';
                      } catch (error) {
                        window.location.href = '/';
                      }
                    }}
                    className="bg-red-600 text-white neon-glow font-medium hover:bg-red-700"
                    data-testid="button-logout"
                  >
                    Logout
                  </Button>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-16 left-0 w-full h-screen bg-background z-40 transform transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        data-testid="mobile-menu"
      >
        <div className="p-6 space-y-4">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                className={`block text-foreground hover:text-accent transition-colors duration-300 py-2 cursor-pointer ${
                  location === link.href ? 'text-accent' : ''
                }`}
                onClick={closeMobileMenu}
                data-testid={`mobile-${link.id}`}
              >
                {link.label}
              </span>
            </Link>
          ))}
          
          {!isLoading && !isAuthenticated && (
            <Link href="/login">
              <Button
                onClick={closeMobileMenu}
                className="w-full bg-accent text-accent-foreground neon-glow font-medium mt-4"
                data-testid="button-mobile-login"
              >
                Admin Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
