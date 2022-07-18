import type { NextPage } from 'next';
import { locations } from '../data';
import logo from '../src/assets/eleven_dogs.svg';

import { BarberShopPage } from '../src/components';

const Main: NextPage = () => {
  return <BarberShopPage data={locations.main} logo={logo} color="#e6e6e6" />;
};

export default Main;
