'use client';

import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { Bed, Bath, Square, MapPin, Calendar, Car, Mail, Phone, Heart, Share2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SynoppyBadge from '@/components/SynoppyBadge';
import { usePropertyStore } from '@/store/propertyStore';
import { useState } from 'react';

export default function PropertyDetailPage() {
  const params = useParams();
  const { properties, favorites, toggleFavorite } = usePropertyStore();
  const property = properties.find((p) => p.id === params.id);
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏡</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Property not found</h2>
          <p className="text-gray-600">The property you're looking for doesn't exist</p>
        </div>
      </div>
    );
  }

  const isFavorite = favorites.includes(property.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setContactForm({ name: '', email: '', phone: '', message: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="relative h-96 md:h-[500px]">
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-6 left-6">
                <span className="px-6 py-2 bg-blue-600 text-white text-lg font-semibold rounded-full">
                  {property.status === 'for-sale' ? 'For Sale' : property.status === 'for-rent' ? 'For Rent' : 'Sold'}
                </span>
              </div>
              <div className="absolute top-6 right-6 flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleFavorite(property.id)}
                  className="p-3 bg-white/90 rounded-full backdrop-blur-sm cursor-pointer shadow-lg"
                >
                  <Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-white/90 rounded-full backdrop-blur-sm cursor-pointer shadow-lg"
                >
                  <Share2 className="w-6 h-6 text-gray-600" />
                </motion.button>
              </div>
            </div>

            <div className="p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-2 text-gray-500 mb-4">
                    <MapPin className="w-5 h-5" />
                    <span className="text-lg">{property.location}</span>
                  </div>

                  <h1 className="text-4xl font-bold text-gray-900 mb-6">{property.title}</h1>

                  <div className="flex items-center gap-8 mb-8 pb-8 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <Bed className="w-6 h-6 text-gray-400" />
                      <span className="text-xl font-semibold text-gray-900">{property.bedrooms} Beds</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bath className="w-6 h-6 text-gray-400" />
                      <span className="text-xl font-semibold text-gray-900">{property.bathrooms} Baths</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Square className="w-6 h-6 text-gray-400" />
                      <span className="text-xl font-semibold text-gray-900">{property.area.toLocaleString()} sqft</span>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                    <p className="text-gray-700 leading-relaxed text-lg">{property.description}</p>
                  </div>

                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Features</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {property.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-gray-700">
                          <div className="w-2 h-2 bg-blue-600 rounded-full" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <Calendar className="w-6 h-6 text-blue-600 mb-2" />
                      <p className="text-sm text-gray-600">Year Built</p>
                      <p className="text-lg font-semibold text-gray-900">{property.yearBuilt}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <Car className="w-6 h-6 text-blue-600 mb-2" />
                      <p className="text-sm text-gray-600">Parking</p>
                      <p className="text-lg font-semibold text-gray-900">{property.parking} Spaces</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <Square className="w-6 h-6 text-blue-600 mb-2" />
                      <p className="text-sm text-gray-600">Property Type</p>
                      <p className="text-lg font-semibold text-gray-900 capitalize">{property.type}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <MapPin className="w-6 h-6 text-blue-600 mb-2" />
                      <p className="text-sm text-gray-600">Area</p>
                      <p className="text-lg font-semibold text-gray-900">{property.area} sqft</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <div className="sticky top-24">
                    <div className="bg-gradient-to-br from-blue-600 to-teal-600 rounded-2xl p-8 text-white mb-6">
                      <p className="text-lg mb-2">Price</p>
                      <p className="text-4xl font-bold mb-6">${property.price.toLocaleString()}</p>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Agent</h3>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
                          👤
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{property.agentName}</p>
                          <p className="text-sm text-gray-600">Real Estate Agent</p>
                        </div>
                      </div>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Phone className="w-5 h-5 text-blue-600" />
                          <span>{property.agentPhone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Mail className="w-5 h-5 text-blue-600" />
                          <span className="text-sm">{property.agentEmail}</span>
                        </div>
                      </div>

                      {formSubmitted ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-green-50 border border-green-200 rounded-lg p-4 text-center"
                        >
                          <p className="text-green-800 font-semibold">✓ Message sent successfully!</p>
                          <p className="text-green-600 text-sm mt-1">We'll get back to you soon.</p>
                        </motion.div>
                      ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <input
                            type="text"
                            placeholder="Your Name"
                            value={contactForm.name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContactForm({ ...contactForm, name: e.target.value })}
                            required
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                          <input
                            type="email"
                            placeholder="Your Email"
                            value={contactForm.email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContactForm({ ...contactForm, email: e.target.value })}
                            required
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                          <input
                            type="tel"
                            placeholder="Your Phone"
                            value={contactForm.phone}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContactForm({ ...contactForm, phone: e.target.value })}
                            required
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                          <textarea
                            placeholder="Your Message"
                            value={contactForm.message}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContactForm({ ...contactForm, message: e.target.value })}
                            required
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                          />
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
                          >
                            Send Message
                          </motion.button>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
      <SynoppyBadge />
    </div>
  );
}
