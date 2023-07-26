export type OrderItem = {
  name: string;
  lineTotal: number;
  itemTotal: number;
  quantity: number;
};

export type Order = {
  items: OrderItem[];
  shippingTotal: number;
  grandTotal: number;
  currency: string;
};
