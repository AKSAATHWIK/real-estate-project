export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: 'house' | 'apartment' | 'condo' | 'townhouse';
  status: 'for-sale' | 'for-rent' | 'sold';
  features: string[];
  images: string[];
  agentId: string;
  agentName: string;
  agentPhone: string;
  agentEmail: string;
  yearBuilt: number;
  parking: number;
  createdAt: string;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  bio: string;
  image: string;
  specialties: string[];
  properties: number;
  rating: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'agent';
  favorites: string[];
}

export interface SearchFilters {
  query: string;
  type: string;
  status: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number;
  bathrooms: number;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyId?: string;
}
