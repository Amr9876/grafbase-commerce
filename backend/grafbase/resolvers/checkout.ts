import Stripe from "stripe";

type ProductData = {
  name: string;
  images: string[];
};

type PriceData = {
  currency: string;
  product_data: ProductData;
  unit_amount: number;
};

type LineItem = {
  quantity: number;
  price_data: PriceData;
};

type Input = {
  line_items: LineItem[];
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
  typescript: true,
});

export default async function Resolver(_, { line_items }: Input) {
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items,
    success_url: process.env.BASE_URL + "/success",
    cancel_url: process.env.BASE_URL,
    shipping_address_collection: {
      allowed_countries: [
        "US",
        "EG",
        "AE",
        "JP",
        "EG",
        "IT",
        "ID",
        "GR",
        "FR",
        "PL",
      ],
    },
  });

  return { url: session.url };
}
