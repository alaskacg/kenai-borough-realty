
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { Property } from '../../types';
import 'leaflet/dist/leaflet.css';

interface PropertyMapProps {
  properties: Property[];
}

export default function PropertyMap({ properties }: PropertyMapProps) {
  const propertiesWithCoords = properties.filter(p => p.latitude && p.longitude);

  if (propertiesWithCoords.length === 0) {
    return (
      <div className="card text-center py-12">
        <p className="text-gray-600">No properties with location data to display on map</p>
      </div>
    );
  }

  const center = {
    lat: propertiesWithCoords[0].latitude || 60.5544,
    lng: propertiesWithCoords[0].longitude || -151.2583,
  };

  return (
    <div className="card p-0 h-[600px] overflow-hidden">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={10}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {propertiesWithCoords.map((property) => (
          <Marker
            key={property.id}
            position={[property.latitude!, property.longitude!]}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-bold">{property.title}</p>
                <p className="text-primary-600 font-semibold">
                  ${property.price.toLocaleString()}
                </p>
                <a href={`/property/${property.id}`} className="text-primary-600 hover:underline text-xs">
                  View Details →
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
