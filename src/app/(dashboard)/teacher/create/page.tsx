import Tag from "@/app/components/Tag/Tag";
import { PlusIcon } from "@radix-ui/react-icons";
import { IconDots } from "@tabler/icons-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="px-9"> 
           
 
      <div className="px-16 py-8">
        <div className="flex gap-3">
        <h2 className="text-xl">Cursos</h2>
          <Link href="/teacher/create"><Tag  name="Criar novo curso " startContent={<PlusIcon className="w-5 h-5 text-zinc-500 dark:text-zinc-400"/>}/></Link>
        </div>
        
      </div>
    </div>
  );
}
