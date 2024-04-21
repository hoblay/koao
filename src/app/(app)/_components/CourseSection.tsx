"use client";
import { trpc } from "@/app/_trpc/client";
import Course from "@/app/components/Course";
import { Course as Coors } from "@prisma/client";
import React from "react";
import Slider from "react-slick";

function CourseSection({ courses, title }: { courses: any[]; title: string }) {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
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
      <div className=" border-[#363636] border-b-2">
        <Slider {...settings}>
          {courses.map((course, index) => (
            <Course
              key={course.id}
              name={course.title}
              price={0}
              img={`${course.imageUrl}`}
              modules={course.chapters.length}
              progress={0}
              description={course.description}
              category={course.category ? course.category.name : "Programação"}
              id={course.id}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default CourseSection;
