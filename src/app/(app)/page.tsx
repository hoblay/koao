import { serverClient } from "../_trpc/serverClient";
import CourseSection from "./_components/CourseSection";

import CourseHeading from "./_components/CourseHeading";

export default async function Home() {
  const courses = await serverClient.course.getAll();
  if (!courses) return null;
  const recomended = await serverClient.course.getAll();
  if (!recomended) return null;
  recomended.pop();
  return (
    <div className=" pt-[78px] flex flex-col gap-4">
      <CourseHeading
        title={courses[courses.length - 1].title}
        modules={courses[courses.length - 1].chapters.length}
        category={courses[courses.length - 1].category?.name}
        description={courses[courses.length - 1].description}
        image={courses[courses.length - 1].imageUrl}
        id={courses[courses.length - 1].id}
        lessonId={courses[courses.length - 1].chapters[0].lessons[0].id}
        author={courses[courses.length - 1].author.name}
      />
      <CourseSection title="Cursos recomendados" courses={recomended} />
      <CourseSection title="Cursos da casa" courses={recomended.toReversed()} />
    </div>
  );
}
