export type Supermarket = "Viva Fresh" | "Interex" | "ETC" | "Meridian Express";

export interface SupermarketRow {
  sm: Supermarket;
  logo: string;
  total: string;
  num: number;
  miniAvail: string;
  cheapest?: boolean;
}

export const IMG = {
  milk: "/products/milk.png",
  bread: "/products/bread.svg",
  eggs: "/products/eggs.png",
  oil: "/products/oil.png",
  coffee: "/products/coffee.png",
  banana: "/products/banana.svg",
  detergent: "/products/detergent.png",
  heroGroceries: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1000&q=82&auto=format&fit=crop"
} as const;

export const LOGOS = {
  viva: "/logos/viva.png",
  superviva: "/logos/superviva.png",
  interex: "/logos/interex.png",
  etc: "/logos/etc.png",
  meridian: "/logos/meridian.png",
  maxi: "/logos/maxi.png",
  emona: "/logos/emona.png"
} as const;

export const ROWS: SupermarketRow[] = [
  { sm: "Viva Fresh", logo: LOGOS.viva, total: "22.45", num: 22.45, miniAvail: "7/7 produkte", cheapest: true },
  { sm: "Interex", logo: LOGOS.interex, total: "23.30", num: 23.3, miniAvail: "7/7 produkte" },
  { sm: "ETC", logo: LOGOS.etc, total: "24.10", num: 24.1, miniAvail: "6/7 produkte" },
  { sm: "Meridian Express", logo: LOGOS.meridian, total: "25.05", num: 25.05, miniAvail: "7/7 produkte" }
];

export const SAVINGS = "2.60";

export const BASKET_PRODUCTS = [
  { name: "Qumësht 1L", price: "1.19", img: IMG.milk },
  { name: "Bukë", price: "0.69", img: IMG.bread },
  { name: "Vezë, 10 copë", price: "2.49", img: IMG.eggs },
  { name: "Vaj 1L", price: "3.49", img: IMG.oil },
  { name: "Kafe 500g", price: "4.99", img: IMG.coffee },
  { name: "Banane 1kg", price: "1.60", img: IMG.banana },
  { name: "Detergjent 2L", price: "8.00", img: IMG.detergent }
] as const;

export const PRODUCT_ROWS = [
  { sm: "Viva Fresh", logo: LOGOS.viva, price: "1.15", lowest: true },
  { sm: "Interex", logo: LOGOS.interex, price: "1.22" },
  { sm: "ETC", logo: LOGOS.etc, price: "1.29", was: "1.45" },
  { sm: "Meridian Express", logo: LOGOS.meridian, price: "1.35" }
] as const;

export const JOURNEY_CHAPTERS = [
  { id: "compare", eyebrow: "Krahaso", title: "E njëjta shportë. Një zgjedhje më e zgjuar.", copy: "Shiko totalin e plotë dhe çmimin e çdo produkti para se të nisesh." },
  { id: "scan", eyebrow: "Skano", title: "Nga barkodi te fatura, pa hamendësime.", copy: "Gjej produktin në sekonda dhe verifiko blerjen me një fotografi të faturës." },
  { id: "reward", eyebrow: "Fito", title: "Blerjet e verifikuara kthehen në shpërblime.", copy: "Mblidh pikë dhe përdori për zbritje, produkte dhe oferta praktike." }
] as const;

export const PARTNER_BENEFITS = ["Publiko çmime dhe oferta", "Rrit dukshmërinë lokale", "Përmirëso saktësinë", "Arrij blerësit në momentin e zgjedhjes"] as const;
