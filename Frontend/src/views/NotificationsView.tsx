import { useState } from 'react';
import type { NotificationItem } from '../types';

export default function NotificationsView({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDeleteNotification,
  onClearAll
}: {
  notifications: NotificationItem[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDeleteNotification: (id: string) => void;
  onClearAll: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');

  const categories = ['Todos', 'GPS', 'Alertas', 'Vacunas', 'Medicamentos', 'Dispositivos', 'Sistema'];

  const filteredNotifications = notifications.filter(notif => {
    const matchesSearch = 
      notif.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      notif.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'Todos' || notif.type === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryStyles = (type: string) => {
    switch (type) {
      case 'GPS':
        return { bg: 'bg-petuno-coral/10 text-petuno-coral', icon: '📍' };
      case 'Alertas':
        return { bg: 'bg-petuno-coral/10 text-petuno-coral border border-petuno-coral/20', icon: '🚨' };
      case 'Vacunas':
        return { bg: 'bg-petuno-mint-light text-petuno-mint', icon: '💉' };
      case 'Medicamentos':
        return { bg: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400', icon: '💊' };
      case 'Dispositivos':
        return { bg: 'bg-petuno-purple-50 text-petuno-purple dark:bg-petuno-purple/10 dark:text-petuno-purple-light', icon: '⚡' };
      case 'Sistema':
      default:
        return { bg: 'bg-petuno-background dark:bg-dark-surface-elevated text-petuno-secondary-text', icon: '⚙️' };
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-left animate-fade-in">
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold">Bandeja de Notificaciones</h2>
          <p className="text-xs text-petuno-secondary-text mt-0.5">
            Monitorea el estado en vivo de geocercas, vacunas de tus mascotas y alertas de avistamiento.
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button 
            onClick={onMarkAllAsRead}
            className="flex-1 sm:flex-none border border-petuno-border dark:border-petuno-secondary-text/20 hover:bg-petuno-background dark:hover:bg-dark-surface-elevated text-petuno-text dark:text-dark-text font-semibold px-4 py-2 rounded-xl text-xs transition-colors"
          >
            Marcar todas como leídas
          </button>
          <button 
            onClick={onClearAll}
            className="flex-1 sm:flex-none border border-petuno-coral/30 hover:bg-petuno-coral-light/20 text-petuno-coral font-semibold px-4 py-2 rounded-xl text-xs transition-colors"
          >
            Limpiar todo
          </button>
        </div>
      </div>

      {/* Search and Category Filters */}
      <div className="bg-petuno-surface dark:bg-dark-surface p-4 rounded-3xl border border-petuno-border dark:border-petuno-secondary-text/15 space-y-4">
        
        {/* Search Input */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-petuno-secondary-text">
            🔍
          </span>
          <input 
            type="text" 
            placeholder="Buscar por título, descripción o categoría..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-petuno-background dark:bg-dark-surface-elevated border border-petuno-border dark:border-transparent rounded-2xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-petuno-purple dark:focus:border-petuno-purple transition-all placeholder-petuno-muted"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-petuno-secondary-text hover:text-petuno-text"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Category Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {categories.map(cat => {
            const isActive = activeCategory === cat;
            const count = cat === 'Todos' 
              ? notifications.length 
              : notifications.filter(n => n.type === cat).length;
            
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[11px] font-bold px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                  isActive 
                    ? 'bg-petuno-purple text-white shadow-sm' 
                    : 'bg-petuno-background hover:bg-petuno-border/30 dark:bg-dark-surface-elevated/80 dark:hover:bg-dark-surface-elevated text-petuno-secondary-text dark:text-dark-secondary-text'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-extrabold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-petuno-border/40 dark:bg-dark-surface-elevated-hover text-petuno-muted'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Notifications Feed */}
      <div className="space-y-3">
        {filteredNotifications.map(notif => {
          const style = getCategoryStyles(notif.type);
          return (
            <div 
              key={notif.id}
              className={`p-4 rounded-3xl border transition-all flex items-start gap-4 text-left ${
                notif.read 
                  ? 'bg-petuno-surface/60 dark:bg-dark-surface/50 border-petuno-border dark:border-petuno-secondary-text/10 opacity-75' 
                  : 'bg-petuno-surface dark:bg-dark-surface border-petuno-border dark:border-petuno-secondary-text/15 shadow-sm border-l-4 border-l-petuno-purple'
              }`}
            >
              {/* Category Icon */}
              <div className={`w-10 h-10 rounded-2xl ${style.bg} flex items-center justify-center text-lg shrink-0`}>
                {style.icon}
              </div>

              {/* Text Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                  <h4 className="text-xs font-extrabold text-petuno-text dark:text-dark-text flex items-center gap-2">
                    {notif.title}
                    {!notif.read && (
                      <span className="w-1.5 h-1.5 bg-petuno-purple rounded-full shrink-0"></span>
                    )}
                  </h4>
                  <span className="text-[10px] text-petuno-muted font-semibold">{notif.time}</span>
                </div>
                <p className="text-xs text-petuno-secondary-text dark:text-dark-secondary-text mt-1 leading-relaxed">
                  {notif.desc}
                </p>
                <div className="flex gap-4 mt-3 pt-3 border-t border-petuno-border/30 dark:border-petuno-secondary-text/5 text-[10px]">
                  <button 
                    onClick={() => onMarkAsRead(notif.id)}
                    className="font-bold text-petuno-purple hover:underline"
                  >
                    {notif.read ? 'Marcar como no leída' : 'Marcar como leída'}
                  </button>
                  <button 
                    onClick={() => onDeleteNotification(notif.id)}
                    className="font-bold text-petuno-coral hover:underline"
                  >
                    Eliminar
                  </button>
                </div>
              </div>

            </div>
          );
        })}

        {filteredNotifications.length === 0 && (
          <div className="bg-petuno-surface dark:bg-dark-surface p-12 rounded-3xl border border-petuno-border dark:border-petuno-secondary-text/15 text-center">
            <p className="text-xs text-petuno-secondary-text">No se encontraron notificaciones que coincidan con los filtros.</p>
          </div>
        )}
      </div>

    </div>
  );
}
