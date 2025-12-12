'use client';

import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import SearchBar from '@/components/SearchBar';
import FilterPanel from '@/components/FilterPanel';
import SynoppyBadge from '@/components/SynoppyBadge';
import { usePropertyStore } from '@/store/propertyStore';

export default function PropertiesPage() {
  const { filteredProperties } = usePropertyStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">All Properties</h1>
            <p className="text-xl text-gray-600">Discover your perfect home from our collection</p>
          </motion.div>

          <div className="mb-8">
            <SearchBar />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <FilterPanel />
            </div>

            <div className="lg:col-span-3">
              {filteredProperties.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-2xl p-12 text-center shadow-lg"
                >
                  <div className="text-6xl mb-4">🏡</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No properties found</h3>
                  <p className="text-gray-600">Try adjusting your filters or search criteria</p>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <SynoppyBadge />
    </div>
  );
}
