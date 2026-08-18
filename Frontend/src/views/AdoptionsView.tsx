import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { AdoptionPet } from '../types';

export default function AdoptionsView({
  adoptionPets,
  onApplyAdoption
}: {
  adoptionPets: AdoptionPet[];
  onApplyAdoption: (
    petId: string, 
    applicantName: string, 
    email: string, 
    phone: string, 
    address: string, 
    housing: string, 
    hasPets: boolean, 
    timeAvailable: string
  ) => void;
}) {
  const [species, setSpecies] = useState('Todos');
  const [age, setAge] = useState('Todos');
  const [city, setCity] = useState('Todos');
  const [gender, setGender] = useState('Todos');
  const [specialNeeds, setSpecialNeeds] = useState<boolean | null>(null);

  const [activePetForApply, setActivePetForApply] = useState<AdoptionPet | null>(null);
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [housing, setHousing] = useState('Apartamento');
  const [hasPets, setHasPets] = useState(false);
  const [timeAvailable, setTimeAvailable] = useState('Medio Tiempo');

  const filteredPets = adoptionPets.filter(pet => {
    const matchesSpecies = species === 'Todos' || pet.species === species;
    const matchesGender = gender === 'Todos' || pet.gender === gender;
    const matchesCity = city === 'Todos' || pet.location.includes(city);
    const matchesNeeds = specialNeeds === null || pet.specialNeeds === specialNeeds;
    
    let matchesAge = true;
    if (age !== 'Todos') {
      if (age === 'Cachorro') matchesAge = pet.age.includes('meses');
      else if (age === 'Adulto') matchesAge = !pet.age.includes('meses');
    }
    
    return matchesSpecies && matchesGender && matchesCity && matchesNeeds && matchesAge;
  });

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      if (!activePetForApply) return;
      onApplyAdoption(
        activePetForApply.id,
        name,
        email,
        phone,
        address,
        housing,
        hasPets,
        timeAvailable
      );
      alert(`¡Solicitud enviada con éxito para adoptar a ${activePetForApply.name}! La fundación revisará tu postulación y te contactará para agendar la entrevista.`);
      setActivePetForApply(null);
      setStep(1);
      setName('');
      setEmail('');
      setPhone('');
      setAddress('');
      setHousing('Apartamento');
      setHasPets(false);
      setTimeAvailable('Medio Tiempo');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 text-left animate-fade-in">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">Portal de Adopciones</h2>
        <p className="text-sm text-petuno-secondary-text mt-1">Dale una segunda oportunidad a un peludo en busca de un hogar amoroso.</p>
      </div>

      {/* Filter panel */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 bg-petuno-surface dark:bg-dark-surface p-4 rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 shadow-sm text-xs">
        <div>
          <label className="block text-[10px] font-bold text-petuno-secondary-text mb-1 uppercase">Especie</label>
          <select value={species} onChange={e => setSpecies(e.target.value)} className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/20 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-petuno-purple dark:bg-dark-surface">
            <option value="Todos">Todos</option>
            <option value="Perro">Perros</option>
            <option value="Gato">Gatos</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-petuno-secondary-text mb-1 uppercase">Edad</label>
          <select value={age} onChange={e => setAge(e.target.value)} className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/20 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-petuno-purple dark:bg-dark-surface">
            <option value="Todos">Todos</option>
            <option value="Cachorro">Cachorro (&lt; 1 año)</option>
            <option value="Adulto">Adulto (&gt; 1 año)</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-petuno-secondary-text mb-1 uppercase">Sexo</label>
          <select value={gender} onChange={e => setGender(e.target.value)} className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/20 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-petuno-purple dark:bg-dark-surface">
            <option value="Todos">Todos</option>
            <option value="Macho">Macho</option>
            <option value="Hembra">Hembra</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-petuno-secondary-text mb-1 uppercase">Ciudad</label>
          <select value={city} onChange={e => setCity(e.target.value)} className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/20 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-petuno-purple dark:bg-dark-surface">
            <option value="Todos">Todas las Ciudades</option>
            <option value="Bogotá">Bogotá</option>
            <option value="Medellín">Medellín</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-petuno-secondary-text mb-1 uppercase">Necesidades Especiales</label>
          <select 
            value={specialNeeds === null ? 'Todos' : specialNeeds ? 'Si' : 'No'} 
            onChange={e => {
              const val = e.target.value;
              if (val === 'Todos') setSpecialNeeds(null);
              else setSpecialNeeds(val === 'Si');
            }} 
            className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/20 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-petuno-purple dark:bg-dark-surface"
          >
            <option value="Todos">Ver Todos</option>
            <option value="Si">Sólo Necesidades Especiales</option>
            <option value="No">Sin Limitaciones</option>
          </select>
        </div>
      </div>

      {/* Grid of Adoptables */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPets.map((pet) => (
          <div key={pet.id} className="bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="h-44 overflow-hidden relative bg-petuno-background">
              <img src={pet.photo} alt={pet.name} className="w-full h-full object-cover" />
              {pet.specialNeeds && (
                <span className="absolute top-4 right-4 bg-petuno-amber-light border border-petuno-amber/20 text-petuno-amber font-extrabold px-2 py-0.5 rounded text-[9px] shadow-sm">
                  ❤️ Cuidado Especial
                </span>
              )}
            </div>
            
            <div className="p-5 flex-grow flex flex-col justify-between text-left space-y-4">
              <div>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-extrabold text-lg">{pet.name}</h3>
                  <span className="text-[11px] text-petuno-secondary-text dark:text-dark-text">{pet.age} • {pet.gender}</span>
                </div>
                <span className="text-[10px] text-petuno-muted font-bold block">{pet.shelter}</span>
                <p className="text-xs text-petuno-secondary-text dark:text-dark-secondary-text mt-2 leading-relaxed">{pet.description}</p>
              </div>

              <div className="border-t border-petuno-border dark:border-petuno-secondary-text/10 pt-3 text-xs text-petuno-secondary-text flex justify-between items-center">
                <span>📍 {pet.location}</span>
                <button 
                  onClick={() => setActivePetForApply(pet)}
                  className="bg-petuno-purple hover:bg-petuno-purple-dark text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-all"
                >
                  Quiero Adoptar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Multi-step Application Modal */}
      {activePetForApply && (
        <div className="fixed inset-0 z-55 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-petuno-surface dark:bg-dark-surface max-w-md w-full rounded-2xl p-6 border border-petuno-border dark:border-petuno-secondary-text/25 shadow-2xl relative text-left">
            <button 
              onClick={() => { setActivePetForApply(null); setStep(1); }}
              className="absolute top-4 right-4 text-petuno-secondary-text hover:bg-petuno-background dark:hover:bg-dark-surface-elevated p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={handleApplySubmit} className="space-y-4 pt-2">
              <h3 className="text-lg font-bold">Solicitud de Adopción: {activePetForApply.name}</h3>
              
              {/* Progress Indicator */}
              <div className="flex gap-2 items-center text-[10px] font-bold text-petuno-muted mb-4 uppercase tracking-wider">
                <span className={step >= 1 ? 'text-petuno-purple' : ''}>1. Datos</span>
                <span>➔</span>
                <span className={step >= 2 ? 'text-petuno-purple' : ''}>2. Hogar</span>
                <span>➔</span>
                <span className={step >= 3 ? 'text-petuno-purple' : ''}>3. Confirmación</span>
              </div>

              {step === 1 && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-petuno-secondary-text mb-1">Nombre Completo</label>
                    <input 
                      type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="Ej. John Doe"
                      className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-petuno-purple transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-petuno-secondary-text mb-1">Correo Electrónico</label>
                    <input 
                      type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="john@example.com"
                      className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-petuno-purple transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-petuno-secondary-text mb-1">Número de Teléfono</label>
                    <input 
                      type="tel" required value={phone} onChange={e => setPhone(e.target.value)} placeholder="+57 300 123 4567"
                      className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-petuno-purple transition-all"
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-petuno-secondary-text mb-1">Dirección de Vivienda</label>
                    <input 
                      type="text" required value={address} onChange={e => setAddress(e.target.value)} placeholder="Calle 100 #15-30, Bogotá"
                      className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-petuno-purple transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-petuno-secondary-text mb-1">Tipo de Vivienda</label>
                      <select value={housing} onChange={e => setHousing(e.target.value)} className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-petuno-purple dark:bg-dark-surface">
                        <option value="Apartamento">Apartamento</option>
                        <option value="Casa">Casa con patio</option>
                        <option value="Finca">Finca/Campo</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-petuno-secondary-text mb-1">Tiempo diario disponible</label>
                      <select value={timeAvailable} onChange={e => setTimeAvailable(e.target.value)} className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-petuno-purple dark:bg-dark-surface">
                        <option value="Medio Tiempo">Medio Tiempo (1-3 horas)</option>
                        <option value="Tiempo Completo">Tiempo Completo (&gt; 4 horas)</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <input 
                      type="checkbox" id="hasPets" checked={hasPets} onChange={e => setHasPets(e.target.checked)}
                      className="rounded accent-petuno-purple cursor-pointer"
                    />
                    <label htmlFor="hasPets" className="text-xs text-petuno-secondary-text select-none cursor-pointer">¿Tengo otras mascotas en casa?</label>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4 text-xs">
                  <div className="bg-petuno-purple/5 border border-petuno-purple/15 rounded-xl p-4 space-y-2">
                    <p>📝 **Resumen de postulación:**</p>
                    <p>• **Postulante:** {name}</p>
                    <p>• **Contacto:** {phone} • {email}</p>
                    <p>• **Vivienda:** {housing} en {address}</p>
                    <p>• **Experiencia previa:** {hasPets ? 'Sí, tiene otras mascotas' : 'No tiene mascotas actualmente'}</p>
                  </div>
                  <p className="text-[11px] text-petuno-muted leading-relaxed">
                    Al confirmar, autorizas a **{activePetForApply.shelter}** a revisar tu perfil público de Petuno y contactarte para dar seguimiento al proceso de adopción.
                  </p>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-petuno-border/30 dark:border-petuno-secondary-text/10">
                <button type="submit" className="flex-grow bg-petuno-purple hover:bg-petuno-purple-dark text-white font-semibold py-2.5 rounded-xl text-xs transition-colors shadow-md text-center">
                  {step === 3 ? 'Confirmar Adopción' : 'Siguiente'}
                </button>
                {step > 1 && (
                  <button type="button" onClick={() => setStep(step - 1)} className="border border-petuno-border dark:border-petuno-secondary-text/30 hover:bg-petuno-background text-xs font-bold px-4 py-2.5 rounded-xl text-center">
                    Atrás
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
