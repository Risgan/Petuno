
export default function QrCodeMockup() {
  return (
    <svg className="w-32 h-32" viewBox="0 0 100 100" fill="currentColor">
      {/* Outer anchors */}
      <rect x="5" y="5" width="25" height="25" fill="none" stroke="black" strokeWidth="6" />
      <rect x="11" y="11" width="13" height="13" fill="black" />
      
      <rect x="70" y="5" width="25" height="25" fill="none" stroke="black" strokeWidth="6" />
      <rect x="76" y="11" width="13" height="13" fill="black" />
      
      <rect x="5" y="70" width="25" height="25" fill="none" stroke="black" strokeWidth="6" />
      <rect x="11" y="76" width="13" height="13" fill="black" />
      
      {/* Mock pixels */}
      <rect x="40" y="5" width="6" height="6" />
      <rect x="50" y="15" width="6" height="12" />
      <rect x="60" y="5" width="6" height="6" />
      <rect x="45" y="35" width="12" height="6" />
      <rect x="5" y="45" width="12" height="6" />
      <rect x="25" y="45" width="6" height="18" />
      <rect x="40" y="50" width="12" height="12" />
      <rect x="75" y="40" width="18" height="6" />
      <rect x="85" y="55" width="6" height="12" />
      <rect x="60" y="70" width="6" height="6" />
      <rect x="70" y="80" width="18" height="6" />
      <rect x="45" y="85" width="12" height="6" />
      
      {/* Petuno Brand ID Tag inside QR */}
      <rect x="35" y="40" width="30" height="20" rx="3" fill="#6c4ce8" />
      <text x="50" y="52" fill="white" fontSize="6" fontWeight="bold" textAnchor="middle">PETUNO</text>
    </svg>
  );
}
