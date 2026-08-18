import React, { useState } from 'react';
import { Stethoscope, X } from 'lucide-react';
import type { Vet } from '../types';

export default function VetsView({
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
