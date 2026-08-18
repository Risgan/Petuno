import { useState } from 'react';
import { PawPrint } from 'lucide-react';
import type { Pet } from '../types';

export default function LostPetsView({ 
  pets, 
  onReportSighting, 
  onViewPublicProfile 
}: { 
  pets: Pet[]; 
  onReportSighting: (petId: string) => void; 
  onViewPublicProfile: (petId: string) => void; 
}) {
  const [distance, setDistance] = useState('5');
  const [species, setSpecies] = useState('Todos');
  const [city, setCity] = useState('Bogotá');
  const [search, setSearch] = useState('');

  const lostPets = pets.filter(p => p.status === 'Perdido');

  return (
    <div className="max-w-6xl mx-auto space-y-6 text-left">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">Mascotas Perdidas Cercanas</h2>
        <p className="text-sm text-petuno-secondary-text mt-1">Colabora con la comunidad reportando avistamientos para ayudar a que regresen a casa.</p>
      </div>

      {/* Map simulation */}
      <div className="h-72 rounded-2xl bg-petuno-surface dark:bg-dark-surface border border-petuno-border dark:border-petuno-secondary-text/15 relative overflow-hidden flex items-center justify-center shadow-sm">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#6c4ce8_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>
        
        {/* Mock Map Streets */}
        <div className="absolute inset-0 flex flex-col justify-around opacity-20 pointer-events-none">
          <div className="h-px bg-petuno-muted"></div>
          <div className="h-px bg-petuno-muted"></div>
        </div>
        <div className="absolute inset-0 flex justify-around opacity-20 pointer-events-none">
          <div className="w-px bg-petuno-muted"></div>
          <div className="w-px bg-petuno-muted"></div>
        </div>

        {/* Animated lost pet pins */}
        {lostPets.map((pet, index) => (
          <div 
            key={pet.id} 
            className="absolute z-10 flex flex-col items-center cursor-pointer transition-all hover:scale-110"
            style={{ 
              top: `${25 + (index * 25) % 55}%`, 
              left: `${15 + (index * 28) % 70}%` 
            }}
            onClick={() => onViewPublicProfile(pet.id)}
          >
            <div className="relative">
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${pet.hasGps ? 'bg-petuno-purple' : 'bg-petuno-coral'}`}></span>
                <span className={`relative inline-flex rounded-full h-4 w-4 ${pet.hasGps ? 'bg-petuno-purple' : 'bg-petuno-coral'}`}></span>
              </span>
              <div className={`w-11 h-11 rounded-full border-2 overflow-hidden bg-white shadow-lg ${pet.hasGps ? 'border-petuno-purple' : 'border-petuno-coral'}`}>
                <img src={pet.photo} alt={pet.name} className="w-full h-full object-cover" />
              </div>
              <span className="absolute -bottom-1 -right-1 bg-white dark:bg-dark-surface p-0.5 rounded-full text-[9px] shadow-sm border border-petuno-border/50">
                {pet.hasGps ? '🛰️' : '🏷️'}
              </span>
            </div>
            <span className="bg-petuno-surface dark:bg-dark-surface-elevated text-petuno-text dark:text-dark-text text-[9px] font-extrabold px-1.5 py-0.5 rounded-full shadow-md mt-1.5 border border-petuno-border/50 block">
              {pet.name}
            </span>
          </div>
        ))}

        <div className="absolute bottom-3 right-3 bg-white dark:bg-dark-surface p-2 rounded-lg shadow-md border border-petuno-border dark:border-transparent text-[10px] font-bold">
          📍 Mostrando zona de {city}
        </div>
      </div>

      {/* Filters Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-petuno-surface dark:bg-dark-surface p-4 rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 shadow-sm">
        <div>
          <label className="block text-[10px] font-bold text-petuno-secondary-text mb-1 uppercase">Buscar</label>
          <input 
            type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Ej. Max, Toby..."
            className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/20 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-petuno-purple transition-all"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-petuno-secondary-text mb-1 uppercase">Especie</label>
          <select 
            value={species} onChange={e => setSpecies(e.target.value)}
            className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/20 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-petuno-purple transition-all dark:bg-dark-surface"
          >
            <option value="Todos">Todos</option>
            <option value="Perro">Perros</option>
            <option value="Gato">Gatos</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-petuno-secondary-text mb-1 uppercase">Ciudad</label>
          <input 
            type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="Ej. Bogotá"
            className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/20 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-petuno-purple transition-all"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-petuno-secondary-text mb-1 uppercase">Radio de Distancia</label>
          <select 
            value={distance} onChange={e => setDistance(e.target.value)}
            className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/20 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-petuno-purple transition-all dark:bg-dark-surface"
          >
            <option value="1">A menos de 1 km</option>
            <option value="5">A menos de 5 km</option>
            <option value="10">A menos de 10 km</option>
            <option value="20">A menos de 20 km</option>
          </select>
        </div>
      </div>

      {/* Lost pets list grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lostPets
          .filter(pet => {
            const matchesSearch = pet.name.toLowerCase().includes(search.toLowerCase()) || 
                                  pet.breed.toLowerCase().includes(search.toLowerCase());
            const matchesSpecies = species === 'Todos' || pet.species === species;
            return matchesSearch && matchesSpecies;
          })
          .map((pet, index) => (
            <div key={pet.id} className="bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 shadow-sm overflow-hidden flex flex-col justify-between">
              <div className="h-40 overflow-hidden relative bg-petuno-background">
                <img src={pet.photo} alt={pet.name} className="w-full h-full object-cover" />
                
                {/* Badges Overlay */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                  <span className="bg-petuno-coral text-white font-extrabold px-2.5 py-0.5 rounded-full text-[10px] flex items-center gap-1 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span> Perdido
                  </span>
                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-md ${
                    pet.hasGps ? 'bg-petuno-purple text-white' : 'bg-white dark:bg-dark-surface text-petuno-text dark:text-dark-text border border-petuno-border/50'
                  }`}>
                    {pet.hasGps ? '🛰️ GPS Activo' : '🏷️ Código QR'}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-lg">{pet.name}</h3>
                  <p className="text-xs text-petuno-secondary-text mt-0.5">{pet.species} • {pet.breed}</p>
                  
                  <div className="mt-4 space-y-2 border-t border-petuno-border dark:border-petuno-secondary-text/10 pt-4 text-xs text-petuno-secondary-text">
                    <div className="flex justify-between">
                      <span className="font-semibold">Último reporte:</span>
                      <span className="font-bold text-petuno-text dark:text-dark-text">
                        {pet.hasGps ? '📍 GPS Satelital En Línea' : `📍 Visto en Cedritos`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Distancia:</span>
                      <span className="font-bold text-petuno-text dark:text-dark-text">~{(index * 1.5 + 1.2).toFixed(1)} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Fecha reporte:</span>
                      <span className="font-bold text-petuno-text dark:text-dark-text">Hace {index * 2 + 3} horas</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-6">
                  <button 
                    onClick={() => onViewPublicProfile(pet.id)}
                    className="bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 hover:bg-petuno-background dark:hover:bg-dark-surface-elevated text-xs font-bold py-2 rounded-xl text-center"
                  >
                    Ver Ficha
                  </button>
                  <button 
                    onClick={() => onReportSighting(pet.id)}
                    className="bg-petuno-purple hover:bg-petuno-purple-dark text-white text-xs font-bold py-2 rounded-xl shadow-sm text-center"
                  >
                    Reportar Avistamiento
                  </button>
                </div>
              </div>
            </div>
          ))}

        {lostPets.length === 0 && (
          <div className="col-span-full py-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-petuno-purple-50 dark:bg-dark-surface-elevated flex items-center justify-center text-petuno-purple mb-4">
              <PawPrint className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold">No hay alertas activas</h3>
            <p className="text-sm text-petuno-secondary-text max-w-sm mt-1">¡Qué gran noticia! Actualmente no hay reportes de mascotas perdidas en tu zona.</p>
          </div>
        )}
      </div>
    </div>
  );
}
