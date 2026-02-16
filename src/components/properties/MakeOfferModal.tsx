import { useState } from 'react';
import { X } from 'lucide-react';
import type { Property } from '../../types';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../stores/authStore';

interface MakeOfferModalProps {
  property: Property;
  onClose: () => void;
}

export default function MakeOfferModal({ property, onClose }: MakeOfferModalProps) {
  const { user } = useAuthStore();
  const [formData, setFormData] = useState({
    offer_amount: property.price,
    earnest_money: Math.round(property.price * 0.01),
    financing_type: 'conventional',
    closing_date: '',
    contingencies: [] as string[],
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('offers').insert({
        property_id: property.id,
        buyer_id: user!.id,
        seller_id: property.seller_id,
        offer_amount: formData.offer_amount,
        earnest_money: formData.earnest_money,
        financing_type: formData.financing_type,
        closing_date: formData.closing_date,
        contingencies: formData.contingencies,
        status: 'pending',
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      });

      if (error) throw error;
      setSuccess(true);
      setTimeout(() => onClose(), 2000);
    } catch (err) {
      console.error('Error creating offer:', err);
      alert('Failed to submit offer');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-2">Offer Submitted!</h3>
          <p className="text-gray-600">The seller will be notified and respond soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Make an Offer</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <p className="text-sm text-gray-600 mb-4">
              Property: <span className="font-semibold">{property.title}</span><br />
              Asking Price: <span className="font-semibold">${property.price.toLocaleString()}</span>
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Offer Amount *
            </label>
            <input
              type="number"
              className="input-field"
              value={formData.offer_amount}
              onChange={(e) => setFormData({ ...formData, offer_amount: Number(e.target.value) })}
              required
              min={0}
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.offer_amount < property.price && 
                `${((1 - formData.offer_amount / property.price) * 100).toFixed(1)}% below asking`}
              {formData.offer_amount > property.price && 
                `${((formData.offer_amount / property.price - 1) * 100).toFixed(1)}% above asking`}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Earnest Money Deposit *
            </label>
            <input
              type="number"
              className="input-field"
              value={formData.earnest_money}
              onChange={(e) => setFormData({ ...formData, earnest_money: Number(e.target.value) })}
              required
              min={0}
            />
            <p className="text-xs text-gray-500 mt-1">
              Typically 1-2% of offer amount (${Math.round(formData.offer_amount * 0.01).toLocaleString()} - ${Math.round(formData.offer_amount * 0.02).toLocaleString()})
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Financing Type *
            </label>
            <select
              className="input-field"
              value={formData.financing_type}
              onChange={(e) => setFormData({ ...formData, financing_type: e.target.value })}
              required
            >
              <option value="cash">Cash</option>
              <option value="conventional">Conventional Loan</option>
              <option value="fha">FHA Loan</option>
              <option value="va">VA Loan</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Proposed Closing Date *
            </label>
            <input
              type="date"
              className="input-field"
              value={formData.closing_date}
              onChange={(e) => setFormData({ ...formData, closing_date: e.target.value })}
              required
              min={new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contingencies
            </label>
            <div className="space-y-2">
              {['Inspection', 'Financing', 'Appraisal', 'Sale of Current Home'].map((cont) => (
                <label key={cont} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.contingencies.includes(cont)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, contingencies: [...formData.contingencies, cont] });
                      } else {
                        setFormData({ 
                          ...formData, 
                          contingencies: formData.contingencies.filter(c => c !== cont) 
                        });
                      }
                    }}
                    className="rounded text-primary-600"
                  />
                  <span className="text-sm">{cont}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm text-gray-600 mb-4">
              This offer will be valid for 7 days. The seller can accept, reject, or counter your offer.
            </p>
            <div className="flex gap-4">
              <button type="button" onClick={onClose} className="btn-secondary flex-1">
                Cancel
              </button>
              <button type="submit" disabled={loading} className="btn-primary flex-1">
                {loading ? 'Submitting...' : 'Submit Offer'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
