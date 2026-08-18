import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PawPrint, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function Register({ 
  onLogin 
}: { 
  onLogin: (user: { name: string; email: string; phone?: string; role?: string }) => void 
}) {
  const [role, setRole] = useState<'propietario' | 'fundacion'>('propietario');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [nombreFundacion, setNombreFundacion] = useState('');
  const [nit, setNit] = useState('');
  const [direccion, setDireccion] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    if (!acceptTerms) {
      setError('Debes aceptar los términos y condiciones');
      return;
    }

    setIsRegistered(true);
    setTimeout(() => {
      const finalName = role === 'propietario' ? nombre : nombreFundacion;
      onLogin({ name: finalName || 'Fundación', email, phone: telefono, role });
      navigate('/app');
    }, 2000);
  };

  if (isRegistered) {
    const finalName = role === 'propietario' ? nombre : nombreFundacion;
    return (
      <div className="min-h-screen flex items-center justify-center bg-petuno-background dark:bg-dark-background px-4 py-28 font-sans">
        <div className="max-w-md w-full bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/20 p-8 shadow-xl text-center">
          <div className="w-16 h-16 rounded-full bg-petuno-mint-light flex items-center justify-center mx-auto mb-4 border border-petuno-mint/20">
            <ShieldCheck className="w-9 h-9 text-petuno-mint animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-petuno-text dark:text-dark-text">¡Bienvenido a Petuno, {finalName}!</h2>
          <p className="text-sm text-petuno-secondary-text dark:text-dark-secondary-text mt-2">
            Estamos creando tu espacio local personalizado...
          </p>
          <div className="w-8 h-8 border-4 border-petuno-purple border-t-transparent rounded-full animate-spin mx-auto mt-6"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-petuno-background dark:bg-dark-background px-4 py-28 font-sans">
      <div className="max-w-md w-full bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/20 p-8 shadow-xl">
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-petuno-purple-50 dark:bg-dark-surface-elevated flex items-center justify-center mb-3">
            <PawPrint className="w-7 h-7 text-petuno-purple dark:text-petuno-purple-light" fill="currentColor" />
          </div>
          <h2 className="text-2xl font-bold text-petuno-text dark:text-dark-text">Crea tu cuenta gratis</h2>
          <p className="text-sm text-petuno-secondary-text dark:text-dark-secondary-text mt-1">Comienza a proteger a tu mascota</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-petuno-coral-light border border-petuno-coral/20 text-petuno-coral text-xs rounded-xl flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Role Tab Switcher */}
        <div className="flex bg-petuno-background dark:bg-dark-surface-elevated rounded-2xl p-1 mb-5">
          <button
            type="button"
            onClick={() => { setRole('propietario'); setError(''); }}
            className={`flex-1 text-center py-2 text-xs font-bold rounded-xl transition-all ${
              role === 'propietario'
                ? 'bg-petuno-purple text-white shadow-sm'
                : 'text-petuno-secondary-text dark:text-dark-secondary-text hover:text-petuno-text'
            }`}
          >
            Propietario
          </button>
          <button
            type="button"
            onClick={() => { setRole('fundacion'); setError(''); }}
            className={`flex-1 text-center py-2 text-xs font-bold rounded-xl transition-all ${
              role === 'fundacion'
                ? 'bg-petuno-purple text-white shadow-sm'
                : 'text-petuno-secondary-text dark:text-dark-secondary-text hover:text-petuno-text'
            }`}
          >
            Fundación
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {role === 'propietario' ? (
            <div className="grid grid-cols-2 gap-4 animate-fade-in text-left">
              <div>
                <label className="block text-xs font-semibold text-petuno-secondary-text dark:text-dark-secondary-text mb-2">Nombre</label>
                <input 
                  type="text" 
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="John" 
                  className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-sm text-petuno-text dark:text-dark-text focus:outline-none focus:border-petuno-purple transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-petuno-secondary-text dark:text-dark-secondary-text mb-2">Apellido</label>
                <input 
                  type="text" 
                  required
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  placeholder="Doe" 
                  className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-sm text-petuno-text dark:text-dark-text focus:outline-none focus:border-petuno-purple transition-colors"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-fade-in text-left">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-petuno-secondary-text dark:text-dark-secondary-text mb-2">Nombre de la Fundación</label>
                  <input 
                    type="text" 
                    required
                    value={nombreFundacion}
                    onChange={(e) => setNombreFundacion(e.target.value)}
                    placeholder="Fundación Patitas" 
                    className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-sm text-petuno-text dark:text-dark-text focus:outline-none focus:border-petuno-purple transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-petuno-secondary-text dark:text-dark-secondary-text mb-2">NIT</label>
                  <input 
                    type="text" 
                    required
                    value={nit}
                    onChange={(e) => setNit(e.target.value)}
                    placeholder="901.234.567-8" 
                    className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-sm text-petuno-text dark:text-dark-text focus:outline-none focus:border-petuno-purple transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-petuno-secondary-text dark:text-dark-secondary-text mb-2">Dirección de la Sede / Albergue</label>
                <input 
                  type="text" 
                  required
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  placeholder="Calle 100 # 15-30, Bogotá" 
                  className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-sm text-petuno-text dark:text-dark-text focus:outline-none focus:border-petuno-purple transition-colors"
                />
              </div>
            </div>
          )}

          <div className="text-left">
            <label className="block text-xs font-semibold text-petuno-secondary-text dark:text-dark-secondary-text mb-2">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@petuno.test" 
              className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-sm text-petuno-text dark:text-dark-text focus:outline-none focus:border-petuno-purple transition-colors"
            />
          </div>

          <div className="text-left">
            <label className="block text-xs font-semibold text-petuno-secondary-text dark:text-dark-secondary-text mb-2">Teléfono de contacto (Opcional)</label>
            <input 
              type="tel" 
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="Ej. +57 300 123 4567" 
              className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-sm text-petuno-text dark:text-dark-text focus:outline-none focus:border-petuno-purple transition-colors"
            />
          </div>

          <div className="text-left">
            <label className="block text-xs font-semibold text-petuno-secondary-text dark:text-dark-secondary-text mb-2">Contraseña</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-sm text-petuno-text dark:text-dark-text focus:outline-none focus:border-petuno-purple transition-colors"
            />
          </div>

          <div className="text-left">
            <label className="block text-xs font-semibold text-petuno-secondary-text dark:text-dark-secondary-text mb-2">Confirmar Contraseña</label>
            <input 
              type="password" 
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••" 
              className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-2.5 text-sm text-petuno-text dark:text-dark-text focus:outline-none focus:border-petuno-purple transition-colors"
            />
          </div>

          <div className="flex items-start mt-2">
            <label className="flex items-start gap-2 cursor-pointer select-none text-left">
              <input 
                type="checkbox" 
                required
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 accent-petuno-purple rounded border-petuno-border dark:border-petuno-secondary-text/30"
              />
              <span className="text-xs text-petuno-secondary-text dark:text-dark-secondary-text leading-tight">
                Acepto los términos y condiciones de uso y la política de protección de datos de Petuno.
              </span>
            </label>
          </div>

          <button 
            type="submit" 
            className="w-full bg-petuno-purple hover:bg-petuno-purple-dark text-white font-semibold py-3 rounded-xl transition-colors shadow-md mt-4 text-sm"
          >
            Crear cuenta
          </button>
        </form>

        <p className="text-xs text-petuno-secondary-text dark:text-dark-secondary-text text-center mt-6">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-petuno-purple dark:text-petuno-purple-light font-semibold hover:underline">Iniciar sesión</Link>
        </p>
      </div>
    </div>
  );
}
