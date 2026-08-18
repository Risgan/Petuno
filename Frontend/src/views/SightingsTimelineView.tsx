import React, { useState } from 'react';
import { Plus, X, PawPrint } from 'lucide-react';
import type { Sighting, UnidentifiedSighting, Pet } from '../types';

export default function SightingsTimelineView({ 
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
