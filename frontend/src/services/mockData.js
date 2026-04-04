const now = Date.now();

export const categories = [
  { id: 'c1', name: 'Sneakers', imageUrl: 'https://images.unsplash.com/photo-1514996937319-344454492b37' },
  { id: 'c2', name: 'Apparel', imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab' },
  { id: 'c3', name: 'Accessories', imageUrl: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06' },
  { id: 'c4', name: 'Collectibles', imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420' },
];

export const products = [
  {
    id: 'p1',
    name: 'Nebula Runner X1',
    description: 'High-cushion daily runner tuned for urban pace and long sessions.',
    categoryId: 'c1',
    price: 7999,
    stock: 32,
    createdAt: new Date(now - 1000 * 60 * 60 * 24 * 8).toISOString(),
    dropTime: new Date(now + 1000 * 60 * 20).toISOString(),
    images: [
      'https://images.unsplash.com/photo-1514996937319-344454492b37',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d',
    ],
    rating: 4.8,
    soldOut: false,
  },
  {
    id: 'p2',
    name: 'Inferno Court Pro',
    description: 'Court silhouette with premium leather panels and competition grip.',
    categoryId: 'c1',
    price: 10999,
    stock: 0,
    createdAt: new Date(now - 1000 * 60 * 60 * 24 * 3).toISOString(),
    dropTime: new Date(now - 1000 * 60 * 60).toISOString(),
    images: [
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d',
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111',
    ],
    rating: 4.7,
    soldOut: true,
  },
  {
    id: 'p3',
    name: 'Launch Hoodie 2.0',
    description: 'Heavyweight fleece hoodie engineered for comfort and all-day wear.',
    categoryId: 'c2',
    price: 3499,
    stock: 120,
    createdAt: new Date(now - 1000 * 60 * 60 * 24 * 2).toISOString(),
    dropTime: new Date(now + 1000 * 60 * 60 * 4).toISOString(),
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
    ],
    rating: 4.6,
    soldOut: false,
  },
  {
    id: 'p4',
    name: 'Pulse Sling Pack',
    description: 'Compact sling with anti-theft zip and balanced ergonomic profile.',
    categoryId: 'c3',
    price: 2599,
    stock: 60,
    createdAt: new Date(now - 1000 * 60 * 60 * 24).toISOString(),
    dropTime: new Date(now + 1000 * 60 * 60 * 18).toISOString(),
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
      'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7',
    ],
    rating: 4.5,
    soldOut: false,
  },
  {
    id: 'p5',
    name: 'RocketDrop Figure S1',
    description: 'Limited collectible figure with serialized base and premium finish.',
    categoryId: 'c4',
    price: 4999,
    stock: 10,
    createdAt: new Date(now - 1000 * 60 * 60 * 12).toISOString(),
    dropTime: new Date(now + 1000 * 60 * 5).toISOString(),
    images: [
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3',
      'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
    ],
    rating: 4.9,
    soldOut: false,
  },
  {
    id: 'p6',
    name: 'Afterburn Tee',
    description: 'Dropped-shoulder oversized tee with launch graphics and soft texture.',
    categoryId: 'c2',
    price: 1899,
    stock: 240,
    createdAt: new Date(now - 1000 * 60 * 60 * 48).toISOString(),
    dropTime: new Date(now - 1000 * 60 * 10).toISOString(),
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f',
    ],
    rating: 4.3,
    soldOut: false,
  },
];

export const reviews = {
  p1: [
    { id: 'r1', user: 'Aarav', rating: 5, comment: 'Super comfortable and clean look.' },
    { id: 'r2', user: 'Meera', rating: 4, comment: 'Great cushioning, true to size.' },
  ],
  p3: [{ id: 'r3', user: 'Ritika', rating: 5, comment: 'Premium quality hoodie.' }],
};

export const demoOrders = [
  {
    id: 'o1',
    status: 'Delivered',
    totalPrice: 11598,
    createdAt: new Date(now - 1000 * 60 * 60 * 24 * 5).toISOString(),
    items: [
      { productId: 'p1', quantity: 1, price: 7999 },
      { productId: 'p6', quantity: 2, price: 1899 },
    ],
  },
  {
    id: 'o2',
    status: 'Shipped',
    totalPrice: 2599,
    createdAt: new Date(now - 1000 * 60 * 60 * 24).toISOString(),
    items: [{ productId: 'p4', quantity: 1, price: 2599 }],
  },
];

export const demoAddresses = [
  {
    id: 'a1',
    label: 'Home',
    line1: '22 Lake View Road',
    city: 'Pune',
    state: 'Maharashtra',
    zip: '411001',
    country: 'India',
  },
];
