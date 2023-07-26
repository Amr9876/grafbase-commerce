export type ProductData = {
  name: string;
  images: string[];
};

export type PriceData = {
  currency: string;
  product_data: ProductData;
  unit_amount: number;
};

export type CheckoutLineItem = {
  quantity: number;
  price_data: PriceData;
};
