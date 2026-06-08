// lib/types.ts
export type Product = {
  _id: number | string;
  name: string;
  price: number;
  originalPrice?: number;
  // images: string[];           // ← Must have this
  image?: string;            // ← Optional, can be used as primary image
  category: string;
  gender: "male" | "female" | "unisex";
  season?: "summer" | "winter" | "spring" | "fall";
  description?: string;
  sizes?: string[];
  colors?: string[];
  inStock?: boolean;
  rating?: number;
  reviewCount?: number;
};

export type CartItem = Product & {
  _id:  string; // Unique identifier for cart item (can be product ID or a generated ID)
  quantity: number;
  selectedSize?: string;
};

export type Category = {
  id: number;
  name: string;
  gender: "male" | "female" | "unisex";
  image: string;
};


// lib/types.ts  (Add this interface)

export interface OrderItem {
  product?: string;        // Product ID
  name: string;
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
}

export interface Order {
  _id: string;
  orderNumber: string;
  user: string;                    // User ID
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: ShippingAddress;
  paymentMethod: "paystack" | "paypal";
  paymentReference?: string;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  createdAt: string;
  updatedAt?: string;
}

// Optional: Extended version with populated product data
// export interface OrderWithProducts extends Order {
//   items: Array<{
//     product?: {
//       _id: string;
//       name: string;
//       image: string;
//     };
//     name: string;
//     quantity: number;
//     price: number;
//   }>;
// }