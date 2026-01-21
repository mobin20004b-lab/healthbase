import type { Clinic } from '@prisma/client';

export async function getClinics(searchParams: URLSearchParams): Promise<Clinic[]> {
  // This would normally fetch from the database
  // For now, we return mock data, but filtered

  const allClinics: Clinic[] = [
    {
      id: '1',
      name: 'Tehran Heart Center',
      city: 'Tehran',
      province: 'Tehran',
      country: 'Iran',
      image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=1000',
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      description: null,
      address: 'North Kargar St',
      postalCode: null,
      phone: null,
      email: null,
      website: null,
      latitude: null,
      longitude: null,
      type: 'HOSPITAL',
      status: 'ACTIVE',
      adminId: 'admin1',
    },
    {
      id: '2',
      name: 'Milad Hospital',
      city: 'Tehran',
      province: 'Tehran',
      country: 'Iran',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000',
      isVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      description: null,
      address: 'Hemmat Highway',
      postalCode: null,
      phone: null,
      email: null,
      website: null,
      latitude: null,
      longitude: null,
      type: 'HOSPITAL',
      status: 'ACTIVE',
      adminId: 'admin2',
    },
    {
      id: '3',
      name: 'Shiraz Central Clinic',
      city: 'Shiraz',
      province: 'Fars',
      country: 'Iran',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a092fc43?auto=format&fit=crop&q=80&w=1000',
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      description: null,
      address: 'Zand St',
      postalCode: null,
      phone: null,
      email: null,
      website: null,
      latitude: null,
      longitude: null,
      type: 'CLINIC',
      status: 'ACTIVE',
      adminId: 'admin3',
    }
  ];

  // Extend Clinic type locally to include mock properties used for filtering
  type MockClinic = Clinic & { specialties?: string[], insurances?: string[] };

  const clinicsWithProps: MockClinic[] = allClinics.map(c => {
    if (c.id === '1') return { ...c, specialties: ['Cardiology'], insurances: ['Salamat', 'Tamin'] };
    if (c.id === '2') return { ...c, specialties: ['Neurology', 'Cardiology'], insurances: ['Salamat'] };
    if (c.id === '3') return { ...c, specialties: ['Dentistry'], insurances: ['NiroohayeMosallah'] };
    return c;
  });

  const city = searchParams.get('city');
  const province = searchParams.get('province');
  const q = searchParams.get('q');
  const specialtyParam = searchParams.get('specialty');
  const insuranceParam = searchParams.get('insurance');

  const specialties = specialtyParam ? specialtyParam.split(',') : [];
  const insurances = insuranceParam ? insuranceParam.split(',') : [];

  return clinicsWithProps.filter(clinic => {
    if (city && clinic.city !== city) return false;
    if (province && clinic.province !== province) return false;
    if (q) {
      const query = q.toLowerCase();
      if (!clinic.name.toLowerCase().includes(query)) return false;
    }

    if (specialties.length > 0) {
      if (!clinic.specialties || !specialties.some(s => clinic.specialties!.includes(s))) return false;
    }

    if (insurances.length > 0) {
      if (!clinic.insurances || !insurances.some(i => clinic.insurances!.includes(i))) return false;
    }

    return true;
  });
}
