import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  QrCode, ShieldCheck, MapPin, Bell, Heart, Store, ArrowRight,
  PawPrint, UserCircle, Users, X 
} from 'lucide-react';
import type { ModuleConfig } from '../types';
import heroImg from '../assets/hero.png';

export default function Home({ 
  onOpenScanner,
  modulesConfig
}: { 
  onOpenScanner?: () => void; 
  modulesConfig?: ModuleConfig;
}) {
  const [selectedSosCategory, setSelectedSosCategory] = useState<string>('Todas');
  const [selectedMapFilter, setSelectedMapFilter] = useState<string>('Todas');
  const [selectedMapMarker, setSelectedMapMarker] = useState<any | null>(null);

  const hasSos = modulesConfig ? modulesConfig.sos : true;
  const hasAdoptions = modulesConfig ? modulesConfig.adoptions : true;
  const hasDonations = modulesConfig ? modulesConfig.donations : true;
  const hasVets = modulesConfig ? modulesConfig.vets : true;
  const hasDevices = modulesConfig ? modulesConfig.devices : true;

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
      {hasSos && (
        <>
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
    </>
  )}

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
          {hasDevices && (
            <ExploreCard 
              image="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1974&auto=format&fit=crop"
              title="Mascotas"
              desc="Gestiona perfiles"
            />
          )}
          {hasSos && (
            <ExploreCard 
              image="https://images.unsplash.com/photo-1537151608804-ea2f1ea38341?q=80&w=2000&auto=format&fit=crop"
              title="Perdidas"
              desc="Publica o busca"
            />
          )}
          {hasAdoptions && (
            <ExploreCard 
              image="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop"
              title="Adopciones"
              desc="Dale un hogar"
            />
          )}
          {hasVets && (
            <ExploreCard 
              image="https://images.unsplash.com/photo-1628009368231-7bb7cbcb8122?q=80&w=2070&auto=format&fit=crop"
              title="Servicios"
              desc="Encuentra ayuda"
            />
          )}
        </div>
      </section>

      {/* Foundations and Adoptions Section */}
      {hasAdoptions && (
        <section id="adopciones-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full text-left bg-petuno-surface/40 dark:bg-dark-surface/10 rounded-3xl border border-petuno-border/55 dark:border-petuno-secondary-text/5">
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
      )}

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
      {hasDonations && (
        <section id="donaciones-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full text-left">
        <div className="bg-gradient-to-br from-petuno-coral/5 to-petuno-purple/5 dark:from-petuno-coral/10 dark:to-petuno-purple/10 p-8 lg:p-12 rounded-3xl border border-petuno-border/55 dark:border-petuno-secondary-text/10 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-petuno-border/40 pb-4">
            <div>
              <span className="bg-petuno-purple/10 text-petuno-purple text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider block w-max mb-3">
                &hearts; SOLIDARIDAD TRANSPARENTE
              </span>
              <h2 className="text-3xl font-extrabold text-petuno-text dark:text-dark-text">
                Ayuda Directa a Fundaciones
              </h2>
              <p className="text-sm text-petuno-secondary-text mt-2 leading-relaxed max-w-xl">
                Petuno no interviene en las transacciones. Tu aporte va directo al refugio verificado de tu elección, sin comisiones intermedias.
              </p>
            </div>
            <div className="bg-white/80 dark:bg-black/40 backdrop-blur-sm p-3 rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/10 text-[10px] text-petuno-purple font-bold flex items-center gap-1.5 shrink-0 shadow-sm">
              <span>🛡️ Cuentas Bancarias Verificadas &#10003;</span>
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
                  Lleva concentrado, gasas, bandages, collares o cobijas directamente a los centros de acopio autorizados.
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
      )}

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
              Suscribirme
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-white dark:bg-dark-surface-elevated p-6 rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/30 shadow-sm hover:shadow-md transition-shadow flex flex-col text-left">
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
    <div className="group cursor-pointer rounded-2xl overflow-hidden bg-white dark:bg-dark-surface-elevated border border-petuno-border dark:border-petuno-secondary-text/30 shadow-sm hover:shadow-lg transition-all flex flex-col text-left">
      <div className="h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-4 flex items-center justify-between">
        <div>
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

function StatBox({ icon, number, text }: { icon: React.ReactNode, number: string, text: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="mb-3">{icon}</div>
      <div className="text-3xl font-extrabold text-petuno-text dark:text-dark-text mb-1">{number}</div>
      <div className="text-sm font-medium text-petuno-secondary-text dark:text-dark-secondary-text">{text}</div>
    </div>
  );
}
