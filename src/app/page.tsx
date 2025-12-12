'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Shield, Award } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import SearchBar from '@/components/SearchBar';
import SynoppyBadge from '@/components/SynoppyBadge';
import { usePropertyStore } from '@/store/propertyStore';

export default function Home() {
  const { properties } = usePropertyStore();
  const featuredProperties = properties.slice(0, 3);

  const features = [
    {
      icon: TrendingUp,
      title: 'Market Insights',
      description: 'Get real-time market data and trends to make informed decisions.'
    },
    {
      icon: Shield,
      title: 'Secure Transactions',
      description: 'Your safety is our priority. All transactions are fully secured.'
    },
    {
      icon: Award,
      title: 'Expert Agents',
      description: 'Work with certified professionals who know your market inside out.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-teal-600/10" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block mb-6"
            >
              <span className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">🏡 Welcome to DreamHome</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6"
            >
              Find Your <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Dream Home</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            >
              Discover the perfect property from our curated collection of premium homes, apartments, and condos.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <SearchBar />
          </motion.div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Featured Properties</h2>
            <p className="text-gray-600">Handpicked homes just for you</p>
          </div>
          <Link href="/properties" className="cursor-pointer">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
            >
              View All
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose DreamHome</h2>
          <p className="text-xl text-gray-600">We make real estate simple, secure, and successful</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-3xl p-12 text-center text-white shadow-2xl"
        >
          <h2 className="text-4xl font-bold mb-4">Ready to Find Your Dream Home?</h2>
          <p className="text-xl mb-8 opacity-90">Let our expert agents guide you through the process</p>
          <Link href="/properties" className="cursor-pointer">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:shadow-xl transition-all cursor-pointer"
            >
              Browse Properties
            </motion.button>
          </Link>
        </motion.div>
      </section>

      <Footer />
      <SynoppyBadge />
    </div>
  );
}
