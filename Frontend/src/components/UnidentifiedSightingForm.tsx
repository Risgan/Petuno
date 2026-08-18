import React, { useState } from 'react';
import { FileText } from 'lucide-react';

export default function UnidentifiedSightingForm({ 
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
