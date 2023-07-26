import Image from "next/image";
import React from "react";

function Hero() {
  return (
    <section className="py-20 flex md:flex-row flex-col justify-between min-h-screen w-full">
      <div className="z-10">
        <h1 className="md:text-6xl text-4xl select-none font-bold w-[36rem] mb-[1rem] md:leading-[5rem] leading-[2.5rem]">
          your one-stop destination for all your electronics needs.
        </h1>
        <p className="md:text-2xl text-lg select-none opacity-50 md:w-[36rem] w-[30rem]">
          Whether you are looking for the latest gadgets, the best deals, or the
          most reliable service, we have you covered.
        </p>
      </div>
      <div className="absolute left-1/3 top-1/2 bg-emerald-500 w-[24rem] h-[18rem] z-0 blur-[18rem]" />
      <Image
        src="/hero_section.png"
        width={260}
        height={260}
        alt="hero animation"
        className="md:w-[660px] w-full h-[460px] mr-[6rem] z-10"
        priority
      />
    </section>
  );
}

export default Hero;
