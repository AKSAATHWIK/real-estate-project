'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, Award, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SynoppyBadge from '@/components/SynoppyBadge';

interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  bio: string;
  specialties: string[];
  properties: number;
  rating: number;
}

export default function AgentsPage() {
  const agents: Agent[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@realestate.com',
      phone: '(555) 123-4567',
      bio: 'Specializing in luxury homes and waterfront properties with over 10 years of experience in the real estate industry.',
      specialties: ['Luxury Homes', 'Waterfront', 'Investment'],
      properties: 45,
      rating: 4.9
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael@realestate.com',
      phone: '(555) 234-5678',
      bio: 'Expert in residential properties and first-time home buyers. Dedicated to making your home buying experience smooth and enjoyable.',
      specialties: ['Residential', 'First-Time Buyers', 'Condos'],
      properties: 38,
      rating: 4.8
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily@realestate.com',
      phone: '(555) 345-6789',
      bio: 'Commercial real estate specialist with a focus on retail spaces and office buildings. Helping businesses find their perfect location.',
      specialties: ['Commercial', 'Retail', 'Office Spaces'],
      properties: 52,
      rating: 4.9
    },
    {
      id: '4',
      name: 'David Thompson',
      email: 'david@realestate.com',
      phone: '(555) 456-7890',
      bio: 'Passionate about sustainable and eco-friendly homes. Specializing in green buildings and energy-efficient properties.',
      specialties: ['Eco-Friendly', 'Sustainable', 'Modern Homes'],
      properties: 29,
      rating: 4.7
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Expert Agents</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Meet our team of professional real estate agents ready to help you find your dream home
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {agents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="bg-gradient-to-br from-blue-600 to-teal-600 h-32" />
                <div className="p-8">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-teal-100 rounded-full flex items-center justify-center text-4xl -mt-16 border-4 border-white shadow-lg">
                      👤
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{agent.name}</h3>
                      <div className="flex items-center gap-1 mb-3">
                        <span className="text-2xl">⭐</span>
                        <span className="text-lg font-semibold text-gray-900">{agent.rating}</span>
                        <span className="text-gray-500 text-sm ml-2">({agent.properties} properties)</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-6">{agent.bio}</p>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {agent.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 mb-6">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Phone className="w-4 h-4 text-blue-600" />
                      <span>{agent.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Mail className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">{agent.email}</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer"
                  >
                    Contact Agent
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
      <SynoppyBadge />
    </div>
  );
}
