"use client";

import Link from "next/link";
import Course from "../components/Course";
import { Search } from "../components/Search/Index";

import { Data } from "../Data/Courses";
import { GearIcon, ExitIcon, BackpackIcon, MixerHorizontalIcon } from "@radix-ui/react-icons";

export default function Home() {
  return (
    <div className="px-9"> 
      
      <div className="pb-5 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {Data.map((course, index) => (
          <>
            <Course
              key={course.name}
              name={course.name}
              price={course.price}
              img={course.img}
              modules={course.modules}
              progress={course.progress}
            />
          </>
        ))}  
      </div>
    </div>
  );
}
