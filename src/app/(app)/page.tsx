import { serverClient } from "../_trpc/serverClient";
import CourseSection from "./_components/CourseSection";

import CourseHeading from "./_components/CourseHeading";
import CategoryIcon from "../components/ClassContent/_components/CategoryIcon";

export default async function Home() {
  const courses = await serverClient.course.getAll();
  if (!courses) return null;
  const recomended = await serverClient.course.getAll();
  const categories = await serverClient.category.getAll();
  if (!categories) return null;
  if (!recomended) return null;
  recomended.pop();
  return (
    <div className=" pt-[78px] flex flex-col gap-4">
      <CourseHeading
        title={courses[courses.length - 1].title}
        modules={courses[courses.length - 1].chapters.length}
        category={courses[courses.length - 1].category?.name}
        description={courses[courses.length - 1].description}
        image={courses[courses.length - 1].cover}
        id={courses[courses.length - 1].id}
        tag={courses[courses.length - 1].tag}
        lessonId={courses[courses.length - 1].chapters[0].lessons[0].id}
        author={courses[courses.length - 1].author.name}
      />
      <div className="flex flex-col px-9 gap-4 ">
        <h2 className=" text-[17px] font-semibold flex gap-2 items-center">
          Pesquise por categoria
        </h2>
        <div className="flex gap-4 border-[#1f1f1f]/10 dark:border-[#363636] border-b-2 pb-6">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="relative flex py-10 px-20 min-w-[255.45px] min-h-[144px] bg-[#1a6f56]  dark:bg-[#00261b] rounded-xl shadow-xl"
            >
              <div className="absolute top-0 left-0 p-4 justify-between font-semibold text-[#99bfb4] drop-shadow-2xl leading-none ">
                <CategoryIcon name={category.name} />
              </div>
              <div className="absolute bottom-0 left-0">
                <span className="flex text-[28px] px-4 py-4 font-semibold text-[#99bfb4] drop-shadow-2xl leading-none ">
                  {category.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <CourseSection title="Cursos recomendados" courses={recomended} />
      <CourseSection title="Cursos da casa" courses={recomended.toReversed()} />
    </div>
  );
}
