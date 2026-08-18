import { useState } from 'react';
import { X } from 'lucide-react';
import AdoptionFormWizardModal from '../components/modals/AdoptionFormWizardModal';
import SponsorPetModal from '../components/modals/SponsorPetModal';

export default function PublicAdoptionsView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('Todos');
  const [showSpecialNeeds, setShowSpecialNeeds] = useState(false);
  const [activePetForForm, setActivePetForForm] = useState<any | null>(null);
  const [activePetForSponsor, setActivePetForSponsor] = useState<any | null>(null);

  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState<{
    housing: string;
    hasOtherPets: string;
    hoursAlone: string;
    preferredSpecies: string;
    activityLevel: string;
  } | null>(null);
  const [tempAnswers, setTempAnswers] = useState({
    housing: 'Apartamento',
    hasOtherPets: 'No, ninguno',
    hoursAlone: 'Entre 4 y 8 horas',
    preferredSpecies: 'Ambos',
    activityLevel: 'Activo (Juegos diarios, paseos medianos)'
  });

  const getCompatibilityScore = (pet: any) => {
    if (!quizAnswers) return null;
    let score = 70;
    
    // Species preference matching
    if (quizAnswers.preferredSpecies === 'Perro' && pet.species === 'Perro') score += 15;
    else if (quizAnswers.preferredSpecies === 'Gato' && pet.species === 'Gato') score += 15;
    else if (quizAnswers.preferredSpecies === 'Ambos') score += 10;
    
    // Size and housing matching
    if (quizAnswers.housing === 'Apartamento' && pet.size === 'Pequeño') score += 10;
    else if (quizAnswers.housing === 'Apartamento' && pet.size === 'Grande') score -= 15;
    else if (quizAnswers.housing.includes('finca') && pet.size === 'Grande') score += 12;
    
    // Age and activity
    if (quizAnswers.activityLevel.includes('Activo') && pet.age.includes('meses')) score += 8;
    else if (quizAnswers.activityLevel.includes('Tranquilo') && pet.age.includes('años')) score += 8;

    // Stable deterministic offset based on name characters
    const charOffset = pet.name.charCodeAt(0) % 7;
    score += charOffset;
    
    return Math.min(Math.max(score, 60), 99);
  };

  const adoptablePets = [
    {
      id: 'a1',
      name: 'Lola',
      species: 'Perro',
      breed: 'Criolla (Poodle Mix)',
      age: '6 meses',
      gender: 'Hembra',
      size: 'Pequeño',
      specialNeeds: false,
      shelter: 'Fundación Patitas Felices',
      description: 'Lola es extremadamente tierna, juguetona y de tamaño ideal para apartamento. Le encantan los niños.',
      photo: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 'a2',
      name: 'Simba',
      species: 'Gato',
      breed: 'Común Europeo (Tabby)',
      age: '1 año',
      gender: 'Macho',
      size: 'Mediano',
      specialNeeds: false,
      shelter: 'Refugio Huellas de Amor',
      description: 'Simba es muy cariñoso y hogareño, le encanta ronronear en tu regazo y es muy sociable.',
      photo: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 'a3',
      name: 'Rocco',
      species: 'Perro',
      breed: 'Golden Retriever Mix',
      age: '2 años',
      gender: 'Macho',
      size: 'Grande',
      specialNeeds: true,
      shelter: 'Fundación Patitas Felices',
      description: 'Rocco es trípode tras un rescate en la calle, pero corre y juega como cualquier cachorro. Busca una familia cariñosa.',
      photo: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 'a4',
      name: 'Kiwi',
      species: 'Perro',
      breed: 'Pastor Alemán Mix',
      age: '8 meses',
      gender: 'Macho',
      size: 'Mediano',
      specialNeeds: false,
      shelter: 'Refugio Huellas de Amor',
      description: 'Kiwi es extremadamente activo, inteligente y excelente guardián. Requiere espacio exterior.',
      photo: 'https://images.unsplash.com/photo-158351165526-05700d52f4d9?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 'a5',
      name: 'Sasha',
      species: 'Gato',
      breed: 'Siamesa',
      age: '3 meses',
      gender: 'Hembra',
      size: 'Pequeño',
      specialNeeds: false,
      shelter: 'Refugio Huellas de Amor',
      description: 'Sasha es una cachorra mimada, llena de energía, ideal para convivir con otras mascotas.',
      photo: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 'a6',
      name: 'Bethoven',
      species: 'Perro',
      breed: 'San Bernardo Mix',
      age: '4 años',
      gender: 'Macho',
      size: 'Grande',
      specialNeeds: false,
      shelter: 'Refugio Huellas de Amor',
      description: 'Un gigante noble y tranquilo. Se lleva excelente con gatos y es de temperamento calmado.',
      photo: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=600&auto=format&fit=crop'
    }
  ];

  const filteredPets = adoptablePets.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          pet.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pet.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecies = selectedSpecies === 'Todos' || pet.species === selectedSpecies;
    const matchesNeeds = !showSpecialNeeds || pet.specialNeeds;
    return matchesSearch && matchesSpecies && matchesNeeds;
  });

  return (
    <div className="min-h-screen bg-petuno-background dark:bg-dark-background font-sans pt-28 pb-16 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Title */}
        <div>
          <span className="text-[10px] font-extrabold bg-petuno-purple/10 text-petuno-purple px-2.5 py-1 rounded-full uppercase tracking-wider block w-max mb-2">
            🏡 Adopción Responsable
          </span>
          <h1 className="text-3xl font-extrabold text-petuno-text dark:text-dark-text">
            Encuentra a tu Nuevo Compañero
          </h1>
          <p className="text-sm text-petuno-secondary-text mt-1 max-w-xl">
            Explora las mascotas resguardadas en las fundaciones de Colombia. Adopta de forma responsable o apadrina su manutención y salud.
          </p>
        </div>

        {/* Compatibility Matching Wizard Banner */}
        <div className="bg-gradient-to-r from-petuno-purple/10 to-petuno-coral/10 p-6 rounded-3xl border border-petuno-purple/20 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
          <div className="space-y-1 text-left">
            <h4 className="text-sm font-extrabold text-petuno-purple dark:text-petuno-purple-light flex items-center gap-1.5 uppercase tracking-wider">
              ❤️ Encuentra tu compañero ideal
            </h4>
            <p className="text-xs text-petuno-secondary-text dark:text-dark-secondary-text leading-relaxed">
              {quizAnswers 
                ? '¡Test completado! Mostrando porcentajes de compatibilidad personalizados en las tarjetas.'
                : 'Responde 5 preguntas rápidas y nuestro algoritmo inteligente te recomendará las mascotas más compatibles con tu estilo de vida.'
              }
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setQuizStep(1);
                setShowQuiz(true);
              }}
              className="bg-petuno-purple hover:bg-petuno-purple-dark text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors shadow-sm whitespace-nowrap"
            >
              {quizAnswers ? '🔄 Repetir Test' : '📝 Iniciar Test'}
            </button>
            {quizAnswers && (
              <button
                onClick={() => setQuizAnswers(null)}
                className="bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 hover:bg-petuno-background dark:hover:bg-dark-surface-elevated text-xs font-bold px-3 py-2 rounded-xl"
              >
                Limpiar
              </button>
            )}
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-petuno-surface dark:bg-dark-surface p-4 rounded-3xl border border-petuno-border dark:border-petuno-secondary-text/15 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-petuno-secondary-text">
              🔍
            </span>
            <input 
              type="text" 
              placeholder="Buscar por nombre, raza..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-petuno-background dark:bg-dark-surface-elevated border border-petuno-border dark:border-transparent rounded-2xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-petuno-purple transition-all placeholder-petuno-muted"
            />
          </div>

          <div className="flex flex-wrap gap-2 items-center w-full md:w-auto">
            <button 
              onClick={() => setSelectedSpecies('Todos')}
              className={`text-xs font-bold px-4 py-2 rounded-full transition-all ${
                selectedSpecies === 'Todos' 
                  ? 'bg-petuno-purple text-white' 
                  : 'bg-petuno-background dark:bg-dark-surface-elevated text-petuno-secondary-text'
              }`}
            >
              Todos
            </button>
            <button 
              onClick={() => setSelectedSpecies('Perro')}
              className={`text-xs font-bold px-4 py-2 rounded-full transition-all ${
                selectedSpecies === 'Perro' 
                  ? 'bg-petuno-purple text-white' 
                  : 'bg-petuno-background dark:bg-dark-surface-elevated text-petuno-secondary-text'
              }`}
            >
              Perros
            </button>
            <button 
              onClick={() => setSelectedSpecies('Gato')}
              className={`text-xs font-bold px-4 py-2 rounded-full transition-all ${
                selectedSpecies === 'Gato' 
                  ? 'bg-petuno-purple text-white' 
                  : 'bg-petuno-background dark:bg-dark-surface-elevated text-petuno-secondary-text'
              }`}
            >
              Gatos
            </button>
            
            <div className="w-px h-6 bg-petuno-border dark:bg-petuno-secondary-text/20 mx-2 hidden sm:block"></div>
            
            <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-bold text-petuno-secondary-text">
              <input 
                type="checkbox" 
                checked={showSpecialNeeds}
                onChange={e => setShowSpecialNeeds(e.target.checked)}
                className="w-4 h-4 rounded text-petuno-purple accent-petuno-purple cursor-pointer"
              />
              <span>Necesidades Especiales</span>
            </label>
          </div>
        </div>

        {/* Pets Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPets.map(pet => {
            const score = getCompatibilityScore(pet);
            return (
              <div key={pet.id} className="bg-petuno-surface dark:bg-dark-surface rounded-3xl overflow-hidden border border-petuno-border dark:border-petuno-secondary-text/10 shadow-sm flex flex-col group">
                <div className="relative h-56 w-full overflow-hidden bg-petuno-purple-50">
                  <img 
                    src={pet.photo} 
                    alt={pet.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  {pet.specialNeeds && (
                    <span className="absolute top-4 left-4 bg-petuno-coral text-white text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                      Cuidados Especiales
                    </span>
                  )}
                  {score && (
                    <span className="absolute top-4 right-4 bg-petuno-purple text-white text-[9.5px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md animate-pulse">
                      💖 {score}% Compatible
                    </span>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="text-left">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-extrabold text-petuno-purple uppercase tracking-wider">{pet.breed} • {pet.gender}</span>
                        <h3 className="font-extrabold text-lg text-petuno-text dark:text-dark-text mt-0.5">{pet.name}</h3>
                      </div>
                      <span className="bg-petuno-background dark:bg-dark-surface-elevated text-petuno-secondary-text text-[10px] font-bold px-2 py-1 rounded-full border border-petuno-border/30">
                        {pet.age}
                      </span>
                    </div>
                    <p className="text-xs text-petuno-secondary-text dark:text-dark-secondary-text mt-3 leading-relaxed">
                      {pet.description}
                    </p>
                    <p className="text-[10px] text-petuno-muted mt-2 font-semibold flex items-center gap-1.5">
                      🏠 Albergue: {pet.shelter}
                      <span className="bg-petuno-purple/10 text-petuno-purple text-[8.5px] font-extrabold px-2 py-0.5 rounded">🛡️ Verificada NIT ✓</span>
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button 
                      onClick={() => setActivePetForForm(pet)}
                      className="bg-petuno-purple hover:bg-petuno-purple-dark text-white font-bold py-2.5 rounded-xl text-xs transition-all shadow-sm"
                    >
                      Adoptar
                    </button>
                    <button 
                      onClick={() => setActivePetForSponsor(pet)}
                      className="bg-transparent hover:bg-petuno-border/20 border border-petuno-border dark:border-petuno-secondary-text/30 text-petuno-text dark:text-dark-text font-bold py-2.5 rounded-xl text-xs transition-all"
                    >
                      Apadrinar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredPets.length === 0 && (
            <div className="col-span-full bg-petuno-surface dark:bg-dark-surface py-16 rounded-3xl border border-petuno-border text-center">
              <p className="text-sm text-petuno-secondary-text">No encontramos mascotas con los filtros seleccionados.</p>
            </div>
          )}
        </div>

      </div>

      {activePetForForm && (
        <AdoptionFormWizardModal 
          pet={activePetForForm} 
          onClose={() => setActivePetForForm(null)} 
        />
      )}

      {activePetForSponsor && (
        <SponsorPetModal 
          pet={activePetForSponsor} 
          onClose={() => setActivePetForSponsor(null)} 
        />
      )}

      {showQuiz && (
        <div className="fixed inset-0 z-55 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 font-sans text-left">
          <div className="bg-petuno-surface dark:bg-dark-surface max-w-sm w-full rounded-3xl p-6 border border-petuno-border dark:border-petuno-secondary-text/25 shadow-2xl relative">
            
            <button 
              onClick={() => setShowQuiz(false)} 
              className="absolute top-4 right-4 text-petuno-secondary-text dark:text-dark-secondary-text hover:bg-petuno-background p-1.5 rounded-lg transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4 pt-2">
              <div className="text-center">
                <h3 className="text-sm font-extrabold text-petuno-purple uppercase tracking-wider">
                  ❤️ Encuentra tu compañero ideal
                </h3>
                <p className="text-[10px] text-petuno-secondary-text mt-1">Paso {quizStep} de 5</p>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-petuno-border dark:bg-petuno-secondary-text/20 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-petuno-purple h-full transition-all duration-300"
                  style={{ width: `${quizStep * 20}%` }}
                ></div>
              </div>

              {quizStep === 1 && (
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-petuno-secondary-text uppercase">1. ¿Qué tipo de vivienda tienes?</label>
                  {['Apartamento', 'Casa con patio pequeño', 'Casa con finca/patio grande'].map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setTempAnswers({ ...tempAnswers, housing: opt })}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs text-left border font-semibold transition-all ${
                        tempAnswers.housing === opt
                          ? 'border-petuno-purple bg-petuno-purple text-white shadow-sm'
                          : 'border-petuno-border hover:bg-petuno-background dark:border-petuno-secondary-text/25 text-petuno-secondary-text'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {quizStep === 2 && (
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-petuno-secondary-text uppercase">2. ¿Tienes otros animales en el hogar?</label>
                  {['Sí, perros', 'Sí, gatos', 'Sí, ambos', 'No, ninguno'].map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setTempAnswers({ ...tempAnswers, hasOtherPets: opt })}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs text-left border font-semibold transition-all ${
                        tempAnswers.hasOtherPets === opt
                          ? 'border-petuno-purple bg-petuno-purple text-white shadow-sm'
                          : 'border-petuno-border hover:bg-petuno-background dark:border-petuno-secondary-text/25 text-petuno-secondary-text'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {quizStep === 3 && (
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-petuno-secondary-text uppercase">3. ¿Cuántas horas al día pasará la mascota sola?</label>
                  {['Menos de 4 horas', 'Entre 4 y 8 horas', 'Más de 8 horas'].map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setTempAnswers({ ...tempAnswers, hoursAlone: opt })}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs text-left border font-semibold transition-all ${
                        tempAnswers.hoursAlone === opt
                          ? 'border-petuno-purple bg-petuno-purple text-white shadow-sm'
                          : 'border-petuno-border hover:bg-petuno-background dark:border-petuno-secondary-text/25 text-petuno-secondary-text'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {quizStep === 4 && (
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-petuno-secondary-text uppercase">4. ¿Qué especie estás buscando adoptar?</label>
                  {['Perro', 'Gato', 'Ambos'].map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setTempAnswers({ ...tempAnswers, preferredSpecies: opt })}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs text-left border font-semibold transition-all ${
                        tempAnswers.preferredSpecies === opt
                          ? 'border-petuno-purple bg-petuno-purple text-white shadow-sm'
                          : 'border-petuno-border hover:bg-petuno-background dark:border-petuno-secondary-text/25 text-petuno-secondary-text'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {quizStep === 5 && (
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-petuno-secondary-text uppercase">5. ¿Qué nivel de actividad prefieres para tu mascota?</label>
                  {['Tranquilo (Paseos cortos, calma)', 'Activo (Juegos diarios, paseos medianos)', 'Muy Enérgico (Deporte, senderismo, correr)'].map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setTempAnswers({ ...tempAnswers, activityLevel: opt })}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs text-left border font-semibold transition-all ${
                        tempAnswers.activityLevel === opt
                          ? 'border-petuno-purple bg-petuno-purple text-white shadow-sm'
                          : 'border-petuno-border hover:bg-petuno-background dark:border-petuno-secondary-text/25 text-petuno-secondary-text'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                {quizStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setQuizStep(quizStep - 1)}
                    className="flex-1 bg-transparent hover:bg-petuno-background border border-petuno-border dark:border-petuno-secondary-text/30 font-bold py-2.5 rounded-xl text-xs text-petuno-text dark:text-dark-text text-center transition-all"
                  >
                    Atrás
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowQuiz(false)}
                    className="flex-1 bg-transparent hover:bg-petuno-background border border-petuno-border dark:border-petuno-secondary-text/30 font-bold py-2.5 rounded-xl text-xs text-petuno-text dark:text-dark-text text-center transition-all"
                  >
                    Cancelar
                  </button>
                )}
                
                {quizStep < 5 ? (
                  <button
                    type="button"
                    onClick={() => setQuizStep(quizStep + 1)}
                    className="flex-1 bg-petuno-purple hover:bg-petuno-purple-dark text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-sm text-center"
                  >
                    Siguiente
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setQuizAnswers(tempAnswers);
                      setShowQuiz(false);
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-sm text-center"
                  >
                    Finalizar Test
                  </button>
                )}
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
