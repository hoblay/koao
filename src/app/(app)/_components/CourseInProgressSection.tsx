"use client";
import React from "react";
import Slider from "react-slick";
import CourseInProgress from "./CourseInProgress";
import { useSession } from "next-auth/react";
import { trpc } from "@/app/_trpc/client";

function CourseInProgressSection({
  title,
  sliderOff,
}: {
  title: string;
  sliderOff?: boolean;
}) {
  const { data: session, status } = useSession();

  const userCourses = trpc.course.getLastWatch.useQuery();
  const courses = userCourses.data;
  if (!session?.user || !courses?.length) {
    return null;
  }
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="flex flex-col gap-4 px-9">
      <h2 className=" text-[17px] font-semibold flex gap-2 items-center">
        {title}
      </h2>
      {!sliderOff && courses.length > 6 ? (
        <div className="border-[#1f1f1f]/10 dark:border-[#363636] border-b-2">
          <Slider {...settings}>
            {courses.map((course, index) => (
              <CourseInProgress
                key={course.id}
                name={course.title}
                price={0}
                img={`${course.imageUrl}`}
                modules={course.chapters.length}
                progress={0}
                description={course.description}
                tag={course.tag || "art"}
                id={course.id}
              />
            ))}
          </Slider>
        </div>
      ) : (
        <div className="grid grid-cols-3 border-[#1f1f1f]/10 dark:border-[#363636] border-b-2">
          {courses.map((course, index) => (
            <CourseInProgress
              key={course.id}
              name={course.title}
              price={0}
              img={`${course.imageUrl}`}
              modules={course.chapters.length}
              progress={0}
              description={course.description}
              tag={course.tag || "art"}
              id={course.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CourseInProgressSection;
