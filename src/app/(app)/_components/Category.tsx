import Link from "next/link";
import React from "react";

import CategoryIcon from "@/app/components/ClassContent/_components/CategoryIcon";

interface CategoryProps {
  className?: string;
  slug: string;
  name: string;
  id: string;
}

function Category({ className, id, slug, name }: CategoryProps) {
  return (
    <Link href={`/${slug}`}>
      <div className="relative flex py-10 px-20 min-w-[255.45px] min-h-[144px] bg-[#1a6f56]  dark:bg-[#00261b] dark:hover:bg-[#013928] transition-colors duration-300 ease-in-out rounded-xl shadow-xl">
        <div className="absolute top-0 left-0 p-4 justify-between font-semibold text-[#99bfb4] drop-shadow-2xl leading-none ">
          <CategoryIcon name={name} />
        </div>
        <div className="absolute bottom-0 left-0">
          <span className="flex text-[28px] px-4 py-4 font-semibold text-[#99bfb4] drop-shadow-2xl leading-none ">
            {name}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default Category;
