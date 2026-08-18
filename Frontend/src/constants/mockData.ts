import type { 
  Pet, Sighting, UnidentifiedSighting, CommunityPost, 
  Device, Vet, AdoptionPet, PrivacySettings, NotificationItem, ModuleConfig 
} from '../types';

export const DEFAULT_MODULE_CONFIG: ModuleConfig = {
  sos: true,
  adoptions: true,
  donations: true,
  community: true,
  devices: true,
  vets: true
};

export const INITIAL_PETS: Pet[] = [
  {
    id: 'max',
    name: 'Max',
    species: 'Perro',
    breed: 'Labrador Retriever',
    gender: 'Macho',
    status: 'Protegido',
    petunoId: 'PTO-82A91X',
    photo: 'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=600&auto=format&fit=crop',
    birthDate: '2023-05-15',
    age: '3 años',
    color: 'Dorado',
    weight: '32 kg',
    microchip: '900115000234765',
    characteristics: 'Muy juguetón, le encanta correr por el parque y es amigable con otros perros.',
    allergies: 'Ninguna conocida',
    medicalCritical: 'Alergia a la penicilina',
    ownerName: 'John Doe',
    emergencyContact: '+57 300 123 4567',
    isPublic: true,
    allowContact: true,
    isMine: true,
    hasGps: true,
    city: 'Bogotá'
  },
  {
    id: 'luna',
    name: 'Luna',
    species: 'Gato',
    breed: 'Siamés',
    gender: 'Hembra',
    status: 'Protegido',
    petunoId: 'PTO-93B22Y',
    photo: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&auto=format&fit=crop',
    birthDate: '2024-02-10',
    age: '2 años',
    color: 'Crema con manchas café',
    weight: '4.2 kg',
    microchip: '900115000234881',
    characteristics: 'Tímida al principio, maúlla suavemente cuando quiere comer.',
    allergies: 'Ninguna conocida',
    medicalCritical: 'Ninguna',
    ownerName: 'John Doe',
    emergencyContact: '+57 300 123 4567',
    isPublic: true,
    allowContact: true,
    isMine: true,
    hasGps: false,
    city: 'Bogotá'
  },
  {
    id: 'toby',
    name: 'Toby',
    species: 'Perro',
    breed: 'Golden Retriever',
    gender: 'Macho',
    status: 'Perdido',
    petunoId: 'PTO-11A99Z',
    photo: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=600&auto=format&fit=crop',
    birthDate: '2022-11-01',
    age: '3 años',
    color: 'Amarillo claro',
    weight: '34 kg',
    characteristics: 'Tiene una mancha blanca en su pata delantera izquierda, es dócil pero asustadizo.',
    allergies: 'Ninguna conocida',
    medicalCritical: 'Ninguna',
    ownerName: 'Camila Rojas',
    emergencyContact: '+57 311 999 8888',
    isPublic: true,
    allowContact: true,
    isMine: false,
    hasGps: false,
    city: 'Bogotá'
  },
  {
    id: 'michi',
    name: 'Michi',
    species: 'Gato',
    breed: 'Común Europeo',
    gender: 'Hembra',
    status: 'Perdido',
    petunoId: 'PTO-22B88Y',
    photo: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=600&auto=format&fit=crop',
    birthDate: '2025-01-10',
    age: '1 año',
    color: 'Atigrado gris',
    weight: '4.0 kg',
    characteristics: 'Lleva collar rojo sin placa. Es juguetona.',
    allergies: 'Ninguna conocida',
    medicalCritical: 'Ninguna',
    ownerName: 'Andrés Pérez',
    emergencyContact: '+57 322 777 6666',
    isPublic: true,
    allowContact: true,
    isMine: false,
    hasGps: false,
    city: 'Bogotá'
  }
];

export const INITIAL_SIGHTINGS = (currentTime: number): Sighting[] => [
  {
    id: 's1',
    petId: 'max',
    petName: 'Max',
    petPhoto: 'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=600&auto=format&fit=crop',
    location: 'Parque de la 93',
    date: '2026-08-17',
    time: '15:20',
    description: 'Visto corriendo sin correa cerca de la fuente. Parece desorientado.',
    timestamp: currentTime - 12 * 60 * 1000
  },
  {
    id: 's2',
    petId: 'max',
    petName: 'Max',
    petPhoto: 'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=600&auto=format&fit=crop',
    location: 'Carrera 11 con Calle 90',
    date: '2026-08-17',
    time: '14:50',
    description: 'Cruzando la calle rápidamente hacia el occidente.',
    timestamp: currentTime - 45 * 60 * 1000
  }
];

export const INITIAL_UNIDENTIFIED_SIGHTINGS: UnidentifiedSighting[] = [
  {
    id: 'u1',
    location: 'Parque Virrey, Bogotá',
    date: '2026-08-17',
    time: '12:15',
    description: 'Perrito tipo Golden o Labrador color crema, corre asustado sin collar cerca de la zona de juegos.',
    photo: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'u2',
    location: 'Calle 100 con Carrera 15, Bogotá',
    date: '2026-08-17',
    time: '10:45',
    description: 'Gato siamés con collar azul pero sin placa QR. Es dócil y está resguardado temporalmente en portería.',
    photo: 'https://images.unsplash.com/photo-1513360309081-36f5e878fc9e?q=80&w=600&auto=format&fit=crop'
  }
];

export const INITIAL_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    authorName: 'Camila Rojas',
    authorRole: 'Propietario',
    content: '¡Toby sigue perdido! Por favor, si alguien en la zona de Cedritos lo ve, repórtelo como avistamiento o envíeme un mensaje anónimo. Es de color amarillo claro y muy asustadizo.',
    photo: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=600&auto=format&fit=crop',
    likes: 24,
    commentsCount: 5,
    timestamp: 'Hace 2 horas'
  },
  {
    id: 'post-2',
    authorName: 'Clínica Veterinaria PetHealth',
    authorRole: 'Veterinario Verificado',
    content: 'Este sábado tendremos jornada de vacunación y desparasitación gratuita en el Parque de la 93 de 9:00 AM a 2:00 PM. Estaremos obsequiando lectura de placas QR Petuno a los asistentes.',
    likes: 45,
    commentsCount: 12,
    timestamp: 'Hace 4 horas'
  },
  {
    id: 'post-3',
    authorName: 'Andrés Pérez',
    authorRole: 'Propietario',
    content: '¡Michi ya está en casa! Queremos agradecer enormemente a la comunidad de Petuno. Gracias a un avistamiento con foto reportado en Chapinero, pudimos ubicarla en menos de 12 horas. ¡El sistema de QR comunitario realmente funciona!',
    photo: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=600&auto=format&fit=crop',
    likes: 89,
    commentsCount: 18,
    timestamp: 'Ayer'
  }
];

export const INITIAL_DEVICES: Device[] = [
  {
    id: 'd1',
    name: 'Petuno GPS Collar',
    type: 'GPS',
    petId: 'max',
    status: 'Conectado',
    battery: 83,
    lastConnection: 'Hace 5 minutos'
  },
  {
    id: 'd2',
    name: 'Petuno QR Smart Tag',
    type: 'NFC',
    petId: 'luna',
    status: 'Conectado',
    battery: 100,
    lastConnection: 'Hace 1 hora'
  }
];

export const INITIAL_VETS: Vet[] = [
  {
    id: 'v1',
    name: 'Clínica Veterinaria Cedritos 24/7',
    specialty: 'Urgencias, Cirugía General',
    location: 'Usaquén, Bogotá',
    rating: 4.8,
    schedule: 'Abierto 24 Horas',
    phone: '+57 312 444 5555',
    isTrusted: true
  },
  {
    id: 'v2',
    name: 'Dr. Santiago Mendoza',
    specialty: 'Cardiología, Medicina Interna',
    location: 'Chapinero, Bogotá',
    rating: 4.9,
    schedule: 'Lun - Sáb: 8:00 AM - 6:00 PM',
    phone: '+57 320 888 9999',
    isTrusted: true
  },
  {
    id: 'v3',
    name: 'Centro Veterinario AnimalCare',
    specialty: 'Dermatología, Vacunación',
    location: 'Chicó, Bogotá',
    rating: 4.6,
    schedule: 'Lun - Sáb: 9:00 AM - 7:00 PM',
    phone: '+57 301 222 3333',
    isTrusted: false
  }
];

export const INITIAL_ADOPTION_PETS: AdoptionPet[] = [
  {
    id: 'a1',
    name: 'Lola',
    species: 'Perro',
    breed: 'Criolla (Poodle Mix)',
    age: '6 meses',
    gender: 'Hembra',
    size: 'Pequeño',
    specialNeeds: false,
    location: 'Bogotá, Colombia',
    shelter: 'Fundación Patitas Felices',
    description: 'Lola es extremadamente tierna, juguetona y sociable. Se lleva excelente con niños y otros perros.',
    photo: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'a2',
    name: 'Simba',
    species: 'Gato',
    breed: 'Común Europeo (Tabby)',
    age: '1 año',
    gender: 'Macho',
    size: 'Mediano',
    specialNeeds: false,
    location: 'Medellín, Colombia',
    shelter: 'Refugio Huellas de Amor',
    description: 'Simba es muy cariñoso, le encanta dormir en tu regazo y ronronea con mucha facilidad.',
    photo: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'a3',
    name: 'Rocco',
    species: 'Perro',
    breed: 'Golden Retriever Mix',
    age: '2 años',
    gender: 'Macho',
    size: 'Grande',
    specialNeeds: true,
    location: 'Bogotá, Colombia',
    shelter: 'Fundación Huellas',
    description: 'Rocco perdió una de sus patitas traseras en un accidente, pero corre y juega como cualquier perro. Necesita una casa sin demasiadas escaleras.',
    photo: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=600&auto=format&fit=crop'
  }
];

export const INITIAL_PRIVACY_SETTINGS: PrivacySettings = {
  showName: true,
  showBreed: true,
  showAge: true,
  showLocation: true,
  showMedical: true,
  allowAnonymousContact: true,
  allowSightings: true
};

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    title: '¡Toby tiene un nuevo avistamiento!',
    desc: 'Alguien reportó haber visto a Toby cerca de Carrera 11 con Calle 90.',
    time: 'Hace 5 minutos',
    read: false,
    type: 'Alertas'
  },
  {
    id: 'n2',
    title: 'Alerta de Geocerca: Max salió de Casa',
    desc: 'El collar GPS de Max detectó que cruzó el límite seguro de la geocerca "Casa".',
    time: 'Hace 12 minutos',
    read: false,
    type: 'GPS'
  },
  {
    id: 'n3',
    title: 'Próxima Vacuna Programada',
    desc: 'La vacuna de Rabia de Max está programada para el 21 de Septiembre.',
    time: 'Hace 2 horas',
    read: true,
    type: 'Vacunas'
  },
  {
    id: 'n4',
    title: 'Nueva solicitud de adopción',
    desc: 'Has recibido una nueva postulación de John Doe para adoptar a Lola.',
    time: 'Ayer',
    read: true,
    type: 'Sistema'
  }
];
