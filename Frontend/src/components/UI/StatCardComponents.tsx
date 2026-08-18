import React from 'react';

export function FeatureCard({ 
  icon, 
  title, 
  desc 
}: { 
  icon: React.ReactNode; 
  title: string; 
  desc: string; 
}) {
  return (
    <div className="bg-petuno-surface dark:bg-dark-surface p-6 rounded-3xl border border-petuno-border dark:border-petuno-secondary-text/10 shadow-sm space-y-3 text-left">
      <div className="w-10 h-10 rounded-2xl bg-petuno-purple-50 dark:bg-dark-surface-elevated flex items-center justify-center text-petuno-purple shadow-inner">
        {icon}
      </div>
      <h3 className="font-extrabold text-sm text-petuno-text dark:text-dark-text">{title}</h3>
      <p className="text-xs text-petuno-secondary-text dark:text-dark-secondary-text leading-relaxed">{desc}</p>
    </div>
  );
}

export function ExploreCard({ 
  image, 
  title, 
  desc 
}: { 
  image: string; 
  title: string; 
  desc: string; 
}) {
  return (
    <div className="bg-petuno-surface dark:bg-dark-surface rounded-3xl overflow-hidden border border-petuno-border dark:border-petuno-secondary-text/10 shadow-sm flex flex-col group text-left">
      <div className="h-44 w-full overflow-hidden bg-petuno-purple-50">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
      </div>
      <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
        <h4 className="font-extrabold text-xs text-petuno-text dark:text-dark-text group-hover:text-petuno-purple transition-colors">{title}</h4>
        <p className="text-[11px] text-petuno-secondary-text dark:text-dark-secondary-text leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

export function StatBox({ 
  icon, 
  number, 
  text 
}: { 
  icon: React.ReactNode; 
  number: string; 
  text: string; 
}) {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-dark-surface rounded-3xl border border-petuno-border dark:border-petuno-secondary-text/10 shadow-sm space-y-2 text-center">
      <div className="w-12 h-12 rounded-full bg-petuno-purple/10 flex items-center justify-center text-petuno-purple">
        {icon}
      </div>
      <span className="text-2xl font-extrabold text-petuno-text dark:text-dark-text block">{number}</span>
      <span className="text-[10px] text-petuno-secondary-text dark:text-dark-secondary-text font-bold uppercase tracking-wider block">{text}</span>
    </div>
  );
}

export function MetricCard({ 
  icon, 
  title, 
  value 
}: { 
  icon: React.ReactNode; 
  title: string; 
  value: string; 
}) {
  return (
    <div className="bg-petuno-surface dark:bg-dark-surface p-5 rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 shadow-sm flex items-center gap-4 text-left">
      <div className="w-10 h-10 rounded-xl bg-petuno-purple/10 flex items-center justify-center text-petuno-purple shrink-0">
        {icon}
      </div>
      <div>
        <span className="text-[10px] text-petuno-muted font-bold block uppercase tracking-wider">{title}</span>
        <span className="text-lg font-extrabold text-petuno-text dark:text-dark-text block mt-0.5">{value}</span>
      </div>
    </div>
  );
}
