import { Product, Category } from './types';
// import { Product as ProductType } from './type';

export const categories: Category[] = [
  { id: 1, name: 'Dresses', gender: 'female', image: '/images/dresses.jpg' },
  { id: 2, name: 'Tops', gender: 'female', image: '/images/tops.jpg' },
  { id: 3, name: 'Jeans', gender: 'female', image: '/images/jeans.jpg' },
  { id: 4, name: 'Jackets', gender: 'female', image: '/images/jackets.jpg' },
  { id: 5, name: 'Shirts', gender: 'male', image: '/images/shirts.jpg' },
  { id: 6, name: 'Pants', gender: 'male', image: '/images/pants.jpg' },
];

export const products: Product[] = [
  {
    id: 1,
    name: 'Summer Floral Maxi Dress',
    price: 89.99,
    originalPrice: 109.99,
    category: 'Dresses',
    gender: 'female',
    season: 'summer',
    images: ['https://picsum.photos/id/1015/600/800', 'https://picsum.photos/id/1016/600/800'],
    description: 'Beautiful floral print maxi dress perfect for summer days.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Pink', 'Blue', 'Yellow'],
    inStock: true,
    rating: 4.8,
    reviewCount: 124,
  },
  {
    id: 2,
    name: 'Classic Denim Jacket',
    price: 129.99,
    category: 'Jackets',
    gender: 'female',
    season: 'fall',
    images: ['https://picsum.photos/id/1020/600/800'],
    description: 'Timeless denim jacket for any season.',
    sizes: ['S', 'M', 'L'],
    colors: ['Blue', 'Black'],
    inStock: true,
    rating: 4.6,
    reviewCount: 89,
  },
  // Add more products...

    {
    id: 3,
    name: 'Classic Denim Jacket',
    price: 129.99,
    category: 'Jackets',
    gender: 'female',
    season: 'fall',
    images: ['https://picsum.photos/id/1020/600/800'],
    description: 'Timeless denim jacket for any season.',
    sizes: ['S', 'M', 'L'],
    colors: ['Blue', 'Black'],
    inStock: true,
    rating: 4.6,
    reviewCount: 89,
  },
  {
    id: 4,
    name: 'Slim Fit Oxford Shirt',
    price: 59.99,
    category: 'Shirts',
    gender: 'male',
    season: 'spring',
    images: ['https://picsum.photos/id/1060/600/800'],
    description: 'Premium cotton oxford shirt.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Light Blue', 'Navy'],
    inStock: true,
    rating: 4.7,
    reviewCount: 56,
  },
];

export const getSeasonalDiscount = (season: string): number => {
  const currentMonth = new Date().getMonth();
  // Simple logic: summer discount in June-Aug etc.
  if (season === 'summer' && currentMonth >= 5 && currentMonth <= 7) return 0.15;
  if (season === 'winter' && currentMonth >= 11 || currentMonth <= 1) return 0.2;
  return 0;
};