'use client';

import { MapContainer, TileLayer, Marker, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { icon } from 'leaflet';
import { Icon } from 'lucide-react'; 
import { findCountryByCode } from '@/utils/countries';
import CountryFlagAndName from '../card/CountryFlagandName';
import Title from './Title';

const iconUrl =
  'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png';

const markerIcon = icon({
  iconUrl: iconUrl,
  iconSize: [20, 30],
});

function PropertyMap({ countryCode }) {
  const defaultLocation = [51.505, -0.09];
  const location = findCountryByCode(countryCode)?.location || defaultLocation;
 

  return (
    <div className='mt-4'>
      <div className='mb-4'>
        <Title text='Where you will be staying' />
        <CountryFlagAndName countryCode={countryCode} />
      </div>
      <MapContainer
        scrollWheelZoom={false}
        zoomControl={false}
        className='h-[50vh] rounded-lg relative z-0'
        center={location}
        zoom={7}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <ZoomControl position='bottomright' />
        <Marker position={location} icon={markerIcon} />
      </MapContainer>
    </div>
  );
}

export default PropertyMap;
