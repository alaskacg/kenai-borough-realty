import { Shield, FileCheck, DollarSign, Award } from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-center mb-4">How It Works</h1>
        <p className="text-xl text-gray-600 text-center mb-12">
          Direct property transactions with legal protection and secure escrow
        </p>

        {/* For Buyers */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">For Buyers</h2>
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-bold text-xl">1</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Create Account & Verify</h3>
                <p className="text-gray-600">
                  Sign up as a buyer and complete ID verification for trusted access to properties.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-bold text-xl">2</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Search & Browse Properties</h3>
                <p className="text-gray-600">
                  Use advanced filters, map view, and save favorites. Schedule property viewings directly with sellers.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-bold text-xl">3</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Make an Offer</h3>
                <p className="text-gray-600">
                  Submit offers with our digital contract templates. Include contingencies, financing terms, and closing date.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-bold text-xl">4</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Sign Digital Contract</h3>
                <p className="text-gray-600">
                  Once your offer is accepted, sign the purchase agreement digitally. Upload financing documents and inspection reports.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-bold text-xl">5</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Pay via Secure Escrow</h3>
                <p className="text-gray-600">
                  Payment is held in escrow for 48 hours. Pay with Stripe (credit card/bank) or crypto (USDC on Base L2). Only 3% platform fee.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-bold text-xl">6</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Close & Take Ownership</h3>
                <p className="text-gray-600">
                  After 48 hours, funds are released to seller. Complete title transfer and you're done!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* For Sellers */}
        <section className="mb-16 bg-gray-50 -mx-4 px-4 py-12 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">For Sellers</h2>
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-xl">1</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Create Seller Account</h3>
                <p className="text-gray-600">
                  Sign up as a seller and verify your identity to list properties.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-xl">2</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">List Your Property</h3>
                <p className="text-gray-600">
                  Upload photos, virtual tours, and property details. Set your price and publish. Follow our photography guidelines for best results.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-xl">3</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Receive & Review Offers</h3>
                <p className="text-gray-600">
                  Get notified of offers instantly. Accept, reject, or counter-offer directly in the platform.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-xl">4</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Sign Contract & Upload Disclosures</h3>
                <p className="text-gray-600">
                  Digitally sign the purchase agreement. Upload Alaska-required disclosure forms and property documents.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-xl">5</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Wait for Escrow Release</h3>
                <p className="text-gray-600">
                  Buyer's payment is held in escrow for 48 hours for buyer protection and fraud prevention.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-xl">6</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Receive Funds</h3>
                <p className="text-gray-600">
                  After 48 hours, funds are automatically disbursed to your connected bank account (minus 3% platform fee).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust & Safety */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Trust & Safety</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <Shield className="w-12 h-12 text-primary-600 mb-4" />
              <h3 className="font-bold mb-2">User Verification</h3>
              <p className="text-gray-600 text-sm">
                All users verify identity via ID upload and phone verification before transacting.
              </p>
            </div>
            <div className="card">
              <FileCheck className="w-12 h-12 text-primary-600 mb-4" />
              <h3 className="font-bold mb-2">Legal Contracts</h3>
              <p className="text-gray-600 text-sm">
                Alaska-compliant purchase agreements and disclosure forms, digitally signed.
              </p>
            </div>
            <div className="card">
              <DollarSign className="w-12 h-12 text-primary-600 mb-4" />
              <h3 className="font-bold mb-2">48-Hour Escrow</h3>
              <p className="text-gray-600 text-sm">
                Buyer protection with secure escrow hold before funds release to seller.
              </p>
            </div>
            <div className="card">
              <Award className="w-12 h-12 text-primary-600 mb-4" />
              <h3 className="font-bold mb-2">Verified Properties</h3>
              <p className="text-gray-600 text-sm">
                Property verification badges and seller ratings for transparency.
              </p>
            </div>
          </div>
        </section>

        {/* Payment Options */}
        <section className="mb-16 bg-primary-50 -mx-4 px-4 py-12 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Payment Options</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-bold text-xl mb-4">Traditional Payment</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Credit/Debit Card via Stripe</li>
                <li>• ACH Bank Transfer</li>
                <li>• Wire Transfer</li>
                <li>• Secure PCI-compliant processing</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-bold text-xl mb-4">Cryptocurrency</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• USDC on Base L2</li>
                <li>• Low transaction fees</li>
                <li>• Fast settlement</li>
                <li>• On-chain transparency</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Fees Breakdown */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Fee Structure</h2>
          <div className="card bg-green-50 border-2 border-green-200">
            <div className="text-center mb-6">
              <p className="text-5xl font-bold text-green-600 mb-2">3%</p>
              <p className="text-gray-600">Platform Fee (vs. 5-6% realtor commission)</p>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-t border-green-200">
                <span className="text-gray-600">Example: $500,000 property</span>
                <span className="font-bold">$15,000 fee</span>
              </div>
              <div className="flex justify-between py-2 border-t border-green-200">
                <span className="text-gray-600">Seller receives</span>
                <span className="font-bold">$485,000</span>
              </div>
              <div className="flex justify-between py-2 border-t border-green-200">
                <span className="text-gray-600">Traditional realtor (6%)</span>
                <span className="font-bold text-red-600">$30,000</span>
              </div>
              <div className="flex justify-between py-2 border-t border-green-200 bg-green-100 -mx-6 px-6">
                <span className="font-bold">You Save</span>
                <span className="font-bold text-green-600 text-xl">$15,000</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
