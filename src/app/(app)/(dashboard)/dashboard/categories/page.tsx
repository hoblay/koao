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
import { CategoriesSidebar } from "./_components/CategoriesSideBar";
import { CategoriesViews } from "./_components/CategoriesViews";

export default function Home() {
  const arr = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 9, 7, 5, 4, 3, 2, 4, 5, 62, 45, 6, 2, 2,
  ];
  return (
    <div className="flex pl-16 border-t border-[#1f1f1f]/10 dark:border-[#363636]">
      <CategoriesSidebar />
      <CategoriesViews courses={arr} />
    </div>
  );
}
