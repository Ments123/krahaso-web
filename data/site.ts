// Centralised, typed demo data for the Krahaso landing page.
// All prices are illustrative demonstration values only
// ("Çmimet janë vetëm shembuj demonstrues").

export type Supermarket =
  | "Viva Fresh"
  | "Interex"
  | "ETC"
  | "Meridian Express";

export interface SupermarketRow {
  sm: Supermarket;
  logo: string;
  /** basket total as a display string, e.g. "22.45" */
  total: string;
  /** numeric total, used to size comparison bars */
  num: number;
  /** full availability text, e.g. "7 nga 7 produkte" */
  availText: string;
  /** compact availability, e.g. "7/7" */
  miniAvail: string;
  cheapest?: boolean;
}

export interface BasketItem {
  name: string;
  img: string;
}

export interface ProductPriceRow {
  sm: Supermarket;
  logo: string;
  price: string;
  lowest?: boolean;
  promo?: boolean;
  was?: string;
}

export interface BasketProduct {
  name: string;
  price: string;
  img: string;
}

export interface Faq {
  q: string;
  a: string;
}

/** Local packshots + two remote grocery photos (bread & banane). */
export const IMG = {
  milk: "/products/milk.png",
  bread:
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=70&auto=format&fit=crop",
  eggs: "/products/eggs.png",
  oil: "/products/oil.png",
  coffee: "/products/coffee.png",
  banana:
    "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&q=70&auto=format&fit=crop",
  detergent: "/products/detergent.png",
  heroGroceries:
    "https://images.unsplash.com/photo-1542838132-92c53300491e?w=700&q=75&auto=format&fit=crop",
} as const;

export const LOGOS = {
  viva: "/logos/viva.png",
  superviva: "/logos/superviva.png",
  interex: "/logos/interex.png",
  etc: "/logos/etc.png",
  meridian: "/logos/meridian.png",
  maxi: "/logos/maxi.png",
  emona: "/logos/emona.png",
} as const;

/** The realistic weekly basket (7 products). */
export const BASKET_ITEMS: BasketItem[] = [
  { name: "Qumësht 1L", img: IMG.milk },
  { name: "Bukë", img: IMG.bread },
  { name: "Vezë, 10 copë", img: IMG.eggs },
  { name: "Vaj 1L", img: IMG.oil },
  { name: "Kafe 500g", img: IMG.coffee },
  { name: "Banane 1kg", img: IMG.banana },
  { name: "Detergjent 2L", img: IMG.detergent },
];

/** The same basket priced across supermarkets. Viva Fresh is cheapest. */
export const ROWS: SupermarketRow[] = [
  {
    sm: "Viva Fresh",
    logo: LOGOS.viva,
    total: "22.45",
    num: 22.45,
    availText: "7 nga 7 produkte",
    miniAvail: "7/7",
    cheapest: true,
  },
  {
    sm: "Interex",
    logo: LOGOS.interex,
    total: "23.30",
    num: 23.3,
    availText: "7 nga 7 produkte",
    miniAvail: "7/7",
  },
  {
    sm: "ETC",
    logo: LOGOS.etc,
    total: "24.10",
    num: 24.1,
    availText: "6 nga 7 · mungon Detergjent 2L",
    miniAvail: "6/7",
  },
  {
    sm: "Meridian Express",
    logo: LOGOS.meridian,
    total: "25.05",
    num: 25.05,
    availText: "7 nga 7 produkte",
    miniAvail: "7/7",
  },
];

/** Savings vs. the most expensive basket, shown as the headline number. */
export const SAVINGS = "2.60";

/** Individual product comparison (Qumësht 1L). */
export const PRODUCT_ROWS: ProductPriceRow[] = [
  { sm: "Viva Fresh", logo: LOGOS.viva, price: "1.15", lowest: true },
  { sm: "Interex", logo: LOGOS.interex, price: "1.22" },
  { sm: "ETC", logo: LOGOS.etc, price: "1.29", promo: true, was: "1.45" },
  { sm: "Meridian Express", logo: LOGOS.meridian, price: "1.35" },
];

/** Itemised sample basket shown behind the hero "Për produkt" toggle (=€22.45). */
export const BASKET_PRODUCTS: BasketProduct[] = [
  { name: "Qumësht 1L", price: "1.19", img: IMG.milk },
  { name: "Bukë", price: "0.69", img: IMG.bread },
  { name: "Vezë, 10 copë", price: "2.49", img: IMG.eggs },
  { name: "Vaj 1L", price: "3.49", img: IMG.oil },
  { name: "Kafe 500g", price: "4.99", img: IMG.coffee },
  { name: "Banane 1kg", price: "1.60", img: IMG.banana },
  { name: "Detergjent 2L", price: "8.00", img: IMG.detergent },
];

export const BENEFITS: string[] = [
  "Krahaso shportën e plotë",
  "Kurse në blerjet javore",
  "Gjej ofertat më të mira",
  "Çmimi për kg ose litër",
  "Fito pikë nga blerjet",
  "Vendime më të zgjuara",
];

export const PARTNER_BENEFITS: string[] = [
  "Promovo ofertat",
  "Rrit dukshmërinë",
  "Arri blerësit lokalë",
  "Fushata shpërblimesh",
  "Produktet e reja",
  "Saktësia e çmimeve",
];

export const FAQS: Faq[] = [
  {
    q: "Çfarë është Krahaso?",
    a: "Aplikacion që krahason çmimet e produkteve ushqimore në supermarketet e Kosovës dhe të shpërblen për blerjet.",
  },
  {
    q: "Si krahasohen çmimet?",
    a: "Krijon një shportë me produktet që të duhen dhe Krahaso tregon totalin në secilin supermarket.",
  },
  {
    q: "A mund ta krahasoj të gjithë shportën?",
    a: "Po. Krahaso e llogarit çmimin e plotë të shportës në disa supermarkete njëherësh.",
  },
  {
    q: "Si funksionon skanimi i barkodit?",
    a: "Skano barkodin dhe shih menjëherë çmimet e produktit në supermarkete të ndryshme.",
  },
  {
    q: "Si funksionon skanimi i faturës?",
    a: "Fotografo faturën pas blerjes; Krahaso e njeh supermarketin dhe produktet dhe të jep pikë.",
  },
  {
    q: "Si fitoj pikë?",
    a: "Fiton pikë nga blerjet e verifikuara përmes faturave dhe i shkëmben për shpërblime.",
  },
  {
    q: "A ndryshojnë çmimet sipas degës?",
    a: "Po, çmimet mund të ndryshojnë nga supermarketi te supermarketi dhe nganjëherë nga dega.",
  },
  {
    q: "A janë çmimet gjithmonë të përditësuara?",
    a: "Punojmë për saktësinë, por çmimet mund të ndryshojnë; verifikoji gjithmonë në supermarket.",
  },
  {
    q: "A është aplikacioni falas?",
    a: "Po, Krahaso është falas për t’u shkarkuar dhe përdorur.",
  },
  {
    q: "Si bëhet një supermarket partner?",
    a: "Na kontakto përmes seksionit “Për partnerët” dhe ekipi ynë të ndihmon të fillosh.",
  },
];

/** Supermarket logos shown in the scrolling banner (all seven marks). */
export const MARQUEE_LOGOS: { src: string; alt: string; h: number }[] = [
  { src: LOGOS.viva, alt: "Viva Fresh", h: 50 },
  { src: LOGOS.superviva, alt: "Super Viva", h: 34 },
  { src: LOGOS.interex, alt: "Interex", h: 50 },
  { src: LOGOS.etc, alt: "ETC", h: 52 },
  { src: LOGOS.meridian, alt: "Meridian Express", h: 50 },
  { src: LOGOS.maxi, alt: "Maxi", h: 30 },
  { src: LOGOS.emona, alt: "Emona Center", h: 54 },
];

export interface JourneyStep {
  n: string;
  title: string;
  copy: string;
}

/** The six-step scroll journey (list → compare → cheapest → receipt → points → reward). */
export const JOURNEY_STEPS: JourneyStep[] = [
  { n: "01", title: "Krijo listën", copy: "Shto produktet që të duhen." },
  {
    n: "02",
    title: "Krahaso totalet",
    copy: "E njëjta shportë, çmime të ndryshme.",
  },
  {
    n: "03",
    title: "Zgjidh më të lirën",
    copy: "Shiko sa kursen para se të nisesh.",
  },
  { n: "04", title: "Skano faturën", copy: "Fotografo pas blerjes." },
  { n: "05", title: "Merr pikët", copy: "Automatikisht, menjëherë." },
  {
    n: "06",
    title: "Zhbllokou shpërblimin",
    copy: "Kupona, produkte falas, oferta.",
  },
];
