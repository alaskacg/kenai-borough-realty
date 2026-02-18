import { Link } from 'react-router-dom';
import { Search, Shield, FileCheck, DollarSign, Award } from 'lucide-react';
import EmpireNetwork from '../components/EmpireNetwork';

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Buy & Sell Real Estate in Kenai Borough
            </h1>
            <p className="text-xl mb-8 text-primary-100">
              No Realtor Fees • Secure Escrow • Digital Contracts • Direct Savings
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/search" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Find Your Home
              </Link>
              <Link to="/list-property" className="bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-400 transition-colors border-2 border-white">
                List Property
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Savings Calculator */}
      <section className="py-16 bg-yellow-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card text-center">
            <DollarSign className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Save Thousands in Realtor Fees</h2>
            <p className="text-gray-600 mb-6">
              Traditional realtors charge 5-6% commission. On a $500,000 home, that's $25,000-$30,000.
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="font-bold text-red-900 mb-2">Traditional Sale</h3>
                <p className="text-3xl font-bold text-red-600">$30,000</p>
                <p className="text-sm text-gray-600">in realtor commissions</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-bold text-green-900 mb-2">Kenai Borough Realty</h3>
                <p className="text-3xl font-bold text-green-600">$15,000</p>
                <p className="text-sm text-gray-600">3% platform fee (only $15,000)</p>
              </div>
            </div>
            <p className="mt-6 text-2xl font-bold text-green-600">You Save: $15,000!</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-bold mb-2">1. Search & Browse</h3>
              <p className="text-gray-600 text-sm">Find properties with advanced filters and map view</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileCheck className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-bold mb-2">2. Make Offer</h3>
              <p className="text-gray-600 text-sm">Submit offer with digital contract templates</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-bold mb-2">3. Secure Escrow</h3>
              <p className="text-gray-600 text-sm">Funds held safely for 48 hours</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-bold mb-2">4. Close Deal</h3>
              <p className="text-gray-600 text-sm">Complete transaction with digital signatures</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link to="/how-it-works" className="text-primary-600 font-semibold hover:underline">
              Learn More About Our Process →
            </Link>
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Trust & Safety First</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card">
              <Shield className="w-12 h-12 text-primary-600 mb-4" />
              <h3 className="font-bold mb-2">Verified Users</h3>
              <p className="text-gray-600 text-sm">ID verification and phone verification for all users</p>
            </div>
            <div className="card">
              <FileCheck className="w-12 h-12 text-primary-600 mb-4" />
              <h3 className="font-bold mb-2">Legal Contracts</h3>
              <p className="text-gray-600 text-sm">Alaska-compliant purchase agreements and disclosures</p>
            </div>
            <div className="card">
              <DollarSign className="w-12 h-12 text-primary-600 mb-4" />
              <h3 className="font-bold mb-2">Secure Payments</h3>
              <p className="text-gray-600 text-sm">Stripe-powered escrow with buyer protection</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Properties</h2>
            <Link to="/search" className="text-primary-600 font-semibold hover:underline">
              View All →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card p-0 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <h3 className="font-bold mb-2">Beautiful Home in Kenai</h3>
                  <p className="text-2xl font-bold text-primary-600 mb-2">$450,000</p>
                  <p className="text-gray-600 text-sm mb-2">3 bed • 2 bath • 2,100 sqft</p>
                  <Link to="/search" className="text-primary-600 font-semibold text-sm hover:underline">
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-primary-100">
            Join thousands saving money on real estate transactions
          </p>
          <Link to="/signup" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block">
            Create Free Account
          </Link>
        </div>
      </section>

      <section className="py-12">
        <EmpireNetwork currentSite="kenai-borough-realty" />
      </section>
    </div>
  );
}
