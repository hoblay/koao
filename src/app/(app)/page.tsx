"use client"

import { IconNotebook, IconPlayerPlay, IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import { trpc } from "../_trpc/client";
import Course from "../components/Course";
import Tag from "../components/Tag/Tag";

import { Data } from "../Data/Courses"
import Image from "next/image";


export default function Home() {
  const courses = trpc.course.getAllbyUser.useQuery()
  if(!courses.data) return null
  return (
    <div className="px-9 flex flex-col gap-4"> 
      
      <h2 className="text-lg py-2 px-2 flex gap-2 items-center">Cursos recomendados <IconChevronRight className="w-4 h-4"/></h2>
      <div className="pb-5 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">

        
        {courses.data.map((course, index) => (
          <>
            <Course
              key={course.id}
              name={course.title}
              price={0}
              img={`${course.imageUrl}`}
              modules={course.chapters.length}
              progress={0}
              category={'Design'}
              id={course.id}
            />
          </>
        ))}  
      </div>
    </div>
  );
}
