import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Property, SearchFilters } from '@/types';

interface PropertyStore {
  properties: Property[];
  filteredProperties: Property[];
  searchFilters: SearchFilters;
  favorites: string[];
  setProperties: (properties: Property[]) => void;
  addProperty: (property: Property) => void;
  updateProperty: (id: string, updates: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  setSearchFilters: (filters: Partial<SearchFilters>) => void;
  applyFilters: () => void;
  toggleFavorite: (propertyId: string) => void;
}

const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Downtown Loft',
    description: 'Stunning modern loft in the heart of downtown with floor-to-ceiling windows and panoramic city views. Features include hardwood floors, stainless steel appliances, and open concept living.',
    price: 850000,
    location: 'Downtown District',
    bedrooms: 2,
    bathrooms: 2,
    area: 1800,
    type: 'apartment',
    status: 'for-sale',
    features: ['Hardwood Floors', 'City Views', 'Modern Kitchen', 'Gym Access', 'Parking'],
    images: ['https://placehold.co/800x600/2563eb/ffffff?text=Modern+Loft'],
    agentId: 'agent1',
    agentName: 'Sarah Johnson',
    agentPhone: '(555) 123-4567',
    agentEmail: 'sarah@realestate.com',
    yearBuilt: 2020,
    parking: 2,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Luxury Family Home',
    description: 'Spacious 4-bedroom family home in prestigious neighborhood. Beautiful landscaping, chef kitchen, master suite with spa bath, and large backyard perfect for entertaining.',
    price: 1250000,
    location: 'Riverside Heights',
    bedrooms: 4,
    bathrooms: 3,
    area: 3200,
    type: 'house',
    status: 'for-sale',
    features: ['Pool', 'Large Backyard', 'Chef Kitchen', 'Master Suite', 'Garage'],
    images: ['https://placehold.co/800x600/0d9488/ffffff?text=Luxury+Home'],
    agentId: 'agent2',
    agentName: 'Michael Chen',
    agentPhone: '(555) 234-5678',
    agentEmail: 'michael@realestate.com',
    yearBuilt: 2018,
    parking: 3,
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Cozy Suburban Townhouse',
    description: 'Charming 3-bedroom townhouse in quiet suburban area. Recently renovated with new appliances, fresh paint, and beautiful landscaping. Close to schools and shopping.',
    price: 425000,
    location: 'Maple Grove',
    bedrooms: 3,
    bathrooms: 2,
    area: 1600,
    type: 'townhouse',
    status: 'for-sale',
    features: ['Renovated', 'Quiet Area', 'New Appliances', 'Landscaping', 'Storage'],
    images: ['https://placehold.co/800x600/16a34a/ffffff?text=Townhouse'],
    agentId: 'agent1',
    agentName: 'Sarah Johnson',
    agentPhone: '(555) 123-4567',
    agentEmail: 'sarah@realestate.com',
    yearBuilt: 2015,
    parking: 2,
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Waterfront Condo',
    description: 'Breathtaking waterfront condo with direct beach access. Enjoy sunrise coffee on your private balcony overlooking the ocean. Resort-style amenities included.',
    price: 950000,
    location: 'Coastal Bay',
    bedrooms: 2,
    bathrooms: 2,
    area: 1400,
    type: 'condo',
    status: 'for-sale',
    features: ['Beach Access', 'Ocean Views', 'Pool', 'Gym', 'Concierge'],
    images: ['https://placehold.co/800x600/0891b2/ffffff?text=Waterfront+Condo'],
    agentId: 'agent2',
    agentName: 'Michael Chen',
    agentPhone: '(555) 234-5678',
    agentEmail: 'michael@realestate.com',
    yearBuilt: 2021,
    parking: 1,
    createdAt: new Date().toISOString()
  },
  {
    id: '5',
    title: 'Historic Charmer',
    description: 'Beautiful historic home with original hardwood floors, crown molding, and vintage charm. Updated with modern amenities while preserving character.',
    price: 675000,
    location: 'Old Town',
    bedrooms: 3,
    bathrooms: 2,
    area: 2100,
    type: 'house',
    status: 'for-sale',
    features: ['Historic', 'Original Features', 'Updated Kitchen', 'Garden', 'Fireplace'],
    images: ['https://placehold.co/800x600/7c3aed/ffffff?text=Historic+Home'],
    agentId: 'agent1',
    agentName: 'Sarah Johnson',
    agentPhone: '(555) 123-4567',
    agentEmail: 'sarah@realestate.com',
    yearBuilt: 1925,
    parking: 1,
    createdAt: new Date().toISOString()
  },
  {
    id: '6',
    title: 'Modern Smart Home',
    description: 'Cutting-edge smart home with automated systems throughout. Energy efficient, solar panels, smart lighting, climate control, and security. The home of the future.',
    price: 1100000,
    location: 'Tech Valley',
    bedrooms: 4,
    bathrooms: 3,
    area: 2800,
    type: 'house',
    status: 'for-sale',
    features: ['Smart Home', 'Solar Panels', 'Energy Efficient', 'Home Office', 'EV Charging'],
    images: ['https://placehold.co/800x600/dc2626/ffffff?text=Smart+Home'],
    agentId: 'agent2',
    agentName: 'Michael Chen',
    agentPhone: '(555) 234-5678',
    agentEmail: 'michael@realestate.com',
    yearBuilt: 2023,
    parking: 2,
    createdAt: new Date().toISOString()
  }
];

export const usePropertyStore = create<PropertyStore>()(persist(
  (set, get) => ({
    properties: mockProperties,
    filteredProperties: mockProperties,
    searchFilters: {
      query: '',
      type: 'all',
      status: 'all',
      minPrice: 0,
      maxPrice: 2000000,
      bedrooms: 0,
      bathrooms: 0
    },
    favorites: [],

    setProperties: (properties: Property[]) => set({ properties, filteredProperties: properties }),

    addProperty: (property: Property) => set((state: PropertyStore) => {
      const newProperties = [...state.properties, property];
      return { properties: newProperties, filteredProperties: newProperties };
    }),

    updateProperty: (id: string, updates: Partial<Property>) => set((state: PropertyStore) => {
      const newProperties = state.properties.map((p: Property) =>
        p.id === id ? { ...p, ...updates } : p
      );
      return { properties: newProperties };
    }),

    deleteProperty: (id: string) => set((state: PropertyStore) => {
      const newProperties = state.properties.filter((p: Property) => p.id !== id);
      return { properties: newProperties, filteredProperties: newProperties };
    }),

    setSearchFilters: (filters: Partial<SearchFilters>) => set((state: PropertyStore) => ({
      searchFilters: { ...state.searchFilters, ...filters }
    })),

    applyFilters: () => set((state: PropertyStore) => {
      const { properties, searchFilters } = state;
      let filtered = properties;

      if (searchFilters.query) {
        const query = searchFilters.query.toLowerCase();
        filtered = filtered.filter((p: Property) =>
          p.title.toLowerCase().includes(query) ||
          p.location.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
        );
      }

      if (searchFilters.type !== 'all') {
        filtered = filtered.filter((p: Property) => p.type === searchFilters.type);
      }

      if (searchFilters.status !== 'all') {
        filtered = filtered.filter((p: Property) => p.status === searchFilters.status);
      }

      filtered = filtered.filter((p: Property) =>
        p.price >= searchFilters.minPrice && p.price <= searchFilters.maxPrice
      );

      if (searchFilters.bedrooms > 0) {
        filtered = filtered.filter((p: Property) => p.bedrooms >= searchFilters.bedrooms);
      }

      if (searchFilters.bathrooms > 0) {
        filtered = filtered.filter((p: Property) => p.bathrooms >= searchFilters.bathrooms);
      }

      return { filteredProperties: filtered };
    }),

    toggleFavorite: (propertyId: string) => set((state: PropertyStore) => {
      const favorites = state.favorites.includes(propertyId)
        ? state.favorites.filter((id: string) => id !== propertyId)
        : [...state.favorites, propertyId];
      return { favorites };
    })
  }),
  { name: 'property-storage' }
));
