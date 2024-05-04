import SignIn from "@/app/(auth)/signin/page";
import Button from "@/app/components/Button/Button";
import { Modal } from "@/app/components/Modal";
import { Section } from "@/app/components/Section";
import Tag from "@/app/components/Tag/Tag";
import {
  IconArrowRight,
  IconAuth2fa,
  IconEdit,
  IconEditCircle,
  IconMail,
  IconTrash,
} from "@tabler/icons-react";

export default async function Home() {
  return (
    <div className=" pt-[78px] flex flex-col gap-6">
      <Section.Root divider>
        <div>
          <Section.Title>Cursos Recomendados</Section.Title>
          <Section.Subtitle>
            7 dias grátis e depois 5.000&nbsp;AKZ / mês
          </Section.Subtitle>
        </div>
        <Section.Content>
          <div className="flex p-4 gap-4 ">
            <Tag
              name="Adicionar mudanças"
              startContent={
                <IconEditCircle className="text-zinc-500 dark:text-zinc-300 w-5 h-5" />
              }
            />
            <Tag
              name="Editar"
              startContent={
                <IconEdit className="text-zinc-500 dark:text-zinc-300 dark:group-hover:text-white w-5 h-5" />
              }
            />
            <Tag
              name="Eliminar"
              color="danger"
              startContent={
                <IconTrash className="text-red-500 group-hover:text-white w-5 h-5" />
              }
            />
            <Tag
              name="Atualizar email"
              color="warning"
              startContent={
                <IconMail className="text-amber-500 group-hover:text-white w-5 h-5" />
              }
            />
            <Tag
              name="Adicionar autentificação"
              color="success"
              startContent={
                <IconAuth2fa className="text-emerald-500 group-hover:text-white w-5 h-5" />
              }
            />
          </div>
        </Section.Content>
      </Section.Root>
    </div>
  );
}
