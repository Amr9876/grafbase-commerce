"use client";

import Hero from "@/components/Hero";
import Products from "@/components/Products";
import { AppDispatch, RootState } from "@/store";
import { fetchProducts } from "@/store/productsSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const { products } = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (products.length > 0) return;

    dispatch(fetchProducts());
  }, []);

  return (
    <main className="flex flex-col min-h-screen p-[6rem]">
      <Hero />

      <h1 className="font-bold text-4xl -mb-12">Recommended Products</h1>
      <Products products={products} />

      <div className="bg-emerald-500 w-[350px] h-[350px] absolute top-[85rem] right-[10rem] z-0 blur-[20rem] " />

      <h1 id="products" className="font-bold text-4xl -mb-12 mt-36">
        Latest Products
      </h1>
      <Products products={products} isLarge />

      <div className="bg-emerald-500 w-[350px] h-[350px] absolute top-[150rem] left-[10rem] z-0 blur-[24rem] " />
    </main>
  );
}
