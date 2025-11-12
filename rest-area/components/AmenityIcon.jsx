
import React from 'react';
import { Amenity } from '../types.js';

const FuelIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v1.5m-1.5-1.5v1.5m-1.5-1.5v1.5m-1.5-1.5v1.5m-1.5-1.5v1.5m1.5 6v4.5m-6-4.5v4.5m7.5-10.5h-9a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h9a1.5 1.5 0 001.5-1.5V6.75a1.5 1.5 0 00-1.5-1.5z" />
  </svg>
);

const EvStationIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
);

const StoreIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .962-.328 1.093-.822l3.48-9.116a.75.75 0 00-1.406-.54l-3.48 9.116H7.5a3 3 0 00-3 3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM15.75 18a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
  </svg>
);

const RestaurantIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M11,9H9V2H7V9H5V2H3V9C3,11.12 4.66,12.84 6.75,12.97V22H9.25V12.97C11.34,12.84 13,11.12 13,9V2H11V9M16,6V14H18.5V22H21V2C18.24,2 16,4.24 16,6Z" />
  </svg>
);

const CafeIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5h3m-6.75 0h10.5c.621 0 1.125-.504 1.125-1.125v-7.5c0-.621-.504-1.125-1.125-1.125h-10.5c-.621 0-1.125.504-1.125 1.125v7.5c0 .621.504 1.125 1.125 1.125z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75v-4.5a3.375 3.375 0 00-3.375-3.375h-1.5a3.375 3.375 0 00-3.375 3.375v4.5" />
  </svg>
);

const PharmacyIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const BedIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19,7H11V14H3V5H1V20H3V17H21V20H23V11A4,4 0 0,0 19,7M7,13A3,3 0 0,0 10,10A3,3 0 0,0 7,7A3,3 0 0,0 4,10A3,3 0 0,0 7,13Z" />
  </svg>
);

const ShowerIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12,22A2,2 0 0,1 10,20A2,2 0 0,1 12,18A2,2 0 0,1 14,20A2,2 0 0,1 12,22M6,2V13H8V8H16V13H18V2A4,4 0 0,0 14,6A4,4 0 0,0 10,2H6M13,7A1,1 0 0,1 12,8A1,1 0 0,1 11,7A1,1 0 0,1 12,6A1,1 0 0,1 13,7M10,7A1,1 0 0,1 9,8A1,1 0 0,1 8,7A1,1 0 0,1 9,6A1,1 0 0,1 10,7M16,7A1,1 0 0,1 15,8A1,1 0 0,1 14,7A1,1 0 0,1 15,6A1,1 0 0,1 16,7Z" />
  </svg>
);


const amenityDetails = {
  [Amenity.GasStation]: { icon: FuelIcon, color: 'text-orange-500' },
  [Amenity.LPGStation]: { icon: FuelIcon, color: 'text-red-500' },
  [Amenity.EVStation]: { icon: EvStationIcon, color: 'text-green-500' },
  [Amenity.ConvenienceStore]: { icon: StoreIcon, color: 'text-blue-500' },
  [Amenity.Restaurant]: { icon: RestaurantIcon, color: 'text-amber-600' },
  [Amenity.Cafe]: { icon: CafeIcon, color: 'text-purple-500' },
  [Amenity.Pharmacy]: { icon: PharmacyIcon, color: 'text-teal-500' },
  [Amenity.SleepingRoom]: { icon: BedIcon, color: 'text-indigo-500' },
  [Amenity.ShowerRoom]: { icon: ShowerIcon, color: 'text-cyan-500' },
};


export const AmenityIcon = ({ amenity }) => {
  const details = amenityDetails[amenity];
  if (!details) return null;

  const IconComponent = details.icon;

  return (
    <div className={`flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 transition-colors hover:bg-gray-200 ${details.color}`} title={amenity}>
      <IconComponent className="w-5 h-5" />
    </div>
  );
};