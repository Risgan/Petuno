import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  Sun, Moon, Menu, X, PawPrint, QrCode, ShieldCheck, 
  Bell, Heart, Store, ArrowRight, MapPin, Search, Filter,
  Send, Users, UserCircle, LogOut, Plus, AlertTriangle, Copy, Check,
  Cpu, Activity, Calendar, FileText, Settings, Stethoscope, MessageSquare, Trash2, Edit
} from 'lucide-react';
import heroImg from './assets/hero.png';

// ============================================================================
// TYPES & MOCK DATA
// ============================================================================

interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  gender: string;
  status: 'Protegido' | 'Perdido' | 'Encontrado';
  petunoId: string;
  photo: string;
  birthDate?: string;
  age?: string;
  color?: string;
  weight?: string;
  microchip?: string;
  characteristics?: string;
  allergies?: string;
  medicalCritical?: string;
  ownerName?: string;
  emergencyContact?: string;
  isPublic?: boolean;
  allowContact?: boolean;
  isMine?: boolean;
  hasGps?: boolean;
  city?: string;
  lastSeenLocation?: string;
}

interface Sighting {
  id: string;
  petId: string;
  petName: string;
  petPhoto: string;
  location: string;
  date: string;
  time: string;
  description: string;
  photo?: string;
  timestamp: number;
}

interface UnidentifiedSighting {
  id: string;
  location: string;
  date: string;
  time: string;
  description: string;
  photo: string;
}

interface CommunityPost {
  id: string;
  authorName: string;
  authorRole?: string;
  content: string;
  photo?: string;
  likes: number;
  commentsCount: number;
  timestamp: string;
  likedByUser?: boolean;
}

interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  read: boolean;
  type: 'Vacunas' | 'Medicamentos' | 'GPS' | 'Alertas' | 'Dispositivos' | 'Sistema';
}

interface Device {
  id: string;
  name: string;
  type: 'GPS' | 'BLE' | 'NFC' | 'RFID';
  petId: string;
  status: 'Conectado' | 'Desconectado';
  battery: number;
  lastConnection: string;
}

interface Vet {
  id: string;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  schedule: string;
  phone: string;
  isTrusted?: boolean;
}

interface AdoptionPet {
  id: string;
  name: string;
  species: 'Perro' | 'Gato';
  breed: string;
  age: string;
  gender: 'Macho' | 'Hembra';
  size: 'Pequeño' | 'Mediano' | 'Grande';
  specialNeeds: boolean;
  location: string;
  shelter: string;
  description: string;
  photo: string;
}

interface AdoptionApplication {
  id: string;
  adoptionPetId: string;
  petName: string;
  applicantName: string;
  email: string;
  phone: string;
  address: string;
  housing: string;
  hasPets: boolean;
  timeAvailable: string;
  status: 'Pendiente' | 'Aprobada' | 'Rechazada';
  date: string;
}

interface PrivacySettings {
  showName: boolean;
  showBreed: boolean;
  showAge: boolean;
  showLocation: boolean;
  showMedical: boolean;
  allowAnonymousContact: boolean;
  allowSightings: boolean;
}

const INITIAL_PETS: Pet[] = [
  {
    id: 'max',
    name: 'Max',
    species: 'Perro',
    breed: 'Labrador Retriever',
    gender: 'Macho',
    status: 'Protegido',
    petunoId: 'PTO-82A91X',
    photo: 'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=600&auto=format&fit=crop',
    birthDate: '2023-05-15',
    age: '3 años',
    color: 'Dorado',
    weight: '32 kg',
    microchip: '900115000234765',
    characteristics: 'Muy juguetón, le encanta correr por el parque y es amigable con otros perros.',
    allergies: 'Ninguna conocida',
    medicalCritical: 'Alergia a la penicilina',
    ownerName: 'John Doe',
    emergencyContact: '+57 300 123 4567',
    isPublic: true,
    allowContact: true,
    isMine: true,
    hasGps: true,
    city: 'Bogotá'
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
    birthDate: '2024-02-10',
    age: '2 años',
    color: 'Crema con manchas café',
    weight: '4.2 kg',
    microchip: '900115000234881',
    characteristics: 'Tímida al principio, maúlla suavemente cuando quiere comer.',
    allergies: 'Ninguna conocida',
    medicalCritical: 'Ninguna',
    ownerName: 'John Doe',
    emergencyContact: '+57 300 123 4567',
    isPublic: true,
    allowContact: true,
    isMine: true,
    hasGps: false,
    city: 'Bogotá'
  },
  {
    id: 'toby',
    name: 'Toby',
    species: 'Perro',
    breed: 'Golden Retriever',
    gender: 'Macho',
    status: 'Perdido',
    petunoId: 'PTO-11A99Z',
    photo: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=600&auto=format&fit=crop',
    birthDate: '2022-11-01',
    age: '3 años',
    color: 'Amarillo claro',
    weight: '34 kg',
    characteristics: 'Tiene una mancha blanca en su pata delantera izquierda, es dócil pero asustadizo.',
    allergies: 'Ninguna conocida',
    medicalCritical: 'Ninguna',
    ownerName: 'Camila Rojas',
    emergencyContact: '+57 311 999 8888',
    isPublic: true,
    allowContact: true,
    isMine: false,
    hasGps: false,
    city: 'Bogotá'
  },
  {
    id: 'michi',
    name: 'Michi',
    species: 'Gato',
    breed: 'Común Europeo',
    gender: 'Hembra',
    status: 'Perdido',
    petunoId: 'PTO-22B88Y',
    photo: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=600&auto=format&fit=crop',
    birthDate: '2025-01-10',
    age: '1 año',
    color: 'Atigrado gris',
    weight: '4.0 kg',
    characteristics: 'Lleva collar rojo sin placa. Es juguetona.',
    allergies: 'Ninguna conocida',
    medicalCritical: 'Ninguna',
    ownerName: 'Andrés Pérez',
    emergencyContact: '+57 322 777 6666',
    isPublic: true,
    allowContact: true,
    isMine: false,
    hasGps: false,
    city: 'Bogotá'
  }
];

// ============================================================================
// HEADER COMPONENT (Public Pages)
// ============================================================================

function Header({ 
  isDarkMode, 
  toggleTheme, 
  user, 
  onLogout,
  onOpenScanner,
  onOpenDonations
}: { 
  isDarkMode: boolean; 
  toggleTheme: () => void; 
  user: { name: string } | null;
  onLogout: () => void;
  onOpenScanner?: () => void;
  onOpenDonations?: () => void;
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
            <Link to="/#map-section" onClick={(e) => handleNavClick(e, 'map-section')} className="text-sm text-petuno-text hover:text-petuno-purple dark:text-dark-text dark:hover:text-petuno-purple-light transition-colors">Buscar Mascota</Link>
            <Link to="/adopcion" className="text-sm text-petuno-text hover:text-petuno-purple dark:text-dark-text dark:hover:text-petuno-purple-light transition-colors">Adopción</Link>
            <button 
              onClick={() => onOpenDonations?.()} 
              className="text-sm text-petuno-text hover:text-petuno-purple dark:text-dark-text dark:hover:text-petuno-purple-light transition-colors font-semibold"
            >
              Donaciones
            </button>
            <button 
              onClick={() => onOpenScanner?.()} 
              className="text-sm text-petuno-text hover:text-petuno-purple dark:text-dark-text dark:hover:text-petuno-purple-light transition-colors font-semibold"
            >
              Escanear Placa
            </button>
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
            <Link to="/#map-section" onClick={(e) => { handleNavClick(e, 'map-section'); setIsMobileMenuOpen(false); }} className="block px-3 py-2 rounded-md text-base text-petuno-text dark:text-dark-text">Buscar Mascota</Link>
            <Link to="/adopcion" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base text-petuno-text dark:text-dark-text">Adopción</Link>
            <button 
              onClick={() => { onOpenDonations?.(); setIsMobileMenuOpen(false); }} 
              className="block w-full text-left px-3 py-2 rounded-md text-base text-petuno-text dark:text-dark-text hover:bg-petuno-background dark:hover:bg-dark-surface-elevated transition-all"
            >
              Donaciones
            </button>
            <button 
              onClick={() => { onOpenScanner?.(); setIsMobileMenuOpen(false); }} 
              className="block w-full text-left px-3 py-2 rounded-md text-base text-petuno-text dark:text-dark-text hover:bg-petuno-background dark:hover:bg-dark-surface-elevated transition-all"
            >
              Escanear Placa
            </button>
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

function AdoptablePetCard({ 
  name, 
  breed, 
  age, 
  photo, 
  tag, 
  isSpecialNeeds 
}: { 
  name: string; 
  breed: string; 
  age: string; 
  photo: string; 
  tag: string; 
  isSpecialNeeds?: boolean;
}) {
  return (
    <div className="bg-petuno-background dark:bg-dark-surface-elevated rounded-2xl overflow-hidden border border-petuno-border dark:border-transparent flex flex-col h-full group text-left">
      <div className="relative h-44 w-full overflow-hidden bg-petuno-purple-50">
        <img 
          src={photo} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        {isSpecialNeeds && (
          <span className="absolute top-3 left-3 bg-petuno-coral text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
            Especial
          </span>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[9px] font-extrabold text-petuno-purple uppercase tracking-wider block">{breed}</span>
          <h4 className="font-extrabold text-sm text-petuno-text dark:text-dark-text mt-0.5">{name} ({age})</h4>
          <p className="text-[10px] text-petuno-secondary-text mt-1 italic">"{tag}"</p>
        </div>
        <Link 
          to="/register" 
          className="mt-4 w-full bg-petuno-purple text-white text-center py-2 rounded-xl text-xs font-bold transition-all hover:bg-petuno-purple-dark block"
        >
          Postular Adopción
        </Link>
      </div>
    </div>
  );
}

// ============================================================================
// LANDING PAGE (Home)
// ============================================================================

function Home({ 
  onOpenScanner
}: { 
  onOpenScanner?: () => void; 
  onOpenDonations?: () => void;
}) {
  const [selectedSosCategory, setSelectedSosCategory] = useState<string>('Todas');
  const [selectedMapFilter, setSelectedMapFilter] = useState<string>('Todas');
  const [selectedMapMarker, setSelectedMapMarker] = useState<any | null>(null);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  return (
    <div id="home-top" className="flex flex-col min-h-screen bg-petuno-background dark:bg-dark-background font-sans pt-20">
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2 flex flex-col items-start text-left space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-petuno-text dark:text-dark-text tracking-tight leading-[1.1]">
            La identidad digital <br className="hidden lg:block"/>
            <span className="text-petuno-purple dark:text-petuno-purple-light">de tu mascota.</span>
          </h1>
          <p className="text-lg text-petuno-secondary-text dark:text-dark-secondary-text max-w-lg">
            Protégela. Encuéntrala. Cuídala. Mantén toda su identificación física y su historial de bienestar conectados en un solo lugar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
            <Link to="/register" className="bg-petuno-purple hover:bg-petuno-purple-dark text-white px-6 py-3.5 rounded-xl text-base font-semibold transition-all shadow-md flex items-center justify-center gap-2">
              🐾 Registrar mascota
            </Link>
            <a 
              href="#map-section" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-transparent text-petuno-text dark:text-dark-text border border-petuno-border dark:border-petuno-secondary-text/50 hover:bg-petuno-border/50 dark:hover:bg-dark-surface-elevated px-6 py-3.5 rounded-xl text-base font-semibold transition-all flex items-center justify-center gap-2"
            >
              🔎 Buscar mascota
            </a>
            <button 
              onClick={() => onOpenScanner?.()} 
              className="bg-petuno-coral hover:bg-petuno-coral/95 text-white px-6 py-3.5 rounded-xl text-base font-semibold transition-all shadow-md flex items-center justify-center gap-2"
            >
              📷 Escanear QR
            </button>
          </div>
        </div>
        
        <div className="lg:w-1/2 relative flex justify-center lg:justify-end">
          {/* Circular background */}
          <div className="absolute w-[280px] h-[280px] sm:w-[440px] sm:h-[440px] bg-petuno-purple-50 dark:bg-[#5428C7]/15 rounded-full z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          
          {/* Main Hero Image */}
          <div className="relative z-10 w-[260px] sm:w-[400px]">
            <img 
              src={heroImg} 
              alt="Mascotas felices" 
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Floating Badges */}
          <div className="absolute top-[8%] right-[10%] sm:right-[15%] bg-white dark:bg-dark-surface p-2.5 rounded-2xl shadow-xl z-20 border border-petuno-border dark:border-petuno-secondary-text/20">
            <QrCode className="w-5 h-5 sm:w-6 sm:h-6 text-petuno-text dark:text-dark-text" />
          </div>
          <div className="absolute top-[25%] -right-2 bg-petuno-purple p-2.5 sm:p-3 rounded-full shadow-xl z-20 text-white border-4 border-white dark:border-dark-background">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="absolute bottom-[20%] -right-2 bg-white dark:bg-dark-surface p-2.5 sm:p-3 rounded-full shadow-xl z-20 text-petuno-purple border-4 border-white dark:border-dark-background">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>
      </section>

      {/* 5 Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <FeatureCard 
            icon={<ShieldCheck className="w-6 h-6 text-petuno-purple" />}
            title="Perfiles seguros"
            desc="Crea el perfil completo de tu mascota con toda su información importante."
          />
          <FeatureCard 
            icon={<QrCode className="w-6 h-6 text-petuno-purple" />}
            title="QR / NFC"
            desc="Genera códigos QR o etiquetas NFC para que siempre pueda regresar a casa."
          />
          <FeatureCard 
            icon={<Bell className="w-6 h-6 text-petuno-purple" />}
            title="Mascotas perdidas"
            desc="Publica alertas y recibe ayuda de la comunidad en tiempo real."
          />
          <FeatureCard 
            icon={<Heart className="w-6 h-6 text-petuno-purple" />}
            title="Adopciones"
            desc="Conecta mascotas en adopción con familias responsables."
          />
          <FeatureCard 
            icon={<Store className="w-6 h-6 text-petuno-purple" />}
            title="Servicios"
            desc="Encuentra veterinarios, tiendas, paseadores y más cerca de ti."
          />
        </div>
      </section>

      {/* SOS Búsqueda y Rescate Section */}
      <section id="sos-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full text-left">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-petuno-border/40 pb-4">
          <div>
            <span className="bg-petuno-coral/10 text-petuno-coral text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider block w-max mb-2">
              🚨 PETUNO SOS
            </span>
            <h2 className="text-2xl font-bold text-petuno-text dark:text-dark-text flex items-center gap-2">
              Consola de Emergencia Permanente
            </h2>
            <p className="text-sm text-petuno-secondary-text mt-2 max-w-xl">
              Filtra y consulta incidentes activos que ponen en riesgo o afectan el bienestar de los animales domésticos.
            </p>
          </div>
          <Link 
            to="/register" 
            className="bg-petuno-coral hover:bg-petuno-coral/95 text-white font-bold px-5 py-3 rounded-xl text-xs transition-all shadow-md mt-4 md:mt-0"
          >
            Reportar Incidente SOS
          </Link>
        </div>

        {/* Categories Selector */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['Todas', 'Desastre natural', 'Incendio', 'Inundación', 'Mascotas perdidas', 'Evacuación', 'Animales encontrados', 'Emergencia veterinaria'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedSosCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                selectedSosCategory === cat
                  ? 'bg-petuno-purple border-petuno-purple text-white shadow-sm'
                  : 'bg-white dark:bg-dark-surface border-petuno-border dark:border-petuno-secondary-text/20 text-petuno-secondary-text hover:bg-petuno-background dark:hover:bg-dark-surface-elevated'
              }`}
            >
              {cat === 'Todas' ? '🚨 Todos los Reportes' : cat}
            </button>
          ))}
        </div>

        {/* SOS Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { id: '1', title: 'Toby', category: 'Mascotas perdidas', breed: 'Golden Retriever', desc: 'Golden Retriever macho. Se asustó con el temblor y huyó.', location: '📍 Parque de la 93, Bogotá', status: 'Perdido', image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=600&auto=format&fit=crop', contact: 'John Rueda' },
            { id: '2', title: 'Michi', category: 'Mascotas perdidas', breed: 'Común Europeo', desc: 'Gato Siamés mix, collar rojo con chapa. Huyó por tejados.', location: '📍 Chapinero Alto, Bogotá', status: 'Perdido', image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=600&auto=format&fit=crop', contact: 'Diana Gomez' },
            { id: '3', title: 'Perro Criollo Rescatado', category: 'Animales encontrados', breed: 'Criollo', desc: 'Encontrado temblando cerca a zona de derrumbe. Muy asustado.', location: '📍 Sopó (Albergue Temporal)', status: 'Encontrado', image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600&auto=format&fit=crop', contact: 'Bomberos Sopó' },
            { id: '4', title: 'Evacuación Albergue', category: 'Evacuación', breed: 'Múltiples Mascotas', desc: 'Inundación inminente requiere traslado urgente de 45 perritos.', location: '📍 La Calera, Cundinamarca', status: 'Urgente', image: 'https://images.unsplash.com/photo-1444212477490-ca407925329e?q=80&w=600&auto=format&fit=crop', contact: 'Fundación Herradura' },
            { id: '5', title: 'Bruno', category: 'Mascotas perdidas', breed: 'Labrador Retriever', desc: 'Labrador café muy dócil. Responde al silbido.', location: '📍 El Chicó, Bogotá', status: 'Perdido', image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=600&auto=format&fit=crop', contact: 'Defensa Civil' }
          ]
            .filter(item => selectedSosCategory === 'Todas' || item.category === selectedSosCategory)
            .map(item => (
              <div key={item.id} className="bg-white dark:bg-dark-surface rounded-2xl overflow-hidden border border-petuno-border dark:border-petuno-secondary-text/15 shadow-sm flex flex-col justify-between text-left transition-all hover:shadow-md">
                <div className="relative h-48 w-full bg-petuno-purple-50 dark:bg-dark-surface-elevated">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover" 
                  />
                  <span className={`absolute top-3 left-3 text-white text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    item.status === 'Perdido' ? 'bg-petuno-coral' : 'bg-petuno-mint'
                  }`}>
                    {item.status}
                  </span>
                  <span className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-[8px] font-bold px-2 py-0.5 rounded-md">
                    {item.category}
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-extrabold text-petuno-purple dark:text-petuno-purple-light uppercase tracking-wider block">{item.breed}</span>
                    <h4 className="font-extrabold text-sm text-petuno-text dark:text-dark-text mt-0.5">{item.title}</h4>
                    <p className="text-[10px] text-petuno-secondary-text dark:text-dark-secondary-text mt-1.5 leading-relaxed">
                      {item.desc}
                    </p>
                    <p className="text-[10px] font-semibold text-petuno-text dark:text-dark-text mt-2">
                      {item.location}
                    </p>
                  </div>
                  <button 
                    onClick={() => alert(`Reportando información sobre ${item.title}... Su reporte ha sido enviado de forma anónima a ${item.contact}.`)}
                    className={`mt-4 w-full text-center py-2.5 rounded-xl text-xs font-bold transition-all block ${
                      item.status === 'Perdido' 
                        ? 'bg-petuno-coral hover:bg-petuno-coral/90 text-white shadow-sm'
                        : 'bg-petuno-mint hover:bg-petuno-mint-dark text-white shadow-sm'
                    }`}
                  >
                    {item.status === 'Perdido' ? 'Tengo información' : 'Es mi mascota'}
                  </button>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* 🗺️ MAPA VIVO PETUNO SECTION */}
      <section id="map-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full text-left border-t border-petuno-border/30 dark:border-petuno-secondary-text/10">
        <div className="mb-8">
          <span className="bg-petuno-purple/10 text-petuno-purple dark:text-petuno-purple-light text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider block w-max mb-2">
            🗺️ MAPA PETUNO
          </span>
          <h2 className="text-2xl font-bold text-petuno-text dark:text-dark-text flex items-center gap-2">
            Red de Ayuda y Avistamientos en Vivo
          </h2>
          <p className="text-sm text-petuno-secondary-text dark:text-dark-secondary-text mt-2 max-w-xl">
            Monitorea geolocalizaciones en tiempo real. Utiliza los filtros para ubicar albergues, veterinarias de turno y reportes activos.
          </p>
        </div>

        {/* Map Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['Todas', 'Perdida', 'Encontrada', 'Refugios', 'Veterinarias'].map(filter => (
            <button
              key={filter}
              onClick={() => {
                setSelectedMapFilter(filter);
                setSelectedMapMarker(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                selectedMapFilter === filter
                  ? 'bg-petuno-purple border-petuno-purple text-white shadow-sm'
                  : 'bg-white dark:bg-dark-surface border-petuno-border dark:border-petuno-secondary-text/20 text-petuno-secondary-text hover:bg-petuno-background dark:hover:bg-dark-surface-elevated'
              }`}
            >
              {filter === 'Todas' ? '🌍 Mostrar Todo' : filter === 'Perdida' ? '🔴 Reportes Perdidos' : filter === 'Encontrada' ? '🟢 Reportes Encontrados' : filter === 'Refugios' ? '🏠 Refugios/Fundaciones' : '🏥 Veterinarias 24h'}
            </button>
          ))}
        </div>

        {/* Stylized Map Mockup Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* Map canvas container */}
          <div className="lg:col-span-2 bg-slate-100 dark:bg-neutral-900 border border-petuno-border dark:border-petuno-secondary-text/15 rounded-3xl h-[450px] relative overflow-hidden shadow-inner flex items-center justify-center">
            
            {/* Grid Map Background */}
            <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.04] bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            {/* Simulated streets / SVG overlay */}
            <svg className="absolute inset-0 w-full h-full stroke-slate-300/40 dark:stroke-neutral-800/40 fill-none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 0 100 Q 150 120 300 250 T 600 300 T 900 450" strokeWidth="6" />
              <path d="M 100 0 L 150 450" strokeWidth="4" />
              <path d="M 400 0 Q 380 200 450 450" strokeWidth="4" />
              <path d="M 0 350 L 900 200" strokeWidth="3" />
              <circle cx="200" cy="180" r="100" className="stroke-slate-200 dark:stroke-neutral-800" strokeWidth="2" />
            </svg>

            {/* Interactive Markers */}
            {[
              { id: 1, name: 'Max (Labrador)', breed: 'Labrador Retriever', type: 'Perdida', lat: 35, lng: 28, desc: 'Último avistamiento cerca al Parque de la 93.', contact: '+57 300 123 4567', time: 'Hace 15 min' },
              { id: 2, name: 'Luna (Siamés)', breed: 'Siamés', type: 'Encontrada', lat: 55, lng: 45, desc: 'Resguardada temporalmente en casa de paso.', contact: '+57 311 999 8888', time: 'Hace 1 hora' },
              { id: 3, name: 'Veterinaria Chico 24/7', breed: 'Centro Médico', type: 'Veterinarias', lat: 25, lng: 70, desc: 'Emergencias y cirugías 24 horas.', contact: '601 345 6789', time: 'Abierto 24/7' },
              { id: 4, name: 'Refugio Patitas Felices', breed: 'Albergue Verificado', type: 'Refugios', lat: 70, lng: 20, desc: 'Punto de recolección de donaciones autorizadas.', contact: '312 999 8888', time: 'Actualizado hace 3 días' },
              { id: 5, name: 'Toby (Golden)', breed: 'Golden Retriever', type: 'Perdida', lat: 48, lng: 55, desc: 'Visto cruzando la Av. 19. Muy asustado.', contact: '+57 320 888 7777', time: 'Hace 8 min' }
            ]
              .filter(marker => selectedMapFilter === 'Todas' || marker.type === selectedMapFilter)
              .map(marker => {
                let colorClass = '';
                if (marker.type === 'Perdida') colorClass = 'bg-petuno-coral';
                else if (marker.type === 'Encontrada') colorClass = 'bg-petuno-mint';
                else if (marker.type === 'Refugios') colorClass = 'bg-amber-500';
                else if (marker.type === 'Veterinarias') colorClass = 'bg-purple-600';

                return (
                  <button
                    key={marker.id}
                    onClick={() => setSelectedMapMarker(marker)}
                    className="absolute group transition-transform hover:scale-125 focus:outline-none"
                    style={{ top: `${marker.lat}%`, left: `${marker.lng}%` }}
                  >
                    {/* Ring ripples for active states */}
                    {(marker.type === 'Perdida' || marker.type === 'Encontrada') && (
                      <span className={`absolute inline-flex h-6 w-6 rounded-full opacity-75 animate-ping -left-1.5 -top-1.5 ${colorClass}`}></span>
                    )}
                    
                    {/* Actual marker pin dot */}
                    <div className={`w-3 h-3 rounded-full border-2 border-white dark:border-neutral-900 shadow-md ${colorClass}`}></div>
                    
                    {/* Floating label */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 bottom-5 bg-black/85 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-30">
                      {marker.name}
                    </div>
                  </button>
                );
              })}

            {/* Compass / Map Controls Mock */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-1 bg-white dark:bg-dark-surface p-1.5 rounded-xl border border-petuno-border dark:border-petuno-secondary-text/20 shadow-md">
              <button onClick={() => alert('Acercar mapa (Mock)')} className="w-6 h-6 flex items-center justify-center text-xs font-bold hover:bg-petuno-background dark:hover:bg-dark-surface-elevated rounded">+</button>
              <button onClick={() => alert('Alejar mapa (Mock)')} className="w-6 h-6 flex items-center justify-center text-xs font-bold hover:bg-petuno-background dark:hover:bg-dark-surface-elevated rounded">-</button>
            </div>
            
            {/* Watermark */}
            <div className="absolute bottom-4 left-4 bg-white/70 dark:bg-black/50 backdrop-blur-sm text-[8px] font-bold text-petuno-secondary-text dark:text-dark-secondary-text px-2 py-0.5 rounded uppercase tracking-wider select-none">
              Bogotá D.C. - Live Map Grid
            </div>

          </div>

          {/* Map Detail Sidebar Panel */}
          <div className="bg-white dark:bg-dark-surface border border-petuno-border dark:border-petuno-secondary-text/15 rounded-3xl p-5 flex flex-col justify-between shadow-sm">
            {selectedMapMarker ? (
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className={`text-[8px] font-extrabold text-white px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      selectedMapMarker.type === 'Perdida' ? 'bg-petuno-coral' :
                      selectedMapMarker.type === 'Encontrada' ? 'bg-petuno-mint' :
                      selectedMapMarker.type === 'Refugios' ? 'bg-amber-500' : 'bg-purple-600'
                    }`}>
                      {selectedMapMarker.type === 'Perdida' ? 'Perdido' :
                       selectedMapMarker.type === 'Encontrada' ? 'Encontrado' :
                       selectedMapMarker.type === 'Refugios' ? 'Refugio' : 'Veterinaria'}
                    </span>
                    <h3 className="text-base font-extrabold text-petuno-text dark:text-dark-text mt-2">
                      {selectedMapMarker.name}
                    </h3>
                    <p className="text-[10px] text-petuno-secondary-text dark:text-dark-secondary-text">
                      {selectedMapMarker.breed} • {selectedMapMarker.time}
                    </p>
                  </div>
                  <button 
                    onClick={() => setSelectedMapMarker(null)}
                    className="text-petuno-secondary-text hover:bg-petuno-background dark:hover:bg-dark-surface-elevated p-1 rounded-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="bg-petuno-background dark:bg-dark-surface-elevated p-3.5 rounded-2xl text-[11px] space-y-2 border border-petuno-border/30">
                  <p className="text-petuno-text dark:text-dark-text italic leading-relaxed">
                    "{selectedMapMarker.desc}"
                  </p>
                  <div className="text-[10px] text-petuno-secondary-text space-y-0.5">
                    <div>📞 Contacto directo: <strong className="text-petuno-text dark:text-dark-text">{selectedMapMarker.contact}</strong></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <button 
                    onClick={() => alert(`Enviando alerta de confirmación al responsable de ${selectedMapMarker.name}...`)}
                    className="w-full bg-petuno-purple hover:bg-petuno-purple-dark text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-sm flex items-center justify-center gap-1.5"
                  >
                    📱 Enviar mensaje SOS
                  </button>
                  <button 
                    onClick={() => alert(`Reportando avistamiento rápido de ${selectedMapMarker.name} en coordenadas actuales...`)}
                    className="w-full bg-transparent hover:bg-petuno-background dark:hover:bg-dark-surface-elevated text-petuno-text dark:text-dark-text border border-petuno-border dark:border-petuno-secondary-text/40 font-bold py-2.5 rounded-xl text-xs transition-all"
                  >
                    📍 Reportar avistamiento aquí
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-12">
                <div className="w-12 h-12 rounded-full bg-petuno-purple/5 flex items-center justify-center text-petuno-purple">
                  <MapPin className="w-6 h-6" />
                </div>
                <h4 className="font-extrabold text-sm text-petuno-text dark:text-dark-text">Selecciona un marcador</h4>
                <p className="text-[10px] text-petuno-secondary-text dark:text-dark-secondary-text max-w-[200px] leading-relaxed">
                  Haz clic sobre cualquier marcador en el mapa para ver la ficha de emergencia, información médica o contacto del refugio.
                </p>
              </div>
            )}

            <div className="border-t border-petuno-border/50 dark:border-petuno-secondary-text/10 pt-4 mt-6">
              <div className="flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-wider text-petuno-purple">
                <span>🛡️ Red de Ayuda Autorizada</span>
              </div>
              <p className="text-[9px] text-petuno-secondary-text mt-1 leading-snug">
                Petuno no comparte números de teléfono privados de forma abierta. Las alertas se gestionan a través de servidores encriptados de Petuno ID.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Explora Petuno Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full text-center">
        <div className="flex flex-col items-center justify-center mb-10">
          <div className="flex items-center gap-2 text-2xl font-bold text-petuno-text dark:text-dark-text">
            <PawPrint className="w-6 h-6 text-petuno-purple" fill="currentColor" />
            Explora Petuno
          </div>
          <p className="text-petuno-secondary-text dark:text-dark-secondary-text mt-2">Todo lo que necesitas para el bienestar de tu mascota</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ExploreCard 
            image="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1974&auto=format&fit=crop"
            title="Mascotas"
            desc="Gestiona perfiles"
          />
          <ExploreCard 
            image="https://images.unsplash.com/photo-1537151608804-ea2f1ea38341?q=80&w=2000&auto=format&fit=crop"
            title="Perdidas"
            desc="Publica o busca"
          />
          <ExploreCard 
            image="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop"
            title="Adopciones"
            desc="Dale un hogar"
          />
          <ExploreCard 
            image="https://images.unsplash.com/photo-1628009368231-7bb7cbcb8122?q=80&w=2070&auto=format&fit=crop"
            title="Servicios"
            desc="Encuentra ayuda"
          />
        </div>
      </section>

      {/* Foundations and Adoptions Section */}
      <section id="adopciones-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full text-left bg-petuno-surface/40 dark:bg-dark-surface/10 rounded-3xl border border-petuno-border/50 dark:border-petuno-secondary-text/5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
          <div>
            <h2 className="text-2xl font-bold text-petuno-text dark:text-dark-text flex items-center gap-2">
              🐾 Fundaciones y Mascotas en Adopción
            </h2>
            <p className="text-sm text-petuno-secondary-text mt-2 max-w-xl">
              Apoya a los refugios locales de Colombia. Adopta, no compres, y dales una segunda oportunidad.
            </p>
          </div>
          <Link 
            to="/register" 
            className="text-xs font-bold text-petuno-purple hover:underline mt-4 md:mt-0 flex items-center gap-1"
          >
            ¿Eres una fundación? Regístrate aquí →
          </Link>
        </div>

        {/* List of Foundations */}
        <div className="space-y-12">
          {/* Foundation 1 */}
          <div className="bg-white dark:bg-dark-surface p-6 rounded-3xl border border-petuno-border dark:border-petuno-secondary-text/10 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-petuno-border/55 dark:border-petuno-secondary-text/10 pb-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-petuno-purple-50 dark:bg-dark-surface-elevated flex items-center justify-center text-xl font-extrabold text-petuno-purple shrink-0 shadow-inner">
                  🐾
                </div>
                <div>
                  <h3 className="font-extrabold text-base">Fundación Patitas Felices</h3>
                  <p className="text-[11px] text-petuno-secondary-text flex items-center gap-1 mt-0.5">
                    📍 Bogotá, Cedritos • NIT 901.332.881-2
                  </p>
                </div>
              </div>
              <Link 
                to="/register" 
                className="bg-petuno-purple/10 text-petuno-purple hover:bg-petuno-purple hover:text-white transition-all font-bold px-4 py-2 rounded-xl text-xs"
              >
                Apoyar Fundación
              </Link>
            </div>

            {/* Adoptable Pets Grid for Foundation 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <AdoptablePetCard 
                name="Lola"
                breed="Criolla (Poodle Mix)"
                age="6 meses"
                photo="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600&auto=format&fit=crop"
                tag="Ideal para apartamento"
              />
              <AdoptablePetCard 
                name="Rocco"
                breed="Golden Retriever Mix"
                age="2 años"
                photo="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=600&auto=format&fit=crop"
                tag="Discapacidad (Trípode)"
                isSpecialNeeds={true}
              />
              <AdoptablePetCard 
                name="Simba"
                breed="Tabby"
                age="1 año"
                photo="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&auto=format&fit=crop"
                tag="Cariñoso y hogareño"
              />
            </div>
          </div>

          {/* Foundation 2 */}
          <div className="bg-white dark:bg-dark-surface p-6 rounded-3xl border border-petuno-border dark:border-petuno-secondary-text/10 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-petuno-border/55 dark:border-petuno-secondary-text/10 pb-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-petuno-purple-50 dark:bg-dark-surface-elevated flex items-center justify-center text-xl font-extrabold text-petuno-purple shrink-0 shadow-inner">
                  🏡
                </div>
                <div>
                  <h3 className="font-extrabold text-base">Refugio Huellas de Amor</h3>
                  <p className="text-[11px] text-petuno-secondary-text flex items-center gap-1 mt-0.5">
                    📍 Medellín, Sabaneta • NIT 800.124.992-0
                  </p>
                </div>
              </div>
              <Link 
                to="/register" 
                className="bg-petuno-purple/10 text-petuno-purple hover:bg-petuno-purple hover:text-white transition-all font-bold px-4 py-2 rounded-xl text-xs"
              >
                Apoyar Refugio
              </Link>
            </div>

            {/* Adoptable Pets Grid for Foundation 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 font-sans">
              <AdoptablePetCard 
                name="Kiwi"
                breed="Pastor Alemán Mix"
                age="8 meses"
                photo="https://images.unsplash.com/photo-1583511655826-05700d52f4d9?q=80&w=600&auto=format&fit=crop"
                tag="Muy inteligente"
              />
              <AdoptablePetCard 
                name="Sasha"
                breed="Siamesa"
                age="3 meses"
                photo="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=600&auto=format&fit=crop"
                tag="Juguetona y activa"
              />
              <AdoptablePetCard 
                name="Bethoven"
                breed="San Bernardo Mix"
                age="4 años"
                photo="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=600&auto=format&fit=crop"
                tag="Tamaño grande"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="bg-petuno-surface dark:bg-dark-surface-elevated rounded-3xl p-8 lg:p-12 border border-petuno-border dark:border-transparent shadow-sm flex flex-col sm:flex-row flex-wrap justify-between items-center gap-8 text-center">
          <StatBox icon={<PawPrint className="w-8 h-8 text-petuno-purple" fill="currentColor"/>} number="10.482" text="Mascotas identificadas" />
          <StatBox icon={<Heart className="w-8 h-8 text-petuno-purple" fill="currentColor"/>} number="2.183" text="Mascotas reencontradas" />
          <StatBox icon={<UserCircle className="w-8 h-8 text-petuno-purple" fill="currentColor"/>} number="1.024" text="Adopciones exitosas" />
          <StatBox icon={<Users className="w-8 h-8 text-petuno-purple" fill="currentColor"/>} number="536" text="Rescates asistidos" />
        </div>
      </section>

      {/* Donations SOS Section */}
      <section id="donaciones-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full text-left">
        <div className="bg-gradient-to-br from-petuno-coral/5 to-petuno-purple/5 dark:from-petuno-coral/10 dark:to-petuno-purple/10 p-8 lg:p-12 rounded-3xl border border-petuno-border/55 dark:border-petuno-secondary-text/10 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-petuno-border/40 pb-4">
            <div>
              <span className="bg-petuno-purple/10 text-petuno-purple text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider block w-max mb-3">
                ❤️ SOLIDARIDAD TRANSPARENTE
              </span>
              <h2 className="text-3xl font-extrabold text-petuno-text dark:text-dark-text">
                Ayuda Directa a Fundaciones
              </h2>
              <p className="text-sm text-petuno-secondary-text mt-2 leading-relaxed max-w-xl">
                Petuno no interviene en las transacciones. Tu aporte va directo al refugio verificado de tu elección, sin comisiones intermedias.
              </p>
            </div>
            <div className="bg-white/80 dark:bg-black/40 backdrop-blur-sm p-3 rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/10 text-[10px] text-petuno-purple font-bold flex items-center gap-1.5 shrink-0 shadow-sm">
              <span>🛡️ Cuentas Bancarias Verificadas ✓</span>
            </div>
          </div>

          {/* Campaign target progress indicators */}
          <div className="bg-white dark:bg-dark-surface p-6 rounded-3xl border border-petuno-border dark:border-petuno-secondary-text/15 space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="font-extrabold text-petuno-text dark:text-dark-text">Campaña SOS Sismo: Medicamentos y Comida</span>
              <span className="text-[11px] font-bold text-petuno-purple">Meta: $850.000 COP</span>
            </div>
            <p className="text-[11px] text-petuno-secondary-text leading-tight">
              Aportes requeridos para costear el tratamiento de emergencia de 4 mascotas rescatadas con fracturas en Cedritos.
            </p>

            <div className="space-y-3 pt-2">
              <div>
                <div className="flex justify-between text-[10px] font-semibold mb-1">
                  <span>🍚 Alimento Concentrado</span>
                  <span>72% (Faltan 80 kg)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-petuno-purple h-full rounded-full" style={{ width: '72%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-semibold mb-1">
                  <span>💊 Medicamentos para heridas</span>
                  <span>35% (Faltan $550.000 COP)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-petuno-coral h-full rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-semibold mb-1">
                  <span>🛏️ Cobijas e Insumos térmicos</span>
                  <span>81% (Faltan 10 cobijas)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '81%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 font-sans">
            {/* Donation Card 1 */}
            <div className="bg-white dark:bg-dark-surface p-6 rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/10 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="font-extrabold text-sm flex items-center gap-2">
                  🍲 Insumos Físicos
                </h4>
                <p className="text-[11px] text-petuno-secondary-text mt-2 leading-relaxed">
                  Lleva concentrado, gasas, vendas, collares o cobijas directamente a los centros de acopio autorizados.
                </p>
              </div>
              <button 
                onClick={() => alert('Puntos de recolección autorizados:\n- Bogotá: Calle 93 # 12-40 (Sede Petuno)\n- Medellín: Sabaneta Calle 50 # 10\n- Cali: Av. 6 Norte # 12')}
                className="mt-6 w-full bg-petuno-purple hover:bg-petuno-purple-dark text-white text-center py-2.5 rounded-xl text-xs font-bold transition-all"
              >
                Ver Puntos de Entrega
              </button>
            </div>

            {/* Donation Card 2 */}
            <div className="bg-white dark:bg-dark-surface p-6 rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/10 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="font-extrabold text-sm flex items-center gap-2">
                  💳 Transferencia Bancaria
                </h4>
                <p className="text-[11px] text-petuno-secondary-text mt-2 leading-relaxed">
                  Realiza transferencias seguras directo a las cuentas Nequi, Daviplata o Bancolombia verificadas de los refugios.
                </p>
              </div>
              <button 
                onClick={() => alert('Cuentas Bancarias Oficiales Verificadas (100% Directo):\n- Fund. Patitas Felices: Nequi / Daviplata: 312 456 7890 (NIT 901.332.881)\n- Refugio Huellas: Bancolombia Ahorros: 032-99881-22')}
                className="mt-6 w-full bg-petuno-purple hover:bg-petuno-purple-dark text-white text-center py-2.5 rounded-xl text-xs font-bold transition-all"
              >
                Ver Cuentas de Banco
              </button>
            </div>

            {/* Donation Card 3 */}
            <div className="bg-white dark:bg-dark-surface p-6 rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/10 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="font-extrabold text-sm flex items-center gap-2">
                  🏥 Padrino Médico
                </h4>
                <p className="text-[11px] text-petuno-secondary-text mt-2 leading-relaxed">
                  Financia directamente el tratamiento de un animal herido en las clínicas veterinarias asociadas.
                </p>
              </div>
              <button 
                onClick={() => alert('Contactando al coordinador de urgencias veterinarias de Petuno. Te asignaremos una mascota y la cuenta de cobro directa de la clínica veterinaria.')}
                className="mt-6 w-full bg-petuno-purple hover:bg-petuno-purple-dark text-white text-center py-2.5 rounded-xl text-xs font-bold transition-all"
              >
                Apadrinar una Mascota
              </button>
            </div>
          </div>
          
          <p className="text-[10px] text-petuno-secondary-text text-center italic mt-2">
            ⚠️ Nota de Transparencia: Petuno no recauda fondos directamente para fundaciones ni cobra comisiones. Apoyas de forma directa y autónoma.
          </p>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="blog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full mb-12">
        <div className="bg-white dark:bg-dark-surface-elevated rounded-3xl p-8 lg:p-12 border border-petuno-border dark:border-petuno-secondary-text/30 shadow-sm flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h3 className="text-2xl font-bold text-petuno-text dark:text-dark-text mb-2">Únete a nuestra comunidad</h3>
            <p className="text-petuno-secondary-text dark:text-dark-secondary-text text-sm">Recibe consejos, noticias y alertas importantes para el bienestar de tu mascota.</p>
          </div>
          <div className="lg:w-1/2 w-full flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Tu correo electrónico" 
              className="flex-grow bg-transparent border border-petuno-border dark:border-petuno-secondary-text/50 rounded-xl px-4 py-3 text-petuno-text dark:text-dark-text focus:outline-none focus:border-petuno-purple dark:focus:border-petuno-purple transition-colors"
            />
            <button className="bg-petuno-purple hover:bg-petuno-purple-dark text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors whitespace-nowrap">
              Suscribirme <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-white dark:bg-dark-surface-elevated p-6 rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/30 shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <div className="w-12 h-12 rounded-xl bg-petuno-background dark:bg-dark-background flex items-center justify-center border border-petuno-border/50 dark:border-petuno-secondary-text/20 mb-4">
        {icon}
      </div>
      <h4 className="text-base font-bold text-petuno-text dark:text-dark-text mb-2">{title}</h4>
      <p className="text-xs text-petuno-secondary-text dark:text-dark-secondary-text leading-relaxed">{desc}</p>
    </div>
  );
}

function ExploreCard({ image, title, desc }: { image: string, title: string, desc: string }) {
  return (
    <div className="group cursor-pointer rounded-2xl overflow-hidden bg-white dark:bg-dark-surface-elevated border border-petuno-border dark:border-petuno-secondary-text/30 shadow-sm hover:shadow-lg transition-all flex flex-col">
      <div className="h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-4 flex items-center justify-between">
        <div className="text-left">
          <h4 className="font-bold text-petuno-text dark:text-dark-text">{title}</h4>
          <p className="text-xs text-petuno-secondary-text dark:text-dark-secondary-text">{desc}</p>
        </div>
        <div className="text-petuno-secondary-text dark:text-dark-secondary-text group-hover:text-petuno-purple transition-colors">
          <ArrowRight className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

function StatBox({ icon, number, text }: { icon: React.ReactNode, number: string, text: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="mb-3">{icon}</div>
      <div className="text-3xl font-extrabold text-petuno-text dark:text-dark-text mb-1">{number}</div>
      <div className="text-sm font-medium text-petuno-secondary-text dark:text-dark-secondary-text">{text}</div>
    </div>
  );
}

// ============================================================================
// LOGIN COMPONENT
// ============================================================================

function Login({ onLogin }: { onLogin: (user: { name: string; email: string; phone?: string }) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'john@petuno.test' && password === 'Petuno123!') {
      const userData = { name: 'John', email, phone: '+57 300 123 4567' };
      onLogin(userData);
      if (rememberMe) {
        localStorage.setItem('rememberedUser', JSON.stringify(userData));
      }
      navigate('/app');
    } else {
      setError('Credenciales inválidas. Usa john@petuno.test y Petuno123!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-petuno-background dark:bg-dark-background px-4 py-28 font-sans">
      <div className="max-w-md w-full bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/20 p-8 shadow-xl transition-all">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-petuno-purple-50 dark:bg-dark-surface-elevated flex items-center justify-center mb-3">
            <PawPrint className="w-7 h-7 text-petuno-purple dark:text-petuno-purple-light" fill="currentColor" />
          </div>
          <h2 className="text-2xl font-bold text-petuno-text dark:text-dark-text">Bienvenido a Petuno</h2>
          <p className="text-sm text-petuno-secondary-text dark:text-dark-secondary-text mt-1">Ingresa a tu cuenta para continuar</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-petuno-coral-light border border-petuno-coral/20 text-petuno-coral text-xs rounded-xl flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="text-left">
            <label className="block text-xs font-semibold text-petuno-secondary-text dark:text-dark-secondary-text mb-2">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              placeholder="john@petuno.test" 
              className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-3 text-sm text-petuno-text dark:text-dark-text focus:outline-none focus:border-petuno-purple dark:focus:border-petuno-purple-light transition-colors"
            />
          </div>

          <div className="text-left">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-semibold text-petuno-secondary-text dark:text-dark-secondary-text">Contraseña</label>
              <a href="#" className="text-xs text-petuno-purple dark:text-petuno-purple-light hover:underline">¿Olvidaste tu contraseña?</a>
            </div>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              placeholder="••••••••" 
              className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-3 text-sm text-petuno-text dark:text-dark-text focus:outline-none focus:border-petuno-purple dark:focus:border-petuno-purple-light transition-colors"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 accent-petuno-purple rounded border-petuno-border dark:border-petuno-secondary-text/30"
              />
              <span className="text-xs text-petuno-secondary-text dark:text-dark-secondary-text">Recordarme</span>
            </label>
          </div>

          <button 
            type="submit" 
            className="w-full bg-petuno-purple hover:bg-petuno-purple-dark text-white font-semibold py-3 rounded-xl transition-colors shadow-md mt-4 text-sm"
          >
            Iniciar sesión
          </button>
        </form>

        <div className="relative my-6 text-center">
          <hr className="border-petuno-border dark:border-petuno-secondary-text/20" />
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-petuno-surface dark:bg-dark-surface px-3 text-xs text-petuno-muted">O continuar con</span>
        </div>

        <button className="w-full bg-transparent hover:bg-petuno-border/20 dark:hover:bg-dark-surface-elevated border border-petuno-border dark:border-petuno-secondary-text/30 text-petuno-text dark:text-dark-text font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 5.04c1.62 0 3.08.56 4.22 1.65l3.15-3.15C17.45 1.74 14.93 1 12 1 7.35 1 3.39 3.65 1.5 7.5l3.79 2.94C6.26 6.94 8.93 5.04 12 5.04z"/>
            <path fill="#4285F4" d="M23.52 12.27c0-.82-.07-1.61-.21-2.38H12v4.51h6.48c-.28 1.48-1.12 2.73-2.38 3.58l3.79 2.94c2.22-2.05 3.63-5.07 3.63-8.65z"/>
            <path fill="#FBBC05" d="M5.29 14.56c-.23-.69-.36-1.42-.36-2.18s.13-1.49.36-2.18L1.5 7.26C.54 9.17 0 11.27 0 13.5s.54 4.33 1.5 6.24l3.79-3.18z"/>
            <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.79-2.94c-1.05.7-2.4 1.13-4.17 1.13-3.07 0-5.74-1.9-6.71-4.75L1.5 16.51C3.39 20.35 7.35 23 12 23z"/>
          </svg>
          Google
        </button>

        <p className="text-xs text-petuno-secondary-text dark:text-dark-secondary-text text-center mt-6">
          ¿No tienes una cuenta?{' '}
          <Link to="/register" className="text-petuno-purple dark:text-petuno-purple-light font-semibold hover:underline">Registrarse</Link>
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// REGISTER COMPONENT
// ============================================================================

function Register({ onLogin }: { onLogin: (user: { name: string; email: string; phone?: string; role?: string }) => void }) {
  const [role, setRole] = useState<'propietario' | 'fundacion'>('propietario');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [nombreFundacion, setNombreFundacion] = useState('');
  const [nit, setNit] = useState('');
  const [direccion, setDireccion] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    if (!acceptTerms) {
      setError('Debes aceptar los términos y condiciones');
      return;
    }

    setIsRegistered(true);
    setTimeout(() => {
      const finalName = role === 'propietario' ? nombre : nombreFundacion;
      onLogin({ name: finalName || 'Fundación', email, phone: telefono, role });
      navigate('/app');
    }, 2000);
  };

  if (isRegistered) {
    const finalName = role === 'propietario' ? nombre : nombreFundacion;
    return (
      <div className="min-h-screen flex items-center justify-center bg-petuno-background dark:bg-dark-background px-4 py-28 font-sans">
        <div className="max-w-md w-full bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/20 p-8 shadow-xl text-center">
          <div className="w-16 h-16 rounded-full bg-petuno-mint-light flex items-center justify-center mx-auto mb-4 border border-petuno-mint/20">
            <ShieldCheck className="w-9 h-9 text-petuno-mint animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-petuno-text dark:text-dark-text">¡Bienvenido a Petuno, {finalName}!</h2>
          <p className="text-sm text-petuno-secondary-text dark:text-dark-secondary-text mt-2">
            Estamos creando tu espacio local personalizado...
          </p>
          <div className="w-8 h-8 border-4 border-petuno-purple border-t-transparent rounded-full animate-spin mx-auto mt-6"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-petuno-background dark:bg-dark-background px-4 py-28 font-sans">
      <div className="max-w-md w-full bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/20 p-8 shadow-xl">
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-petuno-purple-50 dark:bg-dark-surface-elevated flex items-center justify-center mb-3">
            <PawPrint className="w-7 h-7 text-petuno-purple dark:text-petuno-purple-light" fill="currentColor" />
          </div>
          <h2 className="text-2xl font-bold text-petuno-text dark:text-dark-text">Crea tu cuenta gratis</h2>
          <p className="text-sm text-petuno-secondary-text dark:text-dark-secondary-text mt-1">Comienza a proteger a tu mascota</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-petuno-coral-light border border-petuno-coral/20 text-petuno-coral text-xs rounded-xl flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Role Tab Switcher */}
        <div className="flex bg-petuno-background dark:bg-dark-surface-elevated rounded-2xl p-1 mb-5">
          <button
            type="button"
            onClick={() => { setRole('propietario'); setError(''); }}
            className={`flex-1 text-center py-2 text-xs font-bold rounded-xl transition-all ${
              role === 'propietario'
                ? 'bg-petuno-purple text-white shadow-sm'
                : 'text-petuno-secondary-text dark:text-dark-secondary-text hover:text-petuno-text'
            }`}
          >
            Propietario
          </button>
          <button
            type="button"
            onClick={() => { setRole('fundacion'); setError(''); }}
            className={`flex-1 text-center py-2 text-xs font-bold rounded-xl transition-all ${
              role === 'fundacion'
                ? 'bg-petuno-purple text-white shadow-sm'
                : 'text-petuno-secondary-text dark:text-dark-secondary-text hover:text-petuno-text'
            }`}
          >
            Fundación
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {role === 'propietario' ? (
            <div className="grid grid-cols-2 gap-4 animate-fade-in">
              <div className="text-left">
                <label className="block text-xs font-semibold text-petuno-secondary-text dark:text-dark-secondary-text mb-2">Nombre</label>
                <input 
                  type="text" 
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="John" 
                  className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-sm text-petuno-text dark:text-dark-text focus:outline-none focus:border-petuno-purple transition-colors"
                />
              </div>
              <div className="text-left">
                <label className="block text-xs font-semibold text-petuno-secondary-text dark:text-dark-secondary-text mb-2">Apellido</label>
                <input 
                  type="text" 
                  required
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  placeholder="Doe" 
                  className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-sm text-petuno-text dark:text-dark-text focus:outline-none focus:border-petuno-purple transition-colors"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-fade-in text-left">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-left">
                  <label className="block text-xs font-semibold text-petuno-secondary-text dark:text-dark-secondary-text mb-2">Nombre de la Fundación</label>
                  <input 
                    type="text" 
                    required
                    value={nombreFundacion}
                    onChange={(e) => setNombreFundacion(e.target.value)}
                    placeholder="Fundación Patitas" 
                    className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-sm text-petuno-text dark:text-dark-text focus:outline-none focus:border-petuno-purple transition-colors"
                  />
                </div>
                <div className="text-left">
                  <label className="block text-xs font-semibold text-petuno-secondary-text dark:text-dark-secondary-text mb-2">NIT</label>
                  <input 
                    type="text" 
                    required
                    value={nit}
                    onChange={(e) => setNit(e.target.value)}
                    placeholder="901.234.567-8" 
                    className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-sm text-petuno-text dark:text-dark-text focus:outline-none focus:border-petuno-purple transition-colors"
                  />
                </div>
              </div>
              <div className="text-left">
                <label className="block text-xs font-semibold text-petuno-secondary-text dark:text-dark-secondary-text mb-2">Dirección de la Sede / Albergue</label>
                <input 
                  type="text" 
                  required
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  placeholder="Calle 100 # 15-30, Bogotá" 
                  className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-sm text-petuno-text dark:text-dark-text focus:outline-none focus:border-petuno-purple transition-colors"
                />
              </div>
            </div>
          )}

          <div className="text-left">
            <label className="block text-xs font-semibold text-petuno-secondary-text dark:text-dark-secondary-text mb-2">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@petuno.test" 
              className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-sm text-petuno-text dark:text-dark-text focus:outline-none focus:border-petuno-purple transition-colors"
            />
          </div>

          <div className="text-left">
            <label className="block text-xs font-semibold text-petuno-secondary-text dark:text-dark-secondary-text mb-2">Teléfono de contacto (Opcional)</label>
            <input 
              type="tel" 
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="Ej. +57 300 123 4567" 
              className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-sm text-petuno-text dark:text-dark-text focus:outline-none focus:border-petuno-purple transition-colors"
            />
          </div>

          <div className="text-left">
            <label className="block text-xs font-semibold text-petuno-secondary-text dark:text-dark-secondary-text mb-2">Contraseña</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-sm text-petuno-text dark:text-dark-text focus:outline-none focus:border-petuno-purple transition-colors"
            />
          </div>

          <div className="text-left">
            <label className="block text-xs font-semibold text-petuno-secondary-text dark:text-dark-secondary-text mb-2">Confirmar Contraseña</label>
            <input 
              type="password" 
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••" 
              className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-sm text-petuno-text dark:text-dark-text focus:outline-none focus:border-petuno-purple transition-colors"
            />
          </div>

          <div className="flex items-start mt-2">
            <label className="flex items-start gap-2 cursor-pointer select-none text-left">
              <input 
                type="checkbox" 
                required
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 accent-petuno-purple rounded border-petuno-border dark:border-petuno-secondary-text/30"
              />
              <span className="text-xs text-petuno-secondary-text dark:text-dark-secondary-text leading-tight">
                Acepto los términos y condiciones de uso y la política de protección de datos de Petuno.
              </span>
            </label>
          </div>

          <button 
            type="submit" 
            className="w-full bg-petuno-purple hover:bg-petuno-purple-dark text-white font-semibold py-3 rounded-xl transition-colors shadow-md mt-4 text-sm"
          >
            Crear cuenta
          </button>
        </form>

        <p className="text-xs text-petuno-secondary-text dark:text-dark-secondary-text text-center mt-6">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-petuno-purple dark:text-petuno-purple-light font-semibold hover:underline">Iniciar sesión</Link>
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// DASHBOARD COMPONENT (Private Area)
// ============================================================================

function Dashboard({ 
  user, 
  onLogout,
  isDarkMode,
  toggleTheme
}: { 
  user: { name: string; email: string; phone?: string } | null; 
  onLogout: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}) {
  // Persistence in localStorage
  const [pets, setPets] = useState<Pet[]>(() => {
    const saved = localStorage.getItem('pets');
    return saved ? JSON.parse(saved) : INITIAL_PETS;
  });

  const [activeTab, setActiveTab] = useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSpecies, setFilterSpecies] = useState('Todos');
  
  // Navigation states for Mascotas module sub-views
  const [currentPetIdForView, setCurrentPetIdForView] = useState<string | null>(null);
  const [isCreatingPet, setIsCreatingPet] = useState(false);
  const [editingPetId, setEditingPetId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showQRModal, setShowQRModal] = useState<string | null>(null);
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);
  
  // Sighting & Public profile states
  const [sightingPetIdForForm, setSightingPetIdForForm] = useState<string | null>(null);
  const [isReportingSighting, setIsReportingSighting] = useState(false);
  const [isReportingUnidentified, setIsReportingUnidentified] = useState(false);
  const [publicProfilePetId, setPublicProfilePetId] = useState<string | null>(null);
  const [activeLostPetId, setActiveLostPetId] = useState<string | null>(null);
  
  const navigate = useNavigate();

  // Save to localStorage when pets change
  useEffect(() => {
    localStorage.setItem('pets', JSON.stringify(pets));
  }, [pets]);

  // Sightings state
  const [sightings, setSightings] = useState<Sighting[]>(() => {
    const saved = localStorage.getItem('sightings');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 's1',
        petId: 'max',
        petName: 'Max',
        petPhoto: 'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=600&auto=format&fit=crop',
        location: 'Parque de la 93',
        date: '2026-08-17',
        time: '15:20',
        description: 'Visto corriendo sin correa cerca de la fuente. Parece desorientado.',
        timestamp: Date.now() - 12 * 60 * 1000
      },
      {
        id: 's2',
        petId: 'max',
        petName: 'Max',
        petPhoto: 'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=600&auto=format&fit=crop',
        location: 'Carrera 11 con Calle 90',
        date: '2026-08-17',
        time: '14:50',
        description: 'Cruzando la calle rápidamente hacia el occidente.',
        timestamp: Date.now() - 45 * 60 * 1000
      }
    ];
  });

  // Save to localStorage when sightings change
  useEffect(() => {
    localStorage.setItem('sightings', JSON.stringify(sightings));
  }, [sightings]);

  // Unidentified sightings (without collar) state
  const [unidentifiedSightings, setUnidentifiedSightings] = useState<UnidentifiedSighting[]>(() => {
    const saved = localStorage.getItem('unidentified_sightings');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'u1',
        location: 'Parque Virrey, Bogotá',
        date: '2026-08-17',
        time: '12:15',
        description: 'Perrito tipo Golden o Labrador color crema, corre asustado sin collar cerca de la zona de juegos.',
        photo: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600&auto=format&fit=crop'
      },
      {
        id: 'u2',
        location: 'Calle 100 con Carrera 15, Bogotá',
        date: '2026-08-17',
        time: '10:45',
        description: 'Gato siamés con collar azul pero sin placa QR. Es dócil y está resguardado temporalmente en portería.',
        photo: 'https://images.unsplash.com/photo-1513360309081-36f5e878fc9e?q=80&w=600&auto=format&fit=crop'
      }
    ];
  });

  // Save unidentified sightings to localStorage
  useEffect(() => {
    localStorage.setItem('unidentified_sightings', JSON.stringify(unidentifiedSightings));
  }, [unidentifiedSightings]);

  // Community posts state
  const [posts, setPosts] = useState<CommunityPost[]>(() => {
    const saved = localStorage.getItem('community_posts');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'post-1',
        authorName: 'Camila Rojas',
        authorRole: 'Propietario',
        content: '¡Toby sigue perdido! Por favor, si alguien en la zona de Cedritos lo ve, repórtelo como avistamiento o envíeme un mensaje anónimo. Es de color amarillo claro y muy asustadizo.',
        photo: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=600&auto=format&fit=crop',
        likes: 24,
        commentsCount: 5,
        timestamp: 'Hace 2 horas'
      },
      {
        id: 'post-2',
        authorName: 'Clínica Veterinaria PetHealth',
        authorRole: 'Veterinario Verificado',
        content: 'Este sábado tendremos jornada de vacunación y desparasitación gratuita en el Parque de la 93 de 9:00 AM a 2:00 PM. Estaremos obsequiando lectura de placas QR Petuno a los asistentes.',
        likes: 45,
        commentsCount: 12,
        timestamp: 'Hace 4 horas'
      },
      {
        id: 'post-3',
        authorName: 'Andrés Pérez',
        authorRole: 'Propietario',
        content: '¡Michi ya está en casa! Queremos agradecer enormemente a la comunidad de Petuno. Gracias a un avistamiento con foto reportado en Chapinero, pudimos ubicarla en menos de 12 horas. ¡El sistema de QR comunitario realmente funciona!',
        photo: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=600&auto=format&fit=crop',
        likes: 89,
        commentsCount: 18,
        timestamp: 'Ayer'
      }
    ];
  });

  // Save community posts to localStorage
  useEffect(() => {
    localStorage.setItem('community_posts', JSON.stringify(posts));
  }, [posts]);

  // Devices state
  const [devices, setDevices] = useState<Device[]>(() => {
    const saved = localStorage.getItem('devices');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'd1',
        name: 'Petuno GPS Collar',
        type: 'GPS',
        petId: 'max',
        status: 'Conectado',
        battery: 83,
        lastConnection: 'Hace 5 minutos'
      },
      {
        id: 'd2',
        name: 'Petuno QR Smart Tag',
        type: 'NFC',
        petId: 'luna',
        status: 'Conectado',
        battery: 100,
        lastConnection: 'Hace 1 hora'
      }
    ];
  });

  // Save devices to localStorage
  useEffect(() => {
    localStorage.setItem('devices', JSON.stringify(devices));
  }, [devices]);

  // Vets state
  const [vets, setVets] = useState<Vet[]>(() => {
    const saved = localStorage.getItem('vets');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'v1',
        name: 'Clínica Veterinaria Cedritos 24/7',
        specialty: 'Urgencias, Cirugía General',
        location: 'Usaquén, Bogotá',
        rating: 4.8,
        schedule: 'Abierto 24 Horas',
        phone: '+57 312 444 5555',
        isTrusted: true
      },
      {
        id: 'v2',
        name: 'Dr. Santiago Mendoza',
        specialty: 'Cardiología, Medicina Interna',
        location: 'Chapinero, Bogotá',
        rating: 4.9,
        schedule: 'Lun - Sáb: 8:00 AM - 6:00 PM',
        phone: '+57 320 888 9999',
        isTrusted: true
      },
      {
        id: 'v3',
        name: 'Centro Veterinario AnimalCare',
        specialty: 'Dermatología, Vacunación',
        location: 'Chicó, Bogotá',
        rating: 4.6,
        schedule: 'Lun - Sáb: 9:00 AM - 7:00 PM',
        phone: '+57 301 222 3333',
        isTrusted: false
      }
    ];
  });

  // Save vets to localStorage
  useEffect(() => {
    localStorage.setItem('vets', JSON.stringify(vets));
  }, [vets]);

  // Adoption pets state
  const [adoptionPets] = useState<AdoptionPet[]>(() => {
    const saved = localStorage.getItem('adoption_pets');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'a1',
        name: 'Lola',
        species: 'Perro',
        breed: 'Criolla (Poodle Mix)',
        age: '6 meses',
        gender: 'Hembra',
        size: 'Pequeño',
        specialNeeds: false,
        location: 'Bogotá, Colombia',
        shelter: 'Fundación Patitas Felices',
        description: 'Lola es extremadamente tierna, juguetona y sociable. Se lleva excelente con niños y otros perros.',
        photo: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600&auto=format&fit=crop'
      },
      {
        id: 'a2',
        name: 'Simba',
        species: 'Gato',
        breed: 'Común Europeo (Tabby)',
        age: '1 año',
        gender: 'Macho',
        size: 'Mediano',
        specialNeeds: false,
        location: 'Medellín, Colombia',
        shelter: 'Refugio Huellas de Amor',
        description: 'Simba es muy cariñoso, le encanta dormir en tu regazo y ronronea con mucha facilidad.',
        photo: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&auto=format&fit=crop'
      },
      {
        id: 'a3',
        name: 'Rocco',
        species: 'Perro',
        breed: 'Golden Retriever Mix',
        age: '2 años',
        gender: 'Macho',
        size: 'Grande',
        specialNeeds: true,
        location: 'Bogotá, Colombia',
        shelter: 'Fundación Huellas',
        description: 'Rocco perdió una de sus patitas traseras en un accidente, pero corre y juega como cualquier perro. Necesita una casa sin demasiadas escaleras.',
        photo: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=600&auto=format&fit=crop'
      }
    ];
  });

  // Save adoption pets to localStorage
  useEffect(() => {
    localStorage.setItem('adoption_pets', JSON.stringify(adoptionPets));
  }, [adoptionPets]);

  // Adoption applications state
  const [adoptionApplications, setAdoptionApplications] = useState<AdoptionApplication[]>(() => {
    const saved = localStorage.getItem('adoption_applications');
    return saved ? JSON.parse(saved) : [];
  });

  // Save adoption applications to localStorage
  useEffect(() => {
    localStorage.setItem('adoption_applications', JSON.stringify(adoptionApplications));
  }, [adoptionApplications]);

  // Privacy settings state
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>(() => {
    const saved = localStorage.getItem('privacy_settings');
    if (saved) return JSON.parse(saved);
    return {
      showName: true,
      showBreed: true,
      showAge: true,
      showLocation: true,
      showMedical: true,
      allowAnonymousContact: true,
      allowSightings: true
    };
  });

  // Save privacy settings to localStorage
  useEffect(() => {
    localStorage.setItem('privacy_settings', JSON.stringify(privacySettings));
  }, [privacySettings]);

  // Notifications state
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('notifications');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'n1',
        title: '¡Toby tiene un nuevo avistamiento!',
        desc: 'Alguien reportó haber visto a Toby cerca de Carrera 11 con Calle 90.',
        time: 'Hace 5 minutos',
        read: false,
        type: 'Alertas'
      },
      {
        id: 'n2',
        title: 'Alerta de Geocerca: Max salió de Casa',
        desc: 'El collar GPS de Max detectó que cruzó el límite seguro de la geocerca "Casa".',
        time: 'Hace 12 minutos',
        read: false,
        type: 'GPS'
      },
      {
        id: 'n3',
        title: 'Próxima Vacuna Programada',
        desc: 'La vacuna de Rabia de Max está programada para el 21 de Septiembre.',
        time: 'Hace 2 horas',
        read: true,
        type: 'Vacunas'
      },
      {
        id: 'n4',
        title: 'Nueva solicitud de adopción',
        desc: 'Has recibido una nueva postulación de John Doe para adoptar a Lola.',
        time: 'Ayer',
        read: true,
        type: 'Sistema'
      }
    ];
  });

  // Save notifications to localStorage
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  const handleToggleDeviceStatus = (deviceId: string) => {
    setDevices(prev => prev.map(d => {
      if (d.id === deviceId) {
        const newStatus = d.status === 'Conectado' ? 'Desconectado' : 'Conectado';
        
        // Add a notification about device status change
        const newNotification: NotificationItem = {
          id: `notif-${Date.now()}`,
          title: `Dispositivo ${d.name} ${newStatus === 'Conectado' ? 'en línea' : 'desconectado'}`,
          desc: `El hardware se ha registrado como ${newStatus === 'Conectado' ? 'activo' : 'fuera de línea'}.`,
          time: 'Hace unos instantes',
          read: false,
          type: 'Dispositivos'
        };
        setNotifications(prevNotif => [newNotification, ...prevNotif]);

        return { ...d, status: newStatus, lastConnection: 'Hace unos instantes' };
      }
      return d;
    }));
  };

  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
  };

  const handleCopyId = (idText: string) => {
    navigator.clipboard.writeText(idText);
    setCopiedId(idText);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleLostStatus = (petId: string) => {
    setPets(prevPets => prevPets.map(pet => {
      if (pet.id === petId) {
        const newStatus = pet.status === 'Perdido' ? 'Protegido' : 'Perdido';
        return { ...pet, status: newStatus };
      }
      return pet;
    }));
  };

  const deletePet = (petId: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta mascota?')) {
      setPets(prevPets => prevPets.filter(p => p.id !== petId));
      setCurrentPetIdForView(null);
      setEditingPetId(null);
    }
  };

  const menuItems = [
    { name: 'Dashboard', icon: <Activity className="w-5 h-5" /> },
    { name: 'Mis mascotas', icon: <PawPrint className="w-5 h-5" /> },
    { name: 'Mascotas perdidas', icon: <AlertTriangle className="w-5 h-5" /> },
    { name: 'Avistamientos', icon: <MapPin className="w-5 h-5" /> },
    { name: 'Comunidad', icon: <MessageSquare className="w-5 h-5" /> },
    { name: 'Dispositivos', icon: <Cpu className="w-5 h-5" /> },
    { name: 'Veterinarios', icon: <Stethoscope className="w-5 h-5" /> },
    { name: 'Adopciones', icon: <Heart className="w-5 h-5" /> },
    { name: 'Notificaciones', icon: <Bell className="w-5 h-5" /> },
    { name: 'Configuración', icon: <Settings className="w-5 h-5" /> },
  ];

  // Helper function to reset view states when navigation changes
  const changeTab = (tabName: string) => {
    setActiveTab(tabName);
    setCurrentPetIdForView(null);
    setIsCreatingPet(false);
    setEditingPetId(null);
    setIsReportingSighting(false);
    setIsReportingUnidentified(false);
    setActiveLostPetId(null);
  };

  return (
    <div className="min-h-screen bg-petuno-background dark:bg-dark-background text-petuno-text dark:text-dark-text flex font-sans">
      
      {/* SIDEBAR (Desktop) */}
      <aside className="hidden lg:flex flex-col w-[260px] bg-petuno-surface dark:bg-dark-surface border-r border-petuno-border dark:border-petuno-secondary-text/15 fixed top-0 bottom-0 z-30 transition-all">
        <div className="h-20 flex items-center px-6 border-b border-petuno-border dark:border-petuno-secondary-text/15">
          <Link to="/app" onClick={() => changeTab('Dashboard')} className="flex items-center gap-2 font-bold text-2xl tracking-tight text-petuno-text dark:text-dark-text">
            <PawPrint className="w-7 h-7 text-petuno-purple dark:text-petuno-purple-light" fill="currentColor" />
            petuno
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => changeTab(item.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === item.name && !currentPetIdForView && !isCreatingPet && !editingPetId
                  ? 'bg-petuno-purple text-white shadow-md'
                  : 'text-petuno-secondary-text dark:text-dark-secondary-text hover:bg-petuno-background dark:hover:bg-dark-surface-elevated'
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-petuno-border dark:border-petuno-secondary-text/15 bg-petuno-background/50 dark:bg-dark-background/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-petuno-purple text-white font-extrabold flex items-center justify-center text-lg shadow-inner">
              {user?.name ? user.name[0].toUpperCase() : 'J'}
            </div>
            <div className="text-left flex-1 min-w-0">
              <p className="text-sm font-bold truncate">{user?.name || 'John'}</p>
              <p className="text-xs text-petuno-secondary-text dark:text-dark-secondary-text truncate">{user?.email || 'john@petuno.test'}</p>
            </div>
            <span className="bg-petuno-purple/10 text-petuno-purple text-[10px] font-extrabold px-2 py-1 rounded-full">
              Free
            </span>
          </div>
          <button 
            onClick={handleLogoutClick}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-petuno-coral/25 hover:bg-petuno-coral-light/20 text-petuno-coral text-xs font-bold transition-all"
          >
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="flex-1 lg:pl-[260px] flex flex-col min-h-screen pb-24 lg:pb-8">
        
        {/* HEADER */}
        <header className="h-20 bg-petuno-surface dark:bg-dark-surface border-b border-petuno-border dark:border-petuno-secondary-text/15 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4 lg:gap-0 text-left">
            <div className="lg:hidden flex items-center gap-2 font-bold text-xl">
              <PawPrint className="w-6 h-6 text-petuno-purple" fill="currentColor" />
              <span>petuno</span>
            </div>
            <h1 className="hidden lg:block text-xl font-bold">
              {isCreatingPet ? 'Registrar Nueva Mascota' : editingPetId ? 'Editar Mascota' : currentPetIdForView ? 'Perfil de Mascota' : activeTab}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-petuno-background dark:hover:bg-dark-surface-elevated text-petuno-secondary-text dark:text-dark-secondary-text transition-colors">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <div className="relative">
              <button 
                onClick={() => setShowNotificationsDropdown(!showNotificationsDropdown)}
                className="p-2 rounded-full hover:bg-petuno-background dark:hover:bg-dark-surface-elevated text-petuno-secondary-text dark:text-dark-secondary-text relative"
              >
                <Bell className="w-5 h-5" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-petuno-purple border-2 border-petuno-surface dark:border-dark-surface rounded-full"></span>
                )}
              </button>
              
              {showNotificationsDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-petuno-surface dark:bg-dark-surface border border-petuno-border dark:border-petuno-secondary-text/15 rounded-2xl p-4 shadow-xl z-50 text-xs text-left animate-fade-in">
                  <div className="flex justify-between items-center border-b border-petuno-border dark:border-petuno-secondary-text/10 pb-2 mb-2 font-bold">
                    <span>Notificaciones</span>
                    <button 
                      onClick={() => {
                        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
                        setShowNotificationsDropdown(false);
                      }}
                      className="text-[10px] text-petuno-purple hover:underline"
                    >
                      Marcar todas como leídas
                    </button>
                  </div>
                  
                  <div className="space-y-2.5 max-h-64 overflow-y-auto py-1">
                    {notifications.slice(0, 4).map(notif => (
                      <div 
                        key={notif.id} 
                        onClick={() => {
                          setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n));
                          setShowNotificationsDropdown(false);
                          changeTab('Notificaciones');
                        }}
                        className={`p-2 rounded-xl border transition-colors cursor-pointer text-left ${
                          notif.read 
                            ? 'bg-transparent border-transparent hover:bg-petuno-background dark:hover:bg-dark-surface-elevated/40' 
                            : 'bg-petuno-purple/5 border-petuno-purple/10 hover:bg-petuno-purple/10 dark:bg-petuno-purple/10 dark:border-petuno-purple/20'
                        }`}
                      >
                        <div className="flex justify-between items-baseline gap-1 font-bold">
                          <span className={notif.read ? 'text-petuno-text dark:text-dark-text' : 'text-petuno-purple'}>
                            {notif.title}
                          </span>
                          <span className="text-[8px] text-petuno-muted shrink-0">{notif.time}</span>
                        </div>
                        <p className="text-[10px] text-petuno-secondary-text dark:text-dark-secondary-text mt-0.5 leading-snug truncate">
                          {notif.desc}
                        </p>
                      </div>
                    ))}
                    
                    {notifications.length === 0 && (
                      <p className="text-center py-4 text-petuno-muted italic">No tienes notificaciones</p>
                    )}
                  </div>
                  
                  <div className="border-t border-petuno-border dark:border-petuno-secondary-text/10 pt-2 mt-2 text-center">
                    <button 
                      onClick={() => {
                        setShowNotificationsDropdown(false);
                        changeTab('Notificaciones');
                      }}
                      className="text-[10px] font-bold text-petuno-purple hover:underline"
                    >
                      Ver todas las notificaciones
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* CONTENT AREA */}
        <main className="flex-grow p-4 sm:p-8">
          
          {/* 1. CREAR MASCOTA WIZARD FORM */}
          {isCreatingPet && (
            <PetForm 
              defaultPhone={user?.phone}
              onSave={(newPet) => {
                setPets(prev => [...prev, newPet]);
                setIsCreatingPet(false);
                setCurrentPetIdForView(newPet.id);
              }}
              onCancel={() => setIsCreatingPet(false)}
            />
          )}

          {/* 2. EDITAR MASCOTA FORM */}
          {editingPetId && (
            <PetForm 
              pet={pets.find(p => p.id === editingPetId)}
              onSave={(updatedPet) => {
                setPets(prev => prev.map(p => p.id === editingPetId ? updatedPet : p));
                setEditingPetId(null);
                setCurrentPetIdForView(updatedPet.id);
              }}
              onCancel={() => setEditingPetId(null)}
            />
          )}

          {/* 3. VER PERFIL DE MASCOTA */}
          {currentPetIdForView && !isCreatingPet && !editingPetId && (
            <PetProfile 
              pet={pets.find(p => p.id === currentPetIdForView)!}
              onBack={() => {
                setCurrentPetIdForView(null);
                setActiveTab('Mis mascotas');
              }}
              onEdit={(id) => setEditingPetId(id)}
              onDelete={(id) => deletePet(id)}
              onToggleLost={(id) => toggleLostStatus(id)}
              onCopyId={(idText) => handleCopyId(idText)}
              copiedId={copiedId}
              onShowQR={(id) => setShowQRModal(id)}
            />
          )}

          {/* 4. DASHBOARD GENERAL */}
          {activeTab === 'Dashboard' && !currentPetIdForView && !isCreatingPet && !editingPetId && !activeLostPetId && (
            <div className="max-w-6xl mx-auto space-y-8">
              {/* SOS Active Summary Bar (Notification style) */}
              {pets.filter(p => p.isMine && p.status === 'Perdido').length > 0 && (
                <div className="bg-petuno-coral/5 border border-petuno-coral/25 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-left shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 bg-petuno-coral rounded-full animate-ping shrink-0"></div>
                    <div>
                      <h4 className="font-bold text-xs text-petuno-coral flex items-center gap-1.5">
                        🚨 Notificación SOS: {pets.filter(p => p.isMine && p.status === 'Perdido').length} {pets.filter(p => p.isMine && p.status === 'Perdido').length === 1 ? 'mascota reportada' : 'mascotas reportadas'} como pérdida.
                      </h4>
                      <p className="text-[10px] text-petuno-secondary-text dark:text-dark-secondary-text mt-0.5">El sistema de búsqueda comunitario y las notificaciones a centros cercanos están activos.</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 shrink-0">
                    {pets.filter(p => p.isMine && p.status === 'Perdido').map(pet => (
                      <button 
                        key={pet.id}
                        onClick={() => setActiveLostPetId(pet.id)}
                        className="bg-petuno-coral hover:bg-petuno-coral/95 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-lg transition-all shadow-sm"
                      >
                        Administrar {pet.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="text-left">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Buenos días, {user?.name || 'John'}</h2>
                <p className="text-sm text-petuno-secondary-text dark:text-dark-secondary-text mt-1">Esto es lo que está pasando con tus mascotas.</p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard icon={<PawPrint className="text-petuno-purple" />} title="Mis mascotas" value={pets.filter(p => p.isMine).length.toString()} />
                <MetricCard icon={<Cpu className="text-petuno-purple" />} title="Dispositivos" value="0 asociados" />
                <MetricCard icon={<Calendar className="text-petuno-purple" />} title="Próxima vacuna" value="Max — 21 Sep" />
                <MetricCard icon={<Bell className="text-petuno-purple" />} title="Notificaciones" value="4" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  {/* Pets section */}
                  <div className="bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-bold">Mis mascotas</h3>
                      <button 
                        onClick={() => setIsCreatingPet(true)}
                        className="flex items-center gap-1.5 text-xs font-bold text-petuno-purple hover:underline"
                      >
                        <Plus className="w-4 h-4" /> Agregar mascota
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {pets.filter(p => p.isMine).map((pet) => (
                        <div key={pet.id} className="border border-petuno-border dark:border-petuno-secondary-text/15 rounded-xl overflow-hidden bg-petuno-background/30 dark:bg-dark-surface-elevated/45 flex flex-col">
                          <div className="h-32 overflow-hidden relative">
                            <img src={pet.photo} alt={pet.name} className="w-full h-full object-cover" />
                            <span className={`absolute top-3 right-3 border font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 text-[10px] ${
                              pet.status === 'Perdido' 
                                ? 'bg-petuno-coral-light border-petuno-coral/20 text-petuno-coral' 
                                : 'bg-petuno-mint-light border-petuno-mint/20 text-petuno-mint'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${pet.status === 'Perdido' ? 'bg-petuno-coral' : 'bg-petuno-mint'}`}></span>
                              {pet.status}
                            </span>
                          </div>
                          <div className="p-4 text-left flex-1 flex flex-col justify-between">
                            <div>
                              <h4 className="font-bold text-base">{pet.name}</h4>
                              <p className="text-xs text-petuno-secondary-text dark:text-dark-secondary-text mt-0.5">{pet.species} • {pet.breed}</p>
                              <div className="mt-3 flex items-center gap-1.5 text-[11px] font-mono text-petuno-secondary-text dark:text-dark-secondary-text">
                                <QrCode className="w-3.5 h-3.5" />
                                <span>{pet.petunoId}</span>
                              </div>
                            </div>
                            <button 
                              onClick={() => setCurrentPetIdForView(pet.id)}
                              className="w-full mt-4 bg-petuno-purple/10 hover:bg-petuno-purple text-petuno-purple hover:text-white py-2 rounded-xl text-xs font-bold transition-all"
                            >
                              Ver perfil
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Device Status */}
                  <div className="bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 p-6 shadow-sm text-left">
                    <h3 className="text-lg font-bold mb-4">Dispositivos Inteligentes</h3>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border border-dashed border-petuno-purple/35 bg-petuno-purple-50/10 dark:bg-dark-surface-elevated/20 rounded-xl">
                      <div className="flex items-center gap-3 text-left">
                        <div className="p-2.5 bg-petuno-purple/10 rounded-xl text-petuno-purple shrink-0">
                          <Cpu className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs">Monitoreo GPS y Placas NFC</h4>
                          <p className="text-[10px] text-petuno-secondary-text mt-0.5">El QR es gratis. Habilita mapas y lectura contactless vinculando accesorios oficiales.</p>
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={() => alert('Abriendo catálogo de collares GPS y placas NFC...')}
                        className="bg-petuno-purple text-white text-xs font-bold px-3.5 py-2 rounded-xl hover:bg-petuno-purple-dark transition-all whitespace-nowrap"
                      >
                        Ver catálogo
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div className="bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 p-6 shadow-sm text-left">
                    <h3 className="text-lg font-bold mb-4">Acciones rápidas</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <button onClick={() => setIsCreatingPet(true)} className="flex flex-col items-center justify-center p-4 border border-petuno-border dark:border-petuno-secondary-text/15 rounded-xl hover:bg-petuno-background dark:hover:bg-dark-surface-elevated transition-colors text-center">
                        <Plus className="w-6 h-6 text-petuno-purple mb-2" />
                        <span className="text-xs font-bold">Agregar mascota</span>
                      </button>
                      <button onClick={() => { changeTab('Mis mascotas'); }} className="flex flex-col items-center justify-center p-4 border border-petuno-border dark:border-petuno-secondary-text/15 rounded-xl hover:bg-petuno-background dark:hover:bg-dark-surface-elevated transition-colors text-center">
                        <AlertTriangle className="w-6 h-6 text-petuno-coral mb-2" />
                        <span className="text-xs font-bold text-petuno-coral">Mascota perdida</span>
                      </button>
                      <button onClick={() => { const myPets = pets.filter(p => p.isMine); if(myPets.length > 0) setShowQRModal(myPets[0].id); }} className="flex flex-col items-center justify-center p-4 border border-petuno-border dark:border-petuno-secondary-text/15 rounded-xl hover:bg-petuno-background dark:hover:bg-dark-surface-elevated transition-colors text-center">
                        <QrCode className="w-6 h-6 text-petuno-purple mb-2" />
                        <span className="text-xs font-bold">Generar QR</span>
                      </button>
                      <button className="flex flex-col items-center justify-center p-4 border border-petuno-border dark:border-petuno-secondary-text/15 rounded-xl hover:bg-petuno-background dark:hover:bg-dark-surface-elevated transition-colors text-center">
                        <Cpu className="w-6 h-6 text-petuno-purple mb-2" />
                        <span className="text-xs font-bold">Nuevo dispositivo</span>
                      </button>
                    </div>
                  </div>

                  <div className="bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 p-6 shadow-sm text-left">
                    <h3 className="text-lg font-bold mb-4">Próximos eventos</h3>
                    <div className="space-y-4">
                      <EventRow icon={<Calendar className="w-4 h-4 text-petuno-purple" />} title="Vacuna de Rabia (Max)" date="21 Sep, 2026" badge="Prioridad" />
                      <EventRow icon={<Calendar className="w-4 h-4 text-petuno-purple" />} title="Desparasitación (Luna)" date="05 Oct, 2026" />
                      <EventRow icon={<Calendar className="w-4 h-4 text-petuno-purple" />} title="Control Veterinario (Max)" date="12 Oct, 2026" />
                    </div>
                  </div>

                  <div className="bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 p-6 shadow-sm text-left">
                    <h3 className="text-lg font-bold mb-4">Actividad reciente</h3>
                    <div className="space-y-4 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-petuno-border dark:before:bg-petuno-secondary-text/15">
                      <ActivityRow icon={<QrCode className="w-3.5 h-3.5 text-petuno-purple" />} title="QR Escaneado - Max" time="Hace 2 horas" desc="Ubicación: Bogotá, Chapinero" />
                      <ActivityRow icon={<FileText className="w-3.5 h-3.5 text-petuno-purple" />} title="Ficha de vacunas actualizada" time="Ayer" desc="Luna - Vacuna triple felina" />
                      <ActivityRow icon={<Cpu className="w-3.5 h-3.5 text-petuno-purple" />} title="GPS conectado - Collar Max" time="Hace 2 días" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 5. MIS MASCOTAS LIST VIEW */}
          {activeTab === 'Mis mascotas' && !currentPetIdForView && !isCreatingPet && !editingPetId && (
            <div className="max-w-6xl mx-auto space-y-6">
              
              {/* Header and Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center text-left">
                <div>
                  <h2 className="text-2xl font-extrabold tracking-tight">Mis mascotas</h2>
                  <p className="text-sm text-petuno-secondary-text dark:text-dark-secondary-text mt-1">Registra y administra las identidades digitales de tus mascotas</p>
                </div>
                <button 
                  onClick={() => setIsCreatingPet(true)}
                  className="bg-petuno-purple hover:bg-petuno-purple-dark text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md flex items-center gap-2 self-stretch sm:self-auto justify-center"
                >
                  <Plus className="w-4 h-4" /> Agregar mascota
                </button>
              </div>

              {/* Filters and Search */}
              <div className="flex flex-col md:flex-row gap-4 bg-petuno-surface dark:bg-dark-surface p-4 rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 shadow-sm">
                
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="w-5 h-5 text-petuno-muted absolute left-4 top-1/2 transform -translate-y-1/2" />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar por nombre, raza o Petuno ID..."
                    className="w-full pl-11 pr-4 py-2.5 bg-petuno-background dark:bg-dark-surface-elevated border border-petuno-border dark:border-petuno-secondary-text/20 rounded-xl text-sm focus:outline-none focus:border-petuno-purple transition-all"
                  />
                </div>

                {/* Filter chips */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-petuno-secondary-text dark:text-dark-secondary-text flex items-center gap-1.5 mr-2">
                    <Filter className="w-4 h-4" /> Filtrar:
                  </span>
                  {['Todos', 'Perro', 'Gato', 'Otros'].map((category) => (
                    <button
                      key={category}
                      onClick={() => setFilterSpecies(category)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        filterSpecies === category 
                          ? 'bg-petuno-purple text-white shadow-sm'
                          : 'bg-petuno-background dark:bg-dark-surface-elevated text-petuno-secondary-text dark:text-dark-secondary-text border border-petuno-border dark:border-transparent hover:bg-petuno-border/40'
                      }`}
                    >
                      {category === 'Todos' ? 'Todos' : category === 'Perro' ? 'Perros' : category === 'Gato' ? 'Gatos' : 'Otros'}
                    </button>
                  ))}
                </div>

              </div>

              {/* Pets Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {pets
                  .filter(pet => pet.isMine)
                  .filter(pet => {
                    const matchesSearch = pet.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                          pet.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                          pet.petunoId.toLowerCase().includes(searchQuery.toLowerCase());
                    const matchesFilter = filterSpecies === 'Todos' || 
                                          (filterSpecies === 'Otros' && pet.species !== 'Perro' && pet.species !== 'Gato') ||
                                          pet.species === filterSpecies;
                    return matchesSearch && matchesFilter;
                  })
                  .map((pet) => (
                    <div key={pet.id} className="bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
                      
                      {/* Photo + Status Header */}
                      <div className="h-44 overflow-hidden relative bg-petuno-background">
                        {pet.photo ? (
                          <img src={pet.photo} alt={pet.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-petuno-muted bg-petuno-background dark:bg-dark-surface-elevated">
                            <PawPrint className="w-12 h-12" />
                          </div>
                        )}
                        
                        {/* Status Badge */}
                        <button 
                          onClick={() => toggleLostStatus(pet.id)}
                          className={`absolute top-4 right-4 border font-extrabold px-3 py-1 rounded-full flex items-center gap-1.5 text-xs shadow-md transition-transform active:scale-95 ${
                            pet.status === 'Perdido' 
                              ? 'bg-petuno-coral-light border-petuno-coral/20 text-petuno-coral' 
                              : 'bg-petuno-mint-light border-petuno-mint/20 text-petuno-mint'
                          }`}
                          title="Haz clic para reportar estado de pérdida"
                        >
                          <span className={`w-2 h-2 rounded-full ${pet.status === 'Perdido' ? 'bg-petuno-coral animate-ping' : 'bg-petuno-mint'}`}></span>
                          {pet.status}
                        </button>
                      </div>

                      {/* Content Card Body */}
                      <div className="p-5 text-left flex-1 flex flex-col justify-between">
                        
                        {/* Info details */}
                        <div>
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-bold truncate">{pet.name}</h3>
                              <p className="text-xs text-petuno-secondary-text dark:text-dark-secondary-text mt-0.5">{pet.species} • {pet.breed}</p>
                            </div>
                            <span className="text-[11px] font-bold text-petuno-secondary-text dark:text-dark-secondary-text px-2 py-0.5 rounded bg-petuno-background dark:bg-dark-surface-elevated">
                              {pet.gender}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-y-2 mt-4 pt-4 border-t border-petuno-border dark:border-petuno-secondary-text/10 text-xs">
                            <div>
                              <span className="text-[10px] text-petuno-muted font-semibold block">EDAD</span>
                              <span className="font-bold text-petuno-text dark:text-dark-text">{pet.age || 'No especificada'}</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-petuno-muted font-semibold block">PETUNO ID</span>
                              <span className="font-mono font-bold flex items-center gap-1 text-petuno-purple dark:text-petuno-purple-light">
                                {pet.petunoId}
                                <button onClick={() => handleCopyId(pet.petunoId)} className="p-0.5 hover:bg-petuno-background dark:hover:bg-dark-surface-elevated rounded">
                                  {copiedId === pet.petunoId ? <Check className="w-3.5 h-3.5 text-petuno-mint" /> : <Copy className="w-3.5 h-3.5 text-petuno-muted" />}
                                </button>
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Card Actions Footer */}
                        <div className="grid grid-cols-2 gap-2 mt-6">
                          <button 
                            onClick={() => setCurrentPetIdForView(pet.id)}
                            className="bg-petuno-purple hover:bg-petuno-purple-dark text-white py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
                          >
                            <PawPrint className="w-3.5 h-3.5" /> Ver Perfil
                          </button>
                          
                          <div className="flex gap-2">
                            <button 
                              onClick={() => setEditingPetId(pet.id)}
                              className="flex-1 border border-petuno-border dark:border-petuno-secondary-text/20 hover:bg-petuno-background dark:hover:bg-dark-surface-elevated text-petuno-secondary-text dark:text-dark-text py-2 rounded-xl text-xs font-bold transition-all"
                              title="Editar Mascota"
                            >
                              <Edit className="w-4 h-4 mx-auto" />
                            </button>
                            <button 
                              onClick={() => setShowQRModal(pet.id)}
                              className="flex-1 border border-petuno-border dark:border-petuno-secondary-text/20 hover:bg-petuno-background dark:hover:bg-dark-surface-elevated text-petuno-secondary-text dark:text-dark-text py-2 rounded-xl text-xs font-bold transition-all"
                              title="Ver QR"
                            >
                              <QrCode className="w-4 h-4 mx-auto" />
                            </button>
                            <button 
                              onClick={() => toggleLostStatus(pet.id)}
                              className={`flex-1 border py-2 rounded-xl text-xs font-bold transition-all ${
                                pet.status === 'Perdido' 
                                  ? 'bg-petuno-coral-light border-petuno-coral/20 text-petuno-coral' 
                                  : 'border-petuno-border dark:border-petuno-secondary-text/20 hover:bg-petuno-coral-light/10 text-petuno-coral'
                              }`}
                              title={pet.status === 'Perdido' ? 'Marcar como encontrada' : 'Reportar como perdida'}
                            >
                              <AlertTriangle className="w-4 h-4 mx-auto" />
                            </button>
                          </div>
                        </div>

                      </div>

                    </div>
                  ))}

                {pets
                  .filter(pet => pet.isMine)
                  .filter(pet => {
                    const matchesSearch = pet.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                          pet.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                          pet.petunoId.toLowerCase().includes(searchQuery.toLowerCase());
                    const matchesFilter = filterSpecies === 'Todos' || 
                                          (filterSpecies === 'Otros' && pet.species !== 'Perro' && pet.species !== 'Gato') ||
                                          pet.species === filterSpecies;
                    return matchesSearch && matchesFilter;
                  }).length === 0 && (
                  <div className="col-span-full py-16 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-full bg-petuno-purple-50 dark:bg-dark-surface-elevated flex items-center justify-center text-petuno-purple mb-4">
                      <PawPrint className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold">No se encontraron mascotas</h3>
                    <p className="text-sm text-petuno-secondary-text dark:text-dark-secondary-text mt-1 max-w-sm">Intenta ajustar los criterios de búsqueda o agrega una nueva mascota.</p>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* Lost Pet Manager View */}
          {activeLostPetId && !isReportingSighting && (
            <LostPetManager 
              pet={pets.find(p => p.id === activeLostPetId)!}
              sightings={sightings}
              onBack={() => setActiveLostPetId(null)}
              onDeactivate={() => {
                toggleLostStatus(activeLostPetId);
                setActiveLostPetId(null);
              }}
              onReportSighting={(id) => {
                setSightingPetIdForForm(id);
                setIsReportingSighting(true);
              }}
              onVerMapa={() => {
                setActiveLostPetId(null);
                setActiveTab('Mascotas perdidas');
              }}
            />
          )}

          {/* Sighting Reporting Form */}
          {isReportingSighting && (
            <SightingForm 
              lostPets={pets.filter(p => p.status === 'Perdido')}
              preSelectedPetId={sightingPetIdForForm}
              onSave={(petId, location, date, time, description, photoBase64) => {
                const targetPet = pets.find(p => p.id === petId);
                if (targetPet) {
                  const newSighting: Sighting = {
                    id: `s-${Date.now()}`,
                    petId,
                    petName: targetPet.name,
                    petPhoto: targetPet.photo,
                    location,
                    date,
                    time,
                    description,
                    photo: photoBase64,
                    timestamp: Date.now()
                  };
                  setSightings(prev => [newSighting, ...prev]);
                  
                  // Add alert notification
                  const newNotification: NotificationItem = {
                    id: `notif-${Date.now()}`,
                    title: `Nuevo avistamiento de ${targetPet.name}`,
                    desc: `Reportado en ${location}. Descripción: ${description}`,
                    time: 'Hace unos instantes',
                    read: false,
                    type: 'Alertas'
                  };
                  setNotifications(prevNotif => [newNotification, ...prevNotif]);

                  alert(`¡Avistamiento reportado para ${targetPet.name}! Se ha notificado al propietario.`);
                }
                setIsReportingSighting(false);
                setSightingPetIdForForm(null);
              }}
              onCancel={() => {
                setIsReportingSighting(false);
                setSightingPetIdForForm(null);
              }}
            />
          )}

          {/* 5. MASCOTAS PERDIDAS VIEW */}
          {activeTab === 'Mascotas perdidas' && !currentPetIdForView && !isCreatingPet && !editingPetId && !activeLostPetId && !isReportingSighting && (
            <LostPetsView 
              pets={pets} 
              onReportSighting={(id) => {
                setSightingPetIdForForm(id);
                setIsReportingSighting(true);
              }}
              onViewPublicProfile={(id) => {
                setPublicProfilePetId(id);
              }}
            />
          )}

          {/* 6. TIMELINE DE AVISTAMIENTOS VIEW */}
          {activeTab === 'Avistamientos' && !currentPetIdForView && !isCreatingPet && !editingPetId && !activeLostPetId && !isReportingSighting && !isReportingUnidentified && (
            <SightingsTimelineView 
              sightings={sightings}
              unidentifiedSightings={unidentifiedSightings}
              pets={pets}
              onReportSighting={() => {
                setSightingPetIdForForm(null);
                setIsReportingSighting(true);
              }}
              onLinkSighting={(sightingId, petId) => {
                const uSighting = unidentifiedSightings.find(s => s.id === sightingId);
                const targetPet = pets.find(p => p.id === petId);
                if (uSighting && targetPet) {
                  const newSighting: Sighting = {
                    id: `s-linked-${Date.now()}`,
                    petId,
                    petName: targetPet.name,
                    petPhoto: targetPet.photo,
                    location: uSighting.location,
                    date: uSighting.date,
                    time: uSighting.time,
                    description: uSighting.description,
                    photo: uSighting.photo,
                    timestamp: Date.now()
                  };
                  setSightings(prev => [newSighting, ...prev]);
                  setUnidentifiedSightings(prev => prev.filter(s => s.id !== sightingId));
                  alert(`¡Has vinculado el avistamiento a la búsqueda de ${targetPet.name}!`);
                }
              }}
              onReportUnidentified={() => {
                setIsReportingUnidentified(true);
              }}
            />
          )}

          {/* Unidentified Sighting Reporting Form */}
          {isReportingUnidentified && (
            <UnidentifiedSightingForm 
              onSave={(location, date, time, description, photoBase64) => {
                const newUSighting: UnidentifiedSighting = {
                  id: `u-${Date.now()}`,
                  location,
                  date,
                  time,
                  description,
                  photo: photoBase64 || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600&auto=format&fit=crop'
                };
                setUnidentifiedSightings(prev => [newUSighting, ...prev]);
                alert('¡Reporte comunitario sin chapa registrado exitosamente!');
                setIsReportingUnidentified(false);
              }}
              onCancel={() => {
                setIsReportingUnidentified(false);
              }}
            />
          )}

          {/* Comunidad View */}
          {activeTab === 'Comunidad' && !currentPetIdForView && !isCreatingPet && !editingPetId && !activeLostPetId && !isReportingSighting && !isReportingUnidentified && (
            <ComunidadView 
              posts={posts}
              onLikePost={(postId) => {
                setPosts(prev => prev.map(post => {
                  if (post.id === postId) {
                    const newLikes = post.likedByUser ? post.likes - 1 : post.likes + 1;
                    return { ...post, likes: newLikes, likedByUser: !post.likedByUser };
                  }
                  return post;
                }));
              }}
              onAddPost={(content, photoBase64) => {
                const newPost: CommunityPost = {
                  id: `post-${Date.now()}`,
                  authorName: user?.name || 'John Doe',
                  authorRole: 'Propietario',
                  content,
                  photo: photoBase64,
                  likes: 0,
                  commentsCount: 0,
                  timestamp: 'Hace unos instantes'
                };
                setPosts(prev => [newPost, ...prev]);
              }}
            />
          )}

          {/* Devices View */}
          {activeTab === 'Dispositivos' && !currentPetIdForView && !isCreatingPet && !editingPetId && !activeLostPetId && !isReportingSighting && !isReportingUnidentified && (
            <DevicesView 
              devices={devices}
              pets={pets.filter(p => p.isMine)}
              onToggleDeviceStatus={handleToggleDeviceStatus}
              onAddDevice={(deviceName, deviceType, assocPetId, initialBattery) => {
                const newDevice: Device = {
                  id: `d-${Date.now()}`,
                  name: deviceName,
                  type: deviceType,
                  petId: assocPetId,
                  status: 'Conectado',
                  battery: initialBattery,
                  lastConnection: 'Hace unos instantes'
                };
                setDevices(prev => [...prev, newDevice]);
                alert('¡Dispositivo registrado exitosamente!');
              }}
            />
          )}

          {/* Veterinarios View */}
          {activeTab === 'Veterinarios' && !currentPetIdForView && !isCreatingPet && !editingPetId && !activeLostPetId && !isReportingSighting && !isReportingUnidentified && (
            <VetsView 
              vets={vets}
              onToggleVetTrusted={(vetId) => {
                setVets(prev => prev.map(v => v.id === vetId ? { ...v, isTrusted: !v.isTrusted } : v));
              }}
            />
          )}

          {/* Adopciones View */}
          {activeTab === 'Adopciones' && !currentPetIdForView && !isCreatingPet && !editingPetId && !activeLostPetId && !isReportingSighting && !isReportingUnidentified && (
            <AdoptionsView 
              adoptionPets={adoptionPets}
              onApplyAdoption={(adoptPetId, applicantName, email, phone, address, housing, hasOtherPets, timeAvail) => {
                const newApplication: AdoptionApplication = {
                  id: `app-${Date.now()}`,
                  adoptionPetId: adoptPetId,
                  petName: adoptionPets.find(ap => ap.id === adoptPetId)?.name || 'Mascota',
                  applicantName,
                  email,
                  phone,
                  address,
                  housing,
                  hasPets: hasOtherPets,
                  timeAvailable: timeAvail,
                  status: 'Pendiente',
                  date: new Date().toISOString().split('T')[0]
                };
                setAdoptionApplications(prev => [newApplication, ...prev]);
                
                // Dispatch system notification
                const newNotification: NotificationItem = {
                  id: `notif-${Date.now()}`,
                  title: 'Solicitud de adopción enviada',
                  desc: `Tu postulación para adoptar a ${newApplication.petName} fue enviada con éxito.`,
                  time: 'Hace unos instantes',
                  read: false,
                  type: 'Sistema'
                };
                setNotifications(prev => [newNotification, ...prev]);
              }}
            />
          )}

          {/* Configuración View */}
          {activeTab === 'Configuración' && !currentPetIdForView && !isCreatingPet && !editingPetId && !activeLostPetId && !isReportingSighting && !isReportingUnidentified && (
            <SettingsView 
              user={user}
              privacySettings={privacySettings}
              onSaveProfile={(pName, pEmail, pPhone) => {
                localStorage.setItem('user_profile_updated', JSON.stringify({ name: pName, email: pEmail, phone: pPhone }));
              }}
              onSavePrivacy={(updatedPrivacy) => {
                setPrivacySettings(updatedPrivacy);
              }}
              onUpgradeSubscription={() => {
                alert('¡Felicidades! Has actualizado tu cuenta a Petuno Premium. Disfruta de localización satelital en vivo e historiales médicos ilimitados.');
              }}
              onDeleteAccount={() => {
                alert('Cuenta eliminada correctamente del servidor local de Petuno. Redirigiendo...');
                handleLogoutClick();
              }}
            />
          )}

          {/* Notifications View */}
          {activeTab === 'Notificaciones' && !currentPetIdForView && !isCreatingPet && !editingPetId && !activeLostPetId && !isReportingSighting && !isReportingUnidentified && (
            <NotificationsView 
              notifications={notifications}
              onMarkAsRead={(id) => {
                setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: !n.read } : n));
              }}
              onMarkAllAsRead={() => {
                setNotifications(prev => prev.map(n => ({ ...n, read: true })));
                alert('¡Todas las notificaciones han sido marcadas como leídas!');
              }}
              onDeleteNotification={(id) => {
                setNotifications(prev => prev.filter(n => n.id !== id));
              }}
              onClearAll={() => {
                if (window.confirm('¿Estás seguro de que deseas eliminar todas las notificaciones?')) {
                  setNotifications([]);
                }
              }}
            />
          )}

          {/* 7. OTROS MÓDULOS EN DESARROLLO */}
          {activeTab !== 'Dashboard' && activeTab !== 'Mis mascotas' && activeTab !== 'Mascotas perdidas' && activeTab !== 'Avistamientos' && activeTab !== 'Comunidad' && activeTab !== 'Dispositivos' && activeTab !== 'Veterinarios' && activeTab !== 'Adopciones' && activeTab !== 'Configuración' && activeTab !== 'Notificaciones' && !currentPetIdForView && !isCreatingPet && !editingPetId && !activeLostPetId && !isReportingSighting && !isReportingUnidentified && (
            <div className="max-w-4xl mx-auto h-[60vh] flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-petuno-purple-50 dark:bg-dark-surface-elevated flex items-center justify-center text-petuno-purple mb-4">
                <Settings className="w-8 h-8 animate-spin" style={{ animationDuration: '3s' }} />
              </div>
              <h2 className="text-xl font-bold">Módulo en Desarrollo</h2>
              <p className="text-sm text-petuno-secondary-text dark:text-dark-secondary-text mt-1 max-w-sm">
                Has seleccionado el menú "{activeTab}". El mock local de este panel se cargará en la siguiente fase de desarrollo de Petuno.
              </p>
            </div>
          )}

        </main>
      </div>

      {/* MOBILE BOTTOM NAVIGATION */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-petuno-surface dark:bg-dark-surface border-t border-petuno-border dark:border-petuno-secondary-text/15 z-30 flex items-center justify-around px-2">
        <MobileNavItem icon={<Activity className="w-5 h-5" />} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => changeTab('Dashboard')} />
        <MobileNavItem icon={<PawPrint className="w-5 h-5" />} label="Mascotas" active={activeTab === 'Mis mascotas'} onClick={() => changeTab('Mis mascotas')} />
        <MobileNavItem icon={<Bell className="w-5 h-5" />} label="Alertas" active={activeTab === 'Notificaciones'} onClick={() => changeTab('Notificaciones')} />
        <MobileNavItem icon={<UserCircle className="w-5 h-5" />} label="Perfil" active={activeTab === 'Configuración'} onClick={() => changeTab('Configuración')} />
      </nav>

      {/* QR MODAL PREVIEW */}
      {showQRModal && (
        <QRPreviewModal 
          pet={pets.find(p => p.id === showQRModal)!} 
          onClose={() => setShowQRModal(null)} 
        />
      )}

      {/* PUBLIC PROFILE MODAL */}
      {publicProfilePetId && (
        <PublicProfileModal 
          pet={pets.find(p => p.id === publicProfilePetId)!} 
          onClose={() => setPublicProfilePetId(null)}
          onReportSighting={() => {
            setSightingPetIdForForm(publicProfilePetId);
            setIsReportingSighting(true);
            setPublicProfilePetId(null);
          }}
          privacySettings={privacySettings}
        />
      )}

    </div>
  );
}

function MetricCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="bg-petuno-surface dark:bg-dark-surface p-5 rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 shadow-sm text-left flex items-start justify-between">
      <div>
        <span className="text-xs font-semibold text-petuno-secondary-text dark:text-dark-secondary-text">{title}</span>
        <p className="text-lg sm:text-xl font-extrabold mt-1">{value}</p>
      </div>
      <div className="p-2 rounded-xl bg-petuno-background dark:bg-dark-surface-elevated">
        {icon}
      </div>
    </div>
  );
}

function EventRow({ icon, title, date, badge }: { icon: React.ReactNode; title: string; date: string; badge?: string }) {
  return (
    <div className="flex items-center gap-3 p-3 border border-petuno-border dark:border-petuno-secondary-text/10 rounded-xl">
      <div className="p-2 bg-petuno-background dark:bg-dark-surface-elevated rounded-lg">
        {icon}
      </div>
      <div className="flex-1 min-w-0 text-left">
        <h4 className="text-xs font-bold truncate">{title}</h4>
        <p className="text-[10px] text-petuno-secondary-text dark:text-dark-secondary-text mt-0.5">{date}</p>
      </div>
      {badge && (
        <span className="bg-petuno-amber-light text-petuno-amber text-[9px] font-extrabold px-1.5 py-0.5 rounded">
          {badge}
        </span>
      )}
    </div>
  );
}

function ActivityRow({ icon, title, time, desc }: { icon: React.ReactNode; title: string; time: string; desc?: string }) {
  return (
    <div className="flex gap-3 relative z-10 text-left">
      <div className="w-7.5 h-7.5 rounded-full bg-petuno-background dark:bg-dark-surface-elevated flex items-center justify-center flex-shrink-0 border-2 border-petuno-surface dark:border-dark-surface">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-baseline gap-2">
          <h4 className="text-xs font-bold">{title}</h4>
          <span className="text-[9px] text-petuno-muted shrink-0">{time}</span>
        </div>
        {desc && <p className="text-[10px] text-petuno-secondary-text dark:text-dark-secondary-text mt-0.5">{desc}</p>}
      </div>
    </div>
  );
}

function MobileNavItem({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center justify-center flex-1 h-full py-1 text-center">
      <div className={`p-1 rounded-lg ${active ? 'text-petuno-purple' : 'text-petuno-secondary-text dark:text-dark-secondary-text'}`}>
        {icon}
      </div>
      <span className={`text-[10px] font-semibold mt-0.5 ${active ? 'text-petuno-purple' : 'text-petuno-secondary-text dark:text-dark-secondary-text'}`}>
        {label}
      </span>
    </button>
  );
}

// ============================================================================
// PET CREATION / EDITING FORM WIZARD (PetForm)
// ============================================================================

function PetForm({ 
  pet, 
  defaultPhone,
  onSave, 
  onCancel 
}: { 
  pet?: Pet; 
  defaultPhone?: string;
  onSave: (pet: Pet) => void; 
  onCancel: () => void;
}) {
  const [nombre, setNombre] = useState(pet?.name || '');
  const [especie, setEspecie] = useState(pet?.species || 'Perro');
  const [raza, setRaza] = useState(pet?.breed || '');
  const [sexo, setSexo] = useState(pet?.gender || 'Macho');
  const [fechaNacimiento, setFechaNacimiento] = useState(pet?.birthDate || '');
  const [color, setColor] = useState(pet?.color || '');
  const [peso, setPeso] = useState(pet?.weight || '');
  const [microchip] = useState(pet?.microchip || '');
  const [caracteristicas, setCaracteristicas] = useState(pet?.characteristics || '');
  const [alergias, setAlergias] = useState(pet?.allergies || '');
  const [medicaCritica, setMedicaCritica] = useState(pet?.medicalCritical || '');
  const [contactoEmergencia, setContactoEmergencia] = useState(pet?.emergencyContact || defaultPhone || '');
  const [photo, setPhoto] = useState(pet?.photo || '');
  const [isPublic, setIsPublic] = useState(pet?.isPublic ?? true);
  const [allowContact, setAllowContact] = useState(pet?.allowContact ?? true);

  const [formStep, setFormStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Calculate simulated age based on birthDate
    let ageStr = 'No especificada';
    if (fechaNacimiento) {
      const birth = new Date(fechaNacimiento);
      const now = new Date();
      let diffYears = now.getFullYear() - birth.getFullYear();
      let diffMonths = now.getMonth() - birth.getMonth();
      if (diffMonths < 0 || (diffMonths === 0 && now.getDate() < birth.getDate())) {
        diffYears--;
        diffMonths += 12;
      }
      if (diffYears > 0) {
        ageStr = `${diffYears} ${diffYears === 1 ? 'año' : 'años'}`;
      } else {
        ageStr = `${diffMonths} ${diffMonths === 1 ? 'mes' : 'meses'}`;
      }
    }

    // Default mock images depending on species if no URL provided
    let finalPhoto = photo;
    if (!finalPhoto) {
      finalPhoto = especie === 'Perro' 
        ? 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600&auto=format&fit=crop'
        : especie === 'Gato'
        ? 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&auto=format&fit=crop'
        : 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?q=80&w=600&auto=format&fit=crop';
    }

    // Automatically generate a Petuno ID if creating a new pet
    const petunoIdStr = pet?.petunoId || `PTO-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const newPet: Pet = {
      id: pet?.id || nombre.toLowerCase().replace(/\s+/g, '-'),
      name: nombre,
      species: especie,
      breed: raza,
      gender: sexo,
      status: pet?.status || 'Protegido',
      petunoId: petunoIdStr,
      photo: finalPhoto,
      birthDate: fechaNacimiento,
      age: ageStr,
      color,
      weight: peso,
      microchip,
      characteristics: caracteristicas,
      allergies: alergias,
      medicalCritical: medicaCritica,
      ownerName: pet?.ownerName || 'John Doe',
      emergencyContact: contactoEmergencia,
      isPublic,
      allowContact,
      isMine: pet?.isMine ?? true
    };

    setTimeout(() => {
      onSave(newPet);
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 shadow-xl p-6 sm:p-8 text-left">
      
      {/* Wizard Step Indicator */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-petuno-border dark:border-petuno-secondary-text/10">
        <span className="text-xs font-extrabold text-petuno-purple uppercase tracking-wider">PASO {formStep} DE 3</span>
        <div className="flex gap-1.5">
          <div className={`w-8 h-1.5 rounded-full transition-all ${formStep >= 1 ? 'bg-petuno-purple' : 'bg-petuno-border dark:bg-dark-surface-elevated'}`}></div>
          <div className={`w-8 h-1.5 rounded-full transition-all ${formStep >= 2 ? 'bg-petuno-purple' : 'bg-petuno-border dark:bg-dark-surface-elevated'}`}></div>
          <div className={`w-8 h-1.5 rounded-full transition-all ${formStep >= 3 ? 'bg-petuno-purple' : 'bg-petuno-border dark:bg-dark-surface-elevated'}`}></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* STEP 1: DATOS BÁSICOS */}
        {formStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-base font-extrabold mb-4 flex items-center gap-2">
              <PawPrint className="w-5 h-5 text-petuno-purple" /> Datos Básicos de la Mascota
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-petuno-secondary-text dark:text-dark-secondary-text mb-2">Nombre</label>
                <input 
                  type="text" required value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Ej. Max"
                  className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-petuno-purple transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-petuno-secondary-text dark:text-dark-secondary-text mb-2">Especie</label>
                <select 
                  value={especie} onChange={e => setEspecie(e.target.value)}
                  className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-petuno-purple transition-all dark:bg-dark-surface"
                >
                  <option value="Perro">Perro</option>
                  <option value="Gato">Gato</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-petuno-secondary-text dark:text-dark-secondary-text mb-2">Raza</label>
                <input 
                  type="text" required value={raza} onChange={e => setRaza(e.target.value)} placeholder="Ej. Golden Retriever, Siamés..."
                  className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-petuno-purple transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-petuno-secondary-text dark:text-dark-secondary-text mb-2">Sexo</label>
                <select 
                  value={sexo} onChange={e => setSexo(e.target.value)}
                  className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-petuno-purple transition-all dark:bg-dark-surface"
                >
                  <option value="Macho">Macho</option>
                  <option value="Hembra">Hembra</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-petuno-secondary-text dark:text-dark-secondary-text mb-2">Fecha de Nacimiento</label>
                <input 
                  type="date" value={fechaNacimiento} onChange={e => setFechaNacimiento(e.target.value)}
                  className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-petuno-purple transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-petuno-secondary-text dark:text-dark-secondary-text mb-2">Color dominante</label>
                <input 
                  type="text" value={color} onChange={e => setColor(e.target.value)} placeholder="Ej. Dorado, Café, Blanco"
                  className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-petuno-purple transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-petuno-secondary-text dark:text-dark-secondary-text mb-2">Foto de perfil de la mascota (Opcional)</label>
              <div className="flex items-center gap-4">
                {photo ? (
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-petuno-background border border-petuno-border dark:border-petuno-secondary-text/20 relative group">
                    <img src={photo} alt="Preview" className="w-full h-full object-cover" />
                    <button 
                      type="button" 
                      onClick={() => setPhoto('')}
                      className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold"
                    >
                      Quitar
                    </button>
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-petuno-background dark:bg-dark-surface-elevated border-2 border-dashed border-petuno-border dark:border-petuno-secondary-text/20 flex items-center justify-center text-petuno-muted">
                    <PawPrint className="w-6 h-6" />
                  </div>
                )}
                <label className="bg-petuno-purple/10 hover:bg-petuno-purple/20 text-petuno-purple dark:text-petuno-purple-light px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all">
                  Subir imagen
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setPhoto(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }} 
                    className="hidden" 
                  />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: DATOS MÉDICOS */}
        {formStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-base font-extrabold mb-4 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-petuno-purple" /> Expediente Médico
            </h3>

            <div>
              <label className="block text-xs font-bold text-petuno-secondary-text dark:text-dark-secondary-text mb-2">Peso (kg)</label>
              <input 
                type="text" value={peso} onChange={e => setPeso(e.target.value)} placeholder="Ej. 12 kg"
                className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-petuno-purple transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-petuno-secondary-text dark:text-dark-secondary-text mb-2">Características físicas principales</label>
              <textarea 
                value={caracteristicas} onChange={e => setCaracteristicas(e.target.value)} rows={3} placeholder="Manchas notables, cicatrices, comportamiento general..."
                className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-petuno-purple transition-all resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-bold text-petuno-secondary-text dark:text-dark-secondary-text mb-2">Alergias</label>
              <input 
                type="text" value={alergias} onChange={e => setAlergias(e.target.value)} placeholder="Ej. Alergia a las pulgas, comida de res (ninguna si no aplica)"
                className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-petuno-purple transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-petuno-secondary-text dark:text-dark-secondary-text mb-2">Información médica</label>
              <textarea 
                value={medicaCritica} onChange={e => setMedicaCritica(e.target.value)} rows={2} placeholder="Medicamentos actuales, condiciones crónicas importantes, etc."
                className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-petuno-purple transition-all resize-none"
              ></textarea>
            </div>
          </div>
        )}

        {/* STEP 3: PRIVACIDAD Y CONTACTO */}
        {formStep === 3 && (
          <div className="space-y-4">
            <h3 className="text-base font-extrabold mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-petuno-purple" /> Contacto de Emergencia y Privacidad
            </h3>

            <div>
              <label className="block text-xs font-bold text-petuno-secondary-text dark:text-dark-secondary-text mb-2">Teléfono de contacto de emergencia</label>
              <input 
                type="tel" required value={contactoEmergencia} onChange={e => setContactoEmergencia(e.target.value)} placeholder="Ej. +57 300 123 4567"
                className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-petuno-purple transition-all"
              />
            </div>

            <div className="p-4 bg-petuno-background dark:bg-dark-surface-elevated rounded-xl space-y-4">
              <h4 className="text-xs font-bold text-petuno-purple">Configuraciones de seguridad</h4>
              
              <label className="flex items-center justify-between cursor-pointer select-none">
                <div>
                  <p className="text-xs font-bold">Perfil público activo</p>
                  <p className="text-[10px] text-petuno-secondary-text">Cualquiera que escanee el QR podrá ver los datos autorizados de la mascota.</p>
                </div>
                <input 
                  type="checkbox" checked={isPublic} onChange={e => setIsPublic(e.target.checked)}
                  className="w-5 h-5 accent-petuno-purple"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer select-none border-t border-petuno-border dark:border-petuno-secondary-text/10 pt-4">
                <div>
                  <p className="text-xs font-bold">Permitir contacto anónimo</p>
                  <p className="text-[10px] text-petuno-secondary-text">Permite a terceros enviarte mensajes directos al email sin ver tu información personal.</p>
                </div>
                <input 
                  type="checkbox" checked={allowContact} onChange={e => setAllowContact(e.target.checked)}
                  className="w-5 h-5 accent-petuno-purple"
                />
              </label>
            </div>
          </div>
        )}

        {/* Form navigation buttons */}
        <div className="flex gap-4 pt-6 border-t border-petuno-border dark:border-petuno-secondary-text/10">
          {formStep > 1 && (
            <button 
              type="button" onClick={() => setFormStep(formStep - 1)}
              className="flex-1 border border-petuno-border dark:border-petuno-secondary-text/30 hover:bg-petuno-background dark:hover:bg-dark-surface-elevated text-sm font-semibold py-3 rounded-xl transition-all text-center"
            >
              Atrás
            </button>
          )}

          {formStep < 3 ? (
            <button 
              type="button" onClick={() => setFormStep(formStep + 1)}
              className="flex-1 bg-petuno-purple hover:bg-petuno-purple-dark text-white text-sm font-semibold py-3 rounded-xl transition-all shadow-md text-center"
            >
              Continuar
            </button>
          ) : (
            <button 
              type="submit" disabled={isSaving}
              className="flex-1 bg-petuno-purple hover:bg-petuno-purple-dark text-white text-sm font-semibold py-3 rounded-xl transition-all shadow-md text-center flex items-center justify-center gap-2"
            >
              {isSaving ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Guardando...
                </>
              ) : pet ? 'Guardar Cambios' : 'Registrar Mascota'}
            </button>
          )}

          <button 
            type="button" onClick={onCancel}
            className="px-6 border border-transparent hover:bg-petuno-coral-light/20 text-petuno-coral text-sm font-semibold py-3 rounded-xl transition-all"
          >
            Cancelar
          </button>
        </div>

      </form>

    </div>
  );
}

// ============================================================================
// DETAILED PET PROFILE VIEW (PetProfile)
// ============================================================================

function PetProfile({ 
  pet, 
  onBack, 
  onEdit, 
  onDelete, 
  onToggleLost, 
  onCopyId, 
  copiedId,
  onShowQR 
}: { 
  pet: Pet; 
  onBack: () => void; 
  onEdit: (id: string) => void; 
  onDelete: (id: string) => void; 
  onToggleLost: (id: string) => void; 
  onCopyId: (idText: string) => void;
  copiedId: string | null;
  onShowQR: (id: string) => void;
}) {
  const [profileTab, setProfileTab] = useState('Resumen');

  const profileTabs = ['Resumen', 'Salud', 'Identidad', 'Ubicación', 'Documentos', 'Historial', 'Configuración'];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Back to list */}
      <div className="text-left">
        <button onClick={onBack} className="text-sm font-bold text-petuno-purple hover:underline flex items-center gap-1">
          ← Volver a mis mascotas
        </button>
      </div>

      {pet.status === 'Perdido' && (
        <div className="bg-petuno-coral-light/20 dark:bg-petuno-coral/5 border-2 border-dashed border-petuno-coral rounded-2xl p-6 text-left space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-extrabold text-petuno-coral flex items-center gap-1.5 uppercase">
                🚨 Modo Mascota Perdida Activo
              </h3>
              <p className="text-xs text-petuno-secondary-text dark:text-dark-secondary-text mt-1 max-w-xl">
                Petuno ha activado la red de rescate y ha auto-generado tu cartel SOS con código QR. Puedes imprimirlo para postes locales, compartirlo digitalmente o copiar el enlace directo.
              </p>
            </div>
            <button
              onClick={() => onToggleLost(pet.id)}
              className="bg-petuno-coral text-white hover:bg-petuno-coral-dark text-xs font-bold px-4 py-2.5 rounded-xl transition-all self-start sm:self-center whitespace-nowrap shadow-sm"
            >
              Marcar como Encontrado
            </button>
          </div>

          {/* SOS Poster Mock Visual Grid */}
          <div className="bg-white dark:bg-dark-surface-elevated rounded-2xl p-6 border-4 border-red-600 max-w-sm mx-auto space-y-4 text-center text-black dark:text-white shadow-xl font-sans">
            <div className="bg-red-600 text-white font-extrabold py-3 text-base rounded-lg tracking-widest animate-pulse">
              🚨 SE BUSCA 🚨
            </div>
            
            <div className="w-44 h-44 mx-auto rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
              <img src={pet.photo} alt={pet.name} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-1">
              <h4 className="text-2xl font-extrabold uppercase tracking-wide">{pet.name}</h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-bold">{pet.breed} • {pet.gender}</p>
              <p className="text-[10px] text-red-600 font-extrabold uppercase mt-1">Perdido en: {pet.lastSeenLocation || 'Zona de Cedritos, Bogotá'}</p>
            </div>

            <div className="bg-slate-50 dark:bg-dark-surface p-3.5 rounded-xl border border-slate-200/60 dark:border-petuno-secondary-text/10 space-y-3">
              <div className="flex justify-center">
                <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
                  <QrCodeMockup />
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[9.5px] font-extrabold text-petuno-purple uppercase tracking-wider block">Escanea para reportar ubicación</span>
                <p className="text-[9px] text-slate-600 dark:text-slate-400 leading-snug">
                  O entra a <strong>Petuno.com</strong> e ingresa el ID: <strong className="font-mono text-petuno-purple">{pet.petunoId}</strong> para alertar al dueño.
                </p>
              </div>
            </div>

            <div className="space-y-1 pt-1">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">Contacto de Emergencia:</p>
              <p className="text-base font-extrabold text-red-600">{pet.emergencyContact || '312 456 7890'}</p>
            </div>

            <div className="border-t border-slate-100 dark:border-petuno-secondary-text/15 pt-3 flex flex-wrap gap-2 justify-center">
              <button 
                onClick={() => {
                  alert('Generando PDF y abriendo menú de impresión de sistema...');
                  window.print();
                }}
                className="bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 px-3 py-2 rounded-lg text-[9px] font-extrabold flex items-center gap-1 hover:opacity-90 transition-all shadow-sm"
              >
                🖨️ Imprimir Cartel / PDF
              </button>
              <button 
                onClick={() => alert(`Compartiendo cartel de búsqueda en WhatsApp para: https://petuno.com/p/${pet.petunoId}`)}
                className="bg-green-600 text-white px-3 py-2 rounded-lg text-[9px] font-extrabold flex items-center gap-1 hover:bg-green-700 transition-all shadow-sm"
              >
                💬 Compartir
              </button>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(`https://petuno.com/p/${pet.petunoId}`);
                  alert('Enlace de búsqueda copiado al portapapeles.');
                }}
                className="bg-slate-100 dark:bg-dark-surface-elevated text-slate-700 dark:text-slate-200 px-3 py-2 rounded-lg text-[9px] font-extrabold flex items-center gap-1 hover:bg-slate-200 border border-slate-200 dark:border-transparent transition-all"
              >
                🔗 Copiar Enlace
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Header */}
      <div className="bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 p-6 shadow-sm flex flex-col md:flex-row items-center md:items-start gap-6 text-left relative overflow-hidden">
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-petuno-background flex-shrink-0">
          <img src={pet.photo} alt={pet.name} className="w-full h-full object-cover" />
        </div>

        <div className="flex-1 min-w-0 space-y-2 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <h2 className="text-3xl font-extrabold truncate">{pet.name}</h2>
            <div className="flex gap-2 justify-center md:justify-start">
              <span className={`border font-extrabold px-3 py-0.5 rounded-full flex items-center gap-1 text-[11px] ${
                pet.status === 'Perdido' 
                  ? 'bg-petuno-coral-light border-petuno-coral/20 text-petuno-coral' 
                  : 'bg-petuno-mint-light border-petuno-mint/20 text-petuno-mint'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${pet.status === 'Perdido' ? 'bg-petuno-coral animate-ping' : 'bg-petuno-mint'}`}></span>
                {pet.status === 'Perdido' ? 'Perdido' : 'Protegido'}
              </span>
              <span className="bg-petuno-purple/10 text-petuno-purple dark:text-petuno-purple-light text-[11px] font-bold px-2 py-0.5 rounded-full">
                {pet.gender}
              </span>
            </div>
          </div>
          <p className="text-sm text-petuno-secondary-text dark:text-dark-secondary-text">{pet.species} • {pet.breed}</p>
          
          <div className="flex items-center justify-center md:justify-start gap-2 pt-2 text-xs">
            <span className="text-petuno-secondary-text dark:text-dark-secondary-text font-semibold">Petuno ID:</span>
            <span className="font-mono font-bold text-petuno-purple dark:text-petuno-purple-light flex items-center gap-1.5 bg-petuno-background dark:bg-dark-surface-elevated px-2.5 py-1 rounded-lg">
              {pet.petunoId}
              <button onClick={() => onCopyId(pet.petunoId)} className="p-0.5 hover:bg-petuno-border rounded">
                {copiedId === pet.petunoId ? <Check className="w-3.5 h-3.5 text-petuno-mint" /> : <Copy className="w-3.5 h-3.5 text-petuno-muted" />}
              </button>
            </span>
          </div>
        </div>

        {/* Edit / Delete action buttons */}
        <div className="flex md:flex-col gap-2 mt-4 md:mt-0 md:self-center">
          <button 
            onClick={() => onEdit(pet.id)}
            className="flex items-center gap-1.5 px-4 py-2 border border-petuno-border dark:border-petuno-secondary-text/20 hover:bg-petuno-background dark:hover:bg-dark-surface-elevated text-xs font-bold rounded-xl transition-all"
          >
            <Edit className="w-4 h-4" /> Editar
          </button>
          <button 
            onClick={() => onToggleLost(pet.id)}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
              pet.status === 'Perdido'
                ? 'bg-petuno-coral-light border-petuno-coral/30 text-petuno-coral'
                : 'border-petuno-border dark:border-petuno-secondary-text/20 hover:bg-petuno-coral-light/20 text-petuno-coral'
            }`}
          >
            <AlertTriangle className="w-4 h-4" /> {pet.status === 'Perdido' ? 'Marcar Encontrado' : 'Reportar Perdido'}
          </button>
        </div>
      </div>

      {/* Tabs list navigation */}
      <div className="flex border-b border-petuno-border dark:border-petuno-secondary-text/15 overflow-x-auto whitespace-nowrap scrollbar-hide py-1">
        {profileTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setProfileTab(tab)}
            className={`px-4 py-2.5 text-sm font-bold border-b-2 transition-all -mb-px ${
              profileTab === tab
                ? 'border-petuno-purple text-petuno-purple dark:text-petuno-purple-light'
                : 'border-transparent text-petuno-secondary-text dark:text-dark-secondary-text hover:text-petuno-text'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 1. TABS CONTENT: RESUMEN */}
      {profileTab === 'Resumen' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
          
          {/* Detailed Info Card */}
          <div className="lg:col-span-2 space-y-6">
            
            <div className="bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 p-6 shadow-sm">
              <h3 className="text-base font-extrabold mb-4">Información básica</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                <InfoItem label="ESPECIE" value={pet.species} />
                <InfoItem label="RAZA" value={pet.breed} />
                <InfoItem label="GÉNERO" value={pet.gender} />
                <InfoItem label="FECHA DE NACIMIENTO" value={pet.birthDate || 'No registrada'} />
                <InfoItem label="EDAD" value={pet.age || 'No especificada'} />
                <InfoItem label="COLOR" value={pet.color || 'No registrado'} />
                <InfoItem label="PESO" value={pet.weight || 'No registrado'} />
                <InfoItem label="NÚMERO MICROCHIP / RFID" value={pet.microchip || 'Ninguno registrado'} />
              </div>

              {pet.characteristics && (
                <div className="mt-6 pt-4 border-t border-petuno-border dark:border-petuno-secondary-text/10">
                  <span className="text-[10px] text-petuno-muted font-bold block mb-1">CARACTERÍSTICAS FÍSICAS</span>
                  <p className="text-xs text-petuno-secondary-text dark:text-dark-secondary-text leading-relaxed">{pet.characteristics}</p>
                </div>
              )}
            </div>

            {/* Health profile quick summary */}
            <div className="bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 p-6 shadow-sm">
              <h3 className="text-base font-extrabold mb-4 flex items-center gap-1.5"><Stethoscope className="w-5 h-5 text-petuno-purple" /> Salud e información médica</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 border border-petuno-border dark:border-petuno-secondary-text/10 rounded-xl">
                  <span className="text-[10px] text-petuno-muted font-bold block">ALERGIAS</span>
                  <span className="text-sm font-bold mt-1 block">{pet.allergies || 'Ninguna conocida'}</span>
                </div>
                <div className="p-4 border border-petuno-border dark:border-petuno-secondary-text/10 rounded-xl">
                  <span className="text-[10px] text-petuno-muted font-bold block">INFORMACIÓN MÉDICA</span>
                  <span className="text-sm font-bold mt-1 block">{pet.medicalCritical || 'Ninguna'}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Quick actions & stats sidebar */}
          <div className="space-y-6">
            
            {/* Quick Actions Panel */}
            <div className="bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 p-6 shadow-sm">
              <h3 className="text-base font-extrabold mb-4">Acciones rápidas</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => onShowQR(pet.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 border border-petuno-border dark:border-petuno-secondary-text/15 hover:bg-petuno-background dark:hover:bg-dark-surface-elevated text-xs font-bold rounded-xl transition-all"
                >
                  <QrCode className="w-4 h-4 text-petuno-purple" /> Ver código QR
                </button>
                <button 
                  onClick={() => onToggleLost(pet.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 border border-petuno-border dark:border-petuno-secondary-text/15 hover:bg-petuno-background dark:hover:bg-dark-surface-elevated text-xs font-bold rounded-xl transition-all"
                >
                  <AlertTriangle className="w-4 h-4 text-petuno-coral" /> {pet.status === 'Perdido' ? 'Cancelar alerta de pérdida' : 'Activar modo mascota perdida'}
                </button>
                <button 
                  onClick={() => alert(`Enlace de perfil público copiado: https://petuno.com/p/${pet.petunoId}`)}
                  className="w-full flex items-center gap-3 px-4 py-3 border border-petuno-border dark:border-petuno-secondary-text/15 hover:bg-petuno-background dark:hover:bg-dark-surface-elevated text-xs font-bold rounded-xl transition-all"
                >
                  <ArrowRight className="w-4 h-4 text-petuno-purple" /> Compartir perfil público
                </button>
                <button 
                  onClick={() => {
                    alert('Generando PDF y abriendo menú de impresión de sistema...');
                    window.print();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 border border-petuno-border dark:border-petuno-secondary-text/15 hover:bg-petuno-background dark:hover:bg-dark-surface-elevated text-xs font-bold rounded-xl transition-all"
                >
                  <FileText className="w-4 h-4 text-petuno-purple" /> Generar Cartel de Búsqueda
                </button>
              </div>
            </div>

            {/* Owner & contact card */}
            <div className="bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 p-6 shadow-sm space-y-4">
              <h3 className="text-base font-extrabold">Propietario y Contacto</h3>
              <div>
                <span className="text-[10px] text-petuno-muted font-bold block">PROPIETARIO</span>
                <span className="text-sm font-bold">{pet.ownerName || 'John Doe'}</span>
              </div>
              <div className="border-t border-petuno-border dark:border-petuno-secondary-text/10 pt-3">
                <span className="text-[10px] text-petuno-muted font-bold block">CONTACTO DE EMERGENCIA</span>
                <span className="text-sm font-bold text-petuno-purple dark:text-petuno-purple-light">{pet.emergencyContact || 'No registrado'}</span>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* 2. TABS CONTENT: SALUD */}
      {profileTab === 'Salud' && (
        <div className="bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 p-6 shadow-sm text-left max-w-4xl mx-auto space-y-6">
          <div>
            <h3 className="text-lg font-bold">Carnet de Salud Veterinario</h3>
            <p className="text-xs text-petuno-secondary-text dark:text-dark-secondary-text mt-1">Gestión de vacunas e historial de consultas médicas de la mascota.</p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-petuno-purple">Esquema de Vacunación Reciente</h4>
            
            <div className="space-y-3">
              <VaccineRow name="Vacuna Triple Felina / Polivalente" date="15 Enero, 2026" status="Aplicada" vet="Clínica Vet Veteria" />
              <VaccineRow name="Vacuna de la Rabia" date="21 Septiembre, 2026" status="Pendiente" vet="Próxima dosis" isWarning />
              <VaccineRow name="Vacuna de Leucemia" date="04 Marzo, 2025" status="Aplicada" vet="Clínica Vet Veteria" />
            </div>

            <button className="flex items-center gap-1.5 text-xs font-bold text-petuno-purple hover:underline pt-2">
              <Plus className="w-4 h-4" /> Agregar nueva vacuna al carnet
            </button>
          </div>

          <div className="border-t border-petuno-border dark:border-petuno-secondary-text/10 pt-6 space-y-4">
            <h4 className="text-sm font-bold text-petuno-purple">Medicamentos Actuales</h4>
            <p className="text-xs text-petuno-secondary-text dark:text-dark-secondary-text">No hay tratamientos activos o recetas en curso para esta mascota.</p>
          </div>
        </div>
      )}

      {/* 3. TABS CONTENT: IDENTIDAD */}
      {profileTab === 'Identidad' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
          
          {/* QR code download display card */}
          <div className="bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 p-6 shadow-sm flex flex-col items-center justify-center text-center space-y-6">
            <h3 className="text-base font-extrabold text-petuno-text dark:text-dark-text self-start text-left">Placa de Identificación QR</h3>
            
            {/* Visual SVG QR mockup */}
            <div className="bg-white p-4 rounded-2xl shadow-md border border-petuno-border">
              <QrCodeMockup />
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-sm text-petuno-text">{pet.name} — {pet.petunoId}</h4>
              <p className="text-xs text-petuno-secondary-text dark:text-dark-secondary-text max-w-xs">
                Descarga e imprime este código QR para colocarlo en la placa del collar de tu mascota.
              </p>
            </div>

            <button 
              onClick={() => alert('Descargando imagen QR-Petuno en formato PNG...')}
              className="bg-petuno-purple hover:bg-petuno-purple-dark text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2"
            >
              <QrCode className="w-4 h-4" /> Descargar Código QR
            </button>
          </div>

          {/* NFC / RFID hardware association panel */}
          <div className="bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 p-6 shadow-sm space-y-6">
            <div>
              <h3 className="text-base font-extrabold flex items-center gap-1.5">
                <ShieldCheck className="w-5 h-5 text-petuno-purple" /> Identificadores Inteligentes (Premium)
              </h3>
              <p className="text-xs text-petuno-secondary-text mt-1">
                Vincula placas NFC, microchips subcutáneos o pantallas Paperlink para añadir capas adicionales de seguridad por contacto físico directo.
              </p>
            </div>

            <div className="space-y-4">
              {/* NFC Row */}
              <div className="p-4 border border-petuno-border dark:border-petuno-secondary-text/10 rounded-xl flex items-center justify-between bg-petuno-background/20 dark:bg-dark-surface-elevated/20 opacity-75">
                <div>
                  <h4 className="text-xs font-bold flex items-center gap-1">
                    Placa / Medalla NFC Petuno <span className="text-[10px] text-petuno-purple bg-petuno-purple/10 px-1.5 py-0.5 rounded-full font-bold">Premium</span>
                  </h4>
                  <p className="text-[10px] text-petuno-secondary-text mt-1">Lectura por contacto sin batería. Transmite el Petuno ID al teléfono que lo toque.</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="bg-petuno-amber-light text-petuno-amber text-[9px] font-extrabold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    🔒 No asociado
                  </span>
                </div>
              </div>

              {/* RFID microchip row */}
              <div className="p-4 border border-petuno-border dark:border-petuno-secondary-text/10 rounded-xl flex items-center justify-between bg-petuno-background/20 dark:bg-dark-surface-elevated/20 opacity-75">
                <div>
                  <h4 className="text-xs font-bold flex items-center gap-1">
                    Microchip RFID Subcutáneo <span className="text-[10px] text-petuno-purple bg-petuno-purple/10 px-1.5 py-0.5 rounded-full font-bold">Premium</span>
                  </h4>
                  <p className="text-[10px] text-petuno-secondary-text mt-1">Asociación homologada de microchip subcutáneo estándar veterinario.</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="bg-petuno-amber-light text-petuno-amber text-[9px] font-extrabold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    🔒 No asociado
                  </span>
                </div>
              </div>

              {/* Paperlink row */}
              <div className="p-4 border border-petuno-border dark:border-petuno-secondary-text/10 rounded-xl flex items-center justify-between bg-petuno-background/20 dark:bg-dark-surface-elevated/20 opacity-75">
                <div>
                  <h4 className="text-xs font-bold flex items-center gap-1">
                    Placa E-ink Paperlink <span className="text-[10px] text-petuno-purple bg-petuno-purple/10 px-1.5 py-0.5 rounded-full font-bold">Premium</span>
                  </h4>
                  <p className="text-[10px] text-petuno-secondary-text mt-1">Medalla de tinta electrónica de ultra-bajo consumo que siempre muestra el QR y datos.</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="bg-petuno-amber-light text-petuno-amber text-[9px] font-extrabold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    🔒 No asociado
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-petuno-border dark:border-petuno-secondary-text/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-[11px] text-petuno-secondary-text">Adquiere tus dispositivos físicos oficiales en la tienda Petuno para habilitarlos.</p>
              <button 
                type="button"
                onClick={() => alert('Redirigiendo a la Tienda Petuno...')}
                className="bg-petuno-purple hover:bg-petuno-purple-dark text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm shrink-0"
              >
                Comprar Dispositivos
              </button>
            </div>
          </div>

        </div>
      )}

      {/* 4. TABS CONTENT: UBICACIÓN */}
      {profileTab === 'Ubicación' && (
        <div className="bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 p-6 shadow-sm text-left max-w-4xl mx-auto space-y-6 relative overflow-hidden">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2">
              Geolocalización Satelital GNSS <span className="text-xs text-petuno-purple bg-petuno-purple/10 px-2 py-0.5 rounded-full font-bold">Premium</span>
            </h3>
            <p className="text-xs text-petuno-secondary-text dark:text-dark-secondary-text mt-1">Monitorea la ubicación satelital de tu mascota en tiempo real y configura geocercas seguras.</p>
          </div>

          <div className="relative">
            {/* Blurred Mock Map Visual Placeholder */}
            <div className="h-96 rounded-2xl bg-petuno-background dark:bg-dark-surface-elevated border border-petuno-border dark:border-petuno-secondary-text/15 relative overflow-hidden flex items-center justify-center filter blur-[4px] select-none pointer-events-none">
              <div className="absolute inset-0 opacity-20 dark:opacity-10 bg-[radial-gradient(#6c4ce8_1px,transparent_1px)] [background-size:16px_16px]"></div>
              <div className="absolute inset-0 flex flex-col justify-around opacity-30">
                <div className="h-px bg-petuno-muted"></div>
                <div className="h-px bg-petuno-muted"></div>
              </div>
              <div className="absolute w-56 h-56 border-2 border-dashed border-petuno-purple/30 rounded-full"></div>
            </div>

            {/* Lock screen Overlay */}
            <div className="absolute inset-0 bg-petuno-surface/80 dark:bg-dark-surface/80 rounded-2xl flex flex-col items-center justify-center text-center p-6 space-y-4 backdrop-blur-[2px]">
              <div className="w-14 h-14 rounded-2xl bg-petuno-purple-50 dark:bg-dark-surface-elevated flex items-center justify-center text-petuno-purple border border-petuno-purple/20 shadow-md">
                <Cpu className="w-7 h-7 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-base text-petuno-text dark:text-dark-text">El monitoreo GPS requiere Collar GNSS Petuno</h4>
                <p className="text-xs text-petuno-secondary-text dark:text-dark-secondary-text max-w-md mx-auto">
                  La geolocalización GNSS en tiempo real y el control de zonas seguras requiere adquirir y vincular el Collar de Rastreo Oficial Petuno. El código QR estándar siempre es y será gratis.
                </p>
              </div>
              <div className="flex gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => alert('Redirigiendo a la Tienda Petuno para ver collares GNSS...')}
                  className="bg-petuno-purple hover:bg-petuno-purple-dark text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md"
                >
                  Adquirir Collar GNSS
                </button>
                <button 
                  type="button"
                  onClick={() => setProfileTab('Resumen')}
                  className="bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 hover:bg-petuno-background dark:hover:bg-dark-surface-elevated text-xs font-bold px-5 py-2.5 rounded-xl transition-all"
                >
                  Volver al Resumen (Gratuito)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. TABS CONTENT: DOCUMENTOS */}
      {profileTab === 'Documentos' && (
        <div className="bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 p-6 shadow-sm text-left max-w-4xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">Documentos y Archivos</h3>
              <p className="text-xs text-petuno-secondary-text dark:text-dark-secondary-text mt-1">Guarda certificados de pedigrí, fotos de registros de propiedad y vacunas.</p>
            </div>
            <button 
              onClick={() => alert('Cargando selector de archivos local...')}
              className="bg-petuno-purple hover:bg-petuno-purple-dark text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Subir archivo
            </button>
          </div>

          <div className="space-y-3">
            <DocumentRow name="Certificado_Vacuna_Rabia_2025.pdf" size="1.2 MB" date="Subido el 15 Feb, 2026" />
            <DocumentRow name="Historial_Clinico_Completo.pdf" size="4.8 MB" date="Subido el 10 Ene, 2026" />
          </div>
        </div>
      )}

      {/* 6. TABS CONTENT: HISTORIAL (TIMELINE) */}
      {profileTab === 'Historial' && (
        <div className="bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 p-6 shadow-sm text-left max-w-xl mx-auto space-y-6">
          <div>
            <h3 className="text-lg font-bold">Timeline de Petuno Life</h3>
            <p className="text-xs text-petuno-secondary-text mt-1">Historial del ciclo de vida y eventos históricos clave de {pet.name}</p>
          </div>

          <div className="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-petuno-border dark:before:bg-petuno-secondary-text/15">
            <TimelineRow icon={<Calendar className="w-3.5 h-3.5 text-petuno-purple" />} title="Vacunación" time="21 Sep, 2026" desc="Vacunación programada contra la Rabia" />
            <TimelineRow icon={<Heart className="w-3.5 h-3.5 text-petuno-purple" />} title="Adopción / Registro Inicial" time="15 Ene, 2026" desc="John Doe registró a la mascota en la plataforma Petuno" />
            <TimelineRow icon={<Calendar className="w-3.5 h-3.5 text-petuno-purple" />} title="Nacimiento de la mascota" time={pet.birthDate || 'No especificada'} desc="Fecha de nacimiento declarada por el propietario" />
          </div>
        </div>
      )}

      {/* 7. TABS CONTENT: CONFIGURACIÓN */}
      {profileTab === 'Configuración' && (
        <div className="bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 p-6 shadow-sm text-left max-w-2xl mx-auto space-y-6">
          <div>
            <h3 className="text-lg font-bold text-petuno-coral">Mantenimiento y Archivo</h3>
            <p className="text-xs text-petuno-secondary-text dark:text-dark-secondary-text mt-1">Configuraciones destructivas o de visibilidad privada.</p>
          </div>

          <div className="p-4 bg-petuno-background dark:bg-dark-surface-elevated rounded-xl space-y-4">
            <h4 className="text-xs font-bold text-petuno-text dark:text-dark-text">Aislamiento de la mascota</h4>
            <p className="text-xs text-petuno-secondary-text">Al archivar la mascota, esta dejará de listarse en tu panel activo de mascotas pero conservará su Petuno ID y ficha histórica de forma latente.</p>
            <button className="bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 hover:bg-petuno-border/30 text-xs font-bold px-4 py-2.5 rounded-xl transition-all">
              Archivar mascota
            </button>
          </div>

          <div className="p-4 bg-petuno-coral-light/10 border border-petuno-coral/20 rounded-xl space-y-4">
            <h4 className="text-xs font-bold text-petuno-coral">Eliminar mascota</h4>
            <p className="text-xs text-petuno-secondary-text">Esta acción eliminará de forma irreversible el perfil de {pet.name} del dashboard de tu cuenta. No podrás recuperar los expedientes médicos o archivos subidos.</p>
            <button 
              onClick={() => onDelete(pet.id)}
              className="bg-petuno-coral hover:bg-petuno-coral/95 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5"
            >
              <Trash2 className="w-4 h-4" /> Eliminar Mascota
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <span className="text-[10px] text-petuno-muted font-bold block">{label}</span>
      <span className="text-xs font-bold text-petuno-text dark:text-dark-text block">{value}</span>
    </div>
  );
}

function VaccineRow({ name, date, status, vet, isWarning }: { name: string; date: string; status: string; vet: string; isWarning?: boolean }) {
  return (
    <div className="flex items-center justify-between p-3 border border-petuno-border dark:border-petuno-secondary-text/10 rounded-xl">
      <div>
        <h5 className="text-xs font-bold">{name}</h5>
        <p className="text-[10px] text-petuno-secondary-text mt-0.5">{vet} • Programada: {date}</p>
      </div>
      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
        isWarning ? 'bg-petuno-amber-light text-petuno-amber' : 'bg-petuno-mint-light text-petuno-mint'
      }`}>
        {status}
      </span>
    </div>
  );
}

function QrCodeMockup() {
  return (
    <svg className="w-32 h-32" viewBox="0 0 100 100" fill="currentColor">
      {/* Outer anchors */}
      <rect x="5" y="5" width="25" height="25" fill="none" stroke="black" strokeWidth="6" />
      <rect x="11" y="11" width="13" height="13" fill="black" />
      
      <rect x="70" y="5" width="25" height="25" fill="none" stroke="black" strokeWidth="6" />
      <rect x="76" y="11" width="13" height="13" fill="black" />
      
      <rect x="5" y="70" width="25" height="25" fill="none" stroke="black" strokeWidth="6" />
      <rect x="11" y="76" width="13" height="13" fill="black" />
      
      {/* Mock pixels */}
      <rect x="40" y="5" width="6" height="6" />
      <rect x="50" y="15" width="6" height="12" />
      <rect x="60" y="5" width="6" height="6" />
      <rect x="45" y="35" width="12" height="6" />
      <rect x="5" y="45" width="12" height="6" />
      <rect x="25" y="45" width="6" height="18" />
      <rect x="40" y="50" width="12" height="12" />
      <rect x="75" y="40" width="18" height="6" />
      <rect x="85" y="55" width="6" height="12" />
      <rect x="60" y="70" width="6" height="6" />
      <rect x="70" y="80" width="18" height="6" />
      <rect x="45" y="85" width="12" height="6" />
      
      {/* Petuno Brand ID Tag inside QR */}
      <rect x="35" y="40" width="30" height="20" rx="3" fill="#6c4ce8" />
      <text x="50" y="52" fill="white" fontSize="6" fontWeight="bold" textAnchor="middle">PETUNO</text>
    </svg>
  );
}

function DocumentRow({ name, size, date }: { name: string; size: string; date: string }) {
  return (
    <div className="flex items-center justify-between p-3 border border-petuno-border dark:border-petuno-secondary-text/10 rounded-xl">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-petuno-background dark:bg-dark-surface-elevated rounded-lg text-petuno-purple">
          <FileText className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-xs font-bold">{name}</h4>
          <p className="text-[10px] text-petuno-secondary-text mt-0.5">{size} • {date}</p>
        </div>
      </div>
      <button className="text-xs font-bold text-petuno-purple hover:underline">Descargar</button>
    </div>
  );
}

function TimelineRow({ icon, title, time, desc }: { icon: React.ReactNode; title: string; time: string; desc: string }) {
  return (
    <div className="flex gap-3 relative z-10 text-left">
      <div className="w-7 h-7 rounded-full bg-petuno-background dark:bg-dark-surface-elevated flex items-center justify-center flex-shrink-0 border-2 border-petuno-surface dark:border-dark-surface">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-baseline gap-2">
          <h4 className="text-xs font-bold">{title}</h4>
          <span className="text-[9px] text-petuno-muted shrink-0">{time}</span>
        </div>
        <p className="text-[10px] text-petuno-secondary-text dark:text-dark-secondary-text mt-0.5">{desc}</p>
      </div>
    </div>
  );
}

function LostPetsView({ 
  pets, 
  onReportSighting, 
  onViewPublicProfile 
}: { 
  pets: Pet[]; 
  onReportSighting: (petId: string) => void; 
  onViewPublicProfile: (petId: string) => void; 
}) {
  const [distance, setDistance] = useState('5');
  const [species, setSpecies] = useState('Todos');
  const [city, setCity] = useState('Bogotá');
  const [search, setSearch] = useState('');

  const lostPets = pets.filter(p => p.status === 'Perdido');

  return (
    <div className="max-w-6xl mx-auto space-y-6 text-left">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">Mascotas Perdidas Cercanas</h2>
        <p className="text-sm text-petuno-secondary-text mt-1">Colabora con la comunidad reportando avistamientos para ayudar a que regresen a casa.</p>
      </div>

      {/* Map simulation */}
      <div className="h-72 rounded-2xl bg-petuno-surface dark:bg-dark-surface border border-petuno-border dark:border-petuno-secondary-text/15 relative overflow-hidden flex items-center justify-center shadow-sm">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#6c4ce8_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>
        
        {/* Mock Map Streets */}
        <div className="absolute inset-0 flex flex-col justify-around opacity-20 pointer-events-none">
          <div className="h-px bg-petuno-muted"></div>
          <div className="h-px bg-petuno-muted"></div>
        </div>
        <div className="absolute inset-0 flex justify-around opacity-20 pointer-events-none">
          <div className="w-px bg-petuno-muted"></div>
          <div className="w-px bg-petuno-muted"></div>
        </div>

        {/* Animated lost pet pins */}
        {lostPets.map((pet, index) => (
          <div 
            key={pet.id} 
            className="absolute z-10 flex flex-col items-center cursor-pointer transition-all hover:scale-110"
            style={{ 
              top: `${25 + (index * 25) % 55}%`, 
              left: `${15 + (index * 28) % 70}%` 
            }}
            onClick={() => onViewPublicProfile(pet.id)}
          >
            <div className="relative">
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${pet.hasGps ? 'bg-petuno-purple' : 'bg-petuno-coral'}`}></span>
                <span className={`relative inline-flex rounded-full h-4 w-4 ${pet.hasGps ? 'bg-petuno-purple' : 'bg-petuno-coral'}`}></span>
              </span>
              <div className={`w-11 h-11 rounded-full border-2 overflow-hidden bg-white shadow-lg ${pet.hasGps ? 'border-petuno-purple' : 'border-petuno-coral'}`}>
                <img src={pet.photo} alt={pet.name} className="w-full h-full object-cover" />
              </div>
              <span className="absolute -bottom-1 -right-1 bg-white dark:bg-dark-surface p-0.5 rounded-full text-[9px] shadow-sm border border-petuno-border/50">
                {pet.hasGps ? '🛰️' : '🏷️'}
              </span>
            </div>
            <span className="bg-petuno-surface dark:bg-dark-surface-elevated text-petuno-text dark:text-dark-text text-[9px] font-extrabold px-1.5 py-0.5 rounded-full shadow-md mt-1.5 border border-petuno-border/50 block">
              {pet.name}
            </span>
          </div>
        ))}

        <div className="absolute bottom-3 right-3 bg-white dark:bg-dark-surface p-2 rounded-lg shadow-md border border-petuno-border dark:border-transparent text-[10px] font-bold">
          📍 Mostrando zona de {city}
        </div>
      </div>

      {/* Filters Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-petuno-surface dark:bg-dark-surface p-4 rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 shadow-sm">
        <div>
          <label className="block text-[10px] font-bold text-petuno-secondary-text mb-1 uppercase">Buscar</label>
          <input 
            type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Ej. Max, Toby..."
            className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/20 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-petuno-purple transition-all"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-petuno-secondary-text mb-1 uppercase">Especie</label>
          <select 
            value={species} onChange={e => setSpecies(e.target.value)}
            className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/20 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-petuno-purple transition-all dark:bg-dark-surface"
          >
            <option value="Todos">Todos</option>
            <option value="Perro">Perros</option>
            <option value="Gato">Gatos</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-petuno-secondary-text mb-1 uppercase">Ciudad</label>
          <input 
            type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="Ej. Bogotá"
            className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/20 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-petuno-purple transition-all"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-petuno-secondary-text mb-1 uppercase">Radio de Distancia</label>
          <select 
            value={distance} onChange={e => setDistance(e.target.value)}
            className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/20 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-petuno-purple transition-all dark:bg-dark-surface"
          >
            <option value="1">A menos de 1 km</option>
            <option value="5">A menos de 5 km</option>
            <option value="10">A menos de 10 km</option>
            <option value="20">A menos de 20 km</option>
          </select>
        </div>
      </div>

      {/* Lost pets list grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lostPets
          .filter(pet => {
            const matchesSearch = pet.name.toLowerCase().includes(search.toLowerCase()) || 
                                  pet.breed.toLowerCase().includes(search.toLowerCase());
            const matchesSpecies = species === 'Todos' || pet.species === species;
            return matchesSearch && matchesSpecies;
          })
          .map((pet, index) => (
            <div key={pet.id} className="bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 shadow-sm overflow-hidden flex flex-col justify-between">
              <div className="h-40 overflow-hidden relative bg-petuno-background">
                <img src={pet.photo} alt={pet.name} className="w-full h-full object-cover" />
                
                {/* Badges Overlay */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                  <span className="bg-petuno-coral text-white font-extrabold px-2.5 py-0.5 rounded-full text-[10px] flex items-center gap-1 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span> Perdido
                  </span>
                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-md ${
                    pet.hasGps ? 'bg-petuno-purple text-white' : 'bg-white dark:bg-dark-surface text-petuno-text dark:text-dark-text border border-petuno-border/50'
                  }`}>
                    {pet.hasGps ? '🛰️ GPS Activo' : '🏷️ Código QR'}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-lg">{pet.name}</h3>
                  <p className="text-xs text-petuno-secondary-text mt-0.5">{pet.species} • {pet.breed}</p>
                  
                  <div className="mt-4 space-y-2 border-t border-petuno-border dark:border-petuno-secondary-text/10 pt-4 text-xs text-petuno-secondary-text">
                    <div className="flex justify-between">
                      <span className="font-semibold">Último reporte:</span>
                      <span className="font-bold text-petuno-text dark:text-dark-text">
                        {pet.hasGps ? '📍 GPS Satelital En Línea' : `📍 Visto en Cedritos`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Distancia:</span>
                      <span className="font-bold text-petuno-text dark:text-dark-text">~{(index * 1.5 + 1.2).toFixed(1)} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Fecha reporte:</span>
                      <span className="font-bold text-petuno-text dark:text-dark-text">Hace {index * 2 + 3} horas</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-6">
                  <button 
                    onClick={() => onViewPublicProfile(pet.id)}
                    className="bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 hover:bg-petuno-background dark:hover:bg-dark-surface-elevated text-xs font-bold py-2 rounded-xl text-center"
                  >
                    Ver Ficha
                  </button>
                  <button 
                    onClick={() => onReportSighting(pet.id)}
                    className="bg-petuno-purple hover:bg-petuno-purple-dark text-white text-xs font-bold py-2 rounded-xl shadow-sm text-center"
                  >
                    Reportar Avistamiento
                  </button>
                </div>
              </div>
            </div>
          ))}

        {lostPets.length === 0 && (
          <div className="col-span-full py-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-petuno-purple-50 dark:bg-dark-surface-elevated flex items-center justify-center text-petuno-purple mb-4">
              <PawPrint className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold">No hay alertas activas</h3>
            <p className="text-sm text-petuno-secondary-text max-w-sm mt-1">¡Qué gran noticia! Actualmente no hay reportes de mascotas perdidas en tu zona.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function SightingsTimelineView({ 
  sightings, 
  unidentifiedSightings,
  pets,
  onReportSighting,
  onLinkSighting,
  onReportUnidentified
}: { 
  sightings: Sighting[]; 
  unidentifiedSightings: UnidentifiedSighting[];
  pets: Pet[];
  onReportSighting: () => void; 
  onLinkSighting: (sightingId: string, petId: string) => void;
  onReportUnidentified: () => void;
}) {
  const [subTab, setSubTab] = useState<'Timeline' | 'Galería'>('Timeline');
  const [selectedSighting, setSelectedSighting] = useState<UnidentifiedSighting | null>(null);
  const [linkPetId, setLinkPetId] = useState('');

  const lostMine = pets.filter(p => p.isMine && p.status === 'Perdido');

  const handleLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkPetId || !selectedSighting) return;
    onLinkSighting(selectedSighting.id, linkPetId);
    setSelectedSighting(null);
    setLinkPetId('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-left">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">Reportes de Avistamientos</h2>
          <p className="text-sm text-petuno-secondary-text mt-1">Monitorea y reporta avistamientos de mascotas para ayudar a reunirlas con sus familias.</p>
        </div>
        
        <div className="flex gap-2 self-stretch sm:self-auto">
          {subTab === 'Timeline' ? (
            <button 
              onClick={onReportSighting}
              className="bg-petuno-purple hover:bg-petuno-purple-dark text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 flex-grow sm:flex-grow-0"
            >
              <Plus className="w-4 h-4" /> Reportar con ID
            </button>
          ) : (
            <button 
              onClick={onReportUnidentified}
              className="bg-petuno-purple hover:bg-petuno-purple-dark text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 flex-grow sm:flex-grow-0"
            >
              <Plus className="w-4 h-4" /> Reportar sin QR
            </button>
          )}
        </div>
      </div>

      {/* Sub-navigation Tabs */}
      <div className="flex border-b border-petuno-border dark:border-petuno-secondary-text/15">
        <button 
          onClick={() => setSubTab('Timeline')}
          className={`px-6 py-3 font-bold text-xs border-b-2 transition-all ${
            subTab === 'Timeline' 
              ? 'border-petuno-purple text-petuno-purple' 
              : 'border-transparent text-petuno-secondary-text dark:text-dark-secondary-text hover:text-petuno-text'
          }`}
        >
          📍 Historial de Avistamientos
        </button>
        <button 
          onClick={() => setSubTab('Galería')}
          className={`px-6 py-3 font-bold text-xs border-b-2 transition-all ${
            subTab === 'Galería' 
              ? 'border-petuno-purple text-petuno-purple' 
              : 'border-transparent text-petuno-secondary-text dark:text-dark-secondary-text hover:text-petuno-text'
          }`}
        >
          📷 Mascotas sin Identificar (Galería)
        </button>
      </div>

      {/* Sub-tab 1: Timeline */}
      {subTab === 'Timeline' && (
        <div className="bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 p-6 shadow-sm">
          <div className="space-y-8 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-0.5 before:bg-petuno-border dark:before:bg-petuno-secondary-text/15">
            {sightings.map((sighting, index) => {
              const timeAgo = index === 0 ? 'Hace 12 minutos' : index === 1 ? 'Hace 45 minutos' : 'Hace 2 horas';
              return (
                <div key={sighting.id} className="flex gap-4 relative z-10 text-left">
                  <div className="w-12 h-12 rounded-full border-4 border-petuno-surface dark:border-dark-surface overflow-hidden bg-white shadow-md flex-shrink-0">
                    <img src={sighting.petPhoto} alt={sighting.petName} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 bg-petuno-background/40 dark:bg-dark-surface-elevated/40 border border-petuno-border/50 dark:border-petuno-secondary-text/10 rounded-xl p-4">
                    <div className="flex justify-between items-baseline gap-2">
                      <h4 className="text-sm font-bold text-petuno-text dark:text-dark-text">
                        Visto {sighting.petName} en <span className="text-petuno-purple dark:text-petuno-purple-light">{sighting.location}</span>
                      </h4>
                      <span className="text-[10px] text-petuno-muted shrink-0">{timeAgo}</span>
                    </div>
                    <p className="text-xs text-petuno-secondary-text dark:text-dark-secondary-text mt-2 leading-relaxed">{sighting.description}</p>
                    
                    {sighting.photo && (
                      <div className="mt-3 max-w-xs h-28 rounded-lg overflow-hidden border border-petuno-border">
                        <img src={sighting.photo} alt="Evidencia" className="w-full h-full object-cover" />
                      </div>
                    )}

                    <div className="mt-3 flex gap-4 text-[10px] font-semibold text-petuno-muted border-t border-petuno-border/30 dark:border-petuno-secondary-text/5 pt-2">
                      <span>Fecha: {sighting.date}</span>
                      <span>Hora: {sighting.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}

            {sightings.length === 0 && (
              <div className="py-8 text-center">
                <p className="text-xs text-petuno-muted">No se han registrado avistamientos de mascotas recientemente.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sub-tab 2: Gallery of Unidentified Sightings */}
      {subTab === 'Galería' && (
        <div className="space-y-6">
          <div className="bg-petuno-purple/5 border border-petuno-purple/15 rounded-2xl p-4 text-xs text-petuno-purple dark:text-petuno-purple-light leading-relaxed">
            💡 **¿Perdiste tu mascota?** Revisa esta galería de avistamientos de animales encontrados en la calle sin placa ni chapa Petuno. Si identificas a tu mascota, haz clic sobre la tarjeta para vincular la foto a tu reporte SOS activo.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {unidentifiedSightings.map((sighting) => (
              <div 
                key={sighting.id} 
                className="bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer animate-fade-in"
                onClick={() => setSelectedSighting(sighting)}
              >
                <div className="h-44 overflow-hidden bg-petuno-background">
                  <img src={sighting.photo} alt="Avistado" className="w-full h-full object-cover" />
                </div>
                <div className="p-4 text-left space-y-3">
                  <div>
                    <span className="text-[10px] font-bold text-petuno-purple uppercase">📍 {sighting.location}</span>
                    <p className="text-xs text-petuno-secondary-text dark:text-dark-secondary-text mt-1.5 leading-relaxed truncate">{sighting.description}</p>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-petuno-muted border-t border-petuno-border/30 dark:border-petuno-secondary-text/5 pt-2">
                    <span>{sighting.date} • {sighting.time}</span>
                    <span className="text-petuno-purple font-bold">Ver Detalles →</span>
                  </div>
                </div>
              </div>
            ))}

            {unidentifiedSightings.length === 0 && (
              <div className="col-span-full py-16 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-petuno-purple-50 dark:bg-dark-surface-elevated flex items-center justify-center text-petuno-purple mb-4">
                  <PawPrint className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold">No hay reportes sin identificar</h3>
                <p className="text-sm text-petuno-secondary-text max-w-sm mt-1">Actualmente no hay fotos de mascotas perdidas sin collar QR reportadas en la zona.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SIGHTING VIEW AND LINK MODAL */}
      {selectedSighting && (
        <div className="fixed inset-0 z-55 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-petuno-surface dark:bg-dark-surface max-w-md w-full rounded-2xl p-6 border border-petuno-border dark:border-petuno-secondary-text/25 shadow-2xl relative text-left">
            <button 
              onClick={() => setSelectedSighting(null)} 
              className="absolute top-4 right-4 text-petuno-secondary-text hover:bg-petuno-background dark:hover:bg-dark-surface-elevated p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4 pt-2">
              <h3 className="text-lg font-bold">Detalle de Avistamiento</h3>
              <div className="h-48 rounded-xl overflow-hidden bg-petuno-background border border-petuno-border">
                <img src={selectedSighting.photo} alt="Mascota" className="w-full h-full object-cover" />
              </div>
              
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[10px] text-petuno-muted font-bold block">UBICACIÓN</span>
                  <p className="font-bold text-petuno-text dark:text-dark-text">{selectedSighting.location}</p>
                </div>
                <div>
                  <span className="text-[10px] text-petuno-muted font-bold block">FECHA Y HORA</span>
                  <p className="text-petuno-text dark:text-dark-text">{selectedSighting.date} a las {selectedSighting.time}</p>
                </div>
                <div>
                  <span className="text-[10px] text-petuno-muted font-bold block">DESCRIPCIÓN</span>
                  <p className="text-petuno-secondary-text dark:text-dark-secondary-text leading-relaxed">{selectedSighting.description}</p>
                </div>
              </div>

              {lostMine.length > 0 ? (
                <form onSubmit={handleLinkSubmit} className="border-t border-petuno-border/30 dark:border-petuno-secondary-text/10 pt-4 space-y-3">
                  <h4 className="text-xs font-bold text-petuno-purple">¿Es tu mascota? Vincúlala a tu búsqueda activa</h4>
                  <div className="flex gap-2">
                    <select 
                      value={linkPetId} 
                      onChange={e => setLinkPetId(e.target.value)} 
                      required
                      className="flex-grow bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-petuno-purple dark:bg-dark-surface"
                    >
                      <option value="">Selecciona tu mascota...</option>
                      {lostMine.map(pet => (
                        <option key={pet.id} value={pet.id}>{pet.name}</option>
                      ))}
                    </select>
                    <button 
                      type="submit"
                      className="bg-petuno-purple hover:bg-petuno-purple-dark text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md transition-all"
                    >
                      Vincular Foto
                    </button>
                  </div>
                </form>
              ) : (
                <div className="border-t border-petuno-border/30 dark:border-petuno-secondary-text/10 pt-4 text-center">
                  <p className="text-[10px] text-petuno-muted italic">No tienes alertas SOS activas de tus propias mascotas en este momento.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SightingForm({ 
  lostPets, 
  preSelectedPetId,
  onSave, 
  onCancel 
}: { 
  lostPets: Pet[]; 
  preSelectedPetId: string | null;
  onSave: (petId: string, location: string, date: string, time: string, description: string, photo: string) => void; 
  onCancel: () => void;
}) {
  const [petId, setPetId] = useState(preSelectedPetId || lostPets[0]?.id || '');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(new Date().toTimeString().slice(0, 5));
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!petId) {
      alert('Debes seleccionar una mascota');
      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      onSave(petId, location, date, time, description, photo);
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="max-w-xl mx-auto bg-petuno-surface dark:bg-dark-surface border border-petuno-border dark:border-petuno-secondary-text/15 rounded-2xl p-6 sm:p-8 text-left shadow-xl">
      <div className="mb-6">
        <h3 className="text-lg font-bold">Reportar Avistamiento de Mascota Perdida</h3>
        <p className="text-xs text-petuno-secondary-text mt-1">Ingresa los detalles para notificar de inmediato al propietario.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-petuno-secondary-text mb-2">Mascota Perdida</label>
          <select 
            value={petId} onChange={e => setPetId(e.target.value)} disabled={!!preSelectedPetId}
            className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-petuno-purple transition-all dark:bg-dark-surface"
          >
            {lostPets.map(pet => (
              <option key={pet.id} value={pet.id}>{pet.name} ({pet.species} • {pet.breed})</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-petuno-secondary-text mb-2">Ubicación del avistamiento</label>
          <input 
            type="text" required value={location} onChange={e => setLocation(e.target.value)} placeholder="Ej. Parque de la 93, Carrera 11 con 90"
            className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-petuno-purple transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-petuno-secondary-text mb-2">Fecha</label>
            <input 
              type="date" required value={date} onChange={e => setDate(e.target.value)}
              className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-petuno-purple transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-petuno-secondary-text mb-2">Hora</label>
            <input 
              type="time" required value={time} onChange={e => setTime(e.target.value)}
              className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-petuno-purple transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-petuno-secondary-text mb-2">Descripción física / comportamiento</label>
          <textarea 
            required value={description} onChange={e => setDescription(e.target.value)} rows={3} placeholder="¿Cómo lo viste? Ej. Tenía collar, cojeaba un poco, corría asustado..."
            className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-petuno-purple transition-all resize-none"
          ></textarea>
        </div>

        <div>
          <label className="block text-xs font-bold text-petuno-secondary-text mb-2">Foto / Evidencia visual (Opcional)</label>
          <div className="flex items-center gap-4">
            {photo ? (
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-petuno-background border border-petuno-border relative group">
                <img src={photo} alt="Preview" className="w-full h-full object-cover" />
                <button type="button" onClick={() => setPhoto('')} className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold">Quitar</button>
              </div>
            ) : (
              <div className="w-16 h-16 rounded-xl bg-petuno-background dark:bg-dark-surface-elevated border-2 border-dashed border-petuno-border flex items-center justify-center text-petuno-muted"><FileText className="w-6 h-6" /></div>
            )}
            <label className="bg-petuno-purple/10 hover:bg-petuno-purple/20 text-petuno-purple dark:text-petuno-purple-light px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all">
              Subir evidencia
              <input 
                type="file" accept="image/*" className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => setPhoto(reader.result as string);
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </label>
          </div>
        </div>

        <div className="flex gap-4 pt-4 border-t border-petuno-border/30 dark:border-petuno-secondary-text/10">
          <button 
            type="submit" disabled={isSaving}
            className="flex-1 bg-petuno-purple hover:bg-petuno-purple-dark text-white font-semibold py-3 rounded-xl transition-all shadow-md text-sm flex justify-center items-center gap-2"
          >
            {isSaving ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Guardando...
              </>
            ) : 'Enviar Reporte'}
          </button>
          <button 
            type="button" onClick={onCancel}
            className="px-6 border border-transparent hover:bg-petuno-coral-light/20 text-petuno-coral text-sm font-semibold py-3 rounded-xl transition-all"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

function UnidentifiedSightingForm({ 
  onSave, 
  onCancel 
}: { 
  onSave: (location: string, date: string, time: string, description: string, photo: string) => void; 
  onCancel: () => void;
}) {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(new Date().toTimeString().slice(0, 5));
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      onSave(location, date, time, description, photo);
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="max-w-xl mx-auto bg-petuno-surface dark:bg-dark-surface border border-petuno-border dark:border-petuno-secondary-text/15 rounded-2xl p-6 sm:p-8 text-left shadow-xl animate-fade-in">
      <div className="mb-6">
        <h3 className="text-lg font-bold">Reportar Avistamiento sin Chapa QR</h3>
        <p className="text-xs text-petuno-secondary-text mt-1">Registra la foto de un animal avistado en la calle para que su dueño pueda identificarlo en la galería de comunidad.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-petuno-secondary-text mb-2">Ubicación aproximada</label>
          <input 
            type="text" required value={location} onChange={e => setLocation(e.target.value)} placeholder="Ej. Calle 106 con Carrera 19, Cedritos"
            className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-petuno-purple transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-petuno-secondary-text mb-2">Fecha</label>
            <input 
              type="date" required value={date} onChange={e => setDate(e.target.value)}
              className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-petuno-purple transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-petuno-secondary-text mb-2">Hora</label>
            <input 
              type="time" required value={time} onChange={e => setTime(e.target.value)}
              className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-petuno-purple transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-petuno-secondary-text mb-2">Características físicas (raza aproximada, color, estado)</label>
          <textarea 
            required value={description} onChange={e => setDescription(e.target.value)} rows={3} placeholder="Ej. Perrito color miel, tipo cocker, muy asustado buscando comida..."
            className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-petuno-purple transition-all resize-none"
          ></textarea>
        </div>

        <div>
          <label className="block text-xs font-bold text-petuno-secondary-text mb-2">Foto de la Mascota Avistada (Obligatoria para la galería)</label>
          <div className="flex items-center gap-4">
            {photo ? (
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-petuno-background border border-petuno-border relative group">
                <img src={photo} alt="Preview" className="w-full h-full object-cover" />
                <button type="button" onClick={() => setPhoto('')} className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold">Quitar</button>
              </div>
            ) : (
              <div className="w-16 h-16 rounded-xl bg-petuno-background dark:bg-dark-surface-elevated border-2 border-dashed border-petuno-border flex items-center justify-center text-petuno-muted"><FileText className="w-6 h-6" /></div>
            )}
            <label className="bg-petuno-purple/10 hover:bg-petuno-purple/20 text-petuno-purple dark:text-petuno-purple-light px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all">
              Subir Foto
              <input 
                type="file" accept="image/*" required={!photo} className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => setPhoto(reader.result as string);
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </label>
          </div>
        </div>

        <div className="flex gap-4 pt-4 border-t border-petuno-border/30 dark:border-petuno-secondary-text/10">
          <button 
            type="submit" disabled={isSaving || !photo}
            className="flex-1 bg-petuno-purple hover:bg-petuno-purple-dark text-white font-semibold py-3 rounded-xl transition-all shadow-md text-sm flex justify-center items-center gap-2 disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Publicando...
              </>
            ) : 'Publicar Avistamiento'}
          </button>
          <button 
            type="button" onClick={onCancel}
            className="px-6 border border-transparent hover:bg-petuno-coral-light/20 text-petuno-coral text-sm font-semibold py-3 rounded-xl transition-all"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

function PublicProfileModal({ 
  pet, 
  onClose,
  onReportSighting,
  privacySettings 
}: { 
  pet: Pet; 
  onClose: () => void;
  onReportSighting: () => void;
  privacySettings?: PrivacySettings;
}) {
  const [flowState, setFlowState] = useState<'profile' | 'contact_owner' | 'report_sighting' | 'success'>('profile');
  const [sightingLoc, setSightingLoc] = useState('');
  const [sightingStatus, setSightingStatus] = useState('');
  const [sightingContact, setSightingContact] = useState('');
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);

  const showName = privacySettings ? privacySettings.showName : true;
  const showBreed = privacySettings ? privacySettings.showBreed : true;
  const showAge = privacySettings ? privacySettings.showAge : true;
  const showMedical = privacySettings ? privacySettings.showMedical : true;
  const allowContact = privacySettings ? privacySettings.allowAnonymousContact : true;
  if (false as boolean) {
    onReportSighting();
  }

  // Format ID to Petuno ID standards: PTN-CO-[hash]
  const formattedId = `PTN-CO-${pet.petunoId ? pet.petunoId.replace('PTO-', '') : '8F42A91'}`;

  const handleShareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setSightingLoc(`Coordenadas: Lat ${position.coords.latitude.toFixed(5)}, Lng ${position.coords.longitude.toFixed(5)}`);
          alert('📍 Ubicación GPS obtenida del navegador con éxito.');
        },
        () => {
          alert('No pudimos obtener tu ubicación GPS automáticamente. Por favor ingrésala manualmente.');
        }
      );
    } else {
      alert('Tu navegador no soporta geolocalización.');
    }
  };

  const handleSightingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingReport(true);
    setTimeout(() => {
      setIsSubmittingReport(false);
      setFlowState('success');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-55 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 font-sans text-left">
      <div className="bg-petuno-surface dark:bg-dark-surface max-w-md w-full rounded-3xl border border-petuno-border dark:border-petuno-secondary-text/25 shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Banner header */}
        <div className={`p-5 text-white flex items-center justify-between flex-shrink-0 ${
          pet.status === 'Perdido' ? 'bg-petuno-coral' : 'bg-petuno-purple'
        }`}>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 animate-pulse" />
            <h3 className="font-extrabold text-xs uppercase tracking-wider">
              {pet.status === 'Perdido' ? '🚨 SOS MASCOTA PERDIDA' : '🟢 MASCOTA IDENTIFICADA'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-white/20 rounded-lg text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Container with Scroll */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          
          {flowState === 'profile' && (
            <div className="space-y-6">
              {/* Pet Card Header */}
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-petuno-background dark:bg-dark-surface-elevated flex-shrink-0 border border-petuno-border dark:border-petuno-secondary-text/10">
                  <img src={pet.photo} alt={pet.name} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xl font-extrabold text-petuno-text dark:text-dark-text">
                      {showName ? pet.name : 'Mascota Protegida'}
                    </h4>
                    <span className={`text-[8.5px] font-extrabold px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                      pet.status === 'Perdido' 
                        ? 'bg-petuno-coral/10 border-petuno-coral/20 text-petuno-coral' 
                        : 'bg-petuno-mint/10 border-petuno-mint/20 text-petuno-mint'
                    }`}>
                      {pet.status === 'Perdido' ? 'PERDIDO' : 'IDENTIFICADO'}
                    </span>
                  </div>
                  <p className="text-xs text-petuno-secondary-text dark:text-dark-secondary-text">
                    {showBreed ? `${pet.species} • ${pet.breed}` : pet.species}
                    {showAge && pet.age && ` • ${pet.age}`}
                  </p>
                  <p className="text-[10px] font-mono text-petuno-purple dark:text-petuno-purple-light font-bold">
                    PETUNO ID: {formattedId}
                  </p>
                </div>
              </div>

              {/* Owner / Contact Actions (Frictionless) */}
              <div className="bg-petuno-background dark:bg-dark-surface-elevated p-4 rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/10 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[10px] text-petuno-muted font-bold uppercase tracking-wider">👤 RESPONSABLE</span>
                  <span className="font-extrabold text-petuno-text dark:text-dark-text">{pet.ownerName || 'John Rueda'}</span>
                </div>
                
                <div className="grid grid-cols-3 gap-2 pt-1.5">
                  <a 
                    href={`tel:${pet.emergencyContact || '+573001234567'}`}
                    className="bg-petuno-purple/10 hover:bg-petuno-purple/20 text-petuno-purple dark:text-petuno-purple-light text-center py-2 rounded-xl text-[10px] font-bold transition-all flex items-center justify-center gap-1"
                  >
                    📞 Llamar
                  </a>
                  <a 
                    href={`https://wa.me/${(pet.emergencyContact || '573001234567').replace(/[^0-9]/g, '')}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-green-500/10 hover:bg-green-500/20 text-green-600 dark:text-green-400 text-center py-2 rounded-xl text-[10px] font-bold transition-all flex items-center justify-center gap-1"
                  >
                    💬 WhatsApp
                  </a>
                  <button 
                    onClick={handleShareLocation}
                    className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 text-center py-2 rounded-xl text-[10px] font-bold transition-all flex items-center justify-center gap-1"
                  >
                    📍 Mi Ubicación
                  </button>
                </div>
              </div>

              {/* Medical Specs Grid */}
              {showMedical && (
                <div className="space-y-2.5">
                  <span className="text-[10px] text-petuno-muted font-bold uppercase tracking-wider block">🏥 INFORMACIÓN MÉDICA</span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-petuno-background dark:bg-dark-surface-elevated p-3 rounded-xl border border-petuno-border/50 dark:border-petuno-secondary-text/10">
                      <span className="text-[9px] text-petuno-secondary-text dark:text-dark-secondary-text font-semibold block">Alergias</span>
                      <span className="font-bold text-petuno-coral">{pet.allergies || 'Ninguna conocida'}</span>
                    </div>
                    <div className="bg-petuno-background dark:bg-dark-surface-elevated p-3 rounded-xl border border-petuno-border/50 dark:border-petuno-secondary-text/10">
                      <span className="text-[9px] text-petuno-secondary-text dark:text-dark-secondary-text font-semibold block">Medicamentos</span>
                      <span className="font-bold text-petuno-text dark:text-dark-text">{pet.medicalCritical ? 'Requiere tratamiento' : 'Ninguno'}</span>
                    </div>
                    <div className="bg-petuno-background dark:bg-dark-surface-elevated p-3 rounded-xl border border-petuno-border/50 dark:border-petuno-secondary-text/10">
                      <span className="text-[9px] text-petuno-secondary-text dark:text-dark-secondary-text font-semibold block">Veterinario Clínico</span>
                      <span className="font-bold text-petuno-text dark:text-dark-text">Dr. Silva (Chicó Vet)</span>
                    </div>
                    <div className="bg-petuno-background dark:bg-dark-surface-elevated p-3 rounded-xl border border-petuno-border/50 dark:border-petuno-secondary-text/10">
                      <span className="text-[9px] text-petuno-secondary-text dark:text-dark-secondary-text font-semibold block">Tipo de Sangre</span>
                      <span className="font-bold text-petuno-text dark:text-dark-text">DEA 1.1 (+)</span>
                    </div>
                    <div className="bg-petuno-background dark:bg-dark-surface-elevated p-3 rounded-xl border border-petuno-border/50 dark:border-petuno-secondary-text/10 col-span-2">
                      <span className="text-[9px] text-petuno-secondary-text dark:text-dark-secondary-text font-semibold block">Condición Crítica / Notas</span>
                      <span className="font-semibold text-petuno-text dark:text-dark-text text-[11px] block mt-0.5">{pet.medicalCritical || 'Estable y vacunado'}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* SOS Emergency Banner & Friction-free report action */}
              {pet.status === 'Perdido' && (
                <div className="border-t border-petuno-border/50 dark:border-petuno-secondary-text/10 pt-4 space-y-3">
                  <div className="bg-petuno-coral/10 p-4 rounded-2xl border border-petuno-coral/20">
                    <h5 className="text-xs font-extrabold text-petuno-coral flex items-center gap-1.5 uppercase">
                      🐾 ¡Encontraste a {pet.name}!
                    </h5>
                    <p className="text-[10px] text-petuno-secondary-text dark:text-dark-secondary-text mt-1 leading-snug">
                      Esta mascota está reportada como perdida por su familia. No necesitas registrarte ni crear una cuenta para reportar su paradero.
                    </p>
                  </div>
                  
                  <div className="flex gap-3">
                    {allowContact && (
                      <button 
                        onClick={() => setFlowState('contact_owner')}
                        className="flex-1 bg-petuno-purple hover:bg-petuno-purple-dark text-white font-semibold py-2.5 rounded-xl text-xs transition-colors shadow-sm text-center"
                      >
                        📞 Contactar Responsable
                      </button>
                    )}
                    <button 
                      onClick={() => setFlowState('report_sighting')}
                      className="flex-1 bg-transparent hover:bg-petuno-background dark:hover:bg-dark-surface-elevated text-petuno-text dark:text-dark-text border border-petuno-border dark:border-petuno-secondary-text/40 font-bold py-2.5 rounded-xl text-xs transition-all text-center"
                    >
                      📍 Reportar Dónde lo Viste
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {flowState === 'contact_owner' && (
            <div className="space-y-4">
              <h4 className="text-sm font-extrabold text-petuno-text dark:text-dark-text flex items-center gap-1.5">
                📞 Datos de Contacto del Responsable
              </h4>
              <p className="text-xs text-petuno-secondary-text dark:text-dark-secondary-text">
                Comunícate directamente con el dueño de {pet.name} para coordinar la devolución de la mascota.
              </p>

              <div className="bg-petuno-background dark:bg-dark-surface-elevated p-4 rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/10 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span>Propietario:</span>
                  <span className="font-bold">{pet.ownerName || 'John Rueda'}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span>Teléfono Móvil:</span>
                  <span className="font-mono font-bold text-petuno-purple dark:text-petuno-purple-light">
                    {pet.emergencyContact || '+57 300 123 4567'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <a 
                  href={`tel:${pet.emergencyContact || '+573001234567'}`}
                  className="bg-petuno-purple hover:bg-petuno-purple-dark text-white font-semibold py-2.5 rounded-xl text-xs transition-colors shadow-sm text-center"
                >
                  📞 Llamada Directa
                </a>
                <a 
                  href={`https://wa.me/${(pet.emergencyContact || '573001234567').replace(/[^0-9]/g, '')}?text=Hola,%20tengo%20información%20sobre%20${pet.name}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-xl text-xs transition-colors shadow-md text-center"
                >
                  💬 Enviar WhatsApp
                </a>
              </div>

              <button 
                onClick={() => setFlowState('profile')}
                className="w-full bg-transparent hover:bg-petuno-background text-petuno-secondary-text text-xs font-semibold py-2 rounded-xl mt-4 block text-center"
              >
                Volver a la Ficha
              </button>
            </div>
          )}

          {flowState === 'report_sighting' && (
            <form onSubmit={handleSightingSubmit} className="space-y-4">
              <div className="mb-2">
                <h4 className="text-sm font-extrabold text-petuno-text dark:text-dark-text">📍 Informar Dónde Encontraste a {pet.name}</h4>
                <p className="text-[10px] text-petuno-secondary-text dark:text-dark-secondary-text mt-1">
                  🔒 No necesitas crear una cuenta en Petuno. Tu reporte enviará una alerta geolocalizada por SMS y Email de inmediato al dueño.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-[10px] font-bold text-petuno-secondary-text uppercase">¿Dónde lo viste o encontraste?</label>
                    <button 
                      type="button" 
                      onClick={handleShareLocation}
                      className="text-[9px] text-petuno-purple dark:text-petuno-purple-light font-bold hover:underline"
                    >
                      📍 Usar mi GPS
                    </button>
                  </div>
                  <input 
                    type="text" 
                    required 
                    value={sightingLoc} 
                    onChange={e => setSightingLoc(e.target.value)} 
                    placeholder="Ej. Calle 93 con Carrera 15, frente al Starbucks"
                    className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-petuno-purple transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-petuno-secondary-text mb-1.5 uppercase">Estado de la mascota / Mensaje</label>
                  <textarea 
                    required 
                    value={sightingStatus} 
                    onChange={e => setSightingStatus(e.target.value)} 
                    rows={3} 
                    placeholder="Ej: Está resguardado en mi patio / Parece asustado pero está bien..."
                    className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-petuno-purple transition-all resize-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-petuno-secondary-text mb-1.5 uppercase">Tu número de contacto (Opcional)</label>
                  <input 
                    type="text" 
                    value={sightingContact} 
                    onChange={e => setSightingContact(e.target.value)} 
                    placeholder="Ej. +57 315 111 2233"
                    className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-petuno-purple transition-all"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setFlowState('profile')} 
                  className="flex-1 bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 font-semibold py-2.5 rounded-xl text-xs text-petuno-text dark:text-dark-text hover:bg-petuno-background dark:hover:bg-dark-surface-elevated transition-all"
                >
                  Atrás
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmittingReport}
                  className="flex-1 bg-petuno-purple hover:bg-petuno-purple-dark text-white font-semibold py-2.5 rounded-xl text-xs transition-colors shadow-md"
                >
                  {isSubmittingReport ? 'Enviando...' : 'Enviar Reporte'}
                </button>
              </div>
            </form>
          )}

          {flowState === 'success' && (
            <div className="text-center space-y-4 py-8">
              <div className="w-14 h-14 rounded-full bg-petuno-mint/10 border border-petuno-mint/20 text-petuno-mint flex items-center justify-center mx-auto shadow-sm">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h4 className="text-base font-extrabold text-petuno-text dark:text-dark-text">¡Reporte Enviado con Éxito!</h4>
              <p className="text-xs text-petuno-secondary-text dark:text-dark-secondary-text leading-relaxed">
                Hemos enviado de inmediato un SMS y correo electrónico al dueño de **{pet.name}** con la información y las coordenadas reportadas.
              </p>
              <button 
                onClick={onClose}
                className="w-full bg-petuno-purple hover:bg-petuno-purple-dark text-white font-semibold py-2.5 rounded-xl text-xs transition-colors shadow-md"
              >
                Cerrar Visor
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

function LostPetManager({ 
  pet, 
  sightings,
  onBack, 
  onDeactivate, 
  onReportSighting, 
  onVerMapa 
}: { 
  pet: Pet; 
  sightings: Sighting[];
  onBack: () => void; 
  onDeactivate: () => void;
  onReportSighting: (id: string) => void;
  onVerMapa: () => void;
}) {
  const petSightings = sightings.filter(s => s.petId === pet.id);
  
  // Last Sighting Location
  const lastLocation = petSightings.length > 0 
    ? petSightings[0].location 
    : 'Bogotá, Chapinero';
  const lastUpdateStr = petSightings.length > 0 
    ? `Hace ${Math.max(1, Math.floor((Date.now() - petSightings[0].timestamp) / (60 * 1000)))} minutos`
    : 'Hace 8 minutos';

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-left animate-fade-in">
      <div>
        <button onClick={onBack} className="text-xs font-bold text-petuno-purple hover:underline">← Volver al Dashboard</button>
      </div>

      <div className="bg-petuno-coral/10 border border-petuno-coral/30 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-sm">
        <div className="flex items-center gap-4 text-left">
          <div className="w-16 h-16 rounded-full bg-petuno-coral text-white flex items-center justify-center flex-shrink-0 animate-pulse border-4 border-white dark:border-dark-surface shadow-md">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-petuno-coral tracking-tight">🚨 MODO SOS ACTIVO: {pet.name.toUpperCase()}</h2>
            <p className="text-xs text-petuno-secondary-text mt-1 max-w-xl">
              Tu mascota está reportada públicamente como perdida en la comunidad Petuno. Se han emitido notificaciones masivas de búsqueda.
            </p>
          </div>
        </div>
        <button 
          onClick={onDeactivate}
          className="bg-petuno-mint hover:bg-petuno-mint/90 text-white text-xs font-extrabold px-5 py-3 rounded-xl transition-all shadow-md shrink-0 whitespace-nowrap"
        >
          Desactivar Modo Perdido (Encontrado)
        </button>
      </div>

      {/* GPS vs QR Tracking Section */}
      <div className="bg-petuno-surface dark:bg-dark-surface border border-petuno-border dark:border-petuno-secondary-text/15 rounded-3xl p-6 shadow-sm">
        {pet.hasGps ? (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-petuno-border dark:border-petuno-secondary-text/10 pb-4">
              <div>
                <h3 className="text-lg font-bold flex items-center gap-2">
                  🛰️ Ubicación Satelital GPS Activa <span className="text-[10px] text-petuno-purple bg-petuno-purple/10 dark:bg-petuno-purple/20 px-2 py-0.5 rounded-full font-bold">Premium collar</span>
                </h3>
                <p className="text-xs text-petuno-secondary-text mt-0.5">El GPS transmite la ubicación del collar inteligente en tiempo real.</p>
              </div>
              <span className="bg-petuno-mint-light text-petuno-mint border border-petuno-mint/20 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 self-start">
                <span className="w-2 h-2 rounded-full bg-petuno-mint animate-ping"></span> En Línea
              </span>
            </div>

            {/* GPS Map simulation */}
            <div className="h-80 rounded-2xl bg-petuno-background dark:bg-dark-surface-elevated relative overflow-hidden flex items-center justify-center border border-petuno-border/50 animate-fade-in">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#6c4ce8_1px,transparent_1px)] [background-size:16px_16px]"></div>
              
              {/* Pulsing GPS Dot */}
              <div className="absolute flex flex-col items-center">
                <div className="relative">
                  <span className="absolute -top-1 -right-1 flex h-6 w-6">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-petuno-purple opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-6 w-6 bg-petuno-purple"></span>
                  </span>
                  <div className="w-14 h-14 rounded-full border-4 border-petuno-purple overflow-hidden bg-white shadow-2xl relative z-10">
                    <img src={pet.photo} alt={pet.name} className="w-full h-full object-cover" />
                  </div>
                </div>
                <span className="bg-petuno-purple text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-lg mt-2 block relative z-15">
                  📍 {pet.name} (GPS)
                </span>
              </div>
              <div className="absolute bottom-3 left-3 bg-white dark:bg-dark-surface p-2 rounded-lg shadow-md border border-petuno-border text-[9px] font-bold">
                Coordenadas: 4.6974° N, 74.0326° W (Bogotá, Cedritos)
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-petuno-border dark:border-petuno-secondary-text/10 pb-4">
              <div>
                <h3 className="text-lg font-bold flex items-center gap-2">
                  🏷️ Monitoreo por Red de Apoyo QR <span className="text-[10px] text-petuno-secondary-text bg-petuno-background dark:bg-dark-surface-elevated px-2 py-0.5 rounded-full font-bold">Gratis</span>
                </h3>
                <p className="text-xs text-petuno-secondary-text mt-0.5">La ubicación se actualiza cuando alguien escanea la placa o reporta avistamientos.</p>
              </div>
              <span className="bg-petuno-amber-light text-petuno-amber border border-petuno-amber/20 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 self-start">
                <span className="w-2 h-2 rounded-full bg-petuno-amber"></span> Esperando escaneo QR / Alerta SOS
              </span>
            </div>

            {/* QR Informational Panel */}
            <div className="p-5 border border-dashed border-petuno-coral/30 bg-petuno-coral-light/5 rounded-2xl flex flex-col md:flex-row gap-4 items-center text-center md:text-left">
              <div className="p-4 bg-petuno-coral/10 rounded-2xl text-petuno-coral shrink-0">
                <QrCode className="w-10 h-10" />
              </div>
              <div className="space-y-1 text-left">
                <h4 className="font-extrabold text-sm text-petuno-coral">¿Cómo funciona la geolocalización QR?</h4>
                <p className="text-xs text-petuno-secondary-text leading-relaxed">
                  Esta mascota no tiene collar GPS físico. Cuando alguien escanee la placa Petuno de {pet.name}, el sistema le pedirá permiso para acceder a su GPS móvil y te enviará una notificación instantánea con el mapa de la zona exacta del escaneo.
                </p>
              </div>
            </div>

            {petSightings.length > 0 ? (
              <div className="space-y-3">
                <span className="text-[10px] text-petuno-muted font-extrabold uppercase block">Último avistamiento reportado por la comunidad:</span>
                <div className="p-4 border border-petuno-border dark:border-petuno-secondary-text/10 bg-petuno-background/30 rounded-xl flex items-center gap-3">
                  <span className="text-2xl shrink-0">📍</span>
                  <div>
                    <h5 className="font-bold text-xs text-petuno-text dark:text-dark-text">{lastLocation}</h5>
                    <p className="text-[10px] text-petuno-secondary-text mt-0.5">{petSightings[0].description} ({lastUpdateStr})</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 border border-petuno-border dark:border-petuno-secondary-text/10 bg-petuno-background/20 rounded-2xl text-center text-xs text-petuno-muted italic">
                Aún no hay avistamientos reportados de {pet.name}. La red de apoyo local ha sido alertada.
              </div>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Sighting status */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 p-6 shadow-sm space-y-4">
            <h3 className="text-base font-extrabold">Canales y Controles de Búsqueda</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border border-petuno-border dark:border-petuno-secondary-text/10 rounded-xl bg-petuno-background/30">
                <span className="text-[10px] text-petuno-muted font-bold block">ZONA DE PÉRDIDA</span>
                <span className="text-sm font-extrabold mt-1 block text-petuno-text dark:text-dark-text">{lastLocation}</span>
              </div>
              <div className="p-4 border border-petuno-border dark:border-petuno-secondary-text/10 rounded-xl bg-petuno-background/30">
                <span className="text-[10px] text-petuno-muted font-bold block">ESTADO COMUNITARIO</span>
                <span className="text-sm font-extrabold mt-1 block text-petuno-text dark:text-dark-text">Alerta SOS Emitida</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-4">
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(`https://petuno.com/p/${pet.petunoId}`);
                  alert('¡Enlace de Ficha Pública copiado al portapapeles!');
                }}
                className="bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 hover:bg-petuno-background dark:hover:bg-dark-surface-elevated text-xs font-bold py-3 rounded-xl transition-all text-center"
              >
                Compartir alerta
              </button>
              <button 
                onClick={onVerMapa}
                className="bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 hover:bg-petuno-background dark:hover:bg-dark-surface-elevated text-xs font-bold py-3 rounded-xl transition-all text-center"
              >
                Ver mapa
              </button>
              <button 
                onClick={() => onReportSighting(pet.id)}
                className="bg-petuno-purple hover:bg-petuno-purple-dark text-white text-xs font-bold py-3 rounded-xl shadow-md text-center"
              >
                Reportar avistamiento
              </button>
            </div>
          </div>

          {/* Sighting Timeline for this pet */}
          <div className="bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 p-6 shadow-sm space-y-4">
            <h3 className="text-base font-extrabold">Avistamientos Confirmados ({petSightings.length})</h3>
            <div className="space-y-4 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-petuno-border dark:before:bg-petuno-secondary-text/15">
              {petSightings.map((sighting) => (
                <div key={sighting.id} className="flex gap-3 relative z-10 text-left">
                  <div className="w-7 h-7 rounded-full bg-petuno-coral text-white flex items-center justify-center flex-shrink-0 border-2 border-petuno-surface dark:border-dark-surface text-xs font-bold">
                    📍
                  </div>
                  <div className="flex-1 bg-petuno-background/40 dark:bg-dark-surface-elevated/20 p-3 rounded-xl border border-petuno-border/50">
                    <div className="flex justify-between items-baseline gap-2">
                      <h4 className="text-xs font-bold text-petuno-coral">{sighting.location}</h4>
                      <span className="text-[9px] text-petuno-muted shrink-0">{sighting.date} • {sighting.time}</span>
                    </div>
                    <p className="text-[10px] text-petuno-secondary-text dark:text-dark-secondary-text mt-1.5 leading-relaxed">{sighting.description}</p>
                    {sighting.photo && (
                      <div className="mt-2 w-28 h-16 rounded overflow-hidden border border-petuno-border">
                        <img src={sighting.photo} alt="Evidencia" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {petSightings.length === 0 && (
                <div className="py-4 text-center">
                  <p className="text-xs text-petuno-muted">Aún no se han reportado avistamientos de la comunidad para {pet.name}.</p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Right Column: Community Actions */}
        <div className="space-y-6">
          <div className="bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 p-6 shadow-sm text-left space-y-4">
            <h3 className="text-base font-extrabold">Canales de Difusión</h3>
            
            <div className="space-y-3 text-xs">
              <div className="p-3 border border-petuno-border dark:border-petuno-secondary-text/10 rounded-xl flex items-center gap-2">
                <span className="text-lg">📢</span>
                <div>
                  <h4 className="font-bold text-[11px] text-petuno-purple">Alerta SOS de Cercanía</h4>
                  <p className="text-[9px] text-petuno-secondary-text">Emitida a dispositivos Petuno activos en un radio de 5km.</p>
                </div>
              </div>
              <div className="p-3 border border-petuno-border dark:border-petuno-secondary-text/10 rounded-xl flex items-center gap-2">
                <span className="text-lg">🏥</span>
                <div>
                  <h4 className="font-bold text-[11px] text-petuno-purple">Clínicas y Refugios Locales</h4>
                  <p className="text-[9px] text-petuno-secondary-text">Se notificó a 14 centros en la zona de Bogotá.</p>
                </div>
              </div>
              <div className="p-3 border border-petuno-border dark:border-petuno-secondary-text/10 rounded-xl flex items-center gap-2">
                <span className="text-lg">📲</span>
                <div>
                  <h4 className="font-bold text-[11px] text-petuno-purple">Póster Digital Generado</h4>
                  <p className="text-[9px] text-petuno-secondary-text">Ficha de búsqueda optimizada compartida en redes sociales.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function ComunidadView({ 
  posts, 
  onLikePost,
  onAddPost 
}: { 
  posts: CommunityPost[]; 
  onLikePost: (postId: string) => void;
  onAddPost: (content: string, photo: string) => void;
}) {
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostPhoto, setNewPostPhoto] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      onAddPost(newPostContent, newPostPhoto);
      setNewPostContent('');
      setNewPostPhoto('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 text-left animate-fade-in">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">Comunidad Petuno</h2>
        <p className="text-sm text-petuno-secondary-text mt-1">Conéctate con otros dueños, comparte noticias, consejos y reportes de mascotas en tu vecindario.</p>
      </div>

      {/* Write a Post */}
      <div className="bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 p-5 shadow-sm space-y-4">
        <h3 className="text-xs font-extrabold text-petuno-purple uppercase tracking-wider">Crear Publicación</h3>
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <textarea 
            value={newPostContent}
            onChange={e => setNewPostContent(e.target.value)}
            required
            rows={3}
            placeholder="¿Qué quieres compartir con el vecindario? Ej. Alertas de búsqueda, consejos, paseadores recomendados..."
            className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-petuno-purple transition-all resize-none"
          ></textarea>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              {newPostPhoto ? (
                <div className="w-10 h-10 rounded-lg overflow-hidden border border-petuno-border relative group">
                  <img src={newPostPhoto} alt="Preview" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => setNewPostPhoto('')} className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[8px] font-bold">X</button>
                </div>
              ) : (
                <label className="flex items-center gap-1 text-xs font-semibold text-petuno-purple hover:underline cursor-pointer">
                  📸 Agregar Foto
                  <input 
                    type="file" accept="image/*" className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => setNewPostPhoto(reader.result as string);
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              )}
            </div>
            
            <button 
              type="submit" disabled={isSubmitting}
              className="bg-petuno-purple hover:bg-petuno-purple-dark text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              {isSubmitting ? 'Publicando...' : 'Publicar'}
            </button>
          </div>
        </form>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 p-6 shadow-sm space-y-4">
            
            {/* Author details */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-petuno-purple/10 text-petuno-purple font-extrabold flex items-center justify-center shadow-inner font-mono">
                {post.authorName[0]}
              </div>
              <div className="text-left">
                <h4 className="text-sm font-bold flex items-center gap-2">
                  {post.authorName}
                  {post.authorRole && (
                    <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                      post.authorRole.includes('Verificado') 
                        ? 'bg-petuno-mint-light text-petuno-mint' 
                        : 'bg-petuno-background dark:bg-dark-surface-elevated text-petuno-secondary-text dark:text-dark-secondary-text'
                    }`}>
                      {post.authorRole}
                    </span>
                  )}
                </h4>
                <span className="text-[10px] text-petuno-muted">{post.timestamp}</span>
              </div>
            </div>

            {/* Post Content */}
            <p className="text-xs text-petuno-text dark:text-dark-text leading-relaxed whitespace-pre-line">{post.content}</p>

            {post.photo && (
              <div className="max-h-80 w-full rounded-2xl overflow-hidden border border-petuno-border bg-petuno-background">
                <img src={post.photo} alt="Publicación" className="w-full h-full object-cover" />
              </div>
            )}

            {/* Actions footer */}
            <div className="flex items-center gap-6 border-t border-petuno-border/30 dark:border-petuno-secondary-text/10 pt-4 text-xs">
              <button 
                onClick={() => onLikePost(post.id)}
                className={`flex items-center gap-1.5 font-bold transition-colors ${
                  post.likedByUser ? 'text-petuno-coral' : 'text-petuno-secondary-text hover:text-petuno-coral'
                }`}
              >
                ❤️ {post.likes} {post.likes === 1 ? 'Me gusta' : 'Me gustas'}
              </button>
              <button 
                onClick={() => alert('Módulo de comentarios de comunidad en desarrollo...')}
                className="flex items-center gap-1.5 font-bold text-petuno-secondary-text hover:text-petuno-purple transition-colors"
              >
                💬 {post.commentsCount} {post.commentsCount === 1 ? 'Comentario' : 'Comentarios'}
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

function DevicesView({
  devices,
  pets,
  onToggleDeviceStatus,
  onAddDevice
}: {
  devices: Device[];
  pets: Pet[];
  onToggleDeviceStatus: (id: string) => void;
  onAddDevice: (name: string, type: 'GPS' | 'BLE' | 'NFC' | 'RFID', petId: string, battery: number) => void;
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState<'GPS' | 'BLE' | 'NFC' | 'RFID'>('GPS');
  const [petId, setPetId] = useState(pets[0]?.id || '');
  const [battery, setBattery] = useState(100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !petId) return;
    onAddDevice(name, type, petId, battery);
    setName('');
    setType('GPS');
    setBattery(100);
    setShowAddModal(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 text-left animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">Mis Dispositivos</h2>
          <p className="text-sm text-petuno-secondary-text mt-1">Administra tus collares GPS, placas NFC y microchips de identidad.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-petuno-purple hover:bg-petuno-purple-dark text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Agregar Dispositivo
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {devices.map((device) => {
          const pet = pets.find(p => p.id === device.petId);
          return (
            <div key={device.id} className="bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 p-5 shadow-sm space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-petuno-purple/10 text-petuno-purple rounded-xl">
                      <Cpu className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-petuno-text dark:text-dark-text">{device.name}</h4>
                      <span className="text-[10px] text-petuno-muted font-mono">{device.type} Device</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${
                    device.status === 'Conectado'
                      ? 'bg-petuno-mint-light border-petuno-mint/20 text-petuno-mint'
                      : 'bg-petuno-coral-light border-petuno-coral/20 text-petuno-coral'
                  }`}>
                    {device.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6 text-xs border-t border-petuno-border dark:border-petuno-secondary-text/10 pt-4">
                  <div>
                    <span className="text-[10px] text-petuno-muted block font-bold">MASCOTA ASOCIADA</span>
                    <span className="font-bold text-petuno-text dark:text-dark-text mt-0.5 block">{pet?.name || 'Ninguna'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-petuno-muted block font-bold">NIVEL BATERÍA</span>
                    <span className="font-bold text-petuno-text dark:text-dark-text mt-0.5 block">{device.battery}%</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[10px] text-petuno-muted block font-bold">ÚLTIMA CONEXIÓN</span>
                    <span className="font-bold text-petuno-text dark:text-dark-text mt-0.5 block">{device.lastConnection}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-petuno-border dark:border-petuno-secondary-text/5 flex gap-2">
                <button 
                  onClick={() => onToggleDeviceStatus(device.id)}
                  className="flex-grow bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 hover:bg-petuno-background dark:hover:bg-dark-surface-elevated text-xs font-bold py-2 rounded-xl text-center"
                >
                  {device.status === 'Conectado' ? '🔌 Simular Desconexión' : '🔌 Simular Conexión'}
                </button>
              </div>
            </div>
          );
        })}

        {devices.length === 0 && (
          <div className="col-span-full py-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-petuno-purple-50 dark:bg-dark-surface-elevated flex items-center justify-center text-petuno-purple mb-4">
              <Cpu className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold">No tienes dispositivos registrados</h3>
            <p className="text-sm text-petuno-secondary-text max-w-sm mt-1">Registra tu collar Petuno GPS o tu tag NFC para activar las alertas geoespaciales.</p>
          </div>
        )}
      </div>

      {/* Add Device Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-55 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-petuno-surface dark:bg-dark-surface max-w-md w-full rounded-2xl p-6 border border-petuno-border dark:border-petuno-secondary-text/25 shadow-2xl relative text-left">
            <button 
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-petuno-secondary-text hover:bg-petuno-background dark:hover:bg-dark-surface-elevated p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <h3 className="text-lg font-bold">Agregar Nuevo Dispositivo</h3>
              
              <div>
                <label className="block text-xs font-bold text-petuno-secondary-text mb-2">Nombre del Dispositivo</label>
                <input 
                  type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="Ej. Mi Collar GPS Premium"
                  className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-petuno-purple transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-petuno-secondary-text mb-2">Tipo de Hardware</label>
                  <select 
                    value={type} onChange={e => setType(e.target.value as any)}
                    className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-petuno-purple dark:bg-dark-surface"
                  >
                    <option value="GPS">Collar GPS (GNSS)</option>
                    <option value="BLE">Tag de Proximidad (BLE)</option>
                    <option value="NFC">Placa Inteligente (NFC)</option>
                    <option value="RFID">Microchip (RFID)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-petuno-secondary-text mb-2">Asociar a Mascota</label>
                  <select 
                    value={petId} onChange={e => setPetId(e.target.value)}
                    className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-petuno-purple dark:bg-dark-surface"
                  >
                    {pets.map(pet => (
                      <option key={pet.id} value={pet.id}>{pet.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-petuno-secondary-text mb-2">Nivel de Batería Inicial ({battery}%)</label>
                <input 
                  type="range" min="10" max="100" value={battery} onChange={e => setBattery(Number(e.target.value))}
                  className="w-full accent-petuno-purple cursor-pointer"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-petuno-border/30 dark:border-petuno-secondary-text/10">
                <button type="submit" className="flex-grow bg-petuno-purple hover:bg-petuno-purple-dark text-white font-semibold py-2.5 rounded-xl text-xs transition-colors shadow-md">
                  Vincular Dispositivo
                </button>
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-grow border border-petuno-border dark:border-petuno-secondary-text/30 hover:bg-petuno-background text-xs font-bold py-2.5 rounded-xl text-center">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function VetsView({
  vets,
  onToggleVetTrusted
}: {
  vets: Vet[];
  onToggleVetTrusted: (id: string) => void;
}) {
  const [subTab, setSubTab] = useState<'MisVets' | 'Explorar'>('MisVets');
  const [bookingVet, setBookingVet] = useState<Vet | null>(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingReason, setBookingReason] = useState('');

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDate || !bookingTime || !bookingVet) return;
    alert(`¡Cita agendada con éxito en ${bookingVet.name} para el ${bookingDate} a las ${bookingTime}! Recibirás un recordatorio en tu panel de notificaciones.`);
    setBookingVet(null);
    setBookingDate('');
    setBookingTime('');
    setBookingReason('');
  };

  const currentVets = subTab === 'MisVets' ? vets.filter(v => v.isTrusted) : vets;

  return (
    <div className="max-w-5xl mx-auto space-y-6 text-left animate-fade-in">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">Directorio Veterinario</h2>
        <p className="text-sm text-petuno-secondary-text mt-1">Encuentra especialistas médicos de confianza y agenda consultas preventivas.</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-petuno-border dark:border-petuno-secondary-text/15">
        <button 
          onClick={() => setSubTab('MisVets')}
          className={`px-6 py-3 font-bold text-xs border-b-2 transition-all ${
            subTab === 'MisVets' 
              ? 'border-petuno-purple text-petuno-purple' 
              : 'border-transparent text-petuno-secondary-text dark:text-dark-secondary-text hover:text-petuno-text'
          }`}
        >
          ⭐ Mis Veterinarios de Confianza
        </button>
        <button 
          onClick={() => setSubTab('Explorar')}
          className={`px-6 py-3 font-bold text-xs border-b-2 transition-all ${
            subTab === 'Explorar' 
              ? 'border-petuno-purple text-petuno-purple' 
              : 'border-transparent text-petuno-secondary-text dark:text-dark-secondary-text hover:text-petuno-text'
          }`}
        >
          🔍 Clínicas y Veterinarios Cercanos
        </button>
      </div>

      {/* Grid of Vets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentVets.map((vet) => (
          <div key={vet.id} className="bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 p-5 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-extrabold text-sm text-petuno-text dark:text-dark-text leading-snug">{vet.name}</h4>
                  <span className="text-[10px] text-petuno-purple font-semibold uppercase mt-1 block">{vet.specialty}</span>
                </div>
                <button 
                  onClick={() => onToggleVetTrusted(vet.id)}
                  className={`text-base p-1 rounded-lg hover:bg-petuno-background dark:hover:bg-dark-surface-elevated transition-colors ${
                    vet.isTrusted ? 'text-petuno-amber' : 'text-petuno-muted'
                  }`}
                  title={vet.isTrusted ? 'Remover de favoritos' : 'Marcar como favorito'}
                >
                  ★
                </button>
              </div>

              <div className="space-y-1.5 text-xs text-petuno-secondary-text">
                <p>📍 {vet.location}</p>
                <p>🕒 {vet.schedule}</p>
                <p>📞 {vet.phone}</p>
              </div>

              <div className="flex items-center gap-1 text-[11px] font-bold text-petuno-amber">
                <span>★</span> {vet.rating.toFixed(1)} <span className="text-petuno-muted font-normal">(45 reviews)</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-5 border-t border-petuno-border dark:border-petuno-secondary-text/10 pt-4">
              <button 
                onClick={() => setBookingVet(vet)}
                className="bg-petuno-purple hover:bg-petuno-purple-dark text-white text-xs font-bold py-2 rounded-xl text-center shadow-sm"
              >
                Agendar Cita
              </button>
              <button 
                onClick={() => alert(`Llamando a ${vet.name} en el teléfono: ${vet.phone}...`)}
                className="bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 hover:bg-petuno-background dark:hover:bg-dark-surface-elevated text-xs font-bold py-2 rounded-xl text-center"
              >
                Llamar
              </button>
            </div>
          </div>
        ))}

        {currentVets.length === 0 && (
          <div className="col-span-full py-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-petuno-purple-50 dark:bg-dark-surface-elevated flex items-center justify-center text-petuno-purple mb-4">
              <Stethoscope className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold">No tienes veterinarios de confianza agregados</h3>
            <p className="text-sm text-petuno-secondary-text max-w-sm mt-1">Explora la pestaña "Clínicas Cercanas" y agrega veterinarios pulsando la estrella para tenerlos siempre a mano.</p>
          </div>
        )}
      </div>

      {/* Booking Appointment Modal */}
      {bookingVet && (
        <div className="fixed inset-0 z-55 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-petuno-surface dark:bg-dark-surface max-w-md w-full rounded-2xl p-6 border border-petuno-border dark:border-petuno-secondary-text/25 shadow-2xl relative text-left">
            <button 
              onClick={() => setBookingVet(null)}
              className="absolute top-4 right-4 text-petuno-secondary-text hover:bg-petuno-background dark:hover:bg-dark-surface-elevated p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={handleBookSubmit} className="space-y-4 pt-2">
              <h3 className="text-lg font-bold">Agendar Consulta Médica</h3>
              <p className="text-xs text-petuno-secondary-text">Elige el día y la hora para tu cita en **{bookingVet.name}**.</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-petuno-secondary-text mb-2">Fecha</label>
                  <input 
                    type="date" required value={bookingDate} onChange={e => setBookingDate(e.target.value)}
                    className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-petuno-purple transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-petuno-secondary-text mb-2">Hora de la Cita</label>
                  <input 
                    type="time" required value={bookingTime} onChange={e => setBookingTime(e.target.value)}
                    className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-petuno-purple transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-petuno-secondary-text mb-2">Motivo de la consulta</label>
                <textarea 
                  value={bookingReason} onChange={e => setBookingReason(e.target.value)} rows={3} placeholder="Ej. Control de vacunas, chequeo dermatológico, dolor en patita..."
                  className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-petuno-purple transition-all resize-none"
                ></textarea>
              </div>

              <div className="flex gap-3 pt-4 border-t border-petuno-border/30 dark:border-petuno-secondary-text/10">
                <button type="submit" className="flex-grow bg-petuno-purple hover:bg-petuno-purple-dark text-white font-semibold py-2.5 rounded-xl text-xs transition-colors shadow-md">
                  Confirmar Consulta
                </button>
                <button type="button" onClick={() => setBookingVet(null)} className="flex-grow border border-petuno-border dark:border-petuno-secondary-text/30 hover:bg-petuno-background text-xs font-bold py-2.5 rounded-xl text-center">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function AdoptionsView({
  adoptionPets,
  onApplyAdoption
}: {
  adoptionPets: AdoptionPet[];
  onApplyAdoption: (petId: string, applicantName: string, email: string, phone: string, address: string, housing: string, hasPets: boolean, timeAvailable: string) => void;
}) {
  const [species, setSpecies] = useState('Todos');
  const [age, setAge] = useState('Todos');
  const [city, setCity] = useState('Todos');
  const [gender, setGender] = useState('Todos');
  const [specialNeeds, setSpecialNeeds] = useState<boolean | null>(null);

  const [activePetForApply, setActivePetForApply] = useState<AdoptionPet | null>(null);
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [housing, setHousing] = useState('Apartamento');
  const [hasPets, setHasPets] = useState(false);
  const [timeAvailable, setTimeAvailable] = useState('Medio Tiempo');

  const filteredPets = adoptionPets.filter(pet => {
    const matchesSpecies = species === 'Todos' || pet.species === species;
    const matchesGender = gender === 'Todos' || pet.gender === gender;
    const matchesCity = city === 'Todos' || pet.location.includes(city);
    const matchesNeeds = specialNeeds === null || pet.specialNeeds === specialNeeds;
    
    let matchesAge = true;
    if (age !== 'Todos') {
      if (age === 'Cachorro') matchesAge = pet.age.includes('meses');
      else if (age === 'Adulto') matchesAge = !pet.age.includes('meses');
    }
    
    return matchesSpecies && matchesGender && matchesCity && matchesNeeds && matchesAge;
  });

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      if (!activePetForApply) return;
      onApplyAdoption(
        activePetForApply.id,
        name,
        email,
        phone,
        address,
        housing,
        hasPets,
        timeAvailable
      );
      alert(`¡Solicitud enviada con éxito para adoptar a ${activePetForApply.name}! La fundación revisará tu postulación y te contactará para agendar la entrevista.`);
      setActivePetForApply(null);
      setStep(1);
      setName('');
      setEmail('');
      setPhone('');
      setAddress('');
      setHousing('Apartamento');
      setHasPets(false);
      setTimeAvailable('Medio Tiempo');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 text-left animate-fade-in">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">Portal de Adopciones</h2>
        <p className="text-sm text-petuno-secondary-text mt-1">Dale una segunda oportunidad a un peludo en busca de un hogar amoroso.</p>
      </div>

      {/* Filter panel */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 bg-petuno-surface dark:bg-dark-surface p-4 rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 shadow-sm text-xs">
        <div>
          <label className="block text-[10px] font-bold text-petuno-secondary-text mb-1 uppercase">Especie</label>
          <select value={species} onChange={e => setSpecies(e.target.value)} className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/20 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-petuno-purple dark:bg-dark-surface">
            <option value="Todos">Todos</option>
            <option value="Perro">Perros</option>
            <option value="Gato">Gatos</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-petuno-secondary-text mb-1 uppercase">Edad</label>
          <select value={age} onChange={e => setAge(e.target.value)} className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/20 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-petuno-purple dark:bg-dark-surface">
            <option value="Todos">Todos</option>
            <option value="Cachorro">Cachorro (&lt; 1 año)</option>
            <option value="Adulto">Adulto (&gt; 1 año)</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-petuno-secondary-text mb-1 uppercase">Sexo</label>
          <select value={gender} onChange={e => setGender(e.target.value)} className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/20 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-petuno-purple dark:bg-dark-surface">
            <option value="Todos">Todos</option>
            <option value="Macho">Macho</option>
            <option value="Hembra">Hembra</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-petuno-secondary-text mb-1 uppercase">Ciudad</label>
          <select value={city} onChange={e => setCity(e.target.value)} className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/20 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-petuno-purple dark:bg-dark-surface">
            <option value="Todos">Todas las Ciudades</option>
            <option value="Bogotá">Bogotá</option>
            <option value="Medellín">Medellín</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-petuno-secondary-text mb-1 uppercase">Necesidades Especiales</label>
          <select 
            value={specialNeeds === null ? 'Todos' : specialNeeds ? 'Si' : 'No'} 
            onChange={e => {
              const val = e.target.value;
              if (val === 'Todos') setSpecialNeeds(null);
              else setSpecialNeeds(val === 'Si');
            }} 
            className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/20 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-petuno-purple dark:bg-dark-surface"
          >
            <option value="Todos">Ver Todos</option>
            <option value="Si">Sólo Necesidades Especiales</option>
            <option value="No">Sin Limitaciones</option>
          </select>
        </div>
      </div>

      {/* Grid of Adoptables */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPets.map((pet) => (
          <div key={pet.id} className="bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="h-44 overflow-hidden relative bg-petuno-background">
              <img src={pet.photo} alt={pet.name} className="w-full h-full object-cover" />
              {pet.specialNeeds && (
                <span className="absolute top-4 right-4 bg-petuno-amber-light border border-petuno-amber/20 text-petuno-amber font-extrabold px-2 py-0.5 rounded text-[9px] shadow-sm">
                  ❤️ Cuidado Especial
                </span>
              )}
            </div>
            
            <div className="p-5 flex-grow flex flex-col justify-between text-left space-y-4">
              <div>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-extrabold text-lg">{pet.name}</h3>
                  <span className="text-[11px] text-petuno-secondary-text dark:text-dark-secondary-text">{pet.age} • {pet.gender}</span>
                </div>
                <span className="text-[10px] text-petuno-muted font-bold block">{pet.shelter}</span>
                <p className="text-xs text-petuno-secondary-text dark:text-dark-secondary-text mt-2 leading-relaxed">{pet.description}</p>
              </div>

              <div className="border-t border-petuno-border dark:border-petuno-secondary-text/10 pt-3 text-xs text-petuno-secondary-text flex justify-between items-center">
                <span>📍 {pet.location}</span>
                <button 
                  onClick={() => setActivePetForApply(pet)}
                  className="bg-petuno-purple hover:bg-petuno-purple-dark text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-all"
                >
                  Quiero Adoptar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Multi-step Application Modal */}
      {activePetForApply && (
        <div className="fixed inset-0 z-55 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-petuno-surface dark:bg-dark-surface max-w-md w-full rounded-2xl p-6 border border-petuno-border dark:border-petuno-secondary-text/25 shadow-2xl relative text-left">
            <button 
              onClick={() => { setActivePetForApply(null); setStep(1); }}
              className="absolute top-4 right-4 text-petuno-secondary-text hover:bg-petuno-background dark:hover:bg-dark-surface-elevated p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={handleApplySubmit} className="space-y-4 pt-2">
              <h3 className="text-lg font-bold">Solicitud de Adopción: {activePetForApply.name}</h3>
              
              {/* Progress Indicator */}
              <div className="flex gap-2 items-center text-[10px] font-bold text-petuno-muted mb-4 uppercase tracking-wider">
                <span className={step >= 1 ? 'text-petuno-purple' : ''}>1. Datos</span>
                <span>➔</span>
                <span className={step >= 2 ? 'text-petuno-purple' : ''}>2. Hogar</span>
                <span>➔</span>
                <span className={step >= 3 ? 'text-petuno-purple' : ''}>3. Confirmación</span>
              </div>

              {step === 1 && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-petuno-secondary-text mb-1">Nombre Completo</label>
                    <input 
                      type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="Ej. John Doe"
                      className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-petuno-purple transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-petuno-secondary-text mb-1">Correo Electrónico</label>
                    <input 
                      type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="john@example.com"
                      className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-petuno-purple transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-petuno-secondary-text mb-1">Número de Teléfono</label>
                    <input 
                      type="tel" required value={phone} onChange={e => setPhone(e.target.value)} placeholder="+57 300 123 4567"
                      className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-petuno-purple transition-all"
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-petuno-secondary-text mb-1">Dirección de Vivienda</label>
                    <input 
                      type="text" required value={address} onChange={e => setAddress(e.target.value)} placeholder="Calle 100 #15-30, Bogotá"
                      className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-petuno-purple transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-petuno-secondary-text mb-1">Tipo de Vivienda</label>
                      <select value={housing} onChange={e => setHousing(e.target.value)} className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-petuno-purple dark:bg-dark-surface">
                        <option value="Apartamento">Apartamento</option>
                        <option value="Casa">Casa con patio</option>
                        <option value="Finca">Finca/Campo</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-petuno-secondary-text mb-1">Tiempo diario disponible</label>
                      <select value={timeAvailable} onChange={e => setTimeAvailable(e.target.value)} className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-petuno-purple dark:bg-dark-surface">
                        <option value="Medio Tiempo">Medio Tiempo (1-3 horas)</option>
                        <option value="Tiempo Completo">Tiempo Completo (&gt; 4 horas)</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <input 
                      type="checkbox" id="hasPets" checked={hasPets} onChange={e => setHasPets(e.target.checked)}
                      className="rounded accent-petuno-purple"
                    />
                    <label htmlFor="hasPets" className="text-xs text-petuno-secondary-text select-none">¿Tengo otras mascotas en casa?</label>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4 text-xs">
                  <div className="bg-petuno-purple/5 border border-petuno-purple/15 rounded-xl p-4 space-y-2">
                    <p>📝 **Resumen de postulación:**</p>
                    <p>• **Postulante:** {name}</p>
                    <p>• **Contacto:** {phone} • {email}</p>
                    <p>• **Vivienda:** {housing} en {address}</p>
                    <p>• **Experiencia previa:** {hasPets ? 'Sí, tiene otras mascotas' : 'No tiene mascotas actualmente'}</p>
                  </div>
                  <p className="text-[11px] text-petuno-muted leading-relaxed">
                    Al confirmar, autorizas a **{activePetForApply.shelter}** a revisar tu perfil público de Petuno y contactarte para dar seguimiento al proceso de adopción.
                  </p>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-petuno-border/30 dark:border-petuno-secondary-text/10">
                <button type="submit" className="flex-grow bg-petuno-purple hover:bg-petuno-purple-dark text-white font-semibold py-2.5 rounded-xl text-xs transition-colors shadow-md text-center">
                  {step === 3 ? 'Confirmar Adopción' : 'Siguiente'}
                </button>
                {step > 1 && (
                  <button type="button" onClick={() => setStep(step - 1)} className="border border-petuno-border dark:border-petuno-secondary-text/30 hover:bg-petuno-background text-xs font-bold px-4 py-2.5 rounded-xl text-center">
                    Atrás
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function SettingsView({
  user,
  privacySettings,
  onSaveProfile,
  onSavePrivacy,
  onUpgradeSubscription,
  onDeleteAccount
}: {
  user: { name: string; email: string; phone?: string } | null;
  privacySettings: PrivacySettings;
  onSaveProfile: (name: string, email: string, phone: string) => void;
  onSavePrivacy: (settings: PrivacySettings) => void;
  onUpgradeSubscription: () => void;
  onDeleteAccount: () => void;
}) {
  const [internalTab, setInternalTab] = useState<'Perfil' | 'Privacidad' | 'Seguridad'>('Perfil');
  
  // Profile inputs
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  
  // Password inputs
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(name, email, phone);
    alert('¡Cambios de perfil guardados localmente con éxito!');
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass !== confirmPass) {
      alert('Las contraseñas no coinciden');
      return;
    }
    alert('¡Contraseña actualizada localmente exitosamente!');
    setOldPass('');
    setNewPass('');
    setConfirmPass('');
  };

  const handlePrivacyToggle = (key: keyof PrivacySettings) => {
    const updated = {
      ...privacySettings,
      [key]: !privacySettings[key]
    };
    onSavePrivacy(updated);
  };

  return (
    <div className="max-w-5xl mx-auto bg-petuno-surface dark:bg-dark-surface border border-petuno-border dark:border-petuno-secondary-text/15 rounded-3xl overflow-hidden shadow-sm flex flex-col md:flex-row text-left min-h-[60vh] animate-fade-in">
      
      {/* Settings Navigation Sidebar */}
      <aside className="w-full md:w-64 bg-petuno-background/40 dark:bg-dark-background/20 border-r border-petuno-border dark:border-petuno-secondary-text/10 p-5 space-y-2">
        <h3 className="text-[10px] font-bold text-petuno-muted uppercase tracking-wider mb-4 px-2">Configuración</h3>
        <button 
          onClick={() => setInternalTab('Perfil')}
          className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            internalTab === 'Perfil' 
              ? 'bg-petuno-purple/10 text-petuno-purple dark:bg-petuno-purple/20' 
              : 'text-petuno-secondary-text dark:text-dark-secondary-text hover:bg-petuno-background/50'
          }`}
        >
          👤 Cuenta y Suscripción
        </button>
        <button 
          onClick={() => setInternalTab('Privacidad')}
          className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            internalTab === 'Privacidad' 
              ? 'bg-petuno-purple/10 text-petuno-purple dark:bg-petuno-purple/20' 
              : 'text-petuno-secondary-text dark:text-dark-secondary-text hover:bg-petuno-background/50'
          }`}
        >
          🔒 Privacidad del QR
        </button>
        <button 
          onClick={() => setInternalTab('Seguridad')}
          className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            internalTab === 'Seguridad' 
              ? 'bg-petuno-purple/10 text-petuno-purple dark:bg-petuno-purple/20' 
              : 'text-petuno-secondary-text dark:text-dark-secondary-text hover:bg-petuno-background/50'
          }`}
        >
          🛡️ Seguridad y Password
        </button>
      </aside>

      {/* Settings Tab Content */}
      <main className="flex-1 p-6 sm:p-8 space-y-6">
        
        {internalTab === 'Perfil' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold">Detalles de Cuenta</h3>
              <p className="text-xs text-petuno-secondary-text">Modifica tus datos de perfil para contacto de emergencia.</p>
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-4 max-w-md">
              <div>
                <label className="block text-xs font-bold text-petuno-secondary-text mb-1">Nombre Propietario</label>
                <input 
                  type="text" required value={name} onChange={e => setName(e.target.value)}
                  className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-petuno-purple transition-all"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-petuno-secondary-text mb-1">Email</label>
                  <input 
                    type="email" required value={email} onChange={e => setEmail(e.target.value)}
                    className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-petuno-purple transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-petuno-secondary-text mb-1">Teléfono</label>
                  <input 
                    type="text" required value={phone} onChange={e => setPhone(e.target.value)}
                    className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-petuno-purple transition-all"
                  />
                </div>
              </div>
              <button type="submit" className="bg-petuno-purple hover:bg-petuno-purple-dark text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition-all">
                Guardar Cambios
              </button>
            </form>

            <div className="border-t border-petuno-border dark:border-petuno-secondary-text/10 pt-6">
              <h4 className="text-xs font-bold text-petuno-purple uppercase tracking-wider mb-3">Suscripción actual</h4>
              <div className="p-4 bg-petuno-purple/5 border border-petuno-purple/15 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-left space-y-1">
                  <h5 className="font-extrabold text-sm text-petuno-text dark:text-dark-text">Petuno Premium (Plan Mensual)</h5>
                  <p className="text-[10px] text-petuno-secondary-text">Habilita lectura ilimitada, mapas GPS en vivo, alertas SMS inmediatas y descargas de historiales.</p>
                </div>
                <button 
                  onClick={onUpgradeSubscription}
                  className="bg-petuno-purple hover:bg-petuno-purple-dark text-white text-xs font-bold px-4 py-2 rounded-lg shadow-sm whitespace-nowrap"
                >
                  🚀 Activar Premium ($4.99/mes)
                </button>
              </div>
            </div>
          </div>
        )}

        {internalTab === 'Privacidad' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold">Privacidad del Perfil QR</h3>
              <p className="text-xs text-petuno-secondary-text">Elige qué información se muestra de forma pública cuando un tercero escanea el collar QR físico de tu mascota.</p>
            </div>

            <div className="space-y-4 max-w-lg">
              <div className="flex items-center justify-between p-3.5 border border-petuno-border dark:border-petuno-secondary-text/10 rounded-2xl">
                <div>
                  <h4 className="font-bold text-xs">Mostrar Nombre de Mascota</h4>
                  <p className="text-[10px] text-petuno-secondary-text mt-0.5">Permite ver el nombre en la pantalla de bienvenida.</p>
                </div>
                <input 
                  type="checkbox" checked={privacySettings.showName} onChange={() => handlePrivacyToggle('showName')}
                  className="w-4 h-4 rounded text-petuno-purple accent-petuno-purple cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 border border-petuno-border dark:border-petuno-secondary-text/10 rounded-2xl">
                <div>
                  <h4 className="font-bold text-xs">Mostrar Raza y Características</h4>
                  <p className="text-[10px] text-petuno-secondary-text mt-0.5">Expone la descripción física de la mascota.</p>
                </div>
                <input 
                  type="checkbox" checked={privacySettings.showBreed} onChange={() => handlePrivacyToggle('showBreed')}
                  className="w-4 h-4 rounded text-petuno-purple accent-petuno-purple cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 border border-petuno-border dark:border-petuno-secondary-text/10 rounded-2xl">
                <div>
                  <h4 className="font-bold text-xs">Mostrar Edad y Nacimiento</h4>
                  <p className="text-[10px] text-petuno-secondary-text mt-0.5">Comparte la edad exacta y fecha declarada.</p>
                </div>
                <input 
                  type="checkbox" checked={privacySettings.showAge} onChange={() => handlePrivacyToggle('showAge')}
                  className="w-4 h-4 rounded text-petuno-purple accent-petuno-purple cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 border border-petuno-border dark:border-petuno-secondary-text/10 rounded-2xl">
                <div>
                  <h4 className="font-bold text-xs">Mostrar Ubicación Aproximada</h4>
                  <p className="text-[10px] text-petuno-secondary-text mt-0.5">Revela la ciudad e indicativos de la última zona vista.</p>
                </div>
                <input 
                  type="checkbox" checked={privacySettings.showLocation} onChange={() => handlePrivacyToggle('showLocation')}
                  className="w-4 h-4 rounded text-petuno-purple accent-petuno-purple cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 border border-petuno-border dark:border-petuno-secondary-text/10 rounded-2xl">
                <div>
                  <h4 className="font-bold text-xs">Mostrar Alertas Médicas</h4>
                  <p className="text-[10px] text-petuno-secondary-text mt-0.5">Expone condiciones críticas o alergias de salud.</p>
                </div>
                <input 
                  type="checkbox" checked={privacySettings.showMedical} onChange={() => handlePrivacyToggle('showMedical')}
                  className="w-4 h-4 rounded text-petuno-purple accent-petuno-purple cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 border border-petuno-border dark:border-petuno-secondary-text/10 rounded-2xl">
                <div>
                  <h4 className="font-bold text-xs">Permitir Mensajería Anónima</h4>
                  <p className="text-[10px] text-petuno-secondary-text mt-0.5">Transeúntes te pueden escribir sin ver tu email o teléfono.</p>
                </div>
                <input 
                  type="checkbox" checked={privacySettings.allowAnonymousContact} onChange={() => handlePrivacyToggle('allowAnonymousContact')}
                  className="w-4 h-4 rounded text-petuno-purple accent-petuno-purple cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {internalTab === 'Seguridad' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold">Seguridad y Password</h3>
              <p className="text-xs text-petuno-secondary-text">Simula el cambio de contraseñas y la eliminación de tu cuenta de forma definitiva.</p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
              <div>
                <label className="block text-xs font-bold text-petuno-secondary-text mb-1">Contraseña Actual</label>
                <input 
                  type="password" required value={oldPass} onChange={e => setOldPass(e.target.value)} placeholder="••••••••"
                  className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-petuno-purple transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-petuno-secondary-text mb-1">Nueva Contraseña</label>
                <input 
                  type="password" required value={newPass} onChange={e => setNewPass(e.target.value)} placeholder="••••••••"
                  className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-petuno-purple transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-petuno-secondary-text mb-1">Confirmar Nueva Contraseña</label>
                <input 
                  type="password" required value={confirmPass} onChange={e => setConfirmPass(e.target.value)} placeholder="••••••••"
                  className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-petuno-purple transition-all"
                />
              </div>
              <button type="submit" className="bg-petuno-purple hover:bg-petuno-purple-dark text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition-all">
                Cambiar Contraseña
              </button>
            </form>

            <div className="border-t border-petuno-coral/20 pt-6 mt-6">
              <h4 className="text-xs font-bold text-petuno-coral uppercase tracking-wider mb-2">Zona de Riesgo</h4>
              <p className="text-[10px] text-petuno-secondary-text mb-4">Esta acción eliminará de forma irreversible tu cuenta y todos los expedientes médicos o ubicaciones de tus mascotas.</p>
              <button 
                onClick={() => {
                  if (window.confirm('¿Estás absolutamente seguro de que deseas eliminar tu cuenta de Petuno? Esta acción no se puede deshacer.')) {
                    onDeleteAccount();
                  }
                }}
                className="bg-petuno-coral hover:bg-petuno-coral/95 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm"
              >
                Eliminar mi Cuenta
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

function NotificationsView({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDeleteNotification,
  onClearAll
}: {
  notifications: NotificationItem[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDeleteNotification: (id: string) => void;
  onClearAll: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');

  const categories = ['Todos', 'GPS', 'Alertas', 'Vacunas', 'Medicamentos', 'Dispositivos', 'Sistema'];

  const filteredNotifications = notifications.filter(notif => {
    const matchesSearch = 
      notif.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      notif.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'Todos' || notif.type === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryStyles = (type: string) => {
    switch (type) {
      case 'GPS':
        return { bg: 'bg-petuno-coral/10 text-petuno-coral', icon: '📍' };
      case 'Alertas':
        return { bg: 'bg-petuno-coral/10 text-petuno-coral border border-petuno-coral/20', icon: '🚨' };
      case 'Vacunas':
        return { bg: 'bg-petuno-mint-light text-petuno-mint', icon: '💉' };
      case 'Medicamentos':
        return { bg: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400', icon: '💊' };
      case 'Dispositivos':
        return { bg: 'bg-petuno-purple-50 text-petuno-purple dark:bg-petuno-purple/10 dark:text-petuno-purple-light', icon: '⚡' };
      case 'Sistema':
      default:
        return { bg: 'bg-petuno-background dark:bg-dark-surface-elevated text-petuno-secondary-text', icon: '⚙️' };
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-left animate-fade-in">
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold">Bandeja de Notificaciones</h2>
          <p className="text-xs text-petuno-secondary-text mt-0.5">
            Monitorea el estado en vivo de geocercas, vacunas de tus mascotas y alertas de avistamiento.
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button 
            onClick={onMarkAllAsRead}
            className="flex-1 sm:flex-none border border-petuno-border dark:border-petuno-secondary-text/20 hover:bg-petuno-background dark:hover:bg-dark-surface-elevated text-petuno-text dark:text-dark-text font-semibold px-4 py-2 rounded-xl text-xs transition-colors"
          >
            Marcar todas como leídas
          </button>
          <button 
            onClick={onClearAll}
            className="flex-1 sm:flex-none border border-petuno-coral/30 hover:bg-petuno-coral-light/20 text-petuno-coral font-semibold px-4 py-2 rounded-xl text-xs transition-colors"
          >
            Limpiar todo
          </button>
        </div>
      </div>

      {/* Search and Category Filters */}
      <div className="bg-petuno-surface dark:bg-dark-surface p-4 rounded-3xl border border-petuno-border dark:border-petuno-secondary-text/15 space-y-4">
        
        {/* Search Input */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-petuno-secondary-text">
            🔍
          </span>
          <input 
            type="text" 
            placeholder="Buscar por título, descripción o categoría..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-petuno-background dark:bg-dark-surface-elevated border border-petuno-border dark:border-transparent rounded-2xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-petuno-purple dark:focus:border-petuno-purple transition-all placeholder-petuno-muted"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-petuno-secondary-text hover:text-petuno-text"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Category Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {categories.map(cat => {
            const isActive = activeCategory === cat;
            const count = cat === 'Todos' 
              ? notifications.length 
              : notifications.filter(n => n.type === cat).length;
            
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[11px] font-bold px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                  isActive 
                    ? 'bg-petuno-purple text-white shadow-sm' 
                    : 'bg-petuno-background hover:bg-petuno-border/30 dark:bg-dark-surface-elevated/80 dark:hover:bg-dark-surface-elevated text-petuno-secondary-text dark:text-dark-secondary-text'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-extrabold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-petuno-border/40 dark:bg-dark-surface-elevated-hover text-petuno-muted'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Notifications Feed */}
      <div className="space-y-3">
        {filteredNotifications.map(notif => {
          const style = getCategoryStyles(notif.type);
          return (
            <div 
              key={notif.id}
              className={`p-4 rounded-3xl border transition-all flex items-start gap-4 text-left ${
                notif.read 
                  ? 'bg-petuno-surface/60 dark:bg-dark-surface/50 border-petuno-border dark:border-petuno-secondary-text/10 opacity-75' 
                  : 'bg-petuno-surface dark:bg-dark-surface border-petuno-border dark:border-petuno-secondary-text/15 shadow-sm border-l-4 border-l-petuno-purple'
              }`}
            >
              {/* Category Icon */}
              <div className={`w-10 h-10 rounded-2xl ${style.bg} flex items-center justify-center text-lg shrink-0`}>
                {style.icon}
              </div>

              {/* Text Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                  <h4 className="text-xs font-extrabold text-petuno-text dark:text-dark-text flex items-center gap-2">
                    {notif.title}
                    {!notif.read && (
                      <span className="w-1.5 h-1.5 bg-petuno-purple rounded-full shrink-0"></span>
                    )}
                  </h4>
                  <span className="text-[10px] text-petuno-muted font-semibold">{notif.time}</span>
                </div>
                <p className="text-xs text-petuno-secondary-text dark:text-dark-secondary-text mt-1 leading-relaxed">
                  {notif.desc}
                </p>
                <div className="flex gap-4 mt-3 pt-3 border-t border-petuno-border/30 dark:border-petuno-secondary-text/5 text-[10px]">
                  <button 
                    onClick={() => onMarkAsRead(notif.id)}
                    className="font-bold text-petuno-purple hover:underline"
                  >
                    {notif.read ? 'Marcar como no leída' : 'Marcar como leída'}
                  </button>
                  <button 
                    onClick={() => onDeleteNotification(notif.id)}
                    className="font-bold text-petuno-coral hover:underline"
                  >
                    Eliminar
                  </button>
                </div>
              </div>

            </div>
          );
        })}

        {filteredNotifications.length === 0 && (
          <div className="bg-petuno-surface dark:bg-dark-surface p-12 rounded-3xl border border-petuno-border dark:border-petuno-secondary-text/15 text-center">
            <p className="text-xs text-petuno-secondary-text">No se encontraron notificaciones que coincidan con los filtros.</p>
          </div>
        )}
      </div>

    </div>
  );
}

function QRPreviewModal({ pet, onClose }: { pet: Pet; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-petuno-surface dark:bg-dark-surface max-w-sm w-full rounded-2xl p-6 border border-petuno-border dark:border-petuno-secondary-text/25 shadow-2xl relative text-center">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-petuno-secondary-text dark:text-dark-secondary-text hover:bg-petuno-background dark:hover:bg-dark-surface-elevated p-1.5 rounded-lg transition-all">
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center space-y-6 pt-4">
          <div className="w-12 h-12 rounded-xl bg-petuno-purple-50 dark:bg-dark-surface-elevated flex items-center justify-center">
            <QrCode className="w-6 h-6 text-petuno-purple" />
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-bold text-petuno-text dark:text-dark-text">Identidad QR de {pet.name}</h3>
            <p className="text-xs text-petuno-secondary-text dark:text-dark-secondary-text mt-1">PTO ID: <span className="font-mono font-bold text-petuno-purple dark:text-petuno-purple-light">{pet.petunoId}</span></p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-inner border border-petuno-border">
            <QrCodeMockup />
          </div>

          <p className="text-xs text-petuno-muted leading-relaxed max-w-xs">
            Al escanear esta placa, cualquier persona podrá ver la ficha de protección de {pet.name} y contactarte de forma anónima para devolvértelo.
          </p>

          <div className="w-full flex gap-3">
            <button 
              onClick={() => { alert('Imprimiendo placa de identificación QR...'); }} 
              className="flex-1 bg-petuno-purple hover:bg-petuno-purple-dark text-white font-semibold py-2.5 rounded-xl text-xs transition-colors shadow-md"
            >
              Imprimir QR
            </button>
            <button 
              onClick={onClose}
              className="flex-1 bg-transparent hover:bg-petuno-border/30 border border-petuno-border dark:border-petuno-secondary-text/30 font-semibold py-2.5 rounded-xl text-xs transition-colors"
            >
              Cerrar
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

// ============================================================================
// PUBLIC MODALS & SIMULATORS
// ============================================================================

function QRScannerModal({ 
  onClose,
  onScanSuccess
}: { 
  onClose: () => void;
  onScanSuccess: (petId: string) => void;
}) {
  const [scanCode, setScanCode] = useState('');
  const [error, setError] = useState('');

  const handleScanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = scanCode.trim().toUpperCase();
    const codeMap: { [key: string]: string } = {
      'PTO-82A91X': 'max',
      'PTO-93B22Y': 'luna',
      'PTO-11A99Z': 'toby',
      'PTO-22B88Y': 'michi'
    };

    if (codeMap[cleanCode]) {
      onScanSuccess(codeMap[cleanCode]);
      onClose();
    } else {
      setError('Código no encontrado. Intenta con: PTO-82A91X, PTO-93B22Y o PTO-11A99Z');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4 font-sans text-left">
      <div className="bg-petuno-surface dark:bg-dark-surface max-w-sm w-full rounded-3xl p-6 border border-petuno-border dark:border-petuno-secondary-text/25 shadow-2xl relative text-center">
        <style>{`
          @keyframes scanLaser {
            0% { top: 0%; }
            50% { top: 100%; }
            100% { top: 0%; }
          }
        `}</style>

        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-petuno-secondary-text dark:text-dark-secondary-text hover:bg-petuno-background dark:hover:bg-dark-surface-elevated p-1.5 rounded-lg transition-all">
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center space-y-5 pt-4">
          <div className="w-12 h-12 rounded-xl bg-petuno-purple-50 dark:bg-dark-surface-elevated flex items-center justify-center">
            <QrCode className="w-6 h-6 text-petuno-purple" />
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-bold text-petuno-text dark:text-dark-text">Escanear Placa QR</h3>
            <p className="text-xs text-petuno-secondary-text mt-1">Simula la lectura de la placa física de una mascota.</p>
          </div>

          {/* Scanner Box Graphic */}
          <div className="relative w-44 h-44 bg-black/10 dark:bg-white/5 border border-petuno-border dark:border-petuno-secondary-text/20 rounded-2xl overflow-hidden flex items-center justify-center">
            <div className="absolute inset-4 border-2 border-dashed border-petuno-purple/40 rounded-xl opacity-60"></div>
            {/* Laser Line Animation */}
            <div 
              className="absolute left-0 right-0 h-0.5 bg-petuno-purple shadow-[0_0_8px_#5428C7] select-none pointer-events-none"
              style={{
                top: '0%',
                animation: 'scanLaser 2.5s infinite ease-in-out'
              }}
            ></div>
            <span className="text-[10px] text-petuno-secondary-text dark:text-dark-secondary-text font-semibold uppercase tracking-wider select-none">Buscando placa...</span>
          </div>

          {error && (
            <p className="text-[10px] text-petuno-coral font-bold bg-petuno-coral/10 p-2 rounded-lg w-full text-center">{error}</p>
          )}

          <form onSubmit={handleScanSubmit} className="w-full space-y-3">
            <div className="text-left">
              <label className="block text-[10px] font-bold text-petuno-secondary-text mb-1 uppercase tracking-wider">Código del collar (Ej: PTO-82A91X)</label>
              <input 
                type="text" 
                required
                value={scanCode}
                onChange={e => { setScanCode(e.target.value); setError(''); }}
                placeholder="PTO-82A91X" 
                className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-xs font-mono text-center focus:outline-none focus:border-petuno-purple transition-all uppercase placeholder-petuno-muted"
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-petuno-purple hover:bg-petuno-purple-dark text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-md"
            >
              Escanear Placa
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

function DonationGatewayModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [fund, setFund] = useState('Sismo Colombia');
  const [amount, setAmount] = useState('20000');
  const [customAmount, setCustomAmount] = useState('');
  const [tip, setTip] = useState('2000');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const activeAmount = amount === 'custom' ? customAmount : amount;
  const numericAmount = parseInt(activeAmount) || 0;
  const numericTip = parseInt(tip) || 0;
  const totalAmount = numericAmount + numericTip;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 font-sans text-left">
      <div className="bg-petuno-surface dark:bg-dark-surface max-w-sm w-full rounded-3xl p-6 border border-petuno-border dark:border-petuno-secondary-text/25 shadow-2xl relative">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-petuno-secondary-text dark:text-dark-secondary-text hover:bg-petuno-background dark:hover:bg-dark-surface-elevated p-1.5 rounded-lg transition-all">
          <X className="w-5 h-5" />
        </button>

        {step < 3 ? (
          <div className="space-y-4 pt-2">
            <div className="text-center">
              <h3 className="text-base font-extrabold flex items-center justify-center gap-1.5">
                ❤️ Donación SOS Segura
              </h3>
              <p className="text-[10px] text-petuno-secondary-text mt-1">Apoya directamente a las mascotas damnificadas.</p>
            </div>

            <div className="flex gap-2 justify-center py-1">
              <span className={`w-6 h-1 rounded-full ${step === 1 ? 'bg-petuno-purple' : 'bg-petuno-border dark:bg-petuno-secondary-text/20'}`}></span>
              <span className={`w-6 h-1 rounded-full ${step === 2 ? 'bg-petuno-purple' : 'bg-petuno-border dark:bg-petuno-secondary-text/20'}`}></span>
            </div>

            {step === 1 ? (
              <div className="space-y-4 text-xs">
                <div className="text-left space-y-1.5">
                  <label className="block text-[10px] font-bold text-petuno-secondary-text uppercase tracking-wider">Causa / Destinatario</label>
                  <select 
                    value={fund} 
                    onChange={e => setFund(e.target.value)}
                    className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-petuno-purple dark:bg-dark-surface"
                  >
                    <option value="Sismo Colombia">Fondo Sismo Colombia 🚨</option>
                    <option value="Patitas Felices">Fundación Patitas Felices</option>
                    <option value="Huellas de Amor">Refugio Huellas de Amor</option>
                  </select>
                </div>

                <div className="text-left space-y-1.5">
                  <label className="block text-[10px] font-bold text-petuno-secondary-text uppercase tracking-wider">Monto a Donar (COP)</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['10000', '20000', '50000'].map(val => (
                      <button 
                        key={val}
                        type="button"
                        onClick={() => setAmount(val)}
                        className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                          amount === val 
                            ? 'bg-petuno-purple border-petuno-purple text-white' 
                            : 'border-petuno-border hover:bg-petuno-background dark:border-petuno-secondary-text/20 dark:hover:bg-dark-surface-elevated text-petuno-secondary-text'
                        }`}
                      >
                        ${parseInt(val).toLocaleString()}
                      </button>
                    ))}
                    <button 
                      type="button"
                      onClick={() => setAmount('custom')}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all col-span-3 ${
                        amount === 'custom' 
                          ? 'bg-petuno-purple border-petuno-purple text-white' 
                          : 'border-petuno-border hover:bg-petuno-background dark:border-petuno-secondary-text/20 dark:hover:bg-dark-surface-elevated text-petuno-secondary-text'
                      }`}
                    >
                      Otro Monto
                    </button>
                  </div>
                  
                  {amount === 'custom' && (
                    <input 
                      type="number" 
                      required
                      placeholder="Monto personalizado en COP"
                      value={customAmount}
                      onChange={e => setCustomAmount(e.target.value)}
                      className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-petuno-purple transition-all"
                    />
                  )}
                </div>

                {/* Voluntary Tip Option */}
                <div className="text-left space-y-2 border-t border-petuno-border/50 dark:border-petuno-secondary-text/10 pt-4">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-petuno-purple dark:text-petuno-purple-light uppercase tracking-wider">Aporte para mantener Petuno</span>
                    <span className="bg-petuno-purple/10 text-petuno-purple dark:text-petuno-purple-light text-[8px] font-bold px-1.5 py-0.5 rounded">Recomendado</span>
                  </div>
                  <p className="text-[10px] text-petuno-secondary-text leading-tight">
                    Petuno no cobra comisión a los albergues. Si lo deseas, puedes añadir una pequeña propina voluntaria para sufragar gastos de dominio, servidor y alertas SMS:
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {['0', '2000', '5000'].map(val => (
                      <button 
                        key={val}
                        type="button"
                        onClick={() => setTip(val)}
                        className={`py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                          tip === val 
                            ? 'bg-petuno-purple border-petuno-purple text-white' 
                            : 'border-petuno-border hover:bg-petuno-background dark:border-petuno-secondary-text/20 dark:hover:bg-dark-surface-elevated text-petuno-secondary-text'
                        }`}
                      >
                        {val === '0' ? 'Sin aporte' : `$${parseInt(val).toLocaleString()}`}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full bg-petuno-purple hover:bg-petuno-purple-dark text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-md mt-2"
                >
                  Continuar al Pago
                </button>
              </div>
            ) : (
              <form onSubmit={handleDonateSubmit} className="space-y-4 text-xs">
                {/* Amount Summary */}
                <div className="bg-petuno-background dark:bg-dark-surface-elevated p-3.5 rounded-2xl space-y-1.5 text-xs border border-petuno-border/50 dark:border-petuno-secondary-text/10">
                  <div className="flex justify-between text-petuno-secondary-text">
                    <span>Donación a la Causa:</span>
                    <span className="font-bold text-petuno-text dark:text-dark-text">${numericAmount.toLocaleString()} COP</span>
                  </div>
                  {numericTip > 0 && (
                    <div className="flex justify-between text-petuno-purple dark:text-petuno-purple-light">
                      <span>Soporte a Petuno:</span>
                      <span className="font-bold">+${numericTip.toLocaleString()} COP</span>
                    </div>
                  )}
                  <hr className="border-dashed border-petuno-border/60 my-1" />
                  <div className="flex justify-between font-extrabold text-xs">
                    <span>Total a pagar:</span>
                    <span>${totalAmount.toLocaleString()} COP</span>
                  </div>
                </div>

                <div className="text-left space-y-1.5">
                  <label className="block text-[10px] font-bold text-petuno-secondary-text uppercase tracking-wider">Nombre en la tarjeta</label>
                  <input 
                    type="text" required placeholder="John Doe" value={cardName} onChange={e => setCardName(e.target.value)}
                    className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-petuno-purple transition-all"
                  />
                </div>
                <div className="text-left space-y-1.5">
                  <label className="block text-[10px] font-bold text-petuno-secondary-text uppercase tracking-wider">Número de Tarjeta</label>
                  <input 
                    type="text" required placeholder="4000 1234 5678 9010" value={cardNumber} onChange={e => setCardNumber(e.target.value)}
                    className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-petuno-purple transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-left space-y-1.5">
                    <label className="block text-[10px] font-bold text-petuno-secondary-text uppercase tracking-wider">Vencimiento</label>
                    <input 
                      type="text" required placeholder="MM/AA"
                      className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-petuno-purple transition-all"
                    />
                  </div>
                  <div className="text-left space-y-1.5">
                    <label className="block text-[10px] font-bold text-petuno-secondary-text uppercase tracking-wider">CVC</label>
                    <input 
                      type="password" required placeholder="•••"
                      className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-petuno-purple transition-all"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button 
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 bg-transparent hover:bg-petuno-border/20 border border-petuno-border dark:border-petuno-secondary-text/30 font-bold py-2.5 rounded-xl text-xs transition-all"
                  >
                    Atrás
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 bg-petuno-purple hover:bg-petuno-purple-dark text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-md"
                  >
                    Donar ${totalAmount.toLocaleString()}
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          <div className="text-center space-y-4 pt-4 font-sans">
            <div className="w-12 h-12 rounded-full bg-petuno-mint-light flex items-center justify-center mx-auto border border-petuno-mint/20">
              <ShieldCheck className="w-6 h-6 text-petuno-mint" />
            </div>
            <h3 className="text-base font-extrabold text-petuno-text dark:text-dark-text">¡Donación Exitosa!</h3>
            <p className="text-xs text-petuno-secondary-text leading-relaxed">
              Muchas gracias. Has donado **${numericAmount.toLocaleString()} COP** para **{fund === 'Sismo Colombia' ? 'el Fondo de Emergencia de Colombia' : fund}**.
              {numericTip > 0 && (
                <> Y has aportado **${numericTip.toLocaleString()} COP** adicionales a Petuno para financiar servidores y alertas de emergencia. ¡Tu apoyo mantiene viva la red!</>
              )}
            </p>
            <button 
              onClick={onClose}
              className="w-full bg-petuno-purple hover:bg-petuno-purple-dark text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-md"
            >
              Cerrar
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

function AdoptionFormWizardModal({ pet, onClose }: { pet: any; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [housing, setHousing] = useState('Apartamento');
  const [timeAvailable, setTimeAvailable] = useState('Medio Tiempo');
  const [hasPets, setHasPets] = useState(false);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFinish = () => {
    alert(`¡Solicitud enviada para adoptar a ${pet.name}! El refugio ${pet.shelter} se comunicará contigo en breve.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 font-sans text-left">
      <div className="bg-petuno-surface dark:bg-dark-surface max-w-sm w-full rounded-3xl p-6 border border-petuno-border dark:border-petuno-secondary-text/25 shadow-2xl relative">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-petuno-secondary-text dark:text-dark-secondary-text hover:bg-petuno-background dark:hover:bg-dark-surface-elevated p-1.5 rounded-lg transition-all">
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-4">
          <h3 className="text-base font-extrabold flex items-center justify-center gap-1.5">
            🏡 Adoptar a {pet.name}
          </h3>
          <p className="text-[10px] text-petuno-secondary-text mt-1">{pet.shelter}</p>
        </div>

        <div className="flex gap-2 justify-center py-1 mb-4">
          {[1, 2, 3].map(s => (
            <span key={s} className={`w-6 h-1 rounded-full ${step === s ? 'bg-petuno-purple' : 'bg-petuno-border dark:bg-petuno-secondary-text/20'}`}></span>
          ))}
        </div>

        <form onSubmit={handleNext} className="space-y-4 text-xs">
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div className="text-left space-y-1.5">
                <label className="block text-[10px] font-bold text-petuno-secondary-text uppercase tracking-wider">Nombre Completo</label>
                <input 
                  type="text" required placeholder="John Doe" value={name} onChange={e => setName(e.target.value)}
                  className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-petuno-purple transition-all"
                />
              </div>
              <div className="text-left space-y-1.5">
                <label className="block text-[10px] font-bold text-petuno-secondary-text uppercase tracking-wider">Email</label>
                <input 
                  type="email" required placeholder="john@petuno.test" value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-petuno-purple transition-all"
                />
              </div>
              <div className="text-left space-y-1.5">
                <label className="block text-[10px] font-bold text-petuno-secondary-text uppercase tracking-wider">Teléfono</label>
                <input 
                  type="tel" required placeholder="+57 300 123 4567" value={phone} onChange={e => setPhone(e.target.value)}
                  className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-petuno-purple transition-all"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-petuno-purple hover:bg-petuno-purple-dark text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-md mt-2"
              >
                Siguiente
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div className="text-left space-y-1.5">
                <label className="block text-[10px] font-bold text-petuno-secondary-text uppercase tracking-wider">Dirección de Vivienda</label>
                <input 
                  type="text" required placeholder="Calle 100 #15-30, Bogotá" value={address} onChange={e => setAddress(e.target.value)}
                  className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-petuno-purple transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-left space-y-1.5">
                  <label className="block text-[10px] font-bold text-petuno-secondary-text uppercase tracking-wider">Tipo de Vivienda</label>
                  <select value={housing} onChange={e => setHousing(e.target.value)} className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-petuno-purple dark:bg-dark-surface">
                    <option value="Apartamento">Apartamento</option>
                    <option value="Casa">Casa con patio</option>
                    <option value="Finca">Finca/Campo</option>
                  </select>
                </div>
                <div className="text-left space-y-1.5">
                  <label className="block text-[10px] font-bold text-petuno-secondary-text uppercase tracking-wider">Tiempo libre diario</label>
                  <select value={timeAvailable} onChange={e => setTimeAvailable(e.target.value)} className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-petuno-purple dark:bg-dark-surface">
                    <option value="Medio Tiempo">Medio Tiempo (1-3h)</option>
                    <option value="Tiempo Completo">Tiempo Completo (&gt;4h)</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-2 text-left">
                <input 
                  type="checkbox" id="hasPetsPublic" checked={hasPets} onChange={e => setHasPets(e.target.checked)}
                  className="rounded accent-petuno-purple w-4 h-4 cursor-pointer"
                />
                <label htmlFor="hasPetsPublic" className="text-xs text-petuno-secondary-text select-none cursor-pointer">¿Tengo otras mascotas en casa?</label>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="button"
                  onClick={handleBack}
                  className="flex-1 bg-transparent hover:bg-petuno-border/20 border border-petuno-border dark:border-petuno-secondary-text/30 font-bold py-2.5 rounded-xl text-xs transition-all"
                >
                  Atrás
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-petuno-purple hover:bg-petuno-purple-dark text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-md"
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-petuno-purple/5 border border-petuno-purple/15 rounded-xl p-4 space-y-2 text-[11px] leading-relaxed">
                <p>📝 **Resumen de postulación:**</p>
                <p>• **Postulante:** {name}</p>
                <p>• **Contacto:** {phone} • {email}</p>
                <p>• **Vivienda:** {housing} en {address}</p>
                <p>• **Otras mascotas:** {hasPets ? 'Sí' : 'No'}</p>
              </div>
              
              <p className="text-[10px] text-petuno-muted leading-relaxed">
                Al enviar, autorizas a **{pet.shelter}** a revisar tu información de Petuno y contactarte para dar seguimiento al proceso de adopción.
              </p>

              <div className="flex gap-3 pt-2">
                <button 
                  type="button"
                  onClick={handleBack}
                  className="flex-1 bg-transparent hover:bg-petuno-border/20 border border-petuno-border dark:border-petuno-secondary-text/30 font-bold py-2.5 rounded-xl text-xs transition-all"
                >
                  Atrás
                </button>
                <button 
                  type="button"
                  onClick={handleFinish}
                  className="flex-1 bg-petuno-purple hover:bg-petuno-purple-dark text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-md"
                >
                  Enviar
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

function SponsorPetModal({ pet, onClose }: { pet: any; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('20000');
  const [customAmount, setCustomAmount] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');

  const activeAmount = amount === 'custom' ? customAmount : amount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 font-sans text-left">
      <div className="bg-petuno-surface dark:bg-dark-surface max-w-sm w-full rounded-3xl p-6 border border-petuno-border dark:border-petuno-secondary-text/25 shadow-2xl relative">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-petuno-secondary-text dark:text-dark-secondary-text hover:bg-petuno-background dark:hover:bg-dark-surface-elevated p-1.5 rounded-lg transition-all">
          <X className="w-5 h-5" />
        </button>

        {step < 3 ? (
          <div className="space-y-4 pt-2">
            <div className="text-center">
              <h3 className="text-base font-extrabold flex items-center justify-center gap-1.5">
                ❤️ Apadrinar a {pet.name}
              </h3>
              <p className="text-[10px] text-petuno-secondary-text mt-1">Cubre los gastos médicos y alimenticios de {pet.name}.</p>
            </div>

            <div className="flex gap-2 justify-center py-1">
              <span className={`w-6 h-1 rounded-full ${step === 1 ? 'bg-petuno-purple' : 'bg-petuno-border dark:bg-petuno-secondary-text/20'}`}></span>
              <span className={`w-6 h-1 rounded-full ${step === 2 ? 'bg-petuno-purple' : 'bg-petuno-border dark:bg-petuno-secondary-text/20'}`}></span>
            </div>

            {step === 1 ? (
              <div className="space-y-4 text-xs">
                <div className="text-left space-y-1.5">
                  <label className="block text-[10px] font-bold text-petuno-secondary-text uppercase tracking-wider">Aporte Mensual (COP)</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['15000', '30000', '60000'].map(val => (
                      <button 
                        key={val}
                        type="button"
                        onClick={() => setAmount(val)}
                        className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                          amount === val 
                            ? 'bg-petuno-purple border-petuno-purple text-white' 
                            : 'border-petuno-border hover:bg-petuno-background dark:border-petuno-secondary-text/20 dark:hover:bg-dark-surface-elevated text-petuno-secondary-text'
                        }`}
                      >
                        ${parseInt(val).toLocaleString()}
                      </button>
                    ))}
                    <button 
                      type="button"
                      onClick={() => setAmount('custom')}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all col-span-3 ${
                        amount === 'custom' 
                          ? 'bg-petuno-purple border-petuno-purple text-white' 
                          : 'border-petuno-border hover:bg-petuno-background dark:border-petuno-secondary-text/20 dark:hover:bg-dark-surface-elevated text-petuno-secondary-text'
                      }`}
                    >
                      Otro Monto
                    </button>
                  </div>
                  
                  {amount === 'custom' && (
                    <input 
                      type="number" 
                      required
                      placeholder="Aporte mensual personalizado"
                      value={customAmount}
                      onChange={e => setCustomAmount(e.target.value)}
                      className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-petuno-purple transition-all"
                    />
                  )}
                </div>

                <button 
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full bg-petuno-purple hover:bg-petuno-purple-dark text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-md mt-2"
                >
                  Continuar al Pago
                </button>

                <div className="border-t border-petuno-border/40 dark:border-petuno-secondary-text/10 pt-3 mt-2 text-[9.5px] text-petuno-secondary-text dark:text-dark-secondary-text space-y-1">
                  <div className="flex items-center gap-1 font-extrabold text-petuno-purple dark:text-petuno-purple-light uppercase">
                    <span>🛡️ Transparencia de Apadrinamiento</span>
                  </div>
                  <p className="leading-snug">
                    Petuno no cobra comisiones. Tu aporte mensual financia directamente a <strong>{pet.shelter}</strong> (NIT Verificado ✓) para cubrir la manutención y salud de {pet.name}.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="text-left space-y-1.5">
                  <label className="block text-[10px] font-bold text-petuno-secondary-text uppercase tracking-wider">Nombre del Padrino</label>
                  <input 
                    type="text" required placeholder="John Doe" value={cardName} onChange={e => setCardName(e.target.value)}
                    className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-petuno-purple transition-all"
                  />
                </div>
                <div className="text-left space-y-1.5">
                  <label className="block text-[10px] font-bold text-petuno-secondary-text uppercase tracking-wider">Número de Tarjeta</label>
                  <input 
                    type="text" required placeholder="4000 1234 5678 9010" value={cardNumber} onChange={e => setCardNumber(e.target.value)}
                    className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-petuno-purple transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-left space-y-1.5">
                    <label className="block text-[10px] font-bold text-petuno-secondary-text uppercase tracking-wider">Vencimiento</label>
                    <input 
                      type="text" required placeholder="MM/AA"
                      className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-petuno-purple transition-all"
                    />
                  </div>
                  <div className="text-left space-y-1.5">
                    <label className="block text-[10px] font-bold text-petuno-secondary-text uppercase tracking-wider">CVC</label>
                    <input 
                      type="password" required placeholder="•••"
                      className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-petuno-purple transition-all"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button 
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 bg-transparent hover:bg-petuno-border/20 border border-petuno-border dark:border-petuno-secondary-text/30 font-bold py-2.5 rounded-xl text-xs transition-all"
                  >
                    Atrás
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 bg-petuno-purple hover:bg-petuno-purple-dark text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-md"
                  >
                    Apadrinar
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          <div className="text-center space-y-4 pt-4 font-sans">
            <div className="w-12 h-12 rounded-full bg-petuno-mint-light flex items-center justify-center mx-auto border border-petuno-mint/20">
              <ShieldCheck className="w-6 h-6 text-petuno-mint" />
            </div>
            <h3 className="text-base font-extrabold text-petuno-text dark:text-dark-text">¡Padrino Registrado!</h3>
            <p className="text-xs text-petuno-secondary-text leading-relaxed">
              Muchas gracias **{cardName}**. Has registrado un apadrinamiento mensual de **${parseInt(activeAmount).toLocaleString()} COP** para **{pet.name}**. ¡Tu aporte mensual financiará su comida y atención veterinaria en **{pet.shelter}**!
            </p>
            <button 
              onClick={onClose}
              className="w-full bg-petuno-purple hover:bg-petuno-purple-dark text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-md"
            >
              Cerrar
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

function PublicAdoptionsView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('Todos');
  const [showSpecialNeeds, setShowSpecialNeeds] = useState(false);
  const [activePetForForm, setActivePetForForm] = useState<any | null>(null);
  const [activePetForSponsor, setActivePetForSponsor] = useState<any | null>(null);

  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState<{
    housing: string;
    hasOtherPets: string;
    hoursAlone: string;
    preferredSpecies: string;
    activityLevel: string;
  } | null>(null);
  const [tempAnswers, setTempAnswers] = useState({
    housing: 'Apartamento',
    hasOtherPets: 'No, ninguno',
    hoursAlone: 'Entre 4 y 8 horas',
    preferredSpecies: 'Ambos',
    activityLevel: 'Activo (Juegos diarios, paseos medianos)'
  });

  const getCompatibilityScore = (pet: any) => {
    if (!quizAnswers) return null;
    let score = 70;
    
    // Species preference matching
    if (quizAnswers.preferredSpecies === 'Perro' && pet.species === 'Perro') score += 15;
    else if (quizAnswers.preferredSpecies === 'Gato' && pet.species === 'Gato') score += 15;
    else if (quizAnswers.preferredSpecies === 'Ambos') score += 10;
    
    // Size and housing matching
    if (quizAnswers.housing === 'Apartamento' && pet.size === 'Pequeño') score += 10;
    else if (quizAnswers.housing === 'Apartamento' && pet.size === 'Grande') score -= 15;
    else if (quizAnswers.housing.includes('finca') && pet.size === 'Grande') score += 12;
    
    // Age and activity
    if (quizAnswers.activityLevel.includes('Activo') && pet.age.includes('meses')) score += 8;
    else if (quizAnswers.activityLevel.includes('Tranquilo') && pet.age.includes('años')) score += 8;

    // Stable deterministic offset based on name characters
    const charOffset = pet.name.charCodeAt(0) % 7;
    score += charOffset;
    
    return Math.min(Math.max(score, 60), 99);
  };

  const adoptablePets = [
    {
      id: 'a1',
      name: 'Lola',
      species: 'Perro',
      breed: 'Criolla (Poodle Mix)',
      age: '6 meses',
      gender: 'Hembra',
      size: 'Pequeño',
      specialNeeds: false,
      shelter: 'Fundación Patitas Felices',
      description: 'Lola es extremadamente tierna, juguetona y de tamaño ideal para apartamento. Le encantan los niños.',
      photo: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 'a2',
      name: 'Simba',
      species: 'Gato',
      breed: 'Común Europeo (Tabby)',
      age: '1 año',
      gender: 'Macho',
      size: 'Mediano',
      specialNeeds: false,
      shelter: 'Refugio Huellas de Amor',
      description: 'Simba es muy cariñoso y hogareño, le encanta ronronear en tu regazo y es muy sociable.',
      photo: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 'a3',
      name: 'Rocco',
      species: 'Perro',
      breed: 'Golden Retriever Mix',
      age: '2 años',
      gender: 'Macho',
      size: 'Grande',
      specialNeeds: true,
      shelter: 'Fundación Patitas Felices',
      description: 'Rocco es trípode tras un rescate en la calle, pero corre y juega como cualquier cachorro. Busca una familia cariñosa.',
      photo: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 'a4',
      name: 'Kiwi',
      species: 'Perro',
      breed: 'Pastor Alemán Mix',
      age: '8 meses',
      gender: 'Macho',
      size: 'Mediano',
      specialNeeds: false,
      shelter: 'Refugio Huellas de Amor',
      description: 'Kiwi es extremadamente activo, inteligente y excelente guardián. Requiere espacio exterior.',
      photo: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 'a5',
      name: 'Sasha',
      species: 'Gato',
      breed: 'Siamesa',
      age: '3 meses',
      gender: 'Hembra',
      size: 'Pequeño',
      specialNeeds: false,
      shelter: 'Refugio Huellas de Amor',
      description: 'Sasha es una cachorra mimada, llena de energía, ideal para convivir con otras mascotas.',
      photo: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 'a6',
      name: 'Bethoven',
      species: 'Perro',
      breed: 'San Bernardo Mix',
      age: '4 años',
      gender: 'Macho',
      size: 'Grande',
      specialNeeds: false,
      shelter: 'Refugio Huellas de Amor',
      description: 'Un gigante noble y tranquilo. Se lleva excelente con gatos y es de temperamento calmado.',
      photo: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=600&auto=format&fit=crop'
    }
  ];

  const filteredPets = adoptablePets.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          pet.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pet.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecies = selectedSpecies === 'Todos' || pet.species === selectedSpecies;
    const matchesNeeds = !showSpecialNeeds || pet.specialNeeds;
    return matchesSearch && matchesSpecies && matchesNeeds;
  });

  return (
    <div className="min-h-screen bg-petuno-background dark:bg-dark-background font-sans pt-28 pb-16 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Title */}
        <div>
          <span className="text-[10px] font-extrabold bg-petuno-purple/10 text-petuno-purple px-2.5 py-1 rounded-full uppercase tracking-wider block w-max mb-2">
            🏡 Adopción Responsable
          </span>
          <h1 className="text-3xl font-extrabold text-petuno-text dark:text-dark-text">
            Encuentra a tu Nuevo Compañero
          </h1>
          <p className="text-sm text-petuno-secondary-text mt-1 max-w-xl">
            Explora las mascotas resguardadas en las fundaciones de Colombia. Adopta de forma responsable o apadrina su manutención y salud.
          </p>
        </div>

        {/* Compatibility Matching Wizard Banner */}
        <div className="bg-gradient-to-r from-petuno-purple/10 to-petuno-coral/10 p-6 rounded-3xl border border-petuno-purple/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-left">
            <h4 className="text-sm font-extrabold text-petuno-purple dark:text-petuno-purple-light flex items-center gap-1.5 uppercase tracking-wider">
              ❤️ Encuentra tu compañero ideal
            </h4>
            <p className="text-xs text-petuno-secondary-text dark:text-dark-secondary-text leading-relaxed">
              {quizAnswers 
                ? '¡Test completado! Mostrando porcentajes de compatibilidad personalizados en las tarjetas.'
                : 'Responde 5 preguntas rápidas y nuestro algoritmo inteligente te recomendará las mascotas más compatibles con tu estilo de vida.'
              }
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setQuizStep(1);
                setShowQuiz(true);
              }}
              className="bg-petuno-purple hover:bg-petuno-purple-dark text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors shadow-sm whitespace-nowrap"
            >
              {quizAnswers ? '🔄 Repetir Test' : '📝 Iniciar Test'}
            </button>
            {quizAnswers && (
              <button
                onClick={() => setQuizAnswers(null)}
                className="bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 hover:bg-petuno-background dark:hover:bg-dark-surface-elevated text-xs font-bold px-3 py-2 rounded-xl"
              >
                Limpiar
              </button>
            )}
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-petuno-surface dark:bg-dark-surface p-4 rounded-3xl border border-petuno-border dark:border-petuno-secondary-text/15 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-petuno-secondary-text">
              🔍
            </span>
            <input 
              type="text" 
              placeholder="Buscar por nombre, raza..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-petuno-background dark:bg-dark-surface-elevated border border-petuno-border dark:border-transparent rounded-2xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-petuno-purple transition-all placeholder-petuno-muted"
            />
          </div>

          <div className="flex flex-wrap gap-2 items-center w-full md:w-auto">
            <button 
              onClick={() => setSelectedSpecies('Todos')}
              className={`text-xs font-bold px-4 py-2 rounded-full transition-all ${
                selectedSpecies === 'Todos' 
                  ? 'bg-petuno-purple text-white' 
                  : 'bg-petuno-background dark:bg-dark-surface-elevated text-petuno-secondary-text'
              }`}
            >
              Todos
            </button>
            <button 
              onClick={() => setSelectedSpecies('Perro')}
              className={`text-xs font-bold px-4 py-2 rounded-full transition-all ${
                selectedSpecies === 'Perro' 
                  ? 'bg-petuno-purple text-white' 
                  : 'bg-petuno-background dark:bg-dark-surface-elevated text-petuno-secondary-text'
              }`}
            >
              Perros
            </button>
            <button 
              onClick={() => setSelectedSpecies('Gato')}
              className={`text-xs font-bold px-4 py-2 rounded-full transition-all ${
                selectedSpecies === 'Gato' 
                  ? 'bg-petuno-purple text-white' 
                  : 'bg-petuno-background dark:bg-dark-surface-elevated text-petuno-secondary-text'
              }`}
            >
              Gatos
            </button>
            
            <div className="w-px h-6 bg-petuno-border dark:bg-petuno-secondary-text/20 mx-2 hidden sm:block"></div>
            
            <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-bold text-petuno-secondary-text">
              <input 
                type="checkbox" 
                checked={showSpecialNeeds}
                onChange={e => setShowSpecialNeeds(e.target.checked)}
                className="w-4 h-4 rounded text-petuno-purple accent-petuno-purple cursor-pointer"
              />
              <span>Necesidades Especiales</span>
            </label>
          </div>
        </div>

        {/* Pets Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPets.map(pet => {
            const score = getCompatibilityScore(pet);
            return (
              <div key={pet.id} className="bg-petuno-surface dark:bg-dark-surface rounded-3xl overflow-hidden border border-petuno-border dark:border-petuno-secondary-text/10 shadow-sm flex flex-col group">
                <div className="relative h-56 w-full overflow-hidden bg-petuno-purple-50">
                  <img 
                    src={pet.photo} 
                    alt={pet.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  {pet.specialNeeds && (
                    <span className="absolute top-4 left-4 bg-petuno-coral text-white text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                      Cuidados Especiales
                    </span>
                  )}
                  {score && (
                    <span className="absolute top-4 right-4 bg-petuno-purple text-white text-[9.5px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md animate-pulse">
                      💖 {score}% Compatible
                    </span>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-extrabold text-petuno-purple uppercase tracking-wider">{pet.breed} • {pet.gender}</span>
                        <h3 className="font-extrabold text-lg text-petuno-text dark:text-dark-text mt-0.5">{pet.name}</h3>
                      </div>
                      <span className="bg-petuno-background dark:bg-dark-surface-elevated text-petuno-secondary-text text-[10px] font-bold px-2 py-1 rounded-full border border-petuno-border/30">
                        {pet.age}
                      </span>
                    </div>
                    <p className="text-xs text-petuno-secondary-text dark:text-dark-secondary-text mt-3 leading-relaxed">
                      {pet.description}
                    </p>
                    <p className="text-[10px] text-petuno-muted mt-2 font-semibold flex items-center gap-1.5">
                      🏠 Albergue: {pet.shelter}
                      <span className="bg-petuno-purple/10 text-petuno-purple text-[8.5px] font-extrabold px-2 py-0.5 rounded">🛡️ Verificada NIT ✓</span>
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button 
                      onClick={() => setActivePetForForm(pet)}
                      className="bg-petuno-purple hover:bg-petuno-purple-dark text-white font-bold py-2.5 rounded-xl text-xs transition-all shadow-sm"
                    >
                      Adoptar
                    </button>
                    <button 
                      onClick={() => setActivePetForSponsor(pet)}
                      className="bg-transparent hover:bg-petuno-border/20 border border-petuno-border dark:border-petuno-secondary-text/30 text-petuno-text dark:text-dark-text font-bold py-2.5 rounded-xl text-xs transition-all"
                    >
                      Apadrinar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredPets.length === 0 && (
            <div className="col-span-full bg-petuno-surface dark:bg-dark-surface py-16 rounded-3xl border border-petuno-border text-center">
              <p className="text-sm text-petuno-secondary-text">No encontramos mascotas con los filtros seleccionados.</p>
            </div>
          )}
        </div>

      </div>

      {activePetForForm && (
        <AdoptionFormWizardModal 
          pet={activePetForForm} 
          onClose={() => setActivePetForForm(null)} 
        />
      )}

      {activePetForSponsor && (
        <SponsorPetModal 
          pet={activePetForSponsor} 
          onClose={() => setActivePetForSponsor(null)} 
        />
      )}

      {showQuiz && (
        <div className="fixed inset-0 z-55 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 font-sans text-left">
          <div className="bg-petuno-surface dark:bg-dark-surface max-w-sm w-full rounded-3xl p-6 border border-petuno-border dark:border-petuno-secondary-text/25 shadow-2xl relative">
            
            <button 
              onClick={() => setShowQuiz(false)} 
              className="absolute top-4 right-4 text-petuno-secondary-text dark:text-dark-secondary-text hover:bg-petuno-background p-1.5 rounded-lg transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4 pt-2">
              <div className="text-center">
                <h3 className="text-sm font-extrabold text-petuno-purple uppercase tracking-wider">
                  ❤️ Encuentra tu compañero ideal
                </h3>
                <p className="text-[10px] text-petuno-secondary-text mt-1">Paso {quizStep} de 5</p>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-petuno-border dark:bg-petuno-secondary-text/20 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-petuno-purple h-full transition-all duration-300"
                  style={{ width: `${quizStep * 20}%` }}
                ></div>
              </div>

              {quizStep === 1 && (
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-petuno-secondary-text uppercase">1. ¿Qué tipo de vivienda tienes?</label>
                  {['Apartamento', 'Casa con patio pequeño', 'Casa con finca/patio grande'].map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setTempAnswers({ ...tempAnswers, housing: opt })}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs text-left border font-semibold transition-all ${
                        tempAnswers.housing === opt
                          ? 'border-petuno-purple bg-petuno-purple text-white shadow-sm'
                          : 'border-petuno-border hover:bg-petuno-background dark:border-petuno-secondary-text/25 text-petuno-secondary-text'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {quizStep === 2 && (
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-petuno-secondary-text uppercase">2. ¿Tienes otros animales en el hogar?</label>
                  {['Sí, perros', 'Sí, gatos', 'Sí, ambos', 'No, ninguno'].map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setTempAnswers({ ...tempAnswers, hasOtherPets: opt })}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs text-left border font-semibold transition-all ${
                        tempAnswers.hasOtherPets === opt
                          ? 'border-petuno-purple bg-petuno-purple text-white shadow-sm'
                          : 'border-petuno-border hover:bg-petuno-background dark:border-petuno-secondary-text/25 text-petuno-secondary-text'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {quizStep === 3 && (
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-petuno-secondary-text uppercase">3. ¿Cuántas horas al día pasará la mascota sola?</label>
                  {['Menos de 4 horas', 'Entre 4 y 8 horas', 'Más de 8 horas'].map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setTempAnswers({ ...tempAnswers, hoursAlone: opt })}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs text-left border font-semibold transition-all ${
                        tempAnswers.hoursAlone === opt
                          ? 'border-petuno-purple bg-petuno-purple text-white shadow-sm'
                          : 'border-petuno-border hover:bg-petuno-background dark:border-petuno-secondary-text/25 text-petuno-secondary-text'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {quizStep === 4 && (
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-petuno-secondary-text uppercase">4. ¿Qué especie estás buscando adoptar?</label>
                  {['Perro', 'Gato', 'Ambos'].map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setTempAnswers({ ...tempAnswers, preferredSpecies: opt })}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs text-left border font-semibold transition-all ${
                        tempAnswers.preferredSpecies === opt
                          ? 'border-petuno-purple bg-petuno-purple text-white shadow-sm'
                          : 'border-petuno-border hover:bg-petuno-background dark:border-petuno-secondary-text/25 text-petuno-secondary-text'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {quizStep === 5 && (
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-petuno-secondary-text uppercase">5. ¿Qué nivel de actividad prefieres para tu mascota?</label>
                  {['Tranquilo (Paseos cortos, calma)', 'Activo (Juegos diarios, paseos medianos)', 'Muy Enérgico (Deporte, senderismo, correr)'].map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setTempAnswers({ ...tempAnswers, activityLevel: opt })}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs text-left border font-semibold transition-all ${
                        tempAnswers.activityLevel === opt
                          ? 'border-petuno-purple bg-petuno-purple text-white shadow-sm'
                          : 'border-petuno-border hover:bg-petuno-background dark:border-petuno-secondary-text/25 text-petuno-secondary-text'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                {quizStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setQuizStep(quizStep - 1)}
                    className="flex-1 bg-transparent hover:bg-petuno-background border border-petuno-border dark:border-petuno-secondary-text/30 font-bold py-2.5 rounded-xl text-xs text-petuno-text dark:text-dark-text text-center transition-all"
                  >
                    Atrás
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowQuiz(false)}
                    className="flex-1 bg-transparent hover:bg-petuno-background border border-petuno-border dark:border-petuno-secondary-text/30 font-bold py-2.5 rounded-xl text-xs text-petuno-text dark:text-dark-text text-center transition-all"
                  >
                    Cancelar
                  </button>
                )}
                
                {quizStep < 5 ? (
                  <button
                    type="button"
                    onClick={() => setQuizStep(quizStep + 1)}
                    className="flex-1 bg-petuno-purple hover:bg-petuno-purple-dark text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-sm text-center"
                  >
                    Siguiente
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setQuizAnswers(tempAnswers);
                      setShowQuiz(false);
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-sm text-center"
                  >
                    Finalizar Test
                  </button>
                )}
              </div>

            </div>
          </div>
        </div>
      )}

      {activePetForForm && (
        <AdoptionFormWizardModal 
          pet={activePetForForm} 
          onClose={() => setActivePetForForm(null)} 
        />
      )}

      {activePetForSponsor && (
        <SponsorPetModal 
          pet={activePetForSponsor} 
          onClose={() => setActivePetForSponsor(null)} 
        />
      )}
    </div>
  );
}

// ============================================================================
// MAIN APP COMPONENT & ROUTING
// ============================================================================

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; phone?: string; role?: string } | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
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
              />
              <Home 
                onOpenScanner={() => setShowScannerModal(true)}
                onOpenDonations={() => setShowDonationModal(true)}
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
