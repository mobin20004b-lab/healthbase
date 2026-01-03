export const COUNTRIES = [
  {
    value: 'Iran',
    label: 'locations.countries.Iran',
    provinces: [
      {
        value: 'Yazd',
        label: 'locations.provinces.Yazd',
        cities: [
          { value: 'Yazd', label: 'locations.cities.Yazd' },
          { value: 'Meybod', label: 'locations.cities.Meybod' },
          { value: 'Ardakan', label: 'locations.cities.Ardakan' },
          { value: 'Bafq', label: 'locations.cities.Bafq' },
          { value: 'Mehriz', label: 'locations.cities.Mehriz' },
        ],
      },
      {
        value: 'Tehran',
        label: 'locations.provinces.Tehran',
        cities: [
          { value: 'Tehran', label: 'locations.cities.Tehran' },
          { value: 'Eslamshahr', label: 'locations.cities.Eslamshahr' },
          { value: 'Shahriar', label: 'locations.cities.Shahriar' },
        ],
      },
      {
        value: 'Isfahan',
        label: 'locations.provinces.Isfahan',
        cities: [
          { value: 'Isfahan', label: 'locations.cities.Isfahan' },
          { value: 'Kashan', label: 'locations.cities.Kashan' },
          { value: 'Najafabad', label: 'locations.cities.Najafabad' },
        ],
      },
      {
        value: 'Fars',
        label: 'locations.provinces.Fars',
        cities: [
          { value: 'Shiraz', label: 'locations.cities.Shiraz' },
          { value: 'Marvdasht', label: 'locations.cities.Marvdasht' },
          { value: 'Jahrom', label: 'locations.cities.Jahrom' },
        ],
      },
      {
        value: 'Razavi Khorasan',
        label: 'locations.provinces.RazaviKhorasan',
        cities: [
          { value: 'Mashhad', label: 'locations.cities.Mashhad' },
          { value: 'Nishapur', label: 'locations.cities.Nishapur' },
          { value: 'Sabzevar', label: 'locations.cities.Sabzevar' },
        ],
      },
    ]
  }
];

// Helper to get provinces for a country (defaulting to Iran if none specified)
export const getProvinces = (country = 'Iran') => {
  return COUNTRIES.find(c => c.value === country)?.provinces || [];
};

// Helper to get cities for a province
export const getCities = (province: string, country = 'Iran') => {
  const prov = getProvinces(country).find(p => p.value === province);
  return prov?.cities || [];
};
