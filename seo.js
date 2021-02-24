const seo = {
  url: 'https://www.elevendogs.com.ua',
  type: 'website',
  title: 'Eleven Dogs | Кременчук Барбершоп',
  siteName: 'Barbershop',
  locale: 'uk_UA',
  author: 'Євгеній Кохно',
  location: 'Кременчук, вул. Івана Мазепи, 28',
  phone: '+380962210799',
  instagram: 'eleven.dogs',
  email: 'hello@elevendogs.com.ua',
};

module.exports = {
  ...seo,
  img: `${seo.url}/elevendogs.png`,
  description: `Барбершоп в центрі Кременчука. Пострижись як в прошлий раз! ${seo.location}, ${seo.phone}.`,
  hiddenTitle: `Eleven Dogs - барбершоп в центрі Кременчука. Пострижись як в прошлий раз! ${seo.location}, ${seo.phone}.`,
};
