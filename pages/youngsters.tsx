import type { NextPage } from 'next';
import { locations } from '../data';
import logo from '../src/assets/eleven_dogs_youngsters.svg';

import { BarberShopPage } from '../src/components';

const Youngsters: NextPage = () => {
  return <BarberShopPage data={locations.secondary} logo={logo} color="#fcee21" />;
};

export default Youngsters;
