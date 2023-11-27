import type { NextPage } from 'next';
import { locations } from '../data';
import logo from '../src/assets/eleven_dogs_logo_1.png';
import { BarbershopPage } from '../src/components';
import image1 from '../src/assets/ed/a00001.jpg';
import image2 from '../src/assets/ed/a00002.jpg';
import image3 from '../src/assets/ed/a00003.jpg';
import image4 from '../src/assets/ed/a00004.jpg';
import image5 from '../src/assets/ed/a00005.jpg';
import image6 from '../src/assets/ed/a00006.jpg';
import image7 from '../src/assets/ed/a00007.jpg';
import image8 from '../src/assets/ed/a00008.jpg';
import getRandomId from '../src/utils/getRandomId';


const Main: NextPage = () => {
  return (
    <BarbershopPage
      ogImage="/og_main.jpg"
      renderMap={
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1772.6781408255501!2d33.40964255723156!3d49.068934543092396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d75326dbc5734b%3A0x3d66c6d08ca8c9ec!2sIvana%20Mazepy%20St%2C%2028%2C%20Kremenchuk%2C%20Poltavs&#39;ka%20oblast%2C%2039600!5e0!3m2!1sen!2sua!4v1658230066508!5m2!1sen!2sua"
          width="100%"
          height="100%"
          style={{ border: 'none' }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      }
      data={locations.main}
      logo={logo}
      color="#e6e6e6"
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

export default Main;
