import { X, QrCode } from 'lucide-react';
import type { Pet } from '../../types';
import QrCodeMockup from '../QrCodeMockup';

export default function QRPreviewModal({ 
  pet, 
  onClose 
}: { 
  pet: Pet; 
  onClose: () => void; 
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-petuno-surface dark:bg-dark-surface max-w-sm w-full rounded-2xl p-6 border border-petuno-border dark:border-petuno-secondary-text/25 shadow-2xl relative text-center">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-petuno-secondary-text dark:text-dark-secondary-text hover:bg-petuno-background dark:hover:bg-dark-surface-elevated p-1.5 rounded-lg transition-all">
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center space-y-6 pt-4">
          <div className="w-12 h-12 rounded-xl bg-petuno-purple-50 dark:bg-dark-surface-elevated flex items-center justify-center">
            <QrCode className="w-6 h-6 text-petuno-purple" />
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-bold text-petuno-text dark:text-dark-text">Identidad QR de {pet.name}</h3>
            <p className="text-xs text-petuno-secondary-text dark:text-dark-secondary-text mt-1">PTO ID: <span className="font-mono font-bold text-petuno-purple dark:text-petuno-purple-light">{pet.petunoId}</span></p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-inner border border-petuno-border">
            <QrCodeMockup />
          </div>

          <p className="text-xs text-petuno-muted leading-relaxed max-w-xs">
            Al escanear esta placa, cualquier persona podrá ver la ficha de protección de {pet.name} y contactarte de forma anónima para devolvértelo.
          </p>

          <div className="w-full flex gap-3">
            <button 
              onClick={() => { alert('Imprimiendo placa de identificación QR...'); }} 
              className="flex-1 bg-petuno-purple hover:bg-petuno-purple-dark text-white font-semibold py-2.5 rounded-xl text-xs transition-colors shadow-md"
            >
              Imprimir QR
            </button>
            <button 
              onClick={onClose}
              className="flex-1 bg-transparent hover:bg-petuno-border/30 border border-petuno-border dark:border-petuno-secondary-text/30 font-semibold py-2.5 rounded-xl text-xs transition-colors"
            >
              Cerrar
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
