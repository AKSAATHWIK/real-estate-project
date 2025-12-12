'use client';

import { motion } from 'framer-motion';
import { Bed, Bath, SlidersHorizontal } from 'lucide-react';
import { usePropertyStore } from '@/store/propertyStore';
import { useState } from 'react';

export default function FilterPanel() {
  const { searchFilters, setSearchFilters, applyFilters } = usePropertyStore();
  const [showFilters, setShowFilters] = useState<boolean>(false);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-2 text-gray-700 font-semibold mb-4 cursor-pointer"
      >
        <SlidersHorizontal className="w-5 h-5" />
        <span>Advanced Filters</span>
      </motion.button>

      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-6"
        >
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Bed className="w-4 h-4" />
              Minimum Bedrooms
            </label>
            <select
              value={searchFilters.bedrooms}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setSearchFilters({ bedrooms: Number(e.target.value) });
                applyFilters();
              }}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
            >
              <option value="0">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Bath className="w-4 h-4" />
              Minimum Bathrooms
            </label>
            <select
              value={searchFilters.bathrooms}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setSearchFilters({ bathrooms: Number(e.target.value) });
                applyFilters();
              }}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
            >
              <option value="0">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Status
            </label>
            <select
              value={searchFilters.status}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setSearchFilters({ status: e.target.value });
                applyFilters();
              }}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="for-sale">For Sale</option>
              <option value="for-rent">For Rent</option>
              <option value="sold">Sold</option>
            </select>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setSearchFilters({
                query: '',
                type: 'all',
                status: 'all',
                minPrice: 0,
                maxPrice: 2000000,
                bedrooms: 0,
                bathrooms: 0
              });
              applyFilters();
            }}
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors cursor-pointer"
          >
            Reset Filters
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
