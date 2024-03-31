

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Course from "../components/Course";

import { Data } from "../Data/Courses";


export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session)
  return (
    <div className="px-9"> 
      
      <div className="pb-5 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {Data.map((course, index) => (
          <>
            <Course
              key={course.name+ ' '+ course.progress + ' '+ course.category}
              name={course.name}
              price={course.price}
              img={course.img}
              modules={course.modules}
              progress={course.progress}
              category={course.category}
            />
          </>
        ))}  
      </div>
    </div>
  );
}
