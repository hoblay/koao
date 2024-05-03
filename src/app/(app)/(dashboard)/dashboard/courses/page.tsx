import Avatar from "@/app/components/Avatar/Avatar";
import { Breadcrumb } from "@/app/components/Breadcrumb";
import Button from "@/app/components/Button/Button";
import { Card } from "@/app/components/Card";
import { Dropdown } from "@/app/components/Dropdown";
import { Form } from "@/app/components/Form";
import { Modal } from "@/app/components/Modal";
import Tag from "@/app/components/Tag/Tag";
import { PlusIcon } from "@radix-ui/react-icons";
import {
  IconChevronsDown,
  IconClock,
  IconClockEdit,
  IconDots,
  IconEdit,
  IconEye,
  IconInputAi,
  IconNotebook,
  IconPlus,
  IconPresentation,
  IconSearch,
  IconTable,
  IconTableColumn,
  IconTableOff,
  IconTableRow,
  IconTemperatureSun,
  IconTrash,
  IconWand,
} from "@tabler/icons-react";
import { CoursesViews } from "./_components/CoursesViews";
import { CoursesSidebar } from "./_components/CoursesSideBar";
import { serverClient } from "@/app/_trpc/serverClient";

export default async function Home() {
  const courses = await serverClient.course.getAllbyUser();
  if (!courses) return null;
  return (
    <div className="flex pl-16 border-t border-[#1f1f1f]/10 dark:border-[#363636]">
      <CoursesSidebar />
      <CoursesViews courses={courses} />
    </div>
  );
}
