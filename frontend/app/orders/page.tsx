"use client";

import { Order } from "@/types/Order";
import Image from "next/image";
import { useEffect, useState } from "react";

function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const ordersString = localStorage.getItem("orders");

    if (ordersString) {
      setOrders(JSON.parse(ordersString));
    }
  }, []);

  if (orders.length === 0)
    return (
      <h1 className="text-center mt-12 text-3xl font-bold">
        You don't have any orders yet.
      </h1>
    );

  return (
    <main className="flex flex-col min-h-screen justify-start w-full pt-12">
      {orders.map((order, index) => (
        <div className="my-16 px-12">
          <h1 className="text-4xl ">Order #{index + 1}</h1>

          <div className="flex flex-col items-center w-[90%]">
            <div className="flex flex-row w-full items-center justify-between gap-x-12">
              <div></div>
              <div>Name</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Total Price</div>
            </div>
            <div className="flex flex-col w-full mt-8 justify-center items-center gap-y-12">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row justify-between items-center w-[100%]"
                >
                  <div className="-mr-24">
                    <Image
                      src={`http://localhost:3000/${item.name.toLowerCase()}.png`}
                      width={75}
                      height={75}
                      className="w-[75px] h-[75px] bg-[#eee] p-3 rounded-lg"
                      alt={item.name}
                    />
                  </div>
                  <div>{item.name}</div>
                  <div>${item.itemTotal}</div>
                  <div className="flex">
                    <h1 className="text-2xl font-bold select-none mx-6">
                      {item.quantity}
                    </h1>
                  </div>
                  <div className="text-emerald-500">${item.lineTotal}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </main>
  );
}

export default OrdersPage;
