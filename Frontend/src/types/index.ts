export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  gender: string;
  status: 'Protegido' | 'Perdido' | 'Encontrado';
  petunoId: string;
  photo: string;
  birthDate?: string;
  age?: string;
  color?: string;
  weight?: string;
  microchip?: string;
  characteristics?: string;
  allergies?: string;
  medicalCritical?: string;
  ownerName?: string;
  emergencyContact?: string;
  isPublic?: boolean;
  allowContact?: boolean;
  isMine?: boolean;
  hasGps?: boolean;
  city?: string;
  lastSeenLocation?: string;
}

export interface Sighting {
  id: string;
  petId: string;
  petName: string;
  petPhoto: string;
  location: string;
  date: string;
  time: string;
  description: string;
  photo?: string;
  timestamp: number;
}

export interface UnidentifiedSighting {
  id: string;
  location: string;
  date: string;
  time: string;
  description: string;
  photo: string;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorRole?: string;
  content: string;
  photo?: string;
  likes: number;
  commentsCount: number;
  timestamp: string;
  likedByUser?: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  read: boolean;
  type: 'Vacunas' | 'Medicamentos' | 'GPS' | 'Alertas' | 'Dispositivos' | 'Sistema';
}

export interface Device {
  id: string;
  name: string;
  type: 'GPS' | 'BLE' | 'NFC' | 'RFID';
  petId: string;
  status: 'Conectado' | 'Desconectado';
  battery: number;
  lastConnection: string;
}

export interface Vet {
  id: string;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  schedule: string;
  phone: string;
  isTrusted?: boolean;
}

export interface AdoptionPet {
  id: string;
  name: string;
  species: 'Perro' | 'Gato';
  breed: string;
  age: string;
  gender: 'Macho' | 'Hembra';
  size: 'Pequeño' | 'Mediano' | 'Grande';
  specialNeeds: boolean;
  location: string;
  shelter: string;
  description: string;
  photo: string;
}

export interface AdoptionApplication {
  id: string;
  adoptionPetId: string;
  petName: string;
  applicantName: string;
  email: string;
  phone: string;
  address: string;
  housing: string;
  hasPets: boolean;
  timeAvailable: string;
  status: 'Pendiente' | 'Aprobada' | 'Rechazada';
  date: string;
}

export interface PrivacySettings {
  showName: boolean;
  showBreed: boolean;
  showAge: boolean;
  showLocation: boolean;
  showMedical: boolean;
  allowAnonymousContact: boolean;
  allowSightings: boolean;
}

export interface ModuleConfig {
  sos: boolean;
  adoptions: boolean;
  donations: boolean;
  community: boolean;
  devices: boolean;
  vets: boolean;
}
