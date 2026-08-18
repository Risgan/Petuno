import React, { useState } from 'react';
import { Plus, Cpu, X } from 'lucide-react';
import type { Device, Pet } from '../types';

export default function DevicesView({
  devices,
  pets,
  onToggleDeviceStatus,
  onAddDevice
}: {
  devices: Device[];
  pets: Pet[];
  onToggleDeviceStatus: (id: string) => void;
  onAddDevice: (name: string, type: 'GPS' | 'BLE' | 'NFC' | 'RFID', petId: string, battery: number) => void;
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState<'GPS' | 'BLE' | 'NFC' | 'RFID'>('GPS');
  const [petId, setPetId] = useState(pets[0]?.id || '');
  const [battery, setBattery] = useState(100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !petId) return;
    onAddDevice(name, type, petId, battery);
    setName('');
    setType('GPS');
    setBattery(100);
    setShowAddModal(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 text-left animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">Mis Dispositivos</h2>
          <p className="text-sm text-petuno-secondary-text mt-1">Administra tus collares GPS, placas NFC y microchips de identidad.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-petuno-purple hover:bg-petuno-purple-dark text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Agregar Dispositivo
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {devices.map((device) => {
          const pet = pets.find(p => p.id === device.petId);
          return (
            <div key={device.id} className="bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 p-5 shadow-sm space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-petuno-purple/10 text-petuno-purple rounded-xl">
                      <Cpu className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-petuno-text dark:text-dark-text">{device.name}</h4>
                      <span className="text-[10px] text-petuno-muted font-mono">{device.type} Device</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${
                    device.status === 'Conectado'
                      ? 'bg-petuno-mint-light border-petuno-mint/20 text-petuno-mint'
                      : 'bg-petuno-coral-light border-petuno-coral/20 text-petuno-coral'
                  }`}>
                    {device.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6 text-xs border-t border-petuno-border dark:border-petuno-secondary-text/10 pt-4">
                  <div>
                    <span className="text-[10px] text-petuno-muted block font-bold">MASCOTA ASOCIADA</span>
                    <span className="font-bold text-petuno-text dark:text-dark-text mt-0.5 block">{pet?.name || 'Ninguna'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-petuno-muted block font-bold">NIVEL BATERÍA</span>
                    <span className="font-bold text-petuno-text dark:text-dark-text mt-0.5 block">{device.battery}%</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[10px] text-petuno-muted block font-bold">ÚLTIMA CONEXIÓN</span>
                    <span className="font-bold text-petuno-text dark:text-dark-text mt-0.5 block">{device.lastConnection}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-petuno-border dark:border-petuno-secondary-text/5 flex gap-2">
                <button 
                  onClick={() => onToggleDeviceStatus(device.id)}
                  className="flex-grow bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 hover:bg-petuno-background dark:hover:bg-dark-surface-elevated text-xs font-bold py-2 rounded-xl text-center"
                >
                  {device.status === 'Conectado' ? '🔌 Simular Desconexión' : '🔌 Simular Conexión'}
                </button>
              </div>
            </div>
          );
        })}

        {devices.length === 0 && (
          <div className="col-span-full py-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-petuno-purple-50 dark:bg-dark-surface-elevated flex items-center justify-center text-petuno-purple mb-4">
              <Cpu className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold">No tienes dispositivos registrados</h3>
            <p className="text-sm text-petuno-secondary-text max-w-sm mt-1">Registra tu collar Petuno GPS o tu tag NFC para activar las alertas geoespaciales.</p>
          </div>
        )}
      </div>

      {/* Add Device Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-55 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-petuno-surface dark:bg-dark-surface max-w-md w-full rounded-2xl p-6 border border-petuno-border dark:border-petuno-secondary-text/25 shadow-2xl relative text-left">
            <button 
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-petuno-secondary-text hover:bg-petuno-background dark:hover:bg-dark-surface-elevated p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <h3 className="text-lg font-bold">Agregar Nuevo Dispositivo</h3>
              
              <div>
                <label className="block text-xs font-bold text-petuno-secondary-text mb-2">Nombre del Dispositivo</label>
                <input 
                  type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="Ej. Mi Collar GPS Premium"
                  className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-petuno-purple transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-petuno-secondary-text mb-2">Tipo de Hardware</label>
                  <select 
                    value={type} onChange={e => setType(e.target.value as any)}
                    className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-petuno-purple dark:bg-dark-surface"
                  >
                    <option value="GPS">Collar GPS (GNSS)</option>
                    <option value="BLE">Tag de Proximidad (BLE)</option>
                    <option value="NFC">Placa Inteligente (NFC)</option>
                    <option value="RFID">Microchip (RFID)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-petuno-secondary-text mb-2">Asociar a Mascota</label>
                  <select 
                    value={petId} onChange={e => setPetId(e.target.value)}
                    className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-petuno-purple dark:bg-dark-surface"
                  >
                    {pets.map(pet => (
                      <option key={pet.id} value={pet.id}>{pet.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-petuno-secondary-text mb-2">Nivel de Batería Inicial ({battery}%)</label>
                <input 
                  type="range" min="10" max="100" value={battery} onChange={e => setBattery(Number(e.target.value))}
                  className="w-full accent-petuno-purple cursor-pointer"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-petuno-border/30 dark:border-petuno-secondary-text/10">
                <button type="submit" className="flex-grow bg-petuno-purple hover:bg-petuno-purple-dark text-white font-semibold py-2.5 rounded-xl text-xs transition-colors shadow-md">
                  Vincular Dispositivo
                </button>
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-grow border border-petuno-border dark:border-petuno-secondary-text/30 hover:bg-petuno-background text-xs font-bold py-2.5 rounded-xl text-center">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
