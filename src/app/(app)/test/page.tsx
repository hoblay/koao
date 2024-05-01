import SignIn from "@/app/(auth)/signin/page";
import Button from "@/app/components/Button/Button";
import { Modal } from "@/app/components/Modal";
import { Section } from "@/app/components/Section";
import { IconArrowRight } from "@tabler/icons-react";

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
          7 dias grátis e depois 5.000&nbsp;AKZ / mês
        </Section.Content>
      </Section.Root>
    </div>
  );
}
