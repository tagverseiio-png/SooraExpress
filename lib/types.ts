export type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
  stock: number;
  status: string;
  margin?: number;
  rating?: number;
  reviews?: number;
  category: string;
  volume: string;
  abv: string;
  desc: string;
  image: string;
  tags: string[];
  time: string;
};

export type Address = {
  id: number;
  type: string;
  text: string;
  isDefault: boolean;
};

export type Order = {
  id: string;
  date: string;
  total: number;
  items: string;
  status: string;
};

export type User = {
  name: string;
  phone: string;
  email: string;
  tier: string;
  addresses: Address[];
  orders: Order[];
};
