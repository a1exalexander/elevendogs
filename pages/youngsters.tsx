import type { NextPage } from 'next';
import { locations } from '../data';
import logo from '../src/assets/eleven_dogs_youngsters.svg';
import { BarbershopPage } from '../src/components';

const Youngsters: NextPage = () => {
  return <BarbershopPage data={locations.secondary} logo={logo} color="#fcee21" />;
};

export default Youngsters;
