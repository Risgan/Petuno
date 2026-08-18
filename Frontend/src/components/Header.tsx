import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Menu, X, PawPrint, UserCircle, LogOut } from 'lucide-react';
import type { ModuleConfig } from '../types';

export default function Header({ 
  isDarkMode, 
  toggleTheme, 
  user, 
  onLogout,
  onOpenScanner,
  onOpenDonations,
  modulesConfig
}: { 
  isDarkMode: boolean; 
  toggleTheme: () => void; 
  user: { name: string } | null;
  onLogout: () => void;
  onOpenScanner?: () => void;
  onOpenDonations?: () => void;
  modulesConfig?: ModuleConfig;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (window.location.pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const hasSos = modulesConfig ? modulesConfig.sos : true;
  const hasAdoptions = modulesConfig ? modulesConfig.adoptions : true;
  const hasDonations = modulesConfig ? modulesConfig.donations : true;

  return (
    <header className="fixed top-0 w-full bg-petuno-surface dark:bg-dark-surface z-50 transition-colors border-b border-petuno-border dark:border-petuno-secondary-text/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2">
            <Link to="/" onClick={(e) => handleNavClick(e, 'home-top')} className="flex items-center gap-2 text-petuno-text dark:text-dark-text font-bold text-2xl tracking-tight">
              <PawPrint className="w-8 h-8 text-petuno-purple dark:text-petuno-purple-light" fill="currentColor" />
              petuno
            </Link>
          </div>
          
          <nav className="hidden lg:flex space-x-8 items-center font-medium">
            <Link to="/" onClick={(e) => handleNavClick(e, 'home-top')} className="text-sm text-petuno-purple dark:text-petuno-purple-light">Inicio</Link>
            
            {hasSos && (
              <Link to="/#map-section" onClick={(e) => handleNavClick(e, 'map-section')} className="text-sm text-petuno-text hover:text-petuno-purple dark:text-dark-text dark:hover:text-petuno-purple-light transition-colors">Buscar Mascota</Link>
            )}
            
            {hasAdoptions && (
              <Link to="/adopcion" className="text-sm text-petuno-text hover:text-petuno-purple dark:text-dark-text dark:hover:text-petuno-purple-light transition-colors">Adopción</Link>
            )}
            
            {hasDonations && (
              <button 
                onClick={() => onOpenDonations?.()} 
                className="text-sm text-petuno-text hover:text-petuno-purple dark:text-dark-text dark:hover:text-petuno-purple-light transition-colors font-semibold"
              >
                Donaciones
              </button>
            )}
            
            {hasSos && (
              <button 
                onClick={() => onOpenScanner?.()} 
                className="text-sm text-petuno-text hover:text-petuno-purple dark:text-dark-text dark:hover:text-petuno-purple-light transition-colors font-semibold"
              >
                Escanear Placa
              </button>
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-petuno-background dark:hover:bg-dark-surface-elevated transition-colors text-petuno-secondary-text dark:text-dark-secondary-text">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <div className="w-px h-6 bg-petuno-border dark:bg-petuno-secondary-text/30 mx-2"></div>
            {user ? (
              <>
                <Link to="/app" className="text-sm font-semibold text-petuno-purple dark:text-petuno-purple-light hover:underline flex items-center gap-1">
                  <UserCircle className="w-5 h-5" /> Mi Panel
                </Link>
                <button onClick={onLogout} className="text-sm font-semibold text-petuno-coral hover:text-petuno-coral/80 flex items-center gap-1">
                  <LogOut className="w-4 h-4" /> Salir
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-semibold text-petuno-text dark:text-dark-text hover:text-petuno-purple">Iniciar sesión</Link>
                <Link to="/register" className="bg-petuno-purple hover:bg-petuno-purple-dark text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm">
                  Registrarse
                </Link>
              </>
            )}
          </div>

          <div className="lg:hidden flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 text-petuno-secondary-text">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-petuno-text dark:text-dark-text">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-petuno-surface dark:bg-dark-surface border-b border-petuno-border dark:border-petuno-secondary-text/30">
          <div className="px-4 pt-2 pb-4 space-y-1 font-semibold text-left">
            <Link to="/" onClick={(e) => { handleNavClick(e, 'home-top'); setIsMobileMenuOpen(false); }} className="block px-3 py-2 rounded-md text-base font-semibold text-petuno-purple">Inicio</Link>
            
            {hasSos && (
              <Link to="/#map-section" onClick={(e) => { handleNavClick(e, 'map-section'); setIsMobileMenuOpen(false); }} className="block px-3 py-2 rounded-md text-base text-petuno-text dark:text-dark-text">Buscar Mascota</Link>
            )}
            
            {hasAdoptions && (
              <Link to="/adopcion" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base text-petuno-text dark:text-dark-text">Adopción</Link>
            )}
            
            {hasDonations && (
              <button 
                onClick={() => { onOpenDonations?.(); setIsMobileMenuOpen(false); }} 
                className="block w-full text-left px-3 py-2 rounded-md text-base text-petuno-text dark:text-dark-text hover:bg-petuno-background dark:hover:bg-dark-surface-elevated transition-all"
              >
                Donaciones
              </button>
            )}
            
            {hasSos && (
              <button 
                onClick={() => { onOpenScanner?.(); setIsMobileMenuOpen(false); }} 
                className="block w-full text-left px-3 py-2 rounded-md text-base text-petuno-text dark:text-dark-text hover:bg-petuno-background dark:hover:bg-dark-surface-elevated transition-all"
              >
                Escanear Placa
              </button>
            )}
            
            <div className="pt-4 flex flex-col gap-2">
              {user ? (
                <>
                  <Link to="/app" className="block text-center px-3 py-2 rounded-lg bg-petuno-purple-50 dark:bg-dark-surface-elevated text-base text-petuno-purple">Mi Panel</Link>
                  <button onClick={onLogout} className="block text-center px-3 py-2 rounded-lg bg-petuno-coral-light text-petuno-coral text-base">Salir</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block text-center px-3 py-2 rounded-lg border border-petuno-border dark:border-petuno-secondary-text text-base text-petuno-text dark:text-dark-text">Iniciar sesión</Link>
                  <Link to="/register" className="block text-center px-3 py-2 rounded-lg bg-petuno-purple text-white text-base">Registrarse</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
