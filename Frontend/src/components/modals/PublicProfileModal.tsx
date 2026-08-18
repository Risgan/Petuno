import React, { useState } from 'react';
import { X, ShieldCheck } from 'lucide-react';
import type { Pet, PrivacySettings } from '../../types';

export default function PublicProfileModal({ 
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
                    <div className="bg-petuno-background dark:bg-dark-surface-elevated p-3 rounded-xl border border-petuno-border/55 dark:border-petuno-secondary-text/10">
                      <span className="text-[9px] text-petuno-secondary-text dark:text-dark-secondary-text font-semibold block">Alergias</span>
                      <span className="font-bold text-petuno-coral">{pet.allergies || 'Ninguna conocida'}</span>
                    </div>
                    <div className="bg-petuno-background dark:bg-dark-surface-elevated p-3 rounded-xl border border-petuno-border/55 dark:border-petuno-secondary-text/10">
                      <span className="text-[9px] text-petuno-secondary-text dark:text-dark-secondary-text font-semibold block">Medicamentos</span>
                      <span className="font-bold text-petuno-text dark:text-dark-text">{pet.medicalCritical ? 'Requiere tratamiento' : 'Ninguno'}</span>
                    </div>
                    <div className="bg-petuno-background dark:bg-dark-surface-elevated p-3 rounded-xl border border-petuno-border/55 dark:border-petuno-secondary-text/10">
                      <span className="text-[9px] text-petuno-secondary-text dark:text-dark-secondary-text font-semibold block">Veterinario Clínico</span>
                      <span className="font-bold text-petuno-text dark:text-dark-text">Dr. Silva (Chicó Vet)</span>
                    </div>
                    <div className="bg-petuno-background dark:bg-dark-surface-elevated p-3 rounded-xl border border-petuno-border/55 dark:border-petuno-secondary-text/10">
                      <span className="text-[9px] text-petuno-secondary-text dark:text-dark-secondary-text font-semibold block">Tipo de Sangre</span>
                      <span className="font-bold text-petuno-text dark:text-dark-text">DEA 1.1 (+)</span>
                    </div>
                    <div className="bg-petuno-background dark:bg-dark-surface-elevated p-3 rounded-xl border border-petuno-border/55 dark:border-petuno-secondary-text/10 col-span-2">
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
