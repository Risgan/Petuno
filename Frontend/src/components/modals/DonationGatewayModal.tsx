import React, { useState } from 'react';
import { X, ShieldCheck } from 'lucide-react';

export default function DonationGatewayModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [fund, setFund] = useState('Sismo Colombia');
  const [amount, setAmount] = useState('20000');
  const [customAmount, setCustomAmount] = useState('');
  const [tip, setTip] = useState('2000');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const activeAmount = amount === 'custom' ? customAmount : amount;
  const numericAmount = parseInt(activeAmount) || 0;
  const numericTip = parseInt(tip) || 0;
  const totalAmount = numericAmount + numericTip;

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
                ❤️ Donación SOS Segura
              </h3>
              <p className="text-[10px] text-petuno-secondary-text mt-1">Apoya directamente a las mascotas damnificadas.</p>
            </div>

            <div className="flex gap-2 justify-center py-1">
              <span className={`w-6 h-1 rounded-full ${step === 1 ? 'bg-petuno-purple' : 'bg-petuno-border dark:bg-petuno-secondary-text/20'}`}></span>
              <span className={`w-6 h-1 rounded-full ${step === 2 ? 'bg-petuno-purple' : 'bg-petuno-border dark:bg-petuno-secondary-text/20'}`}></span>
            </div>

            {step === 1 ? (
              <div className="space-y-4 text-xs">
                <div className="text-left space-y-1.5">
                  <label className="block text-[10px] font-bold text-petuno-secondary-text uppercase tracking-wider">Causa / Destinatario</label>
                  <select 
                    value={fund} 
                    onChange={e => setFund(e.target.value)}
                    className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-petuno-purple dark:bg-dark-surface"
                  >
                    <option value="Sismo Colombia">Fondo Sismo Colombia 🚨</option>
                    <option value="Patitas Felices">Fundación Patitas Felices</option>
                    <option value="Huellas de Amor">Refugio Huellas de Amor</option>
                  </select>
                </div>

                <div className="text-left space-y-1.5">
                  <label className="block text-[10px] font-bold text-petuno-secondary-text uppercase tracking-wider">Monto a Donar (COP)</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['10000', '20000', '50000'].map(val => (
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
                      placeholder="Monto personalizado en COP"
                      value={customAmount}
                      onChange={e => setCustomAmount(e.target.value)}
                      className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-petuno-purple transition-all"
                    />
                  )}
                </div>

                {/* Voluntary Tip Option */}
                <div className="text-left space-y-2 border-t border-petuno-border/50 dark:border-petuno-secondary-text/10 pt-4">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-petuno-purple dark:text-petuno-purple-light uppercase tracking-wider">Aporte para mantener Petuno</span>
                    <span className="bg-petuno-purple/10 text-petuno-purple dark:text-petuno-purple-light text-[8px] font-bold px-1.5 py-0.5 rounded">Recomendado</span>
                  </div>
                  <p className="text-[10px] text-petuno-secondary-text leading-tight">
                    Petuno no cobra comisión a los albergues. Si lo deseas, puedes añadir una pequeña propina voluntaria para sufragar gastos de dominio, servidor y alertas SMS:
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {['0', '2000', '5000'].map(val => (
                      <button 
                        key={val}
                        type="button"
                        onClick={() => setTip(val)}
                        className={`py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                          tip === val 
                            ? 'bg-petuno-purple border-petuno-purple text-white' 
                            : 'border-petuno-border hover:bg-petuno-background dark:border-petuno-secondary-text/20 dark:hover:bg-dark-surface-elevated text-petuno-secondary-text'
                        }`}
                      >
                        {val === '0' ? 'Sin aporte' : `$${parseInt(val).toLocaleString()}`}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full bg-petuno-purple hover:bg-petuno-purple-dark text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-md mt-2"
                >
                  Continuar al Pago
                </button>
              </div>
            ) : (
              <form onSubmit={handleDonateSubmit} className="space-y-4 text-xs">
                {/* Amount Summary */}
                <div className="bg-petuno-background dark:bg-dark-surface-elevated p-3.5 rounded-2xl space-y-1.5 text-xs border border-petuno-border/50 dark:border-petuno-secondary-text/10">
                  <div className="flex justify-between text-petuno-secondary-text">
                    <span>Donación a la Causa:</span>
                    <span className="font-bold text-petuno-text dark:text-dark-text">${numericAmount.toLocaleString()} COP</span>
                  </div>
                  {numericTip > 0 && (
                    <div className="flex justify-between text-petuno-purple dark:text-petuno-purple-light">
                      <span>Soporte a Petuno:</span>
                      <span className="font-bold">+${numericTip.toLocaleString()} COP</span>
                    </div>
                  )}
                  <hr className="border-dashed border-petuno-border/60 my-1" />
                  <div className="flex justify-between font-extrabold text-xs">
                    <span>Total a pagar:</span>
                    <span>${totalAmount.toLocaleString()} COP</span>
                  </div>
                </div>

                <div className="text-left space-y-1.5">
                  <label className="block text-[10px] font-bold text-petuno-secondary-text uppercase tracking-wider">Nombre en la tarjeta</label>
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
                    Donar ${totalAmount.toLocaleString()}
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
            <h3 className="text-base font-extrabold text-petuno-text dark:text-dark-text">¡Donación Exitosa!</h3>
            <p className="text-xs text-petuno-secondary-text leading-relaxed">
              Muchas gracias. Has donado **${numericAmount.toLocaleString()} COP** para **{fund === 'Sismo Colombia' ? 'el Fondo de Emergencia de Colombia' : fund}**.
              {numericTip > 0 && (
                <> Y has aportado **${numericTip.toLocaleString()} COP** adicionales a Petuno para financiar servidores y alertas de emergencia. ¡Tu apoyo mantiene viva la red!</>
              )}
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
