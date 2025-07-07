import productImages from './productImages';

export interface Product {
  id: string;
  name: string;
  shortName: string;
  type: string;
  basePrice: number;
  description: string;
  features: string[];
  image: string;
  colors: string[];
  sizes: string[];
  embroideryAreas: {
    name: string;
    maxWidth: number;
    maxHeight: number;
    position: string;
  }[];
  minQuantity: number;
  bulkPricing: {
    quantity: number;
    discount: number;
  }[];
}

export const products: Product[] = [
  {
    id: 'premium-tshirt',
    name: 'Premium Cotton T-Shirt',
    shortName: 'T-Shirt',
    type: 'shirt',
    basePrice: 18.99,
    description: '100% preshrunk cotton, heavyweight construction, tagless for comfort. Perfect for custom embroidery with excellent durability.',
    features: [
      '100% Preshrunk Cotton',
      'Heavyweight 6.1 oz fabric',
      'Tagless for comfort',
      'Reinforced seams',
      'Machine washable',
      'Embroidery-ready'
    ],
    image: productImages.tshirt,
    colors: ['White', 'Black', 'Navy', 'Red', 'Royal Blue', 'Gray'],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    embroideryAreas: [
      { name: 'Left Chest', maxWidth: 4, maxHeight: 4, position: 'left-chest' },
      { name: 'Right Chest', maxWidth: 4, maxHeight: 4, position: 'right-chest' },
      { name: 'Center Chest', maxWidth: 12, maxHeight: 8, position: 'center-chest' },
      { name: 'Full Back', maxWidth: 14, maxHeight: 16, position: 'full-back' },
      { name: 'Left Sleeve', maxWidth: 3, maxHeight: 6, position: 'left-sleeve' },
      { name: 'Right Sleeve', maxWidth: 3, maxHeight: 6, position: 'right-sleeve' }
    ],
    minQuantity: 1,
    bulkPricing: [
      { quantity: 12, discount: 0.05 },
      { quantity: 24, discount: 0.10 },
      { quantity: 50, discount: 0.15 },
      { quantity: 100, discount: 0.20 }
    ]
  },
  {
    id: 'baseball-cap',
    name: 'Structured Baseball Cap',
    shortName: 'Baseball Cap',
    type: 'hat',
    basePrice: 22.99,
    description: '6-panel structured cap with cotton twill construction. Adjustable strap closure. Premium embroidery surface.',
    features: [
      '6-Panel Structured Design',
      '100% Cotton Twill',
      'Adjustable Back Strap',
      'Pre-curved Visor',
      'Moisture-wicking Sweatband',
      'One Size Fits Most'
    ],
    image: productImages.cap,
    colors: ['Navy', 'Black', 'White', 'Red', 'Royal Blue', 'Khaki'],
    sizes: ['One Size'],
    embroideryAreas: [
      { name: 'Front Panel', maxWidth: 4, maxHeight: 2.5, position: 'front-panel' },
      { name: 'Left Side', maxWidth: 2, maxHeight: 2, position: 'left-side' },
      { name: 'Right Side', maxWidth: 2, maxHeight: 2, position: 'right-side' },
      { name: 'Back Panel', maxWidth: 4, maxHeight: 2, position: 'back-panel' }
    ],
    minQuantity: 1,
    bulkPricing: [
      { quantity: 12, discount: 0.05 },
      { quantity: 24, discount: 0.10 },
      { quantity: 50, discount: 0.15 },
      { quantity: 100, discount: 0.20 }
    ]
  },
  {
    id: 'pullover-hoodie',
    name: 'Premium Pullover Hoodie',
    shortName: 'Hoodie',
    type: 'hoodie',
    basePrice: 44.99,
    description: '50/50 cotton-polyester blend fleece. Double-lined hood with drawstring. Front kangaroo pocket. Perfect for large embroidery designs.',
    features: [
      '50/50 Cotton-Poly Blend',
      '8.0 oz Fleece Weight',
      'Double-lined Hood',
      'Front Kangaroo Pocket',
      'Ribbed Cuffs and Waistband',
      'Machine Washable'
    ],
    image: productImages.hoodie,
    colors: ['Charcoal', 'Black', 'Navy', 'Gray', 'Maroon', 'Red'],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    embroideryAreas: [
      { name: 'Left Chest', maxWidth: 4, maxHeight: 4, position: 'left-chest' },
      { name: 'Center Chest', maxWidth: 12, maxHeight: 8, position: 'center-chest' },
      { name: 'Full Back', maxWidth: 14, maxHeight: 16, position: 'full-back' },
      { name: 'Left Sleeve', maxWidth: 3, maxHeight: 6, position: 'left-sleeve' },
      { name: 'Right Sleeve', maxWidth: 3, maxHeight: 6, position: 'right-sleeve' }
    ],
    minQuantity: 1,
    bulkPricing: [
      { quantity: 12, discount: 0.05 },
      { quantity: 24, discount: 0.10 },
      { quantity: 50, discount: 0.15 },
      { quantity: 100, discount: 0.20 }
    ]
  },
  {
    id: 'polo-shirt',
    name: 'Professional Polo Shirt',
    shortName: 'Polo',
    type: 'polo',
    basePrice: 28.99,
    description: '100% cotton pique knit. Three-button placket with reinforced seams. Side vents for comfort. Business professional appearance.',
    features: [
      '100% Cotton Pique',
      '6.5 oz Weight',
      'Three-button Placket',
      'Reinforced Seams',
      'Side Vents',
      'Professional Appearance'
    ],
    image: productImages.polo,
    colors: ['Navy', 'White', 'Black', 'Royal Blue', 'Red', 'Gray'],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    embroideryAreas: [
      { name: 'Left Chest', maxWidth: 4, maxHeight: 4, position: 'left-chest' },
      { name: 'Right Chest', maxWidth: 4, maxHeight: 4, position: 'right-chest' },
      { name: 'Center Back', maxWidth: 12, maxHeight: 8, position: 'center-back' },
      { name: 'Left Sleeve', maxWidth: 3, maxHeight: 4, position: 'left-sleeve' }
    ],
    minQuantity: 1,
    bulkPricing: [
      { quantity: 12, discount: 0.05 },
      { quantity: 24, discount: 0.10 },
      { quantity: 50, discount: 0.15 },
      { quantity: 100, discount: 0.20 }
    ]
  }
];

export const embroideryPricing = {
  textEmbroidery: {
    basePrice: 8.00,
    perStitch: 0.01,
    maxCharacters: 15
  },
  logoEmbroidery: {
    basePrice: 12.00,
    perThousandStitches: 2.50,
    setupFee: 25.00 // One-time digitizing fee
  }
};

export default products;