export const featureChapters = [
  {
    id: 'kerko',
    step: '01',
    title: 'Kërko',
    eyebrow: 'Gjeje shpejt',
    description:
      'Kërko me emër ose shfleto kategoritë për të gjetur produktin që po kërkon.',
  },
  {
    id: 'ofertat',
    step: '02',
    title: 'Ofertat',
    eyebrow: 'Shiko çfarë ka sot',
    description:
      'Ofertat që i kemi në dispozicion, të mbledhura nga marketet e Kosovës në një pamje.',
  },
  {
    id: 'skano',
    step: '03',
    title: 'Skano',
    eyebrow: 'Nga barkodi te produkti',
    description:
      'Skano barkodin për ta gjetur produktin më shpejt dhe shiko të dhënat që janë në dispozicion.',
  },
  {
    id: 'shporta',
    step: '04',
    title: 'Shporta',
    eyebrow: 'Krahaso më shumë se një produkt',
    description:
      'Mblidhi produktet në shportë dhe krahaso totalet aty ku kemi të dhëna për marketet.',
  },
  {
    id: 'fito',
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
