// Country and city data with shipping codes

export interface Country {
  code: string;
  name: string;
  cities: City[];
  shippingCode: string;
}

export interface City {
  name: string;
  code: string;
}

export const countries: Country[] = [
  {
    code: 'US',
    name: 'United States',
    shippingCode: 'US',
    cities: [
      { name: 'New York', code: 'NYC' },
      { name: 'Los Angeles', code: 'LAX' },
      { name: 'Chicago', code: 'CHI' },
      { name: 'Houston', code: 'HOU' },
      { name: 'Miami', code: 'MIA' },
      { name: 'San Francisco', code: 'SFO' },
      { name: 'Seattle', code: 'SEA' },
      { name: 'Boston', code: 'BOS' },
      { name: 'Atlanta', code: 'ATL' },
      { name: 'Dallas', code: 'DFW' },
    ],
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    shippingCode: 'GB',
    cities: [
      { name: 'London', code: 'LON' },
      { name: 'Manchester', code: 'MAN' },
      { name: 'Birmingham', code: 'BHX' },
      { name: 'Liverpool', code: 'LIV' },
      { name: 'Glasgow', code: 'GLA' },
      { name: 'Edinburgh', code: 'EDI' },
      { name: 'Bristol', code: 'BRS' },
      { name: 'Leeds', code: 'LBA' },
    ],
  },
  {
    code: 'IN',
    name: 'India',
    shippingCode: 'IN',
    cities: [
      { name: 'Mumbai', code: 'BOM' },
      { name: 'Delhi', code: 'DEL' },
      { name: 'Bangalore', code: 'BLR' },
      { name: 'Chennai', code: 'MAA' },
      { name: 'Kolkata', code: 'CCU' },
      { name: 'Hyderabad', code: 'HYD' },
      { name: 'Pune', code: 'PNQ' },
      { name: 'Ahmedabad', code: 'AMD' },
    ],
  },
  {
    code: 'CN',
    name: 'China',
    shippingCode: 'CN',
    cities: [
      { name: 'Shanghai', code: 'SHA' },
      { name: 'Beijing', code: 'PEK' },
      { name: 'Guangzhou', code: 'CAN' },
      { name: 'Shenzhen', code: 'SZX' },
      { name: 'Hong Kong', code: 'HKG' },
      { name: 'Ningbo', code: 'NGB' },
      { name: 'Qingdao', code: 'TAO' },
      { name: 'Tianjin', code: 'TSN' },
    ],
  },
  {
    code: 'DE',
    name: 'Germany',
    shippingCode: 'DE',
    cities: [
      { name: 'Berlin', code: 'BER' },
      { name: 'Hamburg', code: 'HAM' },
      { name: 'Munich', code: 'MUC' },
      { name: 'Frankfurt', code: 'FRA' },
      { name: 'Cologne', code: 'CGN' },
      { name: 'Stuttgart', code: 'STR' },
      { name: 'Düsseldorf', code: 'DUS' },
      { name: 'Dortmund', code: 'DTM' },
    ],
  },
  {
    code: 'FR',
    name: 'France',
    shippingCode: 'FR',
    cities: [
      { name: 'Paris', code: 'PAR' },
      { name: 'Marseille', code: 'MRS' },
      { name: 'Lyon', code: 'LYS' },
      { name: 'Toulouse', code: 'TLS' },
      { name: 'Nice', code: 'NCE' },
      { name: 'Nantes', code: 'NTE' },
      { name: 'Strasbourg', code: 'SXB' },
      { name: 'Bordeaux', code: 'BOD' },
    ],
  },
  {
    code: 'JP',
    name: 'Japan',
    shippingCode: 'JP',
    cities: [
      { name: 'Tokyo', code: 'NRT' },
      { name: 'Osaka', code: 'OSA' },
      { name: 'Yokohama', code: 'YOK' },
      { name: 'Nagoya', code: 'NGO' },
      { name: 'Sapporo', code: 'SPK' },
      { name: 'Fukuoka', code: 'FUK' },
      { name: 'Kobe', code: 'UKB' },
      { name: 'Kyoto', code: 'KYO' },
    ],
  },
  {
    code: 'CA',
    name: 'Canada',
    shippingCode: 'CA',
    cities: [
      { name: 'Toronto', code: 'YYZ' },
      { name: 'Vancouver', code: 'YVR' },
      { name: 'Montreal', code: 'YUL' },
      { name: 'Calgary', code: 'YYC' },
      { name: 'Edmonton', code: 'YEG' },
      { name: 'Ottawa', code: 'YOW' },
      { name: 'Winnipeg', code: 'YWG' },
      { name: 'Quebec City', code: 'YQB' },
    ],
  },
  {
    code: 'AU',
    name: 'Australia',
    shippingCode: 'AU',
    cities: [
      { name: 'Sydney', code: 'SYD' },
      { name: 'Melbourne', code: 'MEL' },
      { name: 'Brisbane', code: 'BNE' },
      { name: 'Perth', code: 'PER' },
      { name: 'Adelaide', code: 'ADL' },
      { name: 'Gold Coast', code: 'OOL' },
      { name: 'Newcastle', code: 'NTL' },
      { name: 'Canberra', code: 'CBR' },
    ],
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    shippingCode: 'AE',
    cities: [
      { name: 'Dubai', code: 'DXB' },
      { name: 'Abu Dhabi', code: 'AUH' },
      { name: 'Sharjah', code: 'SHJ' },
      { name: 'Ajman', code: 'AJM' },
    ],
  },
  {
    code: 'SG',
    name: 'Singapore',
    shippingCode: 'SG',
    cities: [
      { name: 'Singapore', code: 'SIN' },
    ],
  },
  {
    code: 'NL',
    name: 'Netherlands',
    shippingCode: 'NL',
    cities: [
      { name: 'Amsterdam', code: 'AMS' },
      { name: 'Rotterdam', code: 'RTM' },
      { name: 'The Hague', code: 'HAG' },
      { name: 'Utrecht', code: 'UTC' },
      { name: 'Eindhoven', code: 'EIN' },
    ],
  },
  {
    code: 'IT',
    name: 'Italy',
    shippingCode: 'IT',
    cities: [
      { name: 'Rome', code: 'ROM' },
      { name: 'Milan', code: 'MIL' },
      { name: 'Naples', code: 'NAP' },
      { name: 'Turin', code: 'TRN' },
      { name: 'Palermo', code: 'PMO' },
      { name: 'Genoa', code: 'GOA' },
      { name: 'Bologna', code: 'BLQ' },
      { name: 'Florence', code: 'FLR' },
    ],
  },
  {
    code: 'ES',
    name: 'Spain',
    shippingCode: 'ES',
    cities: [
      { name: 'Madrid', code: 'MAD' },
      { name: 'Barcelona', code: 'BCN' },
      { name: 'Valencia', code: 'VLC' },
      { name: 'Seville', code: 'SVQ' },
      { name: 'Bilbao', code: 'BIO' },
      { name: 'Malaga', code: 'AGP' },
    ],
  },
  {
    code: 'BR',
    name: 'Brazil',
    shippingCode: 'BR',
    cities: [
      { name: 'São Paulo', code: 'SAO' },
      { name: 'Rio de Janeiro', code: 'RIO' },
      { name: 'Brasília', code: 'BSB' },
      { name: 'Salvador', code: 'SSA' },
      { name: 'Fortaleza', code: 'FOR' },
      { name: 'Belo Horizonte', code: 'BHZ' },
    ],
  },
];

export const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
];

export function getCountryByCode(code: string): Country | undefined {
  return countries.find(c => c.code === code);
}

export function getCityByCode(countryCode: string, cityCode: string): City | undefined {
  const country = getCountryByCode(countryCode);
  return country?.cities.find(c => c.code === cityCode);
}
