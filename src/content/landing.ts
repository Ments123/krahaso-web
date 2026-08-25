export const appScreens = {
  home: {
    src: '/app/krahaso-home.jpg',
    alt: 'Ballina e aplikacionit Krahaso me kërkim, kategori dhe oferta',
  },
  homeFeed: {
    src: '/app/krahaso-home-feed.jpg',
    alt: 'Ofertat e nxehta dhe ofertat personale në ballinën e Krahaso',
  },
  offers: {
    src: '/app/krahaso-offers.jpg',
    alt: 'Lista e ofertave nga marketet në aplikacionin Krahaso',
  },
  scanner: {
    src: '/app/krahaso-scanner.jpg',
    alt: 'Skaneri i barkodit duke njohur një produkt në Krahaso',
  },
  basket: {
    src: '/app/krahaso-basket.jpg',
    alt: 'Shporta që krahason totalin mes marketeve në Krahaso',
  },
  rewards: {
    src: '/app/krahaso-rewards.jpg',
    alt: 'Faqja Fito me pikët dhe mënyrat për të fituar në Krahaso',
  },
} as const;

export type AppScreenId = keyof typeof appScreens;

export const featureChapters = [
  {
    id: 'kerko',
    screen: 'home',
    step: '01',
    title: 'Kërko',
    eyebrow: 'Gjeje shpejt',
    description:
      'Kërko me emër ose shfleto kategoritë për të gjetur produktin që po kërkon.',
  },
  {
    id: 'ofertat',
    screen: 'offers',
    step: '02',
    title: 'Ofertat',
    eyebrow: 'Shiko çfarë ka sot',
    description:
      'Ofertat që i kemi në dispozicion, të mbledhura nga marketet e Kosovës në një pamje.',
  },
  {
    id: 'skano',
    screen: 'scanner',
    step: '03',
    title: 'Skano',
    eyebrow: 'Nga barkodi te produkti',
    description:
      'Skano barkodin për ta gjetur produktin më shpejt dhe shiko të dhënat që janë në dispozicion.',
  },
  {
    id: 'shporta',
    screen: 'basket',
    step: '04',
    title: 'Shporta',
    eyebrow: 'Krahaso më shumë se një produkt',
    description:
      'Mblidhi produktet në shportë dhe krahaso totalet aty ku kemi të dhëna për marketet.',
  },
  {
    id: 'fito',
    screen: 'rewards',
    step: '05',
    title: 'Fito',
    eyebrow: 'Ndihmo që çmimet të jenë më të sakta',
    description:
      'Dërgo kuponin për verifikim dhe fito pikë kur pranohet.',
  },
] as const;

export type FeatureId = (typeof featureChapters)[number]['id'];

export const universeTiles = [
  { src: '/products/coffee.png', alt: 'Pako kafeje', kind: 'product' },
  { src: '/logos/viva.png', alt: 'Viva Fresh Store', kind: 'logo' },
  { src: '/products/oil.png', alt: 'Shishe vaji', kind: 'product' },
  { src: '/logos/interex.png', alt: 'Interex', kind: 'logo' },
  { src: '/logos/superviva.png', alt: 'Super Viva', kind: 'logo' },
  { src: '/products/eggs.png', alt: 'Pako vezësh', kind: 'product' },
  { src: '/logos/maxi.png', alt: 'Maxi', kind: 'logo' },
  { src: '/products/detergent.png', alt: 'Detergjent', kind: 'product' },
] as const;

export const retailerLogos = [
  { src: '/logos/viva.png', alt: 'Viva Fresh Store' },
  { src: '/logos/interex.png', alt: 'Interex' },
  { src: '/logos/superviva.png', alt: 'Super Viva' },
  { src: '/logos/maxi.png', alt: 'Maxi' },
] as const;
