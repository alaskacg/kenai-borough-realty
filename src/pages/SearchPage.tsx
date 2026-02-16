import { useState, useEffect } from 'react';
import { Home } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Property, SearchFilters } from '../types';
import PropertyCard from '../components/properties/PropertyCard';
import PropertyMap from '../components/properties/PropertyMap';

export default function SearchPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [filters, setFilters] = useState<SearchFilters>({});

  useEffect(() => {
    fetchProperties();
  }, [filters]);

  const fetchProperties = async () => {
    setLoading(true);
    let query = supabase
      .from('properties')
      .select('*, seller:profiles(*)')
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (filters.property_type && filters.property_type.length > 0) {
      query = query.in('property_type', filters.property_type);
    }
    if (filters.min_price) query = query.gte('price', filters.min_price);
    if (filters.max_price) query = query.lte('price', filters.max_price);
    if (filters.bedrooms) query = query.gte('bedrooms', filters.bedrooms);
    if (filters.bathrooms) query = query.gte('bathrooms', filters.bathrooms);
    if (filters.city) query = query.ilike('city', `%${filters.city}%`);
    if (filters.verified_only) query = query.eq('verified', true);

    const { data, error } = await query;
    if (!error && data) {
      setProperties(data);
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Find Your Perfect Property</h1>
          
          {/* Quick Filters */}
          <div className="card">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  placeholder="Kenai, Soldotna..."
                  className="input-field"
                  value={filters.city || ''}
                  onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Min Price
                </label>
                <input
                  type="number"
                  placeholder="$0"
                  className="input-field"
                  value={filters.min_price || ''}
                  onChange={(e) => setFilters({ ...filters, min_price: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Price
                </label>
                <input
                  type="number"
                  placeholder="Any"
                  className="input-field"
                  value={filters.max_price || ''}
                  onChange={(e) => setFilters({ ...filters, max_price: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bedrooms
                </label>
                <select
                  className="input-field"
                  value={filters.bedrooms || ''}
                  onChange={(e) => setFilters({ ...filters, bedrooms: Number(e.target.value) })}
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.verified_only || false}
                  onChange={(e) => setFilters({ ...filters, verified_only: e.target.checked })}
                  className="rounded text-primary-600"
                />
                <span className="text-sm text-gray-700">Verified properties only</span>
              </label>
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            {properties.length} properties found
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-lg ${
                viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-4 py-2 rounded-lg ${
                viewMode === 'map' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700'
              }`}
            >
              Map
            </button>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <PropertyMap properties={properties} />
        )}

        {!loading && properties.length === 0 && (
          <div className="text-center py-12">
            <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No properties found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
