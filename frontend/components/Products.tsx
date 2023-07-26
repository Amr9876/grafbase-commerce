"use client";

import { addToCart } from "@/store/cartSlice";
import Product from "@/types/Product";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

function Products({
  isLarge = false,
  products,
}: {
  isLarge?: boolean;
  products: Product[];
}) {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <div
      className={`flex flex-wrap md:justify-start justify-center gap-y-36 gap-x-12 py-20 w-full z-10`}
    >
      {products.map((product) => (
        <div
          key={product.node.id}
          className={`${
            isLarge
              ? "basis-[250px]"
              : "basis-[200px] hover:-translate-y-[1.5rem]"
          } flex flex-col transition-all duration-200 flex-grow`}
        >
          <Image
            src={product.node.imageUrl}
            width={150}
            height={150}
            className="object-contain w-full h-full rounded-lg bg-[#eee] p-6 cursor-pointer"
            alt="product image"
            onClick={() =>
              router.push(`/product/${product.node.id.split("_")[1]}`)
            }
          />
          <h1 className="text-xl font-bold capitalize mt-3 select-none">
            {product.node.name}
          </h1>
          <div className="flex flex-row justify-between items-center w-full">
            <p className="text-emerald-500 font-medium select-none">
              ${product.node.price}
            </p>
            <p
              className={`${
                product.node.stock === 0 && "text-rose-500"
              } font-light select-none`}
            >
              {product.node.stock === 0
                ? "Out of Stock"
                : `${product.node.stock} ${
                    product.node.stock > 1 ? "Stocks" : "Stock"
                  }`}
            </p>
          </div>
          {isLarge && (
            <button
              onClick={() => dispatch(addToCart({ product, quantity: 1 }))}
              className="p-3 my-3 bg-emerald-500 w-full h-[3rem] font-bold text-white rounded-lg"
            >
              Add To Cart
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Products;
