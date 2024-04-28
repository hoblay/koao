import SignIn from "@/app/(auth)/signin/page";
import Button from "@/app/components/Button/Button";
import { Modal } from "@/app/components/Modal";
import { Section } from "@/app/components/Section";
import { IconArrowRight } from "@tabler/icons-react";

export default async function Home() {
  return (
    <div className=" pt-[78px] flex flex-col gap-6">
      <Modal.Root>
        <Modal.Trigger>
          <div className="flex gap-4 justify-center items-center px-20 py-36 ">
            <Button
              subtitle="7 dias grátis e depois 5.000&nbsp;AKZ / mês"
              size="xs"
            >
              Button xs
              <IconArrowRight className="size-4 " />
            </Button>
            <Button
              subtitle="7 dias grátis e depois 5.000&nbsp;AKZ / mês"
              size="sm"
            >
              Button sm
              <IconArrowRight />
            </Button>
            <Button
              subtitle="7 dias grátis e depois 5.000&nbsp;AKZ / mês"
              size="md"
            >
              Button md
              <IconArrowRight />
            </Button>
            <Button
              subtitle="7 dias grátis e depois 5.000&nbsp;AKZ / mês"
              size="lg"
            >
              Continuar
              <IconArrowRight />
            </Button>
            <Button
              subtitle="7 dias grátis e depois 5.000&nbsp;AKZ / mês"
              size="xl"
            >
              <IconArrowRight />
              Button xl
            </Button>
          </div>
        </Modal.Trigger>
        <Modal.Content className="h-full">
          <Button
            subtitle="7 dias grátis e depois 5.000&nbsp;AKZ / mês"
            size="lg"
          >
            Continuar
            <IconArrowRight />
          </Button>
        </Modal.Content>
      </Modal.Root>

      <Section.Root divider>
        <div>
          <Section.Title>Cursos Recomendados</Section.Title>
          <Section.Subtitle>
            7 dias grátis e depois 5.000&nbsp;AKZ / mês
          </Section.Subtitle>
        </div>
        <Section.Content>
          <Button
            subtitle="7 dias grátis e depois 5.000&nbsp;AKZ / mês"
            size="md"
          >
            Continuar
            <IconArrowRight />
          </Button>
        </Section.Content>
      </Section.Root>
      <Section.Root divider>
        <div>
          <Section.Title>Cursos Recomendados</Section.Title>
          <Section.Subtitle>
            7 dias grátis e depois 5.000&nbsp;AKZ / mês
          </Section.Subtitle>
        </div>
        <Section.Content>
          <Button
            subtitle="7 dias grátis e depois 5.000&nbsp;AKZ / mês"
            size="md"
          >
            Continuar
            <IconArrowRight />
          </Button>
        </Section.Content>
      </Section.Root>
      <Section.Root divider>
        <div>
          <Section.Title>Cursos Recomendados</Section.Title>
          <Section.Subtitle>
            7 dias grátis e depois 5.000&nbsp;AKZ / mês
          </Section.Subtitle>
        </div>
        <Section.Content>
          <Button
            subtitle="7 dias grátis e depois 5.000&nbsp;AKZ / mês"
            size="md"
          >
            Continuar
            <IconArrowRight />
          </Button>
        </Section.Content>
      </Section.Root>
      <Section.Root>
        <div>
          <Section.Title>Cursos Recomendados</Section.Title>
          <Section.Subtitle>
            7 dias grátis e depois 5.000&nbsp;AKZ / mês
          </Section.Subtitle>
        </div>
        <Section.Content>
          <Button
            subtitle="7 dias grátis e depois 5.000&nbsp;AKZ / mês"
            size="md"
          >
            Continuar
            <IconArrowRight />
          </Button>
        </Section.Content>
      </Section.Root>
    </div>
  );
}
