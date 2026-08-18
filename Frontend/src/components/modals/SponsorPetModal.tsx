import React, { useState } from 'react';
import { X, ShieldCheck } from 'lucide-react';

export default function SponsorPetModal({ 
  pet, 
  onClose 
}: { 
  pet: any; 
  onClose: () => void; 
}) {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('20000');
  const [customAmount, setCustomAmount] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');

  const activeAmount = amount === 'custom' ? customAmount : amount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 font-sans text-left">
      <div className="bg-petuno-surface dark:bg-dark-surface max-w-sm w-full rounded-3xl p-6 border border-petuno-border dark:border-petuno-secondary-text/25 shadow-2xl relative">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-petuno-secondary-text dark:text-dark-secondary-text hover:bg-petuno-background dark:hover:bg-dark-surface-elevated p-1.5 rounded-lg transition-all">
          <X className="w-5 h-5" />
        </button>

        {step < 3 ? (
          <div className="space-y-4 pt-2">
            <div className="text-center">
              <h3 className="text-base font-extrabold flex items-center justify-center gap-1.5">
                ❤️ Apadrinar a {pet.name}
              </h3>
              <p className="text-[10px] text-petuno-secondary-text mt-1">Cubre los gastos médicos y alimenticios de {pet.name}.</p>
            </div>

            <div className="flex gap-2 justify-center py-1">
              <span className={`w-6 h-1 rounded-full ${step === 1 ? 'bg-petuno-purple' : 'bg-petuno-border dark:bg-petuno-secondary-text/20'}`}></span>
              <span className={`w-6 h-1 rounded-full ${step === 2 ? 'bg-petuno-purple' : 'bg-petuno-border dark:bg-petuno-secondary-text/20'}`}></span>
            </div>

            {step === 1 ? (
              <div className="space-y-4 text-xs">
                <div className="text-left space-y-1.5">
                  <label className="block text-[10px] font-bold text-petuno-secondary-text uppercase tracking-wider">Aporte Mensual (COP)</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['15000', '30000', '60000'].map(val => (
                      <button 
                        key={val}
                        type="button"
                        onClick={() => setAmount(val)}
                        className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                          amount === val 
                            ? 'bg-petuno-purple border-petuno-purple text-white' 
                            : 'border-petuno-border hover:bg-petuno-background dark:border-petuno-secondary-text/20 dark:hover:bg-dark-surface-elevated text-petuno-secondary-text'
                        }`}
                      >
                        ${parseInt(val).toLocaleString()}
                      </button>
                    ))}
                    <button 
                      type="button"
                      onClick={() => setAmount('custom')}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all col-span-3 ${
                        amount === 'custom' 
                          ? 'bg-petuno-purple border-petuno-purple text-white' 
                          : 'border-petuno-border hover:bg-petuno-background dark:border-petuno-secondary-text/20 dark:hover:bg-dark-surface-elevated text-petuno-secondary-text'
                      }`}
                    >
                      Otro Monto
                    </button>
                  </div>
                  
                  {amount === 'custom' && (
                    <input 
                      type="number" 
                      required
                      placeholder="Aporte mensual personalizado"
                      value={customAmount}
                      onChange={e => setCustomAmount(e.target.value)}
                      className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-petuno-purple transition-all"
                    />
                  )}
                </div>

                <button 
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full bg-petuno-purple hover:bg-petuno-purple-dark text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-md mt-2"
                >
                  Continuar al Pago
                </button>

                <div className="border-t border-petuno-border/40 dark:border-petuno-secondary-text/10 pt-3 mt-2 text-[9.5px] text-petuno-secondary-text dark:text-dark-secondary-text space-y-1">
                  <div className="flex items-center gap-1 font-extrabold text-petuno-purple dark:text-petuno-purple-light uppercase">
                    <span>🛡️ Transparencia de Apadrinamiento</span>
                  </div>
                  <p className="leading-snug">
                    Petuno no cobra comisiones. Tu aporte mensual financia directamente a <strong>{pet.shelter}</strong> (NIT Verificado ✓) para cubrir la manutención y salud de {pet.name}.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="text-left space-y-1.5">
                  <label className="block text-[10px] font-bold text-petuno-secondary-text uppercase tracking-wider">Nombre del Padrino</label>
                  <input 
                    type="text" required placeholder="John Doe" value={cardName} onChange={e => setCardName(e.target.value)}
                    className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-petuno-purple transition-all"
                  />
                </div>
                <div className="text-left space-y-1.5">
                  <label className="block text-[10px] font-bold text-petuno-secondary-text uppercase tracking-wider">Número de Tarjeta</label>
                  <input 
                    type="text" required placeholder="4000 1234 5678 9010" value={cardNumber} onChange={e => setCardNumber(e.target.value)}
                    className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-petuno-purple transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-left space-y-1.5">
                    <label className="block text-[10px] font-bold text-petuno-secondary-text uppercase tracking-wider">Vencimiento</label>
                    <input 
                      type="text" required placeholder="MM/AA"
                      className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-petuno-purple transition-all"
                    />
                  </div>
                  <div className="text-left space-y-1.5">
                    <label className="block text-[10px] font-bold text-petuno-secondary-text uppercase tracking-wider">CVC</label>
                    <input 
                      type="password" required placeholder="•••"
                      className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-petuno-purple transition-all"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button 
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 bg-transparent hover:bg-petuno-border/20 border border-petuno-border dark:border-petuno-secondary-text/30 font-bold py-2.5 rounded-xl text-xs transition-all"
                  >
                    Atrás
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 bg-petuno-purple hover:bg-petuno-purple-dark text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-md"
                  >
                    Apadrinar
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          <div className="text-center space-y-4 pt-4 font-sans">
            <div className="w-12 h-12 rounded-full bg-petuno-mint-light flex items-center justify-center mx-auto border border-petuno-mint/20">
              <ShieldCheck className="w-6 h-6 text-petuno-mint" />
            </div>
            <h3 className="text-base font-extrabold text-petuno-text dark:text-dark-text">¡Padrino Registrado!</h3>
            <p className="text-xs text-petuno-secondary-text leading-relaxed">
              Muchas gracias **{cardName}**. Has registrado un apadrinamiento mensual de **${parseInt(activeAmount).toLocaleString()} COP** para **{pet.name}**. ¡Tu aporte mensual financiará su comida y atención veterinaria en **{pet.shelter}**!
            </p>
            <button 
              onClick={onClose}
              className="w-full bg-petuno-purple hover:bg-petuno-purple-dark text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-md"
            >
              Cerrar
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
