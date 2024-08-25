import React from "react";
import Image from "next/image";

interface WishFruitProps {
  title: string;
}

const WishFruit: React.FC<WishFruitProps> = ({ title }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-24 h-24 relative">
        <Image
          src="/fruit.png"
          alt="Wish Fruit"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <p className="mt-2 text-center font-medium text-black text-[20px] max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
        {title}
      </p>
    </div>
  );
};

export default WishFruit;
