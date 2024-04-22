"use client";
import React from "react";
import Slider from "react-slick";
import Lesson from "./Lesson";

function ChapterSection({
  courseId,
  lessons,
  title,
  tag,
}: {
  courseId?: string | null;
  lessons: any[];
  title: string;
  tag?: string | null;
}) {
  const settings = {
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
      {lessons.length > 3 ? (
        <div className="border-[#1f1f1f]/10 dark:border-[#363636] border-b-2 ">
          <Slider {...settings}>
            {lessons.map((lesson) => (
              <Lesson
                key={lesson.id}
                title={lesson.title}
                tag={tag}
                progress={0}
                description={lesson.description}
                id={lesson.id}
                courseId={courseId}
                duration={lesson?.video?.duration}
              />
            ))}
          </Slider>
        </div>
      ) : (
        <div className="grid grid-cols-3 border-[#1f1f1f]/10 dark:border-[#363636] border-b-2 ">
          {lessons.map((lesson, index) => (
            <Lesson
              key={lesson.id}
              title={lesson.title}
              tag={tag}
              progress={0}
              description={lesson.description}
              id={lesson.id}
              courseId={courseId}
              duration={lesson?.video?.duration}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ChapterSection;
