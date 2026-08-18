import { AlertTriangle, QrCode } from 'lucide-react';
import type { Pet, Sighting } from '../types';

export default function LostPetManager({ 
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
