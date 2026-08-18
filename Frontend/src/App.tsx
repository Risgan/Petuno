import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Types
import type { Pet, ModuleConfig } from './types';

// Constants
import { DEFAULT_MODULE_CONFIG } from './constants/mockData';

// Components & Views
import Header from './components/Header';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import PublicAdoptionsView from './views/PublicAdoptionsView';
import Dashboard from './views/Dashboard';

// Modals
import QRScannerModal from './components/modals/QRScannerModal';
import DonationGatewayModal from './components/modals/DonationGatewayModal';
import PublicProfileModal from './components/modals/PublicProfileModal';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; phone?: string; role?: string } | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [modulesConfig, setModulesConfig] = useState<ModuleConfig>(() => {
    const saved = localStorage.getItem('modules_config');
    return saved ? JSON.parse(saved) : DEFAULT_MODULE_CONFIG;
  });

  const [showScannerModal, setShowScannerModal] = useState(false);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [activeScannedPet, setActiveScannedPet] = useState<any | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleLogin = (userData: { name: string; email: string; phone?: string; role?: string }) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const handleSaveModules = (newConfig: ModuleConfig) => {
    setModulesConfig(newConfig);
    localStorage.setItem('modules_config', JSON.stringify(newConfig));
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes with Header */}
        <Route 
          path="/" 
          element={
            <>
              <Header 
                isDarkMode={isDarkMode} 
                toggleTheme={toggleTheme} 
                user={user} 
                onLogout={handleLogout} 
                onOpenScanner={() => setShowScannerModal(true)}
                onOpenDonations={() => setShowDonationModal(true)}
                modulesConfig={modulesConfig}
              />
              <Home 
                onOpenScanner={() => setShowScannerModal(true)}
                modulesConfig={modulesConfig}
              />
            </>
          } 
        />
        <Route 
          path="/login" 
          element={
            <>
              <Header 
                isDarkMode={isDarkMode} 
                toggleTheme={toggleTheme} 
                user={user} 
                onLogout={handleLogout} 
                onOpenScanner={() => setShowScannerModal(true)}
                onOpenDonations={() => setShowDonationModal(true)}
                modulesConfig={modulesConfig}
              />
              {user ? <Navigate to="/app" replace /> : <Login onLogin={handleLogin} />}
            </>
          } 
        />
        <Route 
          path="/register" 
          element={
            <>
              <Header 
                isDarkMode={isDarkMode} 
                toggleTheme={toggleTheme} 
                user={user} 
                onLogout={handleLogout} 
                onOpenScanner={() => setShowScannerModal(true)}
                onOpenDonations={() => setShowDonationModal(true)}
                modulesConfig={modulesConfig}
              />
              {user ? <Navigate to="/app" replace /> : <Register onLogin={handleLogin} />}
            </>
          } 
        />
        <Route 
          path="/adopcion" 
          element={
            <>
              <Header 
                isDarkMode={isDarkMode} 
                toggleTheme={toggleTheme} 
                user={user} 
                onLogout={handleLogout} 
                onOpenScanner={() => setShowScannerModal(true)}
                onOpenDonations={() => setShowDonationModal(true)}
                modulesConfig={modulesConfig}
              />
              <PublicAdoptionsView />
            </>
          } 
        />

        {/* Private Dashboard Router */}
        <Route 
          path="/app" 
          element={
            user ? (
              <Dashboard 
                user={user} 
                onLogout={handleLogout} 
                isDarkMode={isDarkMode} 
                toggleTheme={toggleTheme} 
                modulesConfig={modulesConfig}
                onSaveModules={handleSaveModules}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {showScannerModal && (
        <QRScannerModal 
          onClose={() => setShowScannerModal(false)}
          onScanSuccess={(petId) => {
            const petsList: Pet[] = [
              { 
                id: 'max', 
                name: 'Max', 
                species: 'Perro',
                breed: 'Labrador Retriever', 
                gender: 'Macho', 
                status: 'Protegido', 
                petunoId: 'PTO-82A91X', 
                photo: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600&auto=format&fit=crop', 
                age: '3 años', 
                weight: '32 kg', 
                medicalCritical: 'Alérgico a la penicilina y requiere tratamiento especial para articulaciones.', 
                emergencyContact: '+57 300 123 4567' 
              },
              { 
                id: 'luna', 
                name: 'Luna', 
                species: 'Gato',
                breed: 'Siamés', 
                gender: 'Hembra', 
                status: 'Protegido', 
                petunoId: 'PTO-93B22Y', 
                photo: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&auto=format&fit=crop', 
                age: '2 años', 
                weight: '4.5 kg', 
                emergencyContact: '+57 300 123 4567' 
              },
              { 
                id: 'toby', 
                name: 'Toby', 
                species: 'Perro',
                breed: 'Golden Retriever', 
                gender: 'Macho', 
                status: 'Protegido', 
                petunoId: 'PTO-11A99Z', 
                photo: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=600&auto=format&fit=crop', 
                age: '1 año', 
                weight: '28 kg', 
                emergencyContact: '+57 300 123 4567' 
              }
            ];
            const found = petsList.find(p => p.id === petId);
            if (found) {
              setActiveScannedPet(found);
            }
          }}
        />
      )}

      {showDonationModal && (
        <DonationGatewayModal 
          onClose={() => setShowDonationModal(false)}
        />
      )}

      {activeScannedPet && (
        <PublicProfileModal 
          pet={activeScannedPet}
          onClose={() => setActiveScannedPet(null)}
          onReportSighting={() => {
            alert('¡Gracias! Reporte de avistamiento registrado. El propietario de la mascota recibirá un correo y SMS de inmediato con la geolocalización.');
            setActiveScannedPet(null);
          }}
        />
      )}
    </Router>
  );
}
