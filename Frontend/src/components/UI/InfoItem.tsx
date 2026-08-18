
export default function InfoItem({ 
  label, 
  value 
}: { 
  label: string; 
  value: string; 
}) {
  return (
    <div className="space-y-1">
      <span className="text-[10px] text-petuno-muted font-bold block">{label}</span>
      <span className="text-xs font-bold text-petuno-text dark:text-dark-text block">{value}</span>
    </div>
  );
}
