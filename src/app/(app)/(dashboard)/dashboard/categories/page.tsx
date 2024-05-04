import { CategoriesSidebar } from "./_components/CategoriesSideBar";
import { CategoriesViews } from "./_components/CategoriesViews";
import { serverClient } from "@/app/_trpc/serverClient";

export default async function Home() {
  const categories = await serverClient.category.getAll();
  if (!categories) return null;
  return (
    <div className="flex pl-16 border-t border-[#1f1f1f]/10 dark:border-[#363636]">
      <CategoriesSidebar />
      <CategoriesViews categories={categories} />
    </div>
  );
}
