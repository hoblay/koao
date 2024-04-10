"use client"

import { trpc } from "../_trpc/client";
import Course from "../components/Course";

import { Data } from "../Data/Courses"


export default function Home() {
  const courses = trpc.course.getAllbyUser.useQuery()
  if(!courses.data) return null
  return (
    <div className="px-9"> 
           
 
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
