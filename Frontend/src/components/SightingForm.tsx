import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import type { Pet } from '../types';

export default function SightingForm({ 
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
