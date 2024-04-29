"use client";
import React from "react";
import Slider from "react-slick";
import Course from "./Course";
import { Section } from "@/app/components/Section";

function CourseSection({
  courses,
  title,
  sliderOff,
  divider,
  subtitle,
}: {
  courses: any[];
  title: string;
  subtitle?: string;
  sliderOff?: boolean;
  divider?: boolean;
}) {
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
    <Section.Root divider={divider && true}>
      <div>
        <Section.Title> {title}</Section.Title>
        <Section.Subtitle>{subtitle}</Section.Subtitle>
      </div>
      <Section.Content>
        {!sliderOff ? (
          <div className="">
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
                  category={
                    course.category ? course.category.name : "Sem categoria"
                  }
                  id={course.id}
                />
              ))}
            </Slider>
          </div>
        ) : (
          <div className="grid grid-cols-4 ">
            {courses.map((course, index) => (
              <Course
                key={course.id}
                name={course.title}
                price={0}
                img={`${course.imageUrl}`}
                modules={course.chapters.length}
                progress={0}
                description={course.description}
                category={
                  course.category ? course.category.name : "Sem categoria"
                }
                id={course.id}
              />
            ))}
          </div>
        )}
      </Section.Content>
    </Section.Root>
  );
}

export default CourseSection;
