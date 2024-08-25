import React from "react";
import Link from "next/link";

const Header = ({ rightText = "소원 열매 달기", rightLink = "/" }) => {
  return (
    <div className="bg-[#FF7495] text-white p-4 flex justify-between items-center">
      <h1 className="text-[32px] font-bold">Techeer Tree</h1>
      <Link href={rightLink} passHref legacyBehavior>
        <a className="text-[16px] hover:underline cursor-pointer">
          {rightText}
        </a>
      </Link>
    </div>
  );
};

export default Header;
