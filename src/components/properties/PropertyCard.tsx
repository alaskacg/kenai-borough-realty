import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, CheckCircle } from 'lucide-react';
import type { Property } from '../../types';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const mainImage = property.images?.[0]?.url || '/placeholder-property.jpg';

  return (
    <Link to={`/property/${property.id}`} className="card p-0 overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative h-48 bg-gray-200">
        <img src={mainImage} alt={property.title} className="w-full h-full object-cover" />
        {property.verified && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Verified
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-1">{property.title}</h3>
        <p className="text-2xl font-bold text-primary-600 mb-2">{formatPrice(property.price)}</p>
        
        <div className="flex items-center gap-1 text-gray-600 text-sm mb-3">
          <MapPin className="w-4 h-4" />
          <span>{property.city}, {property.state}</span>
        </div>

        <div className="flex gap-4 text-sm text-gray-600">
          {property.bedrooms && (
            <div className="flex items-center gap-1">
              <Bed className="w-4 h-4" />
              <span>{property.bedrooms} bed</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4" />
              <span>{property.bathrooms} bath</span>
            </div>
          )}
          {property.square_feet && (
            <div className="flex items-center gap-1">
              <Square className="w-4 h-4" />
              <span>{property.square_feet.toLocaleString()} sqft</span>
            </div>
          )}
        </div>

        <p className="text-sm text-gray-500 mt-3 line-clamp-2">{property.description}</p>
      </div>
    </Link>
  );
}
