import React from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      <SEO 
        title="Aus Machinery Hire - Professional Equipment Rental & Vehicle Modifications"
        description="Australia's leading provider of machinery rental, ute modifications, and mobile home conversions. Quality equipment and expert craftsmanship for all your needs."
      />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gray-900 text-white py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Professional Equipment & Vehicle Services
            </h1>
            <p className="text-xl mb-8">
              Your trusted partner for machinery rental, ute modifications, and mobile home conversions in Australia
            </p>
            <div className="flex gap-4">
              <Link to="/services" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
                Our Services
              </Link>
              <Link to="/contact" className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg">
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Services</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Machinery Rental</h3>
                <p className="text-gray-600">
                  High-quality equipment for construction, agriculture, and industrial projects.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Ute Modifications</h3>
                <p className="text-gray-600">
                  Custom modifications for your ute to meet your specific needs and requirements.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Mobile Home Conversions</h3>
                <p className="text-gray-600">
                  Professional conversion services to transform vehicles into comfortable mobile homes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Us</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Expert Craftsmanship</h3>
                <p className="text-gray-600">
                  Our team of skilled professionals ensures the highest quality in every project.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Quality Equipment</h3>
                <p className="text-gray-600">
                  We maintain a modern fleet of machinery and tools for all your needs.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default HomePage; 