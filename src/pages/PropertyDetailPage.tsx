import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, Calendar, CheckCircle, Heart, Share2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Property } from '../types';
import { useAuthStore } from '../stores/authStore';
import MakeOfferModal from '../components/properties/MakeOfferModal';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, profile } = useAuthStore();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProperty();
      checkFavorite();
    }
  }, [id]);

  const fetchProperty = async () => {
    const { data, error } = await supabase
      .from('properties')
      .select('*, seller:profiles(*)')
      .eq('id', id)
      .single();

    if (!error && data) {
      setProperty(data);
    }
    setLoading(false);
  };

  const checkFavorite = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', user.id)
      .eq('property_id', id)
      .single();
    setIsFavorite(!!data);
  };

  const toggleFavorite = async () => {
    if (!user) {
      navigate('/signin');
      return;
    }

    if (isFavorite) {
      await supabase.from('favorites').delete().eq('user_id', user.id).eq('property_id', id);
      setIsFavorite(false);
    } else {
      await supabase.from('favorites').insert({ user_id: user.id, property_id: id });
      setIsFavorite(true);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>;
  }

  if (!property) {
    return <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-600">Property not found</p>
    </div>;
  }

  const formatPrice = (price: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(price);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Image Gallery */}
        <div className="grid grid-cols-4 gap-2 mb-8 h-96">
          <div className="col-span-3 bg-gray-200 rounded-lg overflow-hidden">
            <img 
              src={property.images?.[0]?.url || '/placeholder.jpg'} 
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-rows-2 gap-2">
            {property.images?.slice(1, 3).map((img, i) => (
              <div key={i} className="bg-gray-200 rounded-lg overflow-hidden">
                <img src={img.url} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>{property.address_line1}, {property.city}, {property.state} {property.zip_code}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={toggleFavorite} className={`p-2 rounded-full ${isFavorite ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
                  <Heart className="w-5 h-5" fill={isFavorite ? 'currentColor' : 'none'} />
                </button>
                <button className="p-2 rounded-full bg-gray-100 text-gray-600">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-6 mb-6 pb-6 border-b">
              <div className="text-3xl font-bold text-primary-600">{formatPrice(property.price)}</div>
              {property.verified && (
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Verified Property</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-4 gap-4 mb-8 pb-8 border-b">
              {property.bedrooms && (
                <div>
                  <Bed className="w-6 h-6 text-gray-400 mb-1" />
                  <p className="font-bold">{property.bedrooms}</p>
                  <p className="text-sm text-gray-600">Bedrooms</p>
                </div>
              )}
              {property.bathrooms && (
                <div>
                  <Bath className="w-6 h-6 text-gray-400 mb-1" />
                  <p className="font-bold">{property.bathrooms}</p>
                  <p className="text-sm text-gray-600">Bathrooms</p>
                </div>
              )}
              {property.square_feet && (
                <div>
                  <Square className="w-6 h-6 text-gray-400 mb-1" />
                  <p className="font-bold">{property.square_feet.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Sq Ft</p>
                </div>
              )}
              {property.year_built && (
                <div>
                  <Calendar className="w-6 h-6 text-gray-400 mb-1" />
                  <p className="font-bold">{property.year_built}</p>
                  <p className="text-sm text-gray-600">Year Built</p>
                </div>
              )}
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{property.description}</p>
            </div>

            {property.features && property.features.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Features</h2>
                <ul className="grid grid-cols-2 gap-2">
                  {property.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <div className="card sticky top-24">
              <h3 className="font-bold mb-4">Interested in this property?</h3>
              {user ? (
                profile?.role === 'buyer' ? (
                  <button onClick={() => setShowOfferModal(true)} className="btn-primary w-full mb-3">
                    Make an Offer
                  </button>
                ) : (
                  <p className="text-sm text-gray-600 mb-3">Switch to buyer account to make offers</p>
                )
              ) : (
                <button onClick={() => navigate('/signin')} className="btn-primary w-full mb-3">
                  Sign In to Make Offer
                </button>
              )}

              <div className="border-t pt-4 mt-4">
                <h4 className="font-semibold mb-2">Listed by</h4>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div>
                    <p className="font-medium">{property.seller?.full_name || 'Anonymous'}</p>
                    <p className="text-sm text-gray-600">Seller</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <h4 className="font-semibold mb-2">Transaction Protection</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>48-hour escrow hold</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>Digital contracts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>Buyer protection</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showOfferModal && (
        <MakeOfferModal
          property={property}
          onClose={() => setShowOfferModal(false)}
        />
      )}
    </div>
  );
}
