import React from 'react';
import { FileText } from 'lucide-react';

export function VaccineRow({ 
  name, 
  date, 
  status, 
  vet, 
  isWarning 
}: { 
  name: string; 
  date: string; 
  status: string; 
  vet: string; 
  isWarning?: boolean; 
}) {
  return (
    <div className="flex items-center justify-between p-3 border border-petuno-border dark:border-petuno-secondary-text/10 rounded-xl">
      <div>
        <h5 className="text-xs font-bold">{name}</h5>
        <p className="text-[10px] text-petuno-secondary-text mt-0.5">{vet} • Programada: {date}</p>
      </div>
      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
        isWarning ? 'bg-petuno-amber-light text-petuno-amber' : 'bg-petuno-mint-light text-petuno-mint'
      }`}>
        {status}
      </span>
    </div>
  );
}

export function DocumentRow({ 
  name, 
  size, 
  date 
}: { 
  name: string; 
  size: string; 
  date: string; 
}) {
  return (
    <div className="flex items-center justify-between p-3 border border-petuno-border dark:border-petuno-secondary-text/10 rounded-xl">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-petuno-background dark:bg-dark-surface-elevated rounded-lg text-petuno-purple">
          <FileText className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-xs font-bold">{name}</h4>
          <p className="text-[10px] text-petuno-secondary-text mt-0.5">{size} • {date}</p>
        </div>
      </div>
      <button className="text-xs font-bold text-petuno-purple hover:underline">Descargar</button>
    </div>
  );
}

export function TimelineRow({ 
  icon, 
  title, 
  time, 
  desc 
}: { 
  icon: React.ReactNode; 
  title: string; 
  time: string; 
  desc: string; 
}) {
  return (
    <div className="flex gap-3 relative z-10 text-left">
      <div className="w-7 h-7 rounded-full bg-petuno-background dark:bg-dark-surface-elevated flex items-center justify-center flex-shrink-0 border-2 border-petuno-surface dark:border-dark-surface">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-baseline gap-2">
          <h4 className="text-xs font-bold">{title}</h4>
          <span className="text-[9px] text-petuno-muted shrink-0">{time}</span>
        </div>
        <p className="text-[10px] text-petuno-secondary-text dark:text-dark-secondary-text mt-0.5">{desc}</p>
      </div>
    </div>
  );
}

export function EventRow({ 
  icon, 
  title, 
  date, 
  badge 
}: { 
  icon: React.ReactNode; 
  title: string; 
  date: string; 
  badge?: string; 
}) {
  return (
    <div className="flex items-center justify-between p-3 border border-petuno-border dark:border-petuno-secondary-text/10 rounded-xl">
      <div className="flex items-center gap-3">
        <div className="text-petuno-purple">{icon}</div>
        <div>
          <h4 className="text-xs font-bold text-petuno-text dark:text-dark-text">{title}</h4>
          <p className="text-[10px] text-petuno-secondary-text dark:text-dark-secondary-text mt-0.5">{date}</p>
        </div>
      </div>
      {badge && (
        <span className="text-[9px] bg-petuno-coral/10 text-petuno-coral font-bold px-2 py-0.5 rounded">
          {badge}
        </span>
      )}
    </div>
  );
}

export function ActivityRow({ 
  icon, 
  title, 
  time, 
  desc 
}: { 
  icon: React.ReactNode; 
  title: string; 
  time: string; 
  desc?: string; 
}) {
  return (
    <div className="flex gap-3 text-left">
      <div className="text-petuno-purple shrink-0 mt-0.5">{icon}</div>
      <div>
        <h4 className="text-xs font-bold text-petuno-text dark:text-dark-text">{title}</h4>
        {desc && <p className="text-[10px] text-petuno-secondary-text dark:text-dark-secondary-text mt-0.5">{desc}</p>}
        <span className="text-[9px] text-petuno-muted mt-1 block">{time}</span>
      </div>
    </div>
  );
}

export function MobileNavItem({ 
  icon, 
  label, 
  active, 
  onClick 
}: { 
  icon: React.ReactNode; 
  label: string; 
  active: boolean; 
  onClick: () => void; 
}) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
        active 
          ? 'text-petuno-purple scale-110' 
          : 'text-petuno-muted hover:text-petuno-purple'
      }`}
    >
      {icon}
      <span className="text-[9px] font-bold mt-1">{label}</span>
    </button>
  );
}
