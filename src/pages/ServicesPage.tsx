import React from 'react';
import SEO from '../components/SEO';

const ServicesPage = () => {
  return (
    <>
      <SEO 
        title="Our Services - Machinery Rental & Vehicle Modifications"
        description="Comprehensive range of services including machinery rental, ute modifications, and mobile home conversions. Professional solutions for all your needs."
      />
      
      <main className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-12 text-center">Our Services</h1>
          
          {/* Machinery Rental Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Machinery Rental</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Available Equipment</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Excavators and loaders</li>
                  <li>Forklifts and telehandlers</li>
                  <li>Compactors and rollers</li>
                  <li>Generators and power tools</li>
                  <li>Scaffolding and access equipment</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Rental Benefits</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Flexible rental periods</li>
                  <li>Well-maintained equipment</li>
                  <li>Operator training available</li>
                  <li>24/7 support</li>
                  <li>Competitive rates</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Ute Modifications Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Ute Modifications</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Custom Modifications</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Canopy installations</li>
                  <li>Ladder racks and toolboxes</li>
                  <li>Bull bars and protection</li>
                  <li>Suspension upgrades</li>
                  <li>Custom paint and wraps</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Why Choose Us</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Expert craftsmanship</li>
                  <li>Quality materials</li>
                  <li>Custom solutions</li>
                  <li>Warranty on all work</li>
                  <li>Professional advice</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Mobile Home Conversions Section */}
          <section>
            <h2 className="text-3xl font-bold mb-8">Mobile Home Conversions</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Conversion Services</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Van to camper conversions</li>
                  <li>Ute canopy conversions</li>
                  <li>Custom interior fit-outs</li>
                  <li>Electrical and plumbing</li>
                  <li>Storage solutions</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Features</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Custom design consultation</li>
                  <li>High-quality materials</li>
                  <li>Energy-efficient solutions</li>
                  <li>Comfortable living spaces</li>
                  <li>Durable construction</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default ServicesPage; 