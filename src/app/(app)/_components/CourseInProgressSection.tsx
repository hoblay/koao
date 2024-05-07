"use client";
import React from "react";
import Slider from "react-slick";
import CourseInProgress from "./CourseInProgress";
import { useSession } from "next-auth/react";
import { trpc } from "@/app/_trpc/client";
import { Section } from "@/app/components/Section";

function CourseInProgressSection({
  title,
  subtitle,
  divider,
  sliderOff,
}: {
  title: string;
  divider?: boolean;
  subtitle?: string;
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
    <Section.Root divider={divider && true}>
      <div>
        <Section.Title> {title}</Section.Title>
        <Section.Subtitle>{subtitle}</Section.Subtitle>
      </div>
      <Section.Content>
        {!sliderOff && courses.length > 3 ? (
          <div className="">
            <Slider {...settings}>
              {courses.map((course, index) => (
                <CourseInProgress
                  key={course.id}
                  name={course.title}
                  price={0}
                  img={`${course.imageUrl}`}
                  modules={course.chapters.length}
                  description={course.description}
                  tag={course.tag || "cook"}
                  id={course.id}
                />
              ))}
            </Slider>
          </div>
        ) : (
          <div className="grid grid-cols-3 ">
            {courses.map((course, index) => (
              <CourseInProgress
                key={course.id}
                name={course.title}
                price={0}
                img={`${course.imageUrl}`}
                modules={course.chapters.length}
                description={course.description}
                tag={course.tag || "art"}
                id={course.id}
              />
            ))}
          </div>
        )}
      </Section.Content>
    </Section.Root>
  );
}

export default CourseInProgressSection;
