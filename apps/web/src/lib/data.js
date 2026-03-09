export const navItems = [
  { label: "Home", href: "/" },
  { label: "Showcase", href: "/showcase" },
  { label: "Catalog", href: "/catalog" },
  { label: "Contact", href: "/contact" },
  { label: "Collaboration", href: "/collaboration" },
  { label: "Social", href: "/social" },
];

export const releases = [
  {
    title: "Origins Capsule",
    season: "Past",
    year: "2024",
    notes: "Street-luxury silhouettes with monochrome framing.",
    image: "/assets/catalog/products/morblackshirt_front.jpeg",
  },
  {
    title: "MOR Frame Drop",
    season: "Current",
    year: "2025",
    notes: "Statement eyewear with editorial campaign styling.",
    image: "/assets/catalog/products/black_morframes_front.jpeg",
  },
  {
    title: "Atelier Heat",
    season: "Upcoming",
    year: "2026",
    notes: "Future release concept blending premium tee layers and tinted shades.",
    image: "/assets/catalog/products/red_sunglasses_front.jpeg",
  },
];

export const products = [
  {
    id: "mor-black-shirt",
    name: "MOR Black Shirt",
    sku: "DJ-MOR-BLK",
    price: 68,
    stock: "In Stock",
    image: "/assets/catalog/products/morblackshirt_front.jpeg",
  },
  {
    id: "mor-white-shirt",
    name: "MOR White Shirt",
    sku: "DJ-MOR-WHT",
    price: 68,
    stock: "In Stock",
    image: "/assets/catalog/products/morwhiteshirt_front.jpeg",
  },
  {
    id: "mor-red-shirt",
    name: "MOR Red Shirt",
    sku: "DJ-MOR-RED",
    price: 68,
    stock: "Out of Stock",
    image: "/assets/catalog/products/morredshirt_front.jpeg",
  },
  {
    id: "black-mor-frames",
    name: "Black MOR Frames",
    sku: "DJ-FRM-BLK",
    price: 140,
    stock: "In Stock",
    image: "/assets/catalog/products/black_morframes_front.jpeg",
  },
  {
    id: "white-sunglasses",
    name: "White Sunglasses",
    sku: "DJ-SNG-WHT",
    price: 120,
    stock: "Out of Stock",
    image: "/assets/catalog/products/white_sunglasses_front.jpeg",
  },
  {
    id: "red-sunglasses",
    name: "Red Sunglasses",
    sku: "DJ-SNG-RED",
    price: 120,
    stock: "In Stock",
    image: "/assets/catalog/products/red_sunglasses_front.jpeg",
  },
];

export const collaborations = [
  {
    name: "DE'JERI x City Heat Dance Unit",
    summary: "Performance capsule with athletic editorial direction.",
    release: "Heat Motion Catalog",
  },
  {
    name: "DE'JERI x Northline Visual Lab",
    summary: "Creative studio collaboration for brand campaign visuals.",
    release: "Nightline Capsule",
  },
];

export const brandContact = {
  email: "hello@dejeri.com",
  phone: "+1 (404) 555-0120",
  address: "Atlanta, GA 30318, United States",
};

export function findProductBySku(sku) {
  return products.find((product) => product.sku === sku);
}
