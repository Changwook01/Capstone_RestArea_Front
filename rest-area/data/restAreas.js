
import { Amenity } from '../types.js';

export const ALL_REST_AREAS = [
  {
    id: 1,
    name: '안성휴게소',
    direction: '서울방향',
    highway: '경부고속도로',
    distanceKm: 0, timeMinutes: 0,
    amenities: [Amenity.GasStation, Amenity.EVStation, Amenity.ConvenienceStore, Amenity.Pharmacy, Amenity.Cafe],
  },
  {
    id: 2,
    name: '천안휴게소',
    direction: '서울방향',
    highway: '경부고속도로',
    distanceKm: 0, timeMinutes: 0,
    amenities: [Amenity.GasStation, Amenity.LPGStation, Amenity.ConvenienceStore, Amenity.Restaurant],
  },
  {
    id: 3,
    name: '옥천휴게소',
    direction: '서울방향',
    highway: '경부고속도로',
    distanceKm: 0, timeMinutes: 0,
    amenities: [Amenity.GasStation, Amenity.EVStation, Amenity.ConvenienceStore, Amenity.SleepingRoom, Amenity.ShowerRoom],
  },
  { id: 4, name: '금강휴게소', direction: '양방향', highway: '경부고속도로', distanceKm: 0, timeMinutes: 0, amenities: [Amenity.GasStation, Amenity.Restaurant, Amenity.Cafe] },
  { id: 5, name: '칠곡휴게소', direction: '부산방향', highway: '경부고속도로', distanceKm: 0, timeMinutes: 0, amenities: [Amenity.GasStation, Amenity.EVStation, Amenity.ConvenienceStore] },
  { id: 6, name: '망향휴게소', direction: '부산방향', highway: '경부고속도로', distanceKm: 0, timeMinutes: 0, amenities: [Amenity.GasStation, Amenity.LPGStation, Amenity.Pharmacy] },
  { id: 7, name: '행담도휴게소', direction: '양방향', highway: '서해안고속도로', distanceKm: 0, timeMinutes: 0, amenities: [Amenity.GasStation, Amenity.ConvenienceStore, Amenity.Restaurant, Amenity.Cafe] },
  { id: 8, name: '화성휴게소', direction: '목포방향', highway: '서해안고속도로', distanceKm: 0, timeMinutes: 0, amenities: [Amenity.GasStation, Amenity.EVStation, Amenity.ShowerRoom] },
  { id: 9, name: '덕평자연휴게소', direction: '양방향', highway: '영동고속도로', distanceKm: 0, timeMinutes: 0, amenities: [Amenity.GasStation, Amenity.LPGStation, Amenity.Restaurant, Amenity.Cafe] },
  { id: 10, name: '강릉휴게소', direction: '강릉방향', highway: '영동고속도로', distanceKm: 0, timeMinutes: 0, amenities: [Amenity.GasStation, Amenity.ConvenienceStore, Amenity.EVStation] },
  { id: 11, name: '가평휴게소', direction: '춘천방향', highway: '서울양양고속도로', distanceKm: 0, timeMinutes: 0, amenities: [Amenity.GasStation, Amenity.LPGStation, Amenity.Cafe] },
  { id: 12, name: '내린천휴게소', direction: '양양방향', highway: '서울양양고속도로', distanceKm: 0, timeMinutes: 0, amenities: [Amenity.GasStation, Amenity.Restaurant, Amenity.EVStation] },
];