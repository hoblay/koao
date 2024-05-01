import { serverClient } from "@/app/_trpc/serverClient";
import { parseSearchQuery } from "@/utils/parse-search-query";
import CourseResult from "./_components/CourseResult";
import Category from "../_components/Category";
import CourseSection from "../_components/CourseSection";
import { Section } from "@/app/components/Section";
import Course from "../_components/Course";

interface SearchPageProps {
  searchParams: {
    categorySlug: string;
    query: string;
  };
}

export default async function Home({ searchParams }: SearchPageProps) {
  if (!searchParams.query) {
    const categories = await serverClient.category.getAll();
    const courses = await serverClient.course.getAll();
    if (!courses) return null;
    if (!categories) return null;
    return (
      <div className=" py-24 flex flex-col gap-4">
        <Section.Root divider>
          <Section.Title>Pesquise por categoria</Section.Title>

          <Section.Content>
            <div className="flex gap-4 ">
              {categories.map((category, index) => (
                <Category
                  name={category.name}
                  slug={category.slug}
                  id={category.id}
                  key={category.id}
                />
              ))}
            </div>
          </Section.Content>
        </Section.Root>
        <Section.Root>
          <Section.Title>Cursos</Section.Title>

          <Section.Content>
            <div className="grid grid-cols-5 gap-2 ">
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
          </Section.Content>
        </Section.Root>
      </div>
    );
  }

  const courses = await serverClient.course.getBySearch(
    parseSearchQuery(searchParams.query),
  );
  if (!courses) return null;

  return (
    <div className="px-9 py-24 flex flex-col gap-4">
      <h2 className="text-lg py-2 px-2 flex gap-2 items-center">
        Resultados para:{" "}
        <span className="font-semibold text-emerald-300">
          {parseSearchQuery(searchParams.query)}
        </span>
      </h2>
      <div className="flex flex-col gap-4 ">
        {courses.map((course, index) => (
          <>
            <CourseResult
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
          </>
        ))}
      </div>
    </div>
  );
}
