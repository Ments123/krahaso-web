export const appScreens = {
  home: {
    src: '/app/krahaso-home.webp',
    alt: 'Ballina e aplikacionit Krahaso me kërkim, kategori dhe oferta',
  },
  homeFeed: {
    src: '/app/krahaso-home-feed.webp',
    alt: 'Ofertat e nxehta dhe ofertat personale në ballinën e Krahaso',
  },
  offers: {
    src: '/app/krahaso-offers.webp',
    alt: 'Lista e ofertave nga marketet në aplikacionin Krahaso',
  },
  scanner: {
    src: '/app/krahaso-scanner.webp',
    alt: 'Skaneri i barkodit duke njohur një produkt në Krahaso',
  },
  basket: {
    src: '/app/krahaso-basket.webp',
    alt: 'Shporta që krahason totalin mes marketeve në Krahaso',
  },
  rewards: {
    src: '/app/krahaso-rewards.webp',
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
      'Kërko me emër ose markë, edhe me gabime të vogla në shkrim, ose shfleto kategoritë.',
  },
  {
    id: 'ofertat',
    screen: 'offers',
    step: '02',
    title: 'Ofertat',
    eyebrow: 'Shiko çfarë ka sot',
    description:
      'Shfleto ofertat javore dhe krahaso çmimet nga fletushkat e marketeve në zonën tënde.',
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

export const liveMarkets = [
  'Kosovë',
  'Shqipëri',
  'Maqedoni e Veriut',
  'Mal i Zi',
  'Bosnjë e Hercegovinë',
] as const;

const retailers = {
  viva: { src: '/logos/viva.png', alt: 'Viva Fresh Store' },
  interex: { src: '/logos/interex.png', alt: 'Interex' },
  maxi: { src: '/logos/maxi.png', alt: 'Maxi' },
} as const;

export const retailerLogos = Object.values(retailers);

export const universeTiles = [
  { area: 'coffee', src: '/products/coffee.webp', kind: 'product' },
  { area: 'oil', src: '/products/oil.webp', kind: 'product' },
  { area: 'interex', ...retailers.interex, kind: 'logo' },
  { area: 'viva', ...retailers.viva, kind: 'logo' },
  { area: 'eggs', src: '/products/eggs.webp', kind: 'product' },
  { area: 'detergent', src: '/products/detergent.webp', kind: 'product' },
] as const;
