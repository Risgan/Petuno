import React, { useState } from 'react';
import type { PrivacySettings, ModuleConfig } from '../types';

export default function SettingsView({
  user,
  privacySettings,
  modulesConfig,
  onSaveModules,
  onSaveProfile,
  onSavePrivacy,
  onUpgradeSubscription,
  onDeleteAccount
}: {
  user: { name: string; email: string; phone?: string } | null;
  privacySettings: PrivacySettings;
  modulesConfig?: ModuleConfig;
  onSaveModules?: (newConfig: ModuleConfig) => void;
  onSaveProfile: (name: string, email: string, phone: string) => void;
  onSavePrivacy: (settings: PrivacySettings) => void;
  onUpgradeSubscription: () => void;
  onDeleteAccount: () => void;
}) {
  const [internalTab, setInternalTab] = useState<'Perfil' | 'Privacidad' | 'Seguridad' | 'Módulos'>('Perfil');
  
  // Profile inputs
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  
  // Password inputs
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  // Local module configuration states
  const [localModules, setLocalModules] = useState<ModuleConfig>(() => {
    return modulesConfig || {
      sos: true,
      adoptions: true,
      donations: true,
      community: true,
      devices: true,
      vets: true
    };
  });

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(name, email, phone);
    alert('¡Cambios de perfil guardados localmente con éxito!');
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass !== confirmPass) {
      alert('Las contraseñas no coinciden');
      return;
    }
    alert('¡Contraseña actualizada localmente exitosamente!');
    setOldPass('');
    setNewPass('');
    setConfirmPass('');
  };

  const handlePrivacyToggle = (key: keyof PrivacySettings) => {
    const updated = {
      ...privacySettings,
      [key]: !privacySettings[key]
    };
    onSavePrivacy(updated);
  };

  const handleModuleToggle = (key: keyof ModuleConfig) => {
    setLocalModules(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleModulesSaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSaveModules) {
      onSaveModules(localModules);
      alert('⚙️ ¡Configuración de Feature Flags guardada en BD! Los cambios se han propagado exitosamente.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-petuno-surface dark:bg-dark-surface border border-petuno-border dark:border-petuno-secondary-text/15 rounded-3xl overflow-hidden shadow-sm flex flex-col md:flex-row text-left min-h-[60vh] animate-fade-in">
      
      {/* Settings Navigation Sidebar */}
      <aside className="w-full md:w-64 bg-petuno-background/40 dark:bg-dark-background/20 border-r border-petuno-border dark:border-petuno-secondary-text/10 p-5 space-y-2">
        <h3 className="text-[10px] font-bold text-petuno-muted uppercase tracking-wider mb-4 px-2">Configuración</h3>
        <button 
          onClick={() => setInternalTab('Perfil')}
          className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            internalTab === 'Perfil' 
              ? 'bg-petuno-purple/10 text-petuno-purple dark:bg-petuno-purple/20' 
              : 'text-petuno-secondary-text dark:text-dark-secondary-text hover:bg-petuno-background/50'
          }`}
        >
          👤 Cuenta y Suscripción
        </button>
        <button 
          onClick={() => setInternalTab('Privacidad')}
          className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            internalTab === 'Privacidad' 
              ? 'bg-petuno-purple/10 text-petuno-purple dark:bg-petuno-purple/20' 
              : 'text-petuno-secondary-text dark:text-dark-secondary-text hover:bg-petuno-background/50'
          }`}
        >
          🔒 Privacidad del QR
        </button>
        <button 
          onClick={() => setInternalTab('Seguridad')}
          className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            internalTab === 'Seguridad' 
              ? 'bg-petuno-purple/10 text-petuno-purple dark:bg-petuno-purple/20' 
              : 'text-petuno-secondary-text dark:text-dark-secondary-text hover:bg-petuno-background/50'
          }`}
        >
          🛡️ Seguridad y Password
        </button>
        <button 
          onClick={() => setInternalTab('Módulos')}
          className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            internalTab === 'Módulos' 
              ? 'bg-petuno-purple/10 text-petuno-purple dark:bg-petuno-purple/20' 
              : 'text-petuno-secondary-text dark:text-dark-secondary-text hover:bg-petuno-background/50'
          }`}
        >
          ⚙️ Control de Módulos (BD)
        </button>
      </aside>

      {/* Settings Tab Content */}
      <main className="flex-1 p-6 sm:p-8 space-y-6">
        
        {/* Profile Tab */}
        {internalTab === 'Perfil' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold">Cuenta y Suscripción</h3>
              <p className="text-xs text-petuno-secondary-text">Modifica tus datos básicos o actualiza tu suscripción.</p>
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-4 max-w-md">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-petuno-secondary-text mb-1">Nombre Completo</label>
                  <input 
                    type="text" required value={name} onChange={e => setName(e.target.value)} 
                    className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-petuno-purple transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-petuno-secondary-text mb-1">Teléfono</label>
                  <input 
                    type="tel" value={phone} onChange={e => setPhone(e.target.value)} 
                    className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-petuno-purple transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-petuno-secondary-text mb-1">Correo Electrónico</label>
                <input 
                  type="email" required value={email} onChange={e => setEmail(e.target.value)} 
                  className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-petuno-purple transition-all"
                />
              </div>
              <button type="submit" className="bg-petuno-purple hover:bg-petuno-purple-dark text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition-all">
                Guardar Cambios
              </button>
            </form>

            <div className="border-t border-petuno-border dark:border-petuno-secondary-text/15 pt-6 mt-6 max-w-xl">
              <h4 className="text-xs font-bold uppercase tracking-wider mb-2">Suscripción Premium</h4>
              <div className="bg-gradient-to-r from-petuno-purple/5 to-petuno-coral/5 dark:from-petuno-purple/10 dark:to-petuno-coral/10 p-5 rounded-2xl border border-petuno-purple/20 flex items-center justify-between gap-4">
                <div>
                  <h5 className="font-extrabold text-xs text-petuno-purple dark:text-petuno-purple-light">Plan Gratuito Permanente</h5>
                  <p className="text-[10px] text-petuno-secondary-text mt-1">Soporta perfiles de mascotas, escaneo de medallas QR ilimitados y alertas comunitarias.</p>
                </div>
                <button 
                  onClick={onUpgradeSubscription}
                  className="bg-petuno-purple hover:bg-petuno-purple-dark text-white text-[10px] font-extrabold px-4 py-2 rounded-xl transition-all shadow-sm"
                >
                  🚀 Obtener Premium
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Privacy Tab */}
        {internalTab === 'Privacidad' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold">Privacidad del Perfil QR</h3>
              <p className="text-xs text-petuno-secondary-text">Elige qué información deseas ocultar o mostrar cuando escaneen la medalla QR física de tu mascota.</p>
            </div>

            <div className="space-y-3 max-w-xl">
              <div className="flex items-center justify-between p-3.5 border border-petuno-border dark:border-petuno-secondary-text/10 rounded-2xl">
                <div>
                  <h4 className="font-bold text-xs">Mostrar mi Nombre</h4>
                  <p className="text-[10px] text-petuno-secondary-text mt-0.5">Muestra tu nombre de pila en el perfil público.</p>
                </div>
                <input 
                  type="checkbox" checked={privacySettings.showName} onChange={() => handlePrivacyToggle('showName')}
                  className="w-4 h-4 rounded text-petuno-purple accent-petuno-purple cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 border border-petuno-border dark:border-petuno-secondary-text/10 rounded-2xl">
                <div>
                  <h4 className="font-bold text-xs">Mostrar Raza de Mascota</h4>
                  <p className="text-[10px] text-petuno-secondary-text mt-0.5">Hace visible la raza clínica en los perfiles escaneados.</p>
                </div>
                <input 
                  type="checkbox" checked={privacySettings.showBreed} onChange={() => handlePrivacyToggle('showBreed')}
                  className="w-4 h-4 rounded text-petuno-purple accent-petuno-purple cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 border border-petuno-border dark:border-petuno-secondary-text/10 rounded-2xl">
                <div>
                  <h4 className="font-bold text-xs">Mostrar Edad de Mascota</h4>
                  <p className="text-[10px] text-petuno-secondary-text mt-0.5">Publica la edad para facilitar reportes.</p>
                </div>
                <input 
                  type="checkbox" checked={privacySettings.showAge} onChange={() => handlePrivacyToggle('showAge')}
                  className="w-4 h-4 rounded text-petuno-purple accent-petuno-purple cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 border border-petuno-border dark:border-petuno-secondary-text/10 rounded-2xl">
                <div>
                  <h4 className="font-bold text-xs">Mostrar Alertas Médicas</h4>
                  <p className="text-[10px] text-petuno-secondary-text mt-0.5">Expone condiciones críticas o alergias de salud.</p>
                </div>
                <input 
                  type="checkbox" checked={privacySettings.showMedical} onChange={() => handlePrivacyToggle('showMedical')}
                  className="w-4 h-4 rounded text-petuno-purple accent-petuno-purple cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 border border-petuno-border dark:border-petuno-secondary-text/10 rounded-2xl">
                <div>
                  <h4 className="font-bold text-xs">Permitir Mensajería Anónima</h4>
                  <p className="text-[10px] text-petuno-secondary-text mt-0.5">Transeúntes te pueden escribir sin ver tu email o teléfono.</p>
                </div>
                <input 
                  type="checkbox" checked={privacySettings.allowAnonymousContact} onChange={() => handlePrivacyToggle('allowAnonymousContact')}
                  className="w-4 h-4 rounded text-petuno-purple accent-petuno-purple cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {internalTab === 'Seguridad' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold">Seguridad y Password</h3>
              <p className="text-xs text-petuno-secondary-text">Simula el cambio de contraseñas y la eliminación de tu cuenta de forma definitiva.</p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
              <div>
                <label className="block text-xs font-bold text-petuno-secondary-text mb-1">Contraseña Actual</label>
                <input 
                  type="password" required value={oldPass} onChange={e => setOldPass(e.target.value)} placeholder="••••••••"
                  className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-petuno-purple transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-petuno-secondary-text mb-1">Nueva Contraseña</label>
                <input 
                  type="password" required value={newPass} onChange={e => setNewPass(e.target.value)} placeholder="••••••••"
                  className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-petuno-purple transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-petuno-secondary-text mb-1">Confirmar Nueva Contraseña</label>
                <input 
                  type="password" required value={confirmPass} onChange={e => setConfirmPass(e.target.value)} placeholder="••••••••"
                  className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-petuno-purple transition-all"
                />
              </div>
              <button type="submit" className="bg-petuno-purple hover:bg-petuno-purple-dark text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition-all">
                Cambiar Contraseña
              </button>
            </form>

            <div className="border-t border-petuno-coral/20 pt-6 mt-6">
              <h4 className="text-xs font-bold text-petuno-coral uppercase tracking-wider mb-2">Zona de Riesgo</h4>
              <p className="text-[10px] text-petuno-secondary-text mb-4">Esta acción eliminará de forma irreversible tu cuenta y todos los expedientes médicos o ubicaciones de tus mascotas.</p>
              <button 
                onClick={() => {
                  if (window.confirm('¿Estás absolutamente seguro de que deseas eliminar tu cuenta de Petuno? Esta acción no se puede deshacer.')) {
                    onDeleteAccount();
                  }
                }}
                className="bg-petuno-coral hover:bg-petuno-coral/95 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm"
              >
                Eliminar mi Cuenta
              </button>
            </div>
          </div>
        )}

        {/* Modules Toggle Tab */}
        {internalTab === 'Módulos' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold">Control de Módulos (Simulación BD)</h3>
              <p className="text-xs text-petuno-secondary-text">
                Enciende o apaga dinámicamente los módulos globales de Petuno para simular el control administrativo en base de datos.
              </p>
            </div>

            <form onSubmit={handleModulesSaveSubmit} className="space-y-4 max-w-xl">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3.5 border border-petuno-border dark:border-petuno-secondary-text/10 rounded-2xl">
                  <div>
                    <h4 className="font-bold text-xs">🚨 SOS Búsqueda y Rescate</h4>
                    <p className="text-[10px] text-petuno-secondary-text mt-0.5">Controla la cartelera de perdidos, mapa interactivo, registro de avistamientos y alertas.</p>
                  </div>
                  <input 
                    type="checkbox" checked={localModules.sos} onChange={() => handleModuleToggle('sos')}
                    className="w-4 h-4 rounded text-petuno-purple accent-petuno-purple cursor-pointer animate-fade-in"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 border border-petuno-border dark:border-petuno-secondary-text/10 rounded-2xl">
                  <div>
                    <h4 className="font-bold text-xs">🏡 Catálogo de Adopciones</h4>
                    <p className="text-[10px] text-petuno-secondary-text mt-0.5">Habilita la galería pública de adopciones, el test inteligente y las postulaciones directas.</p>
                  </div>
                  <input 
                    type="checkbox" checked={localModules.adoptions} onChange={() => handleModuleToggle('adoptions')}
                    className="w-4 h-4 rounded text-petuno-purple accent-petuno-purple cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 border border-petuno-border dark:border-petuno-secondary-text/10 rounded-2xl">
                  <div>
                    <h4 className="font-bold text-xs">💰 Pasarela de Donaciones</h4>
                    <p className="text-[10px] text-petuno-secondary-text mt-0.5">Habilita barra de progreso solidario e información bancaria de refugios en la home.</p>
                  </div>
                  <input 
                    type="checkbox" checked={localModules.donations} onChange={() => handleModuleToggle('donations')}
                    className="w-4 h-4 rounded text-petuno-purple accent-petuno-purple cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 border border-petuno-border dark:border-petuno-secondary-text/10 rounded-2xl">
                  <div>
                    <h4 className="font-bold text-xs">💬 Comunidad y Feed</h4>
                    <p className="text-[10px] text-petuno-secondary-text mt-0.5">Permite publicar historias, reportes rápidos y dar me gusta a otras publicaciones.</p>
                  </div>
                  <input 
                    type="checkbox" checked={localModules.community} onChange={() => handleModuleToggle('community')}
                    className="w-4 h-4 rounded text-petuno-purple accent-petuno-purple cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 border border-petuno-border dark:border-petuno-secondary-text/10 rounded-2xl">
                  <div>
                    <h4 className="font-bold text-xs">🔌 Hardware y Dispositivos GPS</h4>
                    <p className="text-[10px] text-petuno-secondary-text mt-0.5">Habilita el visor de accesorios oficiales, GPS trackers y placas NFC en el panel.</p>
                  </div>
                  <input 
                    type="checkbox" checked={localModules.devices} onChange={() => handleModuleToggle('devices')}
                    className="w-4 h-4 rounded text-petuno-purple accent-petuno-purple cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 border border-petuno-border dark:border-petuno-secondary-text/10 rounded-2xl">
                  <div>
                    <h4 className="font-bold text-xs">🩺 Veterinarios Aliados</h4>
                    <p className="text-[10px] text-petuno-secondary-text mt-0.5">Muestra el directorio de veterinarias recomendadas y controles clínicos programados.</p>
                  </div>
                  <input 
                    type="checkbox" checked={localModules.vets} onChange={() => handleModuleToggle('vets')}
                    className="w-4 h-4 rounded text-petuno-purple accent-petuno-purple cursor-pointer"
                  />
                </div>
              </div>

              <button type="submit" className="bg-petuno-purple hover:bg-petuno-purple-dark text-white text-xs font-bold px-6 py-3 rounded-xl shadow-md transition-all mt-4 w-full sm:w-auto">
                💾 Guardar Configuración de Módulos (BD)
              </button>
            </form>
          </div>
        )}

      </main>
    </div>
  );
}
