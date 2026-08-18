import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PawPrint, AlertTriangle } from 'lucide-react';

export default function Login({ 
  onLogin 
}: { 
  onLogin: (user: { name: string; email: string; phone?: string }) => void 
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'john@petuno.test' && password === 'Petuno123!') {
      const userData = { name: 'John', email, phone: '+57 300 123 4567' };
      onLogin(userData);
      if (rememberMe) {
        localStorage.setItem('rememberedUser', JSON.stringify(userData));
      }
      navigate('/app');
    } else {
      setError('Credenciales inválidas. Usa john@petuno.test y Petuno123!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-petuno-background dark:bg-dark-background px-4 py-28 font-sans">
      <div className="max-w-md w-full bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/20 p-8 shadow-xl transition-all">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-petuno-purple-50 dark:bg-dark-surface-elevated flex items-center justify-center mb-3">
            <PawPrint className="w-7 h-7 text-petuno-purple dark:text-petuno-purple-light" fill="currentColor" />
          </div>
          <h2 className="text-2xl font-bold text-petuno-text dark:text-dark-text">Bienvenido a Petuno</h2>
          <p className="text-sm text-petuno-secondary-text dark:text-dark-secondary-text mt-1">Ingresa a tu cuenta para continuar</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-petuno-coral-light border border-petuno-coral/20 text-petuno-coral text-xs rounded-xl flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="text-left">
            <label className="block text-xs font-semibold text-petuno-secondary-text dark:text-dark-secondary-text mb-2">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              placeholder="john@petuno.test" 
              className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-3 text-sm text-petuno-text dark:text-dark-text focus:outline-none focus:border-petuno-purple dark:focus:border-petuno-purple-light transition-colors"
            />
          </div>

          <div className="text-left">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-semibold text-petuno-secondary-text dark:text-dark-secondary-text">Contraseña</label>
              <a href="#" className="text-xs text-petuno-purple dark:text-petuno-purple-light hover:underline">¿Olvidaste tu contraseña?</a>
            </div>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              placeholder="••••••••" 
              className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-3 text-sm text-petuno-text dark:text-dark-text focus:outline-none focus:border-petuno-purple dark:focus:border-petuno-purple-light transition-colors"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 accent-petuno-purple rounded border-petuno-border dark:border-petuno-secondary-text/30"
              />
              <span className="text-xs text-petuno-secondary-text dark:text-dark-secondary-text">Recordarme</span>
            </label>
          </div>

          <button 
            type="submit" 
            className="w-full bg-petuno-purple hover:bg-petuno-purple-dark text-white font-semibold py-3 rounded-xl transition-colors shadow-md mt-4 text-sm"
          >
            Iniciar sesión
          </button>
        </form>

        <div className="relative my-6 text-center">
          <hr className="border-petuno-border dark:border-petuno-secondary-text/20" />
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-petuno-surface dark:bg-dark-surface px-3 text-xs text-petuno-muted">O continuar con</span>
        </div>

        <button className="w-full bg-transparent hover:bg-petuno-border/20 dark:hover:bg-dark-surface-elevated border border-petuno-border dark:border-petuno-secondary-text/30 text-petuno-text dark:text-dark-text font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 5.04c1.62 0 3.08.56 4.22 1.65l3.15-3.15C17.45 1.74 14.93 1 12 1 7.35 1 3.39 3.65 1.5 7.5l3.79 2.94C6.26 6.94 8.93 5.04 12 5.04z"/>
            <path fill="#4285F4" d="M23.52 12.27c0-.82-.07-1.61-.21-2.38H12v4.51h6.48c-.28 1.48-1.12 2.73-2.38 3.58l3.79 2.94c2.22-2.05 3.63-5.07 3.63-8.65z"/>
            <path fill="#FBBC05" d="M5.29 14.56c-.23-.69-.36-1.42-.36-2.18s.13-1.49.36-2.18L1.5 7.26C.54 9.17 0 11.27 0 13.5s.54 4.33 1.5 6.24l3.79-3.18z"/>
            <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.79-2.94c-1.05.7-2.4 1.13-4.17 1.13-3.07 0-5.74-1.9-6.71-4.75L1.5 16.51C3.39 20.35 7.35 23 12 23z"/>
          </svg>
          Google
        </button>

        <p className="text-xs text-petuno-secondary-text dark:text-dark-secondary-text text-center mt-6">
          ¿No tienes una cuenta?{' '}
          <Link to="/register" className="text-petuno-purple dark:text-petuno-purple-light font-semibold hover:underline">Registrarse</Link>
        </p>
      </div>
    </div>
  );
}
