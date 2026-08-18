import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  PawPrint, Cpu, Calendar, Bell, Plus, AlertTriangle, QrCode, 
  Search, Filter, Edit, LogOut, Sun, Moon, MapPin, Heart, 
  Settings, UserCircle, Activity, FileText, Check, Copy, MessageSquare, Stethoscope
} from 'lucide-react';

import type { 
  Pet, Sighting, UnidentifiedSighting, CommunityPost, 
  Device, Vet, AdoptionPet, AdoptionApplication, PrivacySettings, 
  NotificationItem, ModuleConfig
} from '../types';

import { INITIAL_PETS } from '../constants/mockData';

// Subviews
import PetForm from '../components/PetForm';
import PetProfile from '../components/PetProfile';
import LostPetManager from '../components/LostPetManager';
import SightingForm from '../components/SightingForm';
import UnidentifiedSightingForm from '../components/UnidentifiedSightingForm';

import ComunidadView from './ComunidadView';
import DevicesView from './DevicesView';
import VetsView from './VetsView';
import AdoptionsView from './AdoptionsView';
import SettingsView from './SettingsView';
import NotificationsView from './NotificationsView';
import LostPetsView from './LostPetsView';
import SightingsTimelineView from './SightingsTimelineView';

// Modals
import QRPreviewModal from '../components/modals/QRPreviewModal';
import PublicProfileModal from '../components/modals/PublicProfileModal';

// UI components
import { EventRow, ActivityRow, MobileNavItem } from '../components/UI/RowComponents';
import { MetricCard } from '../components/UI/StatCardComponents';

export default function Dashboard({ 
  user, 
  onLogout,
  isDarkMode,
  toggleTheme,
  modulesConfig,
  onSaveModules
}: { 
  user: { name: string; email: string; phone?: string } | null; 
  onLogout: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  modulesConfig?: ModuleConfig;
  onSaveModules?: (newConfig: ModuleConfig) => void;
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

  const hasSos = modulesConfig ? modulesConfig.sos : true;
  const hasAdoptions = modulesConfig ? modulesConfig.adoptions : true;
  const hasVets = modulesConfig ? modulesConfig.vets : true;
  const hasDevices = modulesConfig ? modulesConfig.devices : true;
  const hasCommunity = modulesConfig ? modulesConfig.community : true;

  const menuItems = [
    { name: 'Dashboard', icon: <Activity className="w-5 h-5" />, visible: true },
    { name: 'Mis mascotas', icon: <PawPrint className="w-5 h-5" />, visible: true },
    { name: 'Mascotas perdidas', icon: <AlertTriangle className="w-5 h-5" />, visible: hasSos },
    { name: 'Avistamientos', icon: <MapPin className="w-5 h-5" />, visible: hasSos },
    { name: 'Comunidad', icon: <MessageSquare className="w-5 h-5" />, visible: hasCommunity },
    { name: 'Dispositivos', icon: <Cpu className="w-5 h-5" />, visible: hasDevices },
    { name: 'Veterinarios', icon: <Stethoscope className="w-5 h-5" />, visible: hasVets },
    { name: 'Adopciones', icon: <Heart className="w-5 h-5" />, visible: hasAdoptions },
    { name: 'Notificaciones', icon: <Bell className="w-5 h-5" />, visible: true },
    { name: 'Configuración', icon: <Settings className="w-5 h-5" />, visible: true },
  ].filter(item => item.visible);

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
    <div className="min-h-screen bg-petuno-background dark:bg-dark-background text-petuno-text dark:text-dark-text flex font-sans w-full">
      
      {/* SIDEBAR (Desktop) */}
      <aside className="hidden lg:flex flex-col w-[260px] bg-petuno-surface dark:bg-dark-surface border-r border-petuno-border dark:border-petuno-secondary-text/15 fixed top-0 bottom-0 left-0 z-30 transition-all">
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
                {hasDevices && (
                  <MetricCard icon={<Cpu className="text-petuno-purple" />} title="Dispositivos" value="0 asociados" />
                )}
                {hasVets && (
                  <MetricCard icon={<Calendar className="text-petuno-purple" />} title="Próxima vacuna" value="Max — 21 Sep" />
                )}
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
                          <div className="h-32 overflow-hidden relative bg-petuno-background">
                            <img src={pet.photo} alt={pet.name} className="w-full h-full object-cover" />
                            <span className={`absolute top-3 right-3 border font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 text-[10px] ${
                              pet.status === 'Perdido' 
                                ? 'bg-petuno-coral-light border-petuno-coral/20 text-petuno-coral' 
                                : 'bg-petuno-mint-light border-petuno-mint/20 text-petuno-mint'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${pet.status === 'Perdido' ? 'bg-petuno-coral animate-ping' : 'bg-petuno-mint'}`}></span>
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
                      {hasSos && (
                        <button onClick={() => { changeTab('Mis mascotas'); }} className="flex flex-col items-center justify-center p-4 border border-petuno-border dark:border-petuno-secondary-text/15 rounded-xl hover:bg-petuno-background dark:hover:bg-dark-surface-elevated transition-colors text-center">
                          <AlertTriangle className="w-6 h-6 text-petuno-coral mb-2" />
                          <span className="text-xs font-bold text-petuno-coral">Mascota perdida</span>
                        </button>
                      )}
                      {(hasSos || hasDevices) && (
                        <button onClick={() => { const myPets = pets.filter(p => p.isMine); if(myPets.length > 0) setShowQRModal(myPets[0].id); }} className="flex flex-col items-center justify-center p-4 border border-petuno-border dark:border-petuno-secondary-text/15 rounded-xl hover:bg-petuno-background dark:hover:bg-dark-surface-elevated transition-colors text-center">
                          <QrCode className="w-6 h-6 text-petuno-purple mb-2" />
                          <span className="text-xs font-bold">Generar QR</span>
                        </button>
                      )}
                      {hasDevices && (
                        <button onClick={() => changeTab('Dispositivos')} className="flex flex-col items-center justify-center p-4 border border-petuno-border dark:border-petuno-secondary-text/15 rounded-xl hover:bg-petuno-background dark:hover:bg-dark-surface-elevated transition-colors text-center">
                          <Cpu className="w-6 h-6 text-petuno-purple mb-2" />
                          <span className="text-xs font-bold">Nuevo dispositivo</span>
                        </button>
                      )}
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
              modulesConfig={modulesConfig}
              onSaveModules={onSaveModules}
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
