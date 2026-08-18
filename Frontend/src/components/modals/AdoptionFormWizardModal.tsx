import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function AdoptionFormWizardModal({ 
  pet, 
  onClose 
}: { 
  pet: any; 
  onClose: () => void; 
}) {
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
