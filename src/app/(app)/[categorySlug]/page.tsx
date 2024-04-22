import { serverClient } from "@/app/_trpc/serverClient";
import CategoryIcon from "@/app/components/ClassContent/_components/CategoryIcon";
import CourseSection from "../_components/CourseSection";
import Link from "next/link";
import Category from "../_components/Category";

export default async function Home({
  params,
}: {
  params: {
    categorySlug: string;
  };
}) {
  const currentCategory = await serverClient.category.getBySlug(
    params.categorySlug,
  );
  if (!currentCategory) return null;
  const courses = await serverClient.category.getCoursesByCategory(
    currentCategory.id,
  );
  if (!courses) return null;
  const categories = await serverClient.category.getAll();
  if (!categories) return null;
  return (
    <div className=" pt-[78px] flex flex-col gap-4">
      <div className="flex flex-col px-9 gap-4 ">
        <h2 className=" text-[17px] font-semibold flex gap-2 items-center">
          Pesquise por categoria
        </h2>
        <div className="flex gap-4 border-[#1f1f1f]/10 dark:border-[#363636] border-b-2 pb-6">
          {categories.map((category, index) => (
            <Category
              name={category.name}
              slug={category.slug}
              id={category.id}
              key={category.id}
            />
          ))}
        </div>
      </div>
      {courses.length > 0 ? (
        <CourseSection
          title={currentCategory.name}
          sliderOff
          courses={courses}
        />
      ) : (
        <div className="flex flex-col gap-4 px-9 pb-4">
          <h2 className=" text-[17px] font-semibold flex gap-2 items-center">
            Não foram encontrados resultados
          </h2>
        </div>
      )}
    </div>
  );
}
