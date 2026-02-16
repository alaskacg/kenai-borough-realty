import type { SiteConfig } from '../types';

export const siteConfig: SiteConfig = {
  name: 'Kenai Borough Realty',
  title: 'Kenai Borough Realty - Full-Service Real Estate',
  description: 'Premier real estate services on the Kenai Peninsula. Homes, land, and commercial properties with expert agents',
  url: 'https://kenaiboroughrealty.com',
  ogImage: '/og-image.jpg',
  phone: '(907) 555-0102',
  email: 'realty@kenaiboroughrealty.com',
  address: 'Kenai Peninsula, Alaska',
  businessType: 'RealEstateAgent',
  primaryColor: '#003f87',
  relatedSites: [
    { name: 'Kenai Borough', url: 'https://kenaiborough.com', description: 'Official Kenai Peninsula Borough portal' },
    { name: 'Kenai Peninsula Rentals', url: 'https://kenaipeninsularentals.com', description: 'Long-term and short-term rental listings' },
    { name: 'Kenai Land Sales', url: 'https://kenailandsales.com', description: 'Acreage, lots, and development opportunities' },
    { name: 'Kenai Home Sales', url: 'https://kenaihomesales.com', description: 'Residential home sales experts' },
    { name: 'Kenai Auto Sales', url: 'https://kenaiautosales.com', description: 'Quality vehicles for Alaska living' }
  ],
  listingTypes: ['home', 'land', 'commercial', 'lot']
};
