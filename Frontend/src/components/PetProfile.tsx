import { useState } from 'react';
import { 
  Check, Copy, Edit, AlertTriangle, Calendar, Heart, 
  Cpu, FileText, Trash2, QrCode, ArrowRight, Stethoscope, Plus, ShieldCheck
} from 'lucide-react';
import type { Pet } from '../types';
import InfoItem from './UI/InfoItem';
import { VaccineRow, DocumentRow, TimelineRow } from './UI/RowComponents';
import QrCodeMockup from './QrCodeMockup';

export default function PetProfile({ 
  pet, 
  onBack, 
  onEdit, 
  onDelete, 
  onToggleLost, 
  onCopyId, 
  copiedId,
  onShowQR 
}: { 
  pet: Pet; 
  onBack: () => void; 
  onEdit: (id: string) => void; 
  onDelete: (id: string) => void; 
  onToggleLost: (id: string) => void; 
  onCopyId: (idText: string) => void;
  copiedId: string | null;
  onShowQR: (id: string) => void;
}) {
  const [profileTab, setProfileTab] = useState('Resumen');

  const profileTabs = ['Resumen', 'Salud', 'Identidad', 'Ubicación', 'Documentos', 'Historial', 'Configuración'];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Back to list */}
      <div className="text-left">
        <button onClick={onBack} className="text-sm font-bold text-petuno-purple hover:underline flex items-center gap-1">
          ← Volver a mis mascotas
        </button>
      </div>

      {pet.status === 'Perdido' && (
        <div className="bg-petuno-coral-light/20 dark:bg-petuno-coral/5 border-2 border-dashed border-petuno-coral rounded-2xl p-6 text-left space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-extrabold text-petuno-coral flex items-center gap-1.5 uppercase">
                🚨 Modo Mascota Perdida Activo
              </h3>
              <p className="text-xs text-petuno-secondary-text dark:text-dark-secondary-text mt-1 max-w-xl">
                Petuno ha activado la red de rescate y ha auto-generado tu cartel SOS con código QR. Puedes imprimirlo para postes locales, compartirlo digitalmente o copiar el enlace directo.
              </p>
            </div>
            <button
              onClick={() => onToggleLost(pet.id)}
              className="bg-petuno-coral text-white hover:bg-petuno-coral-dark text-xs font-bold px-4 py-2.5 rounded-xl transition-all self-start sm:self-center whitespace-nowrap shadow-sm"
            >
              Marcar como Encontrado
            </button>
          </div>

          {/* SOS Poster Mock Visual Grid */}
          <div className="bg-white dark:bg-dark-surface-elevated rounded-2xl p-6 border-4 border-red-600 max-w-sm mx-auto space-y-4 text-center text-black dark:text-white shadow-xl font-sans">
            <div className="bg-red-600 text-white font-extrabold py-3 text-base rounded-lg tracking-widest animate-pulse">
              🚨 SE BUSCA 🚨
            </div>
            
            <div className="w-44 h-44 mx-auto rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
              <img src={pet.photo} alt={pet.name} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-1">
              <h4 className="text-2xl font-extrabold uppercase tracking-wide">{pet.name}</h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-bold">{pet.breed} • {pet.gender}</p>
              <p className="text-[10px] text-red-600 font-extrabold uppercase mt-1">Perdido en: {pet.lastSeenLocation || 'Zona de Cedritos, Bogotá'}</p>
            </div>

            <div className="bg-slate-50 dark:bg-dark-surface p-3.5 rounded-xl border border-slate-200/60 dark:border-petuno-secondary-text/10 space-y-3">
              <div className="flex justify-center">
                <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
                  <QrCodeMockup />
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[9.5px] font-extrabold text-petuno-purple uppercase tracking-wider block">Escanea para reportar ubicación</span>
                <p className="text-[9px] text-slate-600 dark:text-slate-400 leading-snug">
                  O entra a <strong>Petuno.com</strong> e ingresa el ID: <strong className="font-mono text-petuno-purple">{pet.petunoId}</strong> para alertar al dueño.
                </p>
              </div>
            </div>

            <div className="space-y-1 pt-1">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">Contacto de Emergencia:</p>
              <p className="text-base font-extrabold text-red-600">{pet.emergencyContact || '312 456 7890'}</p>
            </div>

            <div className="border-t border-slate-100 dark:border-petuno-secondary-text/15 pt-3 flex flex-wrap gap-2 justify-center">
              <button 
                onClick={() => {
                  alert('Generando PDF y abriendo menú de impresión de sistema...');
                  window.print();
                }}
                className="bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 px-3 py-2 rounded-lg text-[9px] font-extrabold flex items-center gap-1 hover:opacity-90 transition-all shadow-sm"
              >
                🖨️ Imprimir Cartel / PDF
              </button>
              <button 
                onClick={() => alert(`Compartiendo cartel de búsqueda en WhatsApp para: https://petuno.com/p/${pet.petunoId}`)}
                className="bg-green-600 text-white px-3 py-2 rounded-lg text-[9px] font-extrabold flex items-center gap-1 hover:bg-green-700 transition-all shadow-sm"
              >
                💬 Compartir
              </button>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(`https://petuno.com/p/${pet.petunoId}`);
                  alert('Enlace de búsqueda copiado al portapapeles.');
                }}
                className="bg-slate-100 dark:bg-dark-surface-elevated text-slate-700 dark:text-slate-200 px-3 py-2 rounded-lg text-[9px] font-extrabold flex items-center gap-1 hover:bg-slate-200 border border-slate-200 dark:border-transparent transition-all"
              >
                🔗 Copiar Enlace
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Header */}
      <div className="bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 p-6 shadow-sm flex flex-col md:flex-row items-center md:items-start gap-6 text-left relative overflow-hidden">
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-petuno-background flex-shrink-0">
          <img src={pet.photo} alt={pet.name} className="w-full h-full object-cover" />
        </div>

        <div className="flex-1 min-w-0 space-y-2 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <h2 className="text-3xl font-extrabold truncate">{pet.name}</h2>
            <div className="flex gap-2 justify-center md:justify-start">
              <span className={`border font-extrabold px-3 py-0.5 rounded-full flex items-center gap-1 text-[11px] ${
                pet.status === 'Perdido' 
                  ? 'bg-petuno-coral-light border-petuno-coral/20 text-petuno-coral' 
                  : 'bg-petuno-mint-light border-petuno-mint/20 text-petuno-mint'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${pet.status === 'Perdido' ? 'bg-petuno-coral animate-ping' : 'bg-petuno-mint'}`}></span>
                {pet.status === 'Perdido' ? 'Perdido' : 'Protegido'}
              </span>
              <span className="bg-petuno-purple/10 text-petuno-purple dark:text-petuno-purple-light text-[11px] font-bold px-2 py-0.5 rounded-full">
                {pet.gender}
              </span>
            </div>
          </div>
          <p className="text-sm text-petuno-secondary-text dark:text-dark-secondary-text">{pet.species} • {pet.breed}</p>
          
          <div className="flex items-center justify-center md:justify-start gap-2 pt-2 text-xs">
            <span className="text-petuno-secondary-text dark:text-dark-secondary-text font-semibold">Petuno ID:</span>
            <span className="font-mono font-bold text-petuno-purple dark:text-petuno-purple-light flex items-center gap-1.5 bg-petuno-background dark:bg-dark-surface-elevated px-2.5 py-1 rounded-lg">
              {pet.petunoId}
              <button onClick={() => onCopyId(pet.petunoId)} className="p-0.5 hover:bg-petuno-border rounded">
                {copiedId === pet.petunoId ? <Check className="w-3.5 h-3.5 text-petuno-mint" /> : <Copy className="w-3.5 h-3.5 text-petuno-muted" />}
              </button>
            </span>
          </div>
        </div>

        {/* Edit / Delete action buttons */}
        <div className="flex md:flex-col gap-2 mt-4 md:mt-0 md:self-center">
          <button 
            onClick={() => onEdit(pet.id)}
            className="flex items-center gap-1.5 px-4 py-2 border border-petuno-border dark:border-petuno-secondary-text/20 hover:bg-petuno-background dark:hover:bg-dark-surface-elevated text-xs font-bold rounded-xl transition-all"
          >
            <Edit className="w-4 h-4" /> Editar
          </button>
          <button 
            onClick={() => onToggleLost(pet.id)}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
              pet.status === 'Perdido'
                ? 'bg-petuno-coral-light border-petuno-coral/30 text-petuno-coral'
                : 'border-petuno-border dark:border-petuno-secondary-text/20 hover:bg-petuno-coral-light/20 text-petuno-coral'
            }`}
          >
            <AlertTriangle className="w-4 h-4" /> {pet.status === 'Perdido' ? 'Marcar Encontrado' : 'Reportar Perdido'}
          </button>
        </div>
      </div>

      {/* Tabs list navigation */}
      <div className="flex border-b border-petuno-border dark:border-petuno-secondary-text/15 overflow-x-auto whitespace-nowrap scrollbar-hide py-1">
        {profileTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setProfileTab(tab)}
            className={`px-4 py-2.5 text-sm font-bold border-b-2 transition-all -mb-px ${
              profileTab === tab
                ? 'border-petuno-purple text-petuno-purple dark:text-petuno-purple-light'
                : 'border-transparent text-petuno-secondary-text dark:text-dark-secondary-text hover:text-petuno-text'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 1. TABS CONTENT: RESUMEN */}
      {profileTab === 'Resumen' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
          
          {/* Detailed Info Card */}
          <div className="lg:col-span-2 space-y-6">
            
            <div className="bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 p-6 shadow-sm">
              <h3 className="text-base font-extrabold mb-4">Información básica</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                <InfoItem label="ESPECIE" value={pet.species} />
                <InfoItem label="RAZA" value={pet.breed} />
                <InfoItem label="GÉNERO" value={pet.gender} />
                <InfoItem label="FECHA DE NACIMIENTO" value={pet.birthDate || 'No registrada'} />
                <InfoItem label="EDAD" value={pet.age || 'No especificada'} />
                <InfoItem label="COLOR" value={pet.color || 'No registrado'} />
                <InfoItem label="PESO" value={pet.weight || 'No registrado'} />
                <InfoItem label="NÚMERO MICROCHIP / RFID" value={pet.microchip || 'Ninguno registrado'} />
              </div>

              {pet.characteristics && (
                <div className="mt-6 pt-4 border-t border-petuno-border dark:border-petuno-secondary-text/10">
                  <span className="text-[10px] text-petuno-muted font-bold block mb-1">CARACTERÍSTICAS FÍSICAS</span>
                  <p className="text-xs text-petuno-secondary-text dark:text-dark-secondary-text leading-relaxed">{pet.characteristics}</p>
                </div>
              )}
            </div>

            {/* Health profile quick summary */}
            <div className="bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 p-6 shadow-sm">
              <h3 className="text-base font-extrabold mb-4 flex items-center gap-1.5"><Stethoscope className="w-5 h-5 text-petuno-purple" /> Salud e información médica</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 border border-petuno-border dark:border-petuno-secondary-text/10 rounded-xl">
                  <span className="text-[10px] text-petuno-muted font-bold block">ALERGIAS</span>
                  <span className="text-sm font-bold mt-1 block">{pet.allergies || 'Ninguna conocida'}</span>
                </div>
                <div className="p-4 border border-petuno-border dark:border-petuno-secondary-text/10 rounded-xl">
                  <span className="text-[10px] text-petuno-muted font-bold block">INFORMACIÓN MÉDICA</span>
                  <span className="text-sm font-bold mt-1 block">{pet.medicalCritical || 'Ninguna'}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Quick actions & stats sidebar */}
          <div className="space-y-6">
            
            {/* Quick Actions Panel */}
            <div className="bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 p-6 shadow-sm">
              <h3 className="text-base font-extrabold mb-4">Acciones rápidas</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => onShowQR(pet.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 border border-petuno-border dark:border-petuno-secondary-text/15 hover:bg-petuno-background dark:hover:bg-dark-surface-elevated text-xs font-bold rounded-xl transition-all"
                >
                  <QrCode className="w-4 h-4 text-petuno-purple" /> Ver código QR
                </button>
                <button 
                  onClick={() => onToggleLost(pet.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 border border-petuno-border dark:border-petuno-secondary-text/15 hover:bg-petuno-background dark:hover:bg-dark-surface-elevated text-xs font-bold rounded-xl transition-all"
                >
                  <AlertTriangle className="w-4 h-4 text-petuno-coral" /> {pet.status === 'Perdido' ? 'Cancelar alerta de pérdida' : 'Activar modo mascota perdida'}
                </button>
                <button 
                  onClick={() => alert(`Enlace de perfil público copiado: https://petuno.com/p/${pet.petunoId}`)}
                  className="w-full flex items-center gap-3 px-4 py-3 border border-petuno-border dark:border-petuno-secondary-text/15 hover:bg-petuno-background dark:hover:bg-dark-surface-elevated text-xs font-bold rounded-xl transition-all"
                >
                  <ArrowRight className="w-4 h-4 text-petuno-purple" /> Compartir perfil público
                </button>
                <button 
                  onClick={() => {
                    alert('Generando PDF y abriendo menú de impresión de sistema...');
                    window.print();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 border border-petuno-border dark:border-petuno-secondary-text/15 hover:bg-petuno-background dark:hover:bg-dark-surface-elevated text-xs font-bold rounded-xl transition-all"
                >
                  <FileText className="w-4 h-4 text-petuno-purple" /> Generar Cartel de Búsqueda
                </button>
              </div>
            </div>

            {/* Owner & contact card */}
            <div className="bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 p-6 shadow-sm space-y-4">
              <h3 className="text-base font-extrabold">Propietario y Contacto</h3>
              <div>
                <span className="text-[10px] text-petuno-muted font-bold block">PROPIETARIO</span>
                <span className="text-sm font-bold">{pet.ownerName || 'John Doe'}</span>
              </div>
              <div className="border-t border-petuno-border dark:border-petuno-secondary-text/10 pt-3">
                <span className="text-[10px] text-petuno-muted font-bold block">CONTACTO DE EMERGENCIA</span>
                <span className="text-sm font-bold text-petuno-purple dark:text-petuno-purple-light">{pet.emergencyContact || 'No registrado'}</span>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* 2. TABS CONTENT: SALUD */}
      {profileTab === 'Salud' && (
        <div className="bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 p-6 shadow-sm text-left max-w-4xl mx-auto space-y-6">
          <div>
            <h3 className="text-lg font-bold">Carnet de Salud Veterinario</h3>
            <p className="text-xs text-petuno-secondary-text dark:text-dark-secondary-text mt-1">Gestión de vacunas e historial de consultas médicas de la mascota.</p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-petuno-purple">Esquema de Vacunación Reciente</h4>
            
            <div className="space-y-3">
              <VaccineRow name="Vacuna Triple Felina / Polivalente" date="15 Enero, 2026" status="Aplicada" vet="Clínica Vet Veteria" />
              <VaccineRow name="Vacuna de la Rabia" date="21 Septiembre, 2026" status="Pendiente" vet="Próxima dosis" isWarning />
              <VaccineRow name="Vacuna de Leucemia" date="04 Marzo, 2025" status="Aplicada" vet="Clínica Vet Veteria" />
            </div>

            <button className="flex items-center gap-1.5 text-xs font-bold text-petuno-purple hover:underline pt-2">
              <Plus className="w-4 h-4" /> Agregar nueva vacuna al carnet
            </button>
          </div>

          <div className="border-t border-petuno-border dark:border-petuno-secondary-text/10 pt-6 space-y-4">
            <h4 className="text-sm font-bold text-petuno-purple">Medicamentos Actuales</h4>
            <p className="text-xs text-petuno-secondary-text dark:text-dark-secondary-text">No hay tratamientos activos o recetas en curso para esta mascota.</p>
          </div>
        </div>
      )}

      {/* 3. TABS CONTENT: IDENTIDAD */}
      {profileTab === 'Identidad' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
          
          {/* QR code download display card */}
          <div className="bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 p-6 shadow-sm flex flex-col items-center justify-center text-center space-y-6">
            <h3 className="text-base font-extrabold text-petuno-text dark:text-dark-text self-start text-left">Placa de Identificación QR</h3>
            
            {/* Visual SVG QR mockup */}
            <div className="bg-white p-4 rounded-2xl shadow-md border border-petuno-border">
              <QrCodeMockup />
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-sm text-petuno-text">{pet.name} — {pet.petunoId}</h4>
              <p className="text-xs text-petuno-secondary-text dark:text-dark-secondary-text max-w-xs">
                Descarga e imprime este código QR para colocarlo en la placa del collar de tu mascota.
              </p>
            </div>

            <button 
              onClick={() => alert('Descargando imagen QR-Petuno en formato PNG...')}
              className="bg-petuno-purple hover:bg-petuno-purple-dark text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2"
            >
              <QrCode className="w-4 h-4" /> Descargar Código QR
            </button>
          </div>

          {/* NFC / RFID hardware association panel */}
          <div className="bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 p-6 shadow-sm space-y-6">
            <div>
              <h3 className="text-base font-extrabold flex items-center gap-1.5">
                <ShieldCheck className="w-5 h-5 text-petuno-purple" /> Identificadores Inteligentes (Premium)
              </h3>
              <p className="text-xs text-petuno-secondary-text mt-1">
                Vincula placas NFC, microchips subcutáneos o pantallas Paperlink para añadir capas adicionales de seguridad por contacto físico directo.
              </p>
            </div>

            <div className="space-y-4">
              {/* NFC Row */}
              <div className="p-4 border border-petuno-border dark:border-petuno-secondary-text/10 rounded-xl flex items-center justify-between bg-petuno-background/20 dark:bg-dark-surface-elevated/20 opacity-75">
                <div>
                  <h4 className="text-xs font-bold flex items-center gap-1">
                    Placa / Medalla NFC Petuno <span className="text-[10px] text-petuno-purple bg-petuno-purple/10 px-1.5 py-0.5 rounded-full font-bold">Premium</span>
                  </h4>
                  <p className="text-[10px] text-petuno-secondary-text mt-1">Lectura por contacto sin batería. Transmite el Petuno ID al teléfono que lo toque.</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="bg-petuno-amber-light text-petuno-amber text-[9px] font-extrabold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    🔒 No asociado
                  </span>
                </div>
              </div>

              {/* RFID microchip row */}
              <div className="p-4 border border-petuno-border dark:border-petuno-secondary-text/10 rounded-xl flex items-center justify-between bg-petuno-background/20 dark:bg-dark-surface-elevated/20 opacity-75">
                <div>
                  <h4 className="text-xs font-bold flex items-center gap-1">
                    Microchip RFID Subcutáneo <span className="text-[10px] text-petuno-purple bg-petuno-purple/10 px-1.5 py-0.5 rounded-full font-bold">Premium</span>
                  </h4>
                  <p className="text-[10px] text-petuno-secondary-text mt-1">Asociación homologada de microchip subcutáneo estándar veterinario.</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="bg-petuno-amber-light text-petuno-amber text-[9px] font-extrabold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    🔒 No asociado
                  </span>
                </div>
              </div>

              {/* Paperlink row */}
              <div className="p-4 border border-petuno-border dark:border-petuno-secondary-text/10 rounded-xl flex items-center justify-between bg-petuno-background/20 dark:bg-dark-surface-elevated/20 opacity-75">
                <div>
                  <h4 className="text-xs font-bold flex items-center gap-1">
                    Placa E-ink Paperlink <span className="text-[10px] text-petuno-purple bg-petuno-purple/10 px-1.5 py-0.5 rounded-full font-bold">Premium</span>
                  </h4>
                  <p className="text-[10px] text-petuno-secondary-text mt-1">Medalla de tinta electrónica de ultra-bajo consumo que siempre muestra el QR y datos.</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="bg-petuno-amber-light text-petuno-amber text-[9px] font-extrabold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    🔒 No asociado
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-petuno-border dark:border-petuno-secondary-text/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-[11px] text-petuno-secondary-text">Adquiere tus dispositivos físicos oficiales en la tienda Petuno para habilitarlos.</p>
              <button 
                type="button"
                onClick={() => alert('Redirigiendo a la Tienda Petuno...')}
                className="bg-petuno-purple hover:bg-petuno-purple-dark text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm shrink-0"
              >
                Comprar Dispositivos
              </button>
            </div>
          </div>

        </div>
      )}

      {/* 4. TABS CONTENT: UBICACIÓN */}
      {profileTab === 'Ubicación' && (
        <div className="bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 p-6 shadow-sm text-left max-w-4xl mx-auto space-y-6 relative overflow-hidden">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2">
              Geolocalización Satelital GNSS <span className="text-xs text-petuno-purple bg-petuno-purple/10 px-2 py-0.5 rounded-full font-bold">Premium</span>
            </h3>
            <p className="text-xs text-petuno-secondary-text dark:text-dark-secondary-text mt-1">Monitorea la ubicación satelital de tu mascota en tiempo real y configura geocercas seguras.</p>
          </div>

          <div className="relative">
            {/* Blurred Mock Map Visual Placeholder */}
            <div className="h-96 rounded-2xl bg-petuno-background dark:bg-dark-surface-elevated border border-petuno-border dark:border-petuno-secondary-text/15 relative overflow-hidden flex items-center justify-center filter blur-[4px] select-none pointer-events-none">
              <div className="absolute inset-0 opacity-20 dark:opacity-10 bg-[radial-gradient(#6c4ce8_1px,transparent_1px)] [background-size:16px_16px]"></div>
              <div className="absolute inset-0 flex flex-col justify-around opacity-30">
                <div className="h-px bg-petuno-muted"></div>
                <div className="h-px bg-petuno-muted"></div>
              </div>
              <div className="absolute w-56 h-56 border-2 border-dashed border-petuno-purple/30 rounded-full"></div>
            </div>

            {/* Lock screen Overlay */}
            <div className="absolute inset-0 bg-petuno-surface/80 dark:bg-dark-surface/80 rounded-2xl flex flex-col items-center justify-center text-center p-6 space-y-4 backdrop-blur-[2px]">
              <div className="w-14 h-14 rounded-2xl bg-petuno-purple-50 dark:bg-dark-surface-elevated flex items-center justify-center text-petuno-purple border border-petuno-purple/20 shadow-md">
                <Cpu className="w-7 h-7 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-base text-petuno-text dark:text-dark-text">El monitoreo GPS requiere Collar GNSS Petuno</h4>
                <p className="text-xs text-petuno-secondary-text dark:text-dark-secondary-text max-w-md mx-auto">
                  La geolocalización GNSS en tiempo real y el control de zonas seguras requiere adquirir y vincular el Collar de Rastreo Oficial Petuno. El código QR estándar siempre es y será gratis.
                </p>
              </div>
              <div className="flex gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => alert('Redirigiendo a la Tienda Petuno para ver collares GNSS...')}
                  className="bg-petuno-purple hover:bg-petuno-purple-dark text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md"
                >
                  Adquirir Collar GNSS
                </button>
                <button 
                  type="button"
                  onClick={() => setProfileTab('Resumen')}
                  className="bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 hover:bg-petuno-background dark:hover:bg-dark-surface-elevated text-xs font-bold px-5 py-2.5 rounded-xl transition-all"
                >
                  Volver al Resumen (Gratuito)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. TABS CONTENT: DOCUMENTOS */}
      {profileTab === 'Documentos' && (
        <div className="bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 p-6 shadow-sm text-left max-w-4xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">Documentos y Archivos</h3>
              <p className="text-xs text-petuno-secondary-text dark:text-dark-secondary-text mt-1">Guarda certificados de pedigrí, fotos de registros de propiedad y vacunas.</p>
            </div>
            <button 
              onClick={() => alert('Cargando selector de archivos local...')}
              className="bg-petuno-purple hover:bg-petuno-purple-dark text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Subir archivo
            </button>
          </div>

          <div className="space-y-3">
            <DocumentRow name="Certificado_Vacuna_Rabia_2025.pdf" size="1.2 MB" date="Subido el 15 Feb, 2026" />
            <DocumentRow name="Historial_Clinico_Completo.pdf" size="4.8 MB" date="Subido el 10 Ene, 2026" />
          </div>
        </div>
      )}

      {/* 6. TABS CONTENT: HISTORIAL (TIMELINE) */}
      {profileTab === 'Historial' && (
        <div className="bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 p-6 shadow-sm text-left max-w-xl mx-auto space-y-6">
          <div>
            <h3 className="text-lg font-bold">Timeline de Petuno Life</h3>
            <p className="text-xs text-petuno-secondary-text mt-1">Historial del ciclo de vida y eventos históricos clave de {pet.name}</p>
          </div>

          <div className="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-petuno-border dark:before:bg-petuno-secondary-text/15">
            <TimelineRow icon={<Calendar className="w-3.5 h-3.5 text-petuno-purple" />} title="Vacunación" time="21 Sep, 2026" desc="Vacunación programada contra la Rabia" />
            <TimelineRow icon={<Heart className="w-3.5 h-3.5 text-petuno-purple" />} title="Adopción / Registro Inicial" time="15 Ene, 2026" desc="John Doe registró a la mascota en la plataforma Petuno" />
            <TimelineRow icon={<Calendar className="w-3.5 h-3.5 text-petuno-purple" />} title="Nacimiento de la mascota" time={pet.birthDate || 'No especificada'} desc="Fecha de nacimiento declarada por el propietario" />
          </div>
        </div>
      )}

      {/* 7. TABS CONTENT: CONFIGURACIÓN */}
      {profileTab === 'Configuración' && (
        <div className="bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 p-6 shadow-sm text-left max-w-2xl mx-auto space-y-6">
          <div>
            <h3 className="text-lg font-bold text-petuno-coral">Mantenimiento y Archivo</h3>
            <p className="text-xs text-petuno-secondary-text dark:text-dark-secondary-text mt-1">Configuraciones destructivas o de visibilidad privada.</p>
          </div>

          <div className="p-4 bg-petuno-background dark:bg-dark-surface-elevated rounded-xl space-y-4">
            <h4 className="text-xs font-bold text-petuno-text dark:text-dark-text">Aislamiento de la mascota</h4>
            <p className="text-xs text-petuno-secondary-text">Al archivar la mascota, esta dejará de listarse en tu panel activo de mascotas pero conservará su Petuno ID y ficha histórica de forma latente.</p>
            <button className="bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 hover:bg-petuno-border/30 text-xs font-bold px-4 py-2.5 rounded-xl transition-all">
              Archivar mascota
            </button>
          </div>

          <div className="p-4 bg-petuno-coral-light/10 border border-petuno-coral/20 rounded-xl space-y-4">
            <h4 className="text-xs font-bold text-petuno-coral">Eliminar mascota</h4>
            <p className="text-xs text-petuno-secondary-text">Esta acción eliminará de forma irreversible el perfil de {pet.name} del dashboard de tu cuenta. No podrás recuperar los expedientes médicos o archivos subidos.</p>
            <button 
              onClick={() => onDelete(pet.id)}
              className="bg-petuno-coral hover:bg-petuno-coral/95 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5"
            >
              <Trash2 className="w-4 h-4" /> Eliminar Mascota
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
