"use client";

import { AppDispatch, RootState } from "@/store";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt, FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import {
  calculateGrandTotal,
  modifyQuantity,
  removeFromCart,
} from "@/store/cartSlice";
import { useEffect } from "react";
import { checkout } from "@/store/cartSlice";
import { CheckoutLineItem } from "@/types/CheckoutLineItem";

export default function CartPage() {
  const { cartItems, shippingTotal, grandTotal, checkoutLoading } = useSelector(
    (state: RootState) => state.cart
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(calculateGrandTotal());
  }, [cartItems, dispatch]);

  if (cartItems.length === 0)
    return (
      <h1 className="text-center mt-12 text-3xl font-bold">
        Your cart is empty
      </h1>
    );

  const handlePayment = () => {
    const line_items: CheckoutLineItem[] = cartItems.map((item) => ({
      quantity: item.node.quantity,
      price_data: {
        currency: "USD",
        unit_amount: item.node.price,
        product_data: {
          name: item.node.name,
          images: [item.node.imageUrl],
        },
      },
    }));

    dispatch(checkout({ line_items }));
  };

  return (
    <main className="flex flex-col min-h-screen justify-start w-full pt-12">
      <div className="flex flex-col items-center w-[90%]">
        <div className="flex flex-row w-full items-center justify-between gap-x-12">
          <div></div>
          <div>Name</div>
          <div>Price</div>
          <div>Quantity</div>
          <div>Total Price</div>
          <div></div>
        </div>
        <div className="flex flex-col w-full mt-8 justify-center items-center gap-y-12">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-row justify-between items-center w-[100%]"
            >
              <div className="ml-4 -mr-20">
                <Image
                  src={item.node.imageUrl}
                  width={75}
                  height={75}
                  className="w-[75px] h-[75px] bg-[#eee] p-3 rounded-lg"
                  alt={item.node.name}
                />
              </div>
              <div>{item.node.name}</div>
              <div>${item.node.price}</div>
              <div className="flex">
                <FaMinusSquare
                  size={30}
                  className="text-rose-500 cursor-pointer"
                  onClick={() =>
                    dispatch(
                      modifyQuantity({
                        type: "substract",
                        name: item.node.name,
                      })
                    )
                  }
                />
                <h1 className="text-2xl font-bold select-none mx-6">
                  {item.node.quantity}
                </h1>
                <FaPlusSquare
                  size={30}
                  className="text-emerald-500 cursor-pointer"
                  onClick={() =>
                    dispatch(
                      modifyQuantity({ type: "add", name: item.node.name })
                    )
                  }
                />
              </div>
              <div className="text-emerald-500">
                ${item.node.price * item.node.quantity}
              </div>
              <div>
                <FaTrashAlt
                  size={30}
                  className="text-rose-500 cursor-pointer"
                  onClick={() =>
                    dispatch(removeFromCart({ name: item.node.name }))
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-row items-center justify-between w-[90%] mx-auto mt-36">
        <h1 className="text-lg font-bold">Shipping Total</h1>
        <h1 className="text-lg">${shippingTotal.toFixed(2)}</h1>
      </div>

      <div className="flex flex-row items-center justify-between w-[90%] mx-auto mt-4">
        <h1 className="text-lg font-bold">Items Total</h1>
        <h1 className="text-lg">${(grandTotal - shippingTotal).toFixed(2)}</h1>
      </div>

      <div className="w-[90%] h-[5px] mx-auto my-4 border-t-8 border-t-emerald-500 border-dashed" />

      <div className="flex flex-row items-center justify-between w-[90%] mx-auto">
        <h1 className="text-2xl text-emerald-500 font-bold">Total Price</h1>
        <h1 className="text-2xl text-emerald-500 font-bold">
          ${grandTotal.toFixed(2)}
        </h1>
      </div>

      <button
        disabled={checkoutLoading}
        onClick={handlePayment}
        className={`${
          checkoutLoading && "opacity-50"
        } mx-auto my-12 bg-emerald-500 rounded-lg px-20 py-6 font-bold text-xl text-white`}
      >
        Pay Now
      </button>
    </main>
  );
}
