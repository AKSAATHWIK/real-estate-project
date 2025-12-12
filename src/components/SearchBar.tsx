'use client';

import { motion } from 'framer-motion';
import { Search, MapPin, Home, DollarSign } from 'lucide-react';
import { usePropertyStore } from '@/store/propertyStore';
import { useState, useEffect } from 'react';

export default function SearchBar() {
  const { searchFilters, setSearchFilters, applyFilters } = usePropertyStore();
  const [localQuery, setLocalQuery] = useState<string>(searchFilters.query);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchFilters({ query: localQuery });
      applyFilters();
    }, 300);

    return () => clearTimeout(timer);
  }, [localQuery, setSearchFilters, applyFilters]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Location or keyword..."
            value={localQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocalQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div className="relative">
          <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={searchFilters.type}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setSearchFilters({ type: e.target.value });
              applyFilters();
            }}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none cursor-pointer transition-all"
          >
            <option value="all">All Types</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="condo">Condo</option>
            <option value="townhouse">Townhouse</option>
          </select>
        </div>

        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={searchFilters.maxPrice}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setSearchFilters({ maxPrice: Number(e.target.value) });
              applyFilters();
            }}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none cursor-pointer transition-all"
          >
            <option value="2000000">Any Price</option>
            <option value="500000">Under $500K</option>
            <option value="750000">Under $750K</option>
            <option value="1000000">Under $1M</option>
            <option value="1500000">Under $1.5M</option>
          </select>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => applyFilters()}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer"
        >
          <Search className="w-5 h-5" />
          <span>Search</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
