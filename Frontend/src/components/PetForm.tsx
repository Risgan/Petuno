import React, { useState } from 'react';
import { PawPrint, Stethoscope, ShieldCheck } from 'lucide-react';
import type { Pet } from '../types';

export default function PetForm({ 
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
                  className="w-5 h-5 accent-petuno-purple cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer select-none border-t border-petuno-border dark:border-petuno-secondary-text/10 pt-4">
                <div>
                  <p className="text-xs font-bold">Permitir contacto anónimo</p>
                  <p className="text-[10px] text-petuno-secondary-text">Permite a terceros enviarte mensajes directos al email sin ver tu información personal.</p>
                </div>
                <input 
                  type="checkbox" checked={allowContact} onChange={e => setAllowContact(e.target.checked)}
                  className="w-5 h-5 accent-petuno-purple cursor-pointer"
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
