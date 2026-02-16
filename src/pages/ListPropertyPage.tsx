import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { supabase } from '../lib/supabase';

export default function ListPropertyPage() {
  const navigate = useNavigate();
  const { user, profile } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    property_type: 'house' as const,
    price: '',
    address_line1: '',
    city: '',
    state: 'AK',
    zip_code: '',
    bedrooms: '',
    bathrooms: '',
    square_feet: '',
    lot_size: '',
    year_built: '',
  });

  if (profile?.role !== 'seller') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">Seller Account Required</h2>
          <p className="text-gray-600 mb-4">
            You need a seller account to list properties.
          </p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('properties')
        .insert({
          seller_id: user!.id,
          title: formData.title,
          description: formData.description,
          property_type: formData.property_type,
          price: parseFloat(formData.price),
          address_line1: formData.address_line1,
          city: formData.city,
          state: formData.state,
          zip_code: formData.zip_code,
          bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
          bathrooms: formData.bathrooms ? parseFloat(formData.bathrooms) : null,
          square_feet: formData.square_feet ? parseInt(formData.square_feet) : null,
          lot_size: formData.lot_size ? parseFloat(formData.lot_size) : null,
          year_built: formData.year_built ? parseInt(formData.year_built) : null,
          status: 'draft',
          verified: false,
        })
        .select()
        .single();

      if (error) throw error;

      alert('Property listed successfully! You can now upload photos and publish.');
      navigate(`/property/${data.id}`);
    } catch (err) {
      console.error('Error listing property:', err);
      alert('Failed to list property');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">List Your Property</h1>

        <form onSubmit={handleSubmit} className="card space-y-6">
          {/* Basic Info */}
          <div>
            <h2 className="text-xl font-bold mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Title *
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Beautiful 3BR Home in Kenai"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  className="input-field"
                  rows={6}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your property, its features, and what makes it special..."
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property Type *
                  </label>
                  <select
                    className="input-field"
                    value={formData.property_type}
                    onChange={(e) => setFormData({ ...formData, property_type: e.target.value as any })}
                    required
                  >
                    <option value="house">House</option>
                    <option value="condo">Condo</option>
                    <option value="land">Land</option>
                    <option value="commercial">Commercial</option>
                    <option value="multi_family">Multi-Family</option>
                    <option value="manufactured">Manufactured Home</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price *
                  </label>
                  <input
                    type="number"
                    className="input-field"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="500000"
                    required
                    min="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="border-t pt-6">
            <h2 className="text-xl font-bold mb-4">Location</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={formData.address_line1}
                  onChange={(e) => setFormData({ ...formData, address_line1: e.target.value })}
                  required
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={formData.zip_code}
                    onChange={(e) => setFormData({ ...formData, zip_code: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className="border-t pt-6">
            <h2 className="text-xl font-bold mb-4">Property Details</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bedrooms
                </label>
                <input
                  type="number"
                  className="input-field"
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bathrooms
                </label>
                <input
                  type="number"
                  step="0.5"
                  className="input-field"
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Square Feet
                </label>
                <input
                  type="number"
                  className="input-field"
                  value={formData.square_feet}
                  onChange={(e) => setFormData({ ...formData, square_feet: e.target.value })}
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lot Size (acres)
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="input-field"
                  value={formData.lot_size}
                  onChange={(e) => setFormData({ ...formData, lot_size: e.target.value })}
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year Built
                </label>
                <input
                  type="number"
                  className="input-field"
                  value={formData.year_built}
                  onChange={(e) => setFormData({ ...formData, year_built: e.target.value })}
                  min="1800"
                  max={new Date().getFullYear()}
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="border-t pt-6">
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'Creating Listing...' : 'Create Listing'}
            </button>
            <p className="text-sm text-gray-600 mt-2 text-center">
              You can add photos and publish after creating the listing
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
