import { IconChevronRight } from "@tabler/icons-react";
import { serverClient } from "@/app/_trpc/serverClient";
import Course from "@/app/components/Course";
import { parseSearchQuery } from "@/utils/parse-search-query";

interface SearchPageProps {
  searchParams: {
    categorySlug: string;
    query: string;
  };
}

export default async function Home({ searchParams }: SearchPageProps) {
  if (!searchParams.query) {
    return null;
  }

  const courses = await serverClient.course.getBySearch(
    parseSearchQuery(searchParams.query),
  );
  if (!courses) return null;
  return (
    <div className="px-9 flex flex-col gap-4">
      <h2 className="text-lg py-2 px-2 flex gap-2 items-center">
        Resultados para:{" "}
        <span className="font-semibold text-emerald-300">
          {parseSearchQuery(searchParams.query)}
        </span>
      </h2>
      <div className="pb-5 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {courses.map((course, index) => (
          <>
            <Course
              key={course.id}
              name={course.title}
              price={0}
              img={`${course.imageUrl}`}
              modules={course.chapters.length}
              progress={0}
              category={course.category ? course.category.name : "Programação"}
              id={course.id}
            />
          </>
        ))}
      </div>
    </div>
  );
}
