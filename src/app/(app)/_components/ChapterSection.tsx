"use client";
import React from "react";
import Slider from "react-slick";
import Lesson from "./Lesson";

function ChapterSection({
  courseId,
  courseImage,
  lessons,
  title,
  tag,
  category,
}: {
  courseId?: string | null;
  courseImage: string;
  category?: string;
  lessons: any[];
  title: string;
  tag?: string | null;
}) {
  if (!lessons.length) {
    return null;
  }
  const settings = {
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className="flex flex-col gap-4 px-9 pb-4">
      <h2 className=" text-[17px] font-semibold flex gap-2 items-center">
        {title}
      </h2>
      {lessons.length > 5 ? (
        <div className="border-[#1f1f1f]/10 dark:border-[#363636] border-b-2 ">
          <Slider {...settings}>
            {lessons.map((lesson, index) => (
              <Lesson
                key={lesson.id}
                title={lesson.title}
                tag={tag}
                index={index + 1}
                progress={0}
                description={lesson.description}
                id={lesson.id}
                courseId={courseId}
                duration={lesson?.video?.duration}
                courseImage={courseImage}
                category={category}
              />
            ))}
          </Slider>
        </div>
      ) : (
        <div className="grid grid-cols-5 border-[#1f1f1f]/10 dark:border-[#363636] border-b-2 ">
          {lessons.map((lesson, index) => (
            <Lesson
              key={lesson.id}
              title={lesson.title}
              tag={tag}
              progress={0}
              index={index + 1}
              description={lesson.description}
              id={lesson.id}
              courseId={courseId}
              duration={lesson?.video?.duration}
              courseImage={courseImage}
              category={category}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ChapterSection;
