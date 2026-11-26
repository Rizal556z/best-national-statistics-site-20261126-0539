// Kavaria National Statistics Office — published figures.
// All figures are the Office's own estimates for the fictional Republic of
// Kavaria, compiled for this site. Sources and methods are listed on the
// About page. Money is in kavari (KVR); 1 USD ≈ 4.2 KVR (2025 average).

export const COUNTRY = {
  name: 'Kavaria',
  fullName: 'Republic of Kavaria',
  capital: 'Veldmar',
  areaKm2: 48210,
  currency: 'kavari (KVR)',
  language: 'Kavarian, with regional dialects',
  updated: '26 November 2025',
};

export const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];

// Resident population at 1 January, thousands.
export const POPULATION = [7820, 7905, 7990, 8078, 8152, 8190, 8245, 8305, 8368, 8395, 8420];

// Births and deaths per 1,000 residents.
export const BIRTH_RATE = [11.8, 11.6, 11.4, 11.2, 11.0, 10.4, 10.6, 10.9, 11.1, 11.0, 10.9];
export const DEATH_RATE = [9.4, 9.3, 9.2, 9.1, 9.0, 10.2, 9.8, 9.1, 8.9, 8.8, 8.7];

// Age structure 2025, share of population in percent.
export const AGE_GROUPS = [
  { label: '0–14', value: 17.4 },
  { label: '15–24', value: 12.1 },
  { label: '25–54', value: 41.8 },
  { label: '55–64', value: 13.2 },
  { label: '65+', value: 15.5 },
];

// Urban share of population, percent.
export const URBAN_SHARE = [61.2, 61.8, 62.4, 63.0, 63.6, 64.1, 64.7, 65.3, 65.9, 66.4, 66.9];

// GDP in billion KVR (current prices) and real growth, percent.
export const GDP = [182.4, 190.1, 199.8, 210.5, 219.6, 205.3, 218.9, 236.4, 249.1, 261.8, 274.6];
export const GDP_GROWTH = [2.8, 3.1, 3.4, 3.6, 2.9, -4.8, 5.2, 4.1, 3.3, 3.0, 2.9];
export const GDP_PER_CAPITA = [23325, 24051, 25006, 26058, 26939, 25067, 26554, 28467, 29767, 31185, 32613];

// GDP by sector, share in percent, 2025.
export const SECTORS = [
  { label: 'Services', value: 58.4, color: '#1d5c8a' },
  { label: 'Industry', value: 24.7, color: '#2e8b6a' },
  { label: 'Agriculture', value: 9.3, color: '#c98a2b' },
  { label: 'Construction', value: 7.6, color: '#7a5fb0' },
];

// Exports and imports, billion KVR.
export const EXPORTS = [58.2, 61.4, 65.0, 69.8, 72.3, 64.1, 71.5, 80.2, 84.6, 88.9, 93.4];
export const IMPORTS = [61.5, 63.9, 67.2, 71.0, 74.6, 68.0, 74.8, 83.1, 86.9, 90.4, 94.8];

// Consumer price index (2020 = 100) and annual inflation, percent.
export const CPI = [88.1, 89.7, 91.6, 94.0, 96.8, 100.0, 103.4, 109.8, 115.2, 118.9, 121.6];
export const INFLATION = [1.9, 1.8, 2.1, 2.6, 3.0, 3.3, 3.4, 6.2, 4.9, 3.2, 2.3];
export const INFLATION_BY_CATEGORY = [
  { label: 'Food & drink', value: 3.1 },
  { label: 'Housing & energy', value: 2.8 },
  { label: 'Transport', value: 1.9 },
  { label: 'Health', value: 2.4 },
  { label: 'Education', value: 2.1 },
  { label: 'Clothing', value: 1.2 },
  { label: 'Recreation', value: 1.6 },
];

// Labour market, percent of labour force / population.
export const UNEMPLOYMENT = [7.8, 7.4, 7.0, 6.5, 6.1, 8.9, 7.6, 6.8, 6.2, 5.8, 5.4];
export const UNEMPLOYMENT_YOUTH = [16.4, 15.8, 15.1, 14.2, 13.6, 19.8, 17.1, 15.4, 14.1, 13.2, 12.4];
export const EMPLOYMENT_RATE = [64.2, 64.8, 65.5, 66.1, 66.7, 63.9, 65.2, 66.4, 67.1, 67.8, 68.3];
export const EMPLOYMENT_BY_SECTOR = [
  { label: 'Services', value: 64.1 },
  { label: 'Industry', value: 19.8 },
  { label: 'Agriculture', value: 10.4 },
  { label: 'Construction', value: 5.7 },
];

// Health.
export const LIFE_EXPECTANCY = [76.8, 77.1, 77.4, 77.7, 78.0, 77.2, 77.6, 78.1, 78.4, 78.7, 78.9];
export const INFANT_MORTALITY = [5.8, 5.5, 5.2, 5.0, 4.8, 5.1, 4.7, 4.4, 4.2, 4.0, 3.8];
export const HOSPITAL_BEDS_PER_1000 = [4.6, 4.6, 4.5, 4.5, 4.4, 4.6, 4.6, 4.5, 4.5, 4.4, 4.4];
export const HEALTH_SPENDING_GDP = [7.1, 7.2, 7.3, 7.4, 7.5, 8.4, 8.1, 7.9, 7.8, 7.7, 7.6];

// Education.
export const LITERACY = [98.2, 98.3, 98.4, 98.5, 98.6, 98.6, 98.7, 98.8, 98.8, 98.9, 99.0];
export const ENROLMENT_PRIMARY = [99.1, 99.2, 99.3, 99.3, 99.4, 98.9, 99.2, 99.4, 99.5, 99.5, 99.6];
export const ENROLMENT_SECONDARY = [94.2, 94.8, 95.3, 95.8, 96.2, 95.1, 95.9, 96.4, 96.8, 97.1, 97.3];
export const ENROLMENT_TERTIARY = [58.4, 59.6, 60.8, 62.1, 63.4, 62.0, 63.8, 65.2, 66.5, 67.8, 69.1];
export const EDUCATION_SPENDING_GDP = [4.8, 4.9, 5.0, 5.1, 5.2, 5.4, 5.3, 5.2, 5.1, 5.0, 5.0];

// Regions (provinces), 2025.
export const REGIONS = [
  { name: 'Veldmar', capital: 'Veldmar City', pop: 2140, area: 4210, gdpPc: 41200, unemp: 4.1, urban: 92.4 },
  { name: 'Nordkust', capital: 'Harborvik', pop: 1410, area: 6840, gdpPc: 35800, unemp: 4.8, urban: 74.1 },
  { name: 'Ostfold', capital: 'Ostfold Town', pop: 1080, area: 5120, gdpPc: 30100, unemp: 5.2, urban: 68.3 },
  { name: 'Sydmark', capital: 'Sydhaven', pop: 1040, area: 5980, gdpPc: 28900, unemp: 5.9, urban: 61.7 },
  { name: 'Mitteltal', capital: 'Brunnfeld', pop: 960, area: 7430, gdpPc: 27600, unemp: 6.3, urban: 55.2 },
  { name: 'Westheide', capital: 'Westhaven', pop: 820, area: 4960, gdpPc: 26400, unemp: 6.8, urban: 58.9 },
  { name: 'Alpenrand', capital: 'Kaltstein', pop: 560, area: 8120, gdpPc: 24800, unemp: 6.1, urban: 42.6 },
  { name: 'Ostinseln', capital: 'Inselport', pop: 410, area: 5550, gdpPc: 23100, unemp: 7.4, urban: 48.3 },
];

// Key indicators shown on the home page, 2025.
export const KEY_INDICATORS = [
  { label: 'Population', value: '8.42 m', change: '+0.3% on 2024', href: '#/population' },
  { label: 'GDP per capita', value: '32,613 KVR', change: '+4.6% on 2024', href: '#/economy' },
  { label: 'Unemployment', value: '5.4%', change: '−0.4 pp on 2024', href: '#/labour' },
  { label: 'Inflation (CPI)', value: '2.3%', change: '−0.9 pp on 2024', href: '#/prices' },
  { label: 'Life expectancy', value: '78.9 years', change: '+0.2 years on 2024', href: '#/health' },
  { label: 'Tertiary enrolment', value: '69.1%', change: '+1.3 pp on 2024', href: '#/education' },
];

// Latest releases.
export const RELEASES = [
  { date: '26 Nov 2025', title: 'Consumer prices, October 2025 — inflation eases to 2.3%', href: '#/prices' },
  { date: '19 Nov 2025', title: 'Labour force survey, Q3 2025 — unemployment falls to 5.4%', href: '#/labour' },
  { date: '12 Nov 2025', title: 'Regional accounts 2024 — Veldmar still the richest province', href: '#/regions' },
  { date: '05 Nov 2025', title: 'Population at 1 January 2025 — 8.42 million residents', href: '#/population' },
  { date: '29 Oct 2025', title: 'National accounts, Q3 2025 — GDP up 2.9% on the year', href: '#/economy' },
  { date: '22 Oct 2025', title: 'Health statistics 2024 — life expectancy reaches 78.9 years', href: '#/health' },
];

// Release calendar.
export const CALENDAR = [
  { date: '10 Dec 2025', title: 'Consumer prices, November 2025' },
  { date: '17 Dec 2025', title: 'National accounts, Q3 2025 (revised)' },
  { date: '14 Jan 2026', title: 'Labour force survey, Q4 2025' },
  { date: '28 Jan 2026', title: 'Population by municipality, 2025' },
  { date: '11 Feb 2026', title: 'Education statistics 2025' },
  { date: '25 Feb 2026', title: 'Regional accounts 2025' },
];

export function fmt(n, decimals = 0) {
  return n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export function yearValue(series, year) {
  const i = YEARS.indexOf(year);
  return i < 0 ? null : series[i];
}
