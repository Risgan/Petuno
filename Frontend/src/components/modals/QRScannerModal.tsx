import React, { useState } from 'react';
import { X, QrCode } from 'lucide-react';

export default function QRScannerModal({ 
  onClose,
  onScanSuccess
}: { 
  onClose: () => void;
  onScanSuccess: (petId: string) => void;
}) {
  const [scanCode, setScanCode] = useState('');
  const [error, setError] = useState('');

  const handleScanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = scanCode.trim().toUpperCase();
    const codeMap: { [key: string]: string } = {
      'PTO-82A91X': 'max',
      'PTO-93B22Y': 'luna',
      'PTO-11A99Z': 'toby',
      'PTO-22B88Y': 'michi'
    };

    if (codeMap[cleanCode]) {
      onScanSuccess(codeMap[cleanCode]);
      onClose();
    } else {
      setError('Código no encontrado. Intenta con: PTO-82A91X, PTO-93B22Y o PTO-11A99Z');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4 font-sans text-left">
      <div className="bg-petuno-surface dark:bg-dark-surface max-w-sm w-full rounded-3xl p-6 border border-petuno-border dark:border-petuno-secondary-text/25 shadow-2xl relative text-center">
        <style>{`
          @keyframes scanLaser {
            0% { top: 0%; }
            50% { top: 100%; }
            100% { top: 0%; }
          }
        `}</style>

        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-petuno-secondary-text dark:text-dark-secondary-text hover:bg-petuno-background dark:hover:bg-dark-surface-elevated p-1.5 rounded-lg transition-all">
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center space-y-5 pt-4">
          <div className="w-12 h-12 rounded-xl bg-petuno-purple-50 dark:bg-dark-surface-elevated flex items-center justify-center">
            <QrCode className="w-6 h-6 text-petuno-purple" />
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-bold text-petuno-text dark:text-dark-text">Escanear Placa QR</h3>
            <p className="text-xs text-petuno-secondary-text mt-1">Simula la lectura de la placa física de una mascota.</p>
          </div>

          {/* Scanner Box Graphic */}
          <div className="relative w-44 h-44 bg-black/10 dark:bg-white/5 border border-petuno-border dark:border-petuno-secondary-text/20 rounded-2xl overflow-hidden flex items-center justify-center">
            <div className="absolute inset-4 border-2 border-dashed border-petuno-purple/40 rounded-xl opacity-60"></div>
            {/* Laser Line Animation */}
            <div 
              className="absolute left-0 right-0 h-0.5 bg-petuno-purple shadow-[0_0_8px_#5428C7] select-none pointer-events-none"
              style={{
                top: '0%',
                animation: 'scanLaser 2.5s infinite ease-in-out'
              }}
            ></div>
            <span className="text-[10px] text-petuno-secondary-text dark:text-dark-secondary-text font-semibold uppercase tracking-wider select-none">Buscando placa...</span>
          </div>

          {error && (
            <p className="text-[10px] text-petuno-coral font-bold bg-petuno-coral/10 p-2 rounded-lg w-full text-center">{error}</p>
          )}

          <form onSubmit={handleScanSubmit} className="w-full space-y-3">
            <div className="text-left">
              <label className="block text-[10px] font-bold text-petuno-secondary-text mb-1 uppercase tracking-wider">Código del collar (Ej: PTO-82A91X)</label>
              <input 
                type="text" 
                required
                value={scanCode}
                onChange={e => { setScanCode(e.target.value); setError(''); }}
                placeholder="PTO-82A91X" 
                className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-xs font-mono text-center focus:outline-none focus:border-petuno-purple transition-all uppercase placeholder-petuno-muted"
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-petuno-purple hover:bg-petuno-purple-dark text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-md"
            >
              Escanear Placa
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
