export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  sale_price: number | null;
  category_id: number;
  image_url: string;
  badge: string | null; // 'Bán chạy' | 'Mới' | 'Giá tốt' | null
  is_combo: boolean;
  combo_level: string | null; // 'Tiểu học' | 'Cấp 2' | 'Sinh viên'
  stock: number;
  categories?: Category;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  sale_price: number | null;
  image_url: string;
  quantity: number;
}

export interface OrderItem {
  product_id: number;
  name: string;
  qty: number;
  price: number;
}

export interface Order {
  customer_name: string;
  phone: string;
  address: string;
  note?: string;
  payment_method: 'qr' | 'cod';
  total_amount: number;
  items: OrderItem[];
}
