"use client";

import useLocalStorage from "@/hooks/useLocalStorage";
import { RootState } from "@/store";
import { initializeCart } from "@/store/cartSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

function Navbar() {
  const router = useRouter();
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const cartString = useLocalStorage("cart", "");
  const numberOfItems = cartItems.reduce(
    (prev, current) => prev + current.node.quantity,
    0
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeCart());
  }, [cartString]);

  return (
    <div className="w-full flex flex-row items-center justify-between backdrop-blur-lg m-0 p-6 top-0 shadow-lg z-20">
      <h1
        onClick={() => router.push("/")}
        className="text-3xl select-none cursor-pointer italic font-bold"
      >
        Grafbase Ecom
      </h1>
      <ul className="md:flex hidden flex-row gap-x-6">
        <li>
          <a
            href="/"
            className="text-lg decoration-transparent font-medium text-[#aaa] cursor-pointer"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="/#products"
            className="text-lg decoration-transparent font-medium text-[#aaa] cursor-pointer"
          >
            Products
          </a>
        </li>
        <li>
          <a
            href="/orders"
            className="text-lg font-medium decoration-transparent text-[#aaa] cursor-pointer"
          >
            My Orders
          </a>
        </li>
        <li>
          <a
            href="/"
            className="text-lg font-medium decoration-transparent text-[#aaa] cursor-pointer"
          >
            About
          </a>
        </li>
      </ul>
      <div className="cursor-pointer" onClick={() => router.push("/cart")}>
        <FaShoppingCart
          size={32}
          className="text-emerald-500 mr-12 z-0 absolute"
        />
        <div className="p-4 w-[2.5px] h-[2.5px] z-20 -mt-5 ml-4 self-end flex justify-center items-center bg-[#eee] rounded-full text-emerald-500 font-bold select-none">
          {numberOfItems}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
