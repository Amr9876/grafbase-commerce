"use client";

import { AppDispatch, RootState } from "@/store";
import { fetchProducts } from "@/store/productsSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlusSquare, FaMinusSquare } from "react-icons/fa";
import { addToCart, checkout } from "@/store/cartSlice";
import { toast } from "react-toastify";

export default function ProductPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1);

  const { products } = useSelector((state: RootState) => state.products);
  const { checkoutLoading } = useSelector((state: RootState) => state.cart);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });

    if (products.length > 0) return;

    dispatch(fetchProducts());
  }, []);

  const product = products.find(
    (product) => product.node.id === `product_${params.id}`
  );

  if (!product) return;

  const modifyQuantity = (type: "add" | "substract") => {
    switch (type) {
      case "add":
        if (quantity >= product.node.stock) {
          toast.error("Out Of Stock");
          break;
        }
        setQuantity((prev) => prev + 1);
        break;
      case "substract":
        if (quantity === 0) break;
        setQuantity((prev) => prev - 1);
        break;
      default:
        break;
    }
  };

  const handleBuyNow = () => {
    dispatch(addToCart({ product, quantity }));
    dispatch(
      checkout({
        line_items: [
          {
            quantity,
            price_data: {
              currency: "USD",
              unit_amount: product.node.price,
              product_data: {
                name: product.node.name,
                images: [product.node.imageUrl],
              },
            },
          },
        ],
      })
    );
  };

  return (
    <main className="min-h-screen flex flex-row items-center justify-center">
      <div className="flex flex-row justify-center w-full gap-x-24">
        <Image
          src={product.node.imageUrl}
          width={350}
          height={350}
          className="w-[350px] h-[350px] bg-[#eee] p-4 rounded-lg"
          alt={product.node.name}
        />

        <div className="flex flex-col self-center">
          <h1 className="text-3xl font-bold capitalize mt-3">
            {product.node.name}
          </h1>
          <p className="font-medium opacity-50 mt-3 w-[400px]">
            {product.node.description}
          </p>
          <h1 className="text-3xl font-bold text-emerald-500 mt-3">
            ${product.node.price.toFixed(2)}
          </h1>
          <p
            className={`${
              product.node.stock === 0 && "text-rose-500"
            } font-bold my-3`}
          >
            {product.node.stock === 0
              ? "Out of Stock"
              : `${product.node.stock} ${
                  product.node.stock > 1 ? "Stocks" : "Stock"
                }`}
          </p>

          {product.node.stock === 0 || (
            <>
              <div className="flex flex-row gap-x-6">
                <FaMinusSquare
                  size={30}
                  className="text-rose-500 cursor-pointer"
                  onClick={() => modifyQuantity("substract")}
                />
                <h1 className="text-2xl font-bold select-none">{quantity}</h1>
                <FaPlusSquare
                  size={30}
                  className="text-emerald-500 cursor-pointer"
                  onClick={() => modifyQuantity("add")}
                />
              </div>

              <div className="flex flex-row gap-x-6">
                <button
                  disabled={checkoutLoading}
                  onClick={handleBuyNow}
                  className={`${
                    checkoutLoading && "opacity-50"
                  } flex flex-1 justify-center items-center p-3 my-3 bg-emerald-500 h-[3rem] font-bold text-white select-none`}
                >
                  Buy Now
                </button>
                <button
                  disabled={checkoutLoading}
                  onClick={() => dispatch(addToCart({ product, quantity }))}
                  className={`${
                    checkoutLoading && "opacity-50"
                  } flex flex-1 justify-center items-center p-3 my-3 border-2 border-emerald-500 h-[3rem] text-emerald-500 font-bold select-none`}
                >
                  Add To Cart
                </button>
              </div>
            </>
          )}

          <button
            onClick={router.back}
            className="bg-transparent text-md font-bold mt-6 self-start select-none"
          >
            Go Back
          </button>
        </div>
      </div>
    </main>
  );
}
