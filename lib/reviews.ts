export interface Review {
  name: string;
  avatarSeed: string;
  source: 'google' | 'tripadvisor' | 'trustindex' | 'getyourguide';
  rating: number;
  date: string;
  text: string;
}

// NOTE: This is a portfolio case study. The reviews below are illustrative
// sample content only — they are not real customer reviews and do not name
// any real person or business.
export const reviewSources = [
  { key: 'all', label: 'All reviews', rating: 4.7 },
  { key: 'google', label: 'Google', rating: 4.6 },
  { key: 'tripadvisor', label: 'Tripadvisor', rating: 4.9 },
  { key: 'trustindex', label: 'Trustindex', rating: 4.5 },
  { key: 'getyourguide', label: 'Getyourguide', rating: 4.5 }
] as const;

export const reviews: Review[] = [
  { name: 'Demo Traveler A', avatarSeed: 'demo-a', source: 'tripadvisor', rating: 5, date: '12 August 2026', text: 'Sample review: our guide was excellent, very patient and knowledgeable. (Demo content)' },
  { name: 'Demo Traveler B', avatarSeed: 'demo-b', source: 'google', rating: 5, date: '12 August 2026', text: 'Sample review: a wonderful day, the tour was fantastic. (Demo content)' },
  { name: 'Demo Traveler C', avatarSeed: 'demo-c', source: 'trustindex', rating: 5, date: '12 August 2026', text: 'Sample review: excellent communication and great on-site support throughout the trip. (Demo content)' },
  { name: 'Demo Traveler D', avatarSeed: 'demo-d', source: 'google', rating: 5, date: '11 August 2026', text: 'Sample review: the service was worth it, both for the evening show and the day tour. (Demo content)' },
  { name: 'Demo Traveler E', avatarSeed: 'demo-e', source: 'tripadvisor', rating: 5, date: '10 August 2026', text: 'Sample review: a fantastic afternoon in a magical place. (Demo content)' },
  { name: 'Demo Traveler F', avatarSeed: 'demo-f', source: 'tripadvisor', rating: 5, date: '9 August 2026', text: 'Sample review: a fantastic day tour with a knowledgeable guide. (Demo content)' },
  { name: 'Demo Traveler G', avatarSeed: 'demo-g', source: 'google', rating: 5, date: '8 August 2026', text: 'Sample review: we travel a lot and this was one of our best guided tours. (Demo content)' },
  { name: 'Demo Traveler H', avatarSeed: 'demo-h', source: 'trustindex', rating: 5, date: '8 August 2026', text: 'Sample review: an unforgettable evening experience on the water. (Demo content)' },
  { name: 'Demo Traveler I', avatarSeed: 'demo-i', source: 'google', rating: 5, date: '5 August 2026', text: 'Sample review: perfectly organized family tour, a fantastic team. (Demo content)' },
  { name: 'Demo Traveler J', avatarSeed: 'demo-j', source: 'tripadvisor', rating: 5, date: '5 August 2026', text: 'Sample review: a wonderful experience with an amazing guide. (Demo content)' },
  { name: 'Demo Traveler K', avatarSeed: 'demo-k', source: 'google', rating: 4, date: '5 August 2026', text: 'Sample review: great for organizing custom tours, a great overall experience. (Demo content)' },
  { name: 'Demo Traveler L', avatarSeed: 'demo-l', source: 'google', rating: 5, date: '4 August 2026', text: 'Sample review: an excellent trip with an incredible local expert. (Demo content)' },
  { name: 'Demo Traveler M', avatarSeed: 'demo-m', source: 'tripadvisor', rating: 5, date: '31 July 2026', text: 'Sample review: our guide was incredible from start to finish. (Demo content)' },
  { name: 'Demo Traveler N', avatarSeed: 'demo-n', source: 'google', rating: 5, date: '31 July 2026', text: 'Sample review: a dream cruise experience, we can\'t thank the team enough. (Demo content)' },
  { name: 'Demo Traveler O', avatarSeed: 'demo-o', source: 'tripadvisor', rating: 5, date: '31 July 2026', text: 'Sample review: our guide was incredibly attentive throughout the tour. (Demo content)' },
  { name: 'Demo Traveler P', avatarSeed: 'demo-p', source: 'google', rating: 5, date: '29 July 2026', text: 'Sample review: the sites were breathtaking and our guide made it memorable. (Demo content)' }
];
