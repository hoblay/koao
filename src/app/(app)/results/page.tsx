import { serverClient } from "@/app/_trpc/serverClient";
import { parseSearchQuery } from "@/utils/parse-search-query";
import CourseResult from "./_components/CourseResult";

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
