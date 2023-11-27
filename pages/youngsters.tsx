import type { NextPage } from 'next';
import { locations } from '../data';
import logo from '../src/assets/eleven_dogs_logo_2.png';
import { BarbershopPage } from '../src/components';
import getRandomId from '../src/utils/getRandomId';
import image1 from '../src/assets/edy/b00001.jpg';
import image2 from '../src/assets/edy/b00002.jpg';
import image3 from '../src/assets/edy/b00003.jpg';
import image4 from '../src/assets/edy/b00004.jpg';
import image5 from '../src/assets/edy/b00005.jpg';
import image6 from '../src/assets/edy/b00006.jpg';
import image7 from '../src/assets/edy/b00007.jpg';
import image8 from '../src/assets/edy/b00008.jpg';

const Youngsters: NextPage = () => {
  return (
    <BarbershopPage
      ogImage="/og_youngsters.jpg"
      renderMap={
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2613.041752248158!2d33.4244195155907!3d49.085846879310346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d752fdf4d39067%3A0xacc45b86accd9370!2sSvobody%20Ave%2C%2039%2F43%2C%20Kremenchuk%2C%20Poltavs&#39;ka%20oblast%2C%2039600!5e0!3m2!1sen!2sua!4v1658230504480!5m2!1sen!2sua"
          width="100%"
          height="100%"
          style={{ border: 'none' }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      }
      data={locations.secondary}
      logo={logo}
      color="#fcee21"
      photoGrid={[
        {
          id: getRandomId(),
          src: image1,
          type: 'vertical',
        },
        {
          id: getRandomId(),
          src: image2,
          type: 'vertical',
        },
        {
          id: getRandomId(),
          src: image3,
          type: 'vertical',
        },
        {
          id: getRandomId(),
          src: image4,
          type: 'vertical',
        },
        {
          id: getRandomId(),
          src: image5,
          type: 'vertical',
        },
        {
          id: getRandomId(),
          src: image6,
          type: 'vertical',
        },
        {
          id: getRandomId(),
          src: image7,
          type: 'vertical',
        },
        {
          id: getRandomId(),
          src: image8,
          type: 'vertical',
        },
      ]}
    />
  );
};

export default Youngsters;
