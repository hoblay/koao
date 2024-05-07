"use client";
import React from "react";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { trpc } from "@/app/_trpc/client";
import { Section } from "@/app/components/Section";

function LastSeenSection({
  title,
  sliderOff,
  divider,
  subtitle,
}: {
  title: string;
  subtitle?: string;
  divider?: boolean;
  sliderOff?: boolean;
}) {
  const { data: session, status } = useSession();

  const lastSeen = trpc.lesson.getLastWatch.useQuery();
  if (!session?.user || !lastSeen.data?.length) {
    return null;
  }

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Section.Root divider={divider && true}>
      <div>
        <Section.Title> {title}</Section.Title>
        <Section.Subtitle>{subtitle}</Section.Subtitle>
      </div>
      <Section.Content>
        <div className="grid grid-cols-5 gap-4">
          {lastSeen.data.map(
            (lesson, index) =>
              lesson && (
                <Link
                  key={lesson.id}
                  href={`/watch/${lesson.chapter.course.id}/${lesson.id}`}
                >
                  <div className="relative">
                    <Image
                      src={lesson.chapter.course.imageUrl || ""}
                      className="object-cover rounded-xl w-full max-h-[152px] min-h-[152px]"
                      alt="course"
                      width={311}
                      height={152}
                      style={{ objectFit: "cover" }}
                      unoptimized
                    />
                    <div className=" absolute group bg-transparent flex inset-0 w-full h-full cursor-pointer hover:bg-zinc-950/90 rounded-xl items-center justify-center">
                      <div className="flex group-hover:opacity-100 opacity-0">
                        <IconPlayerPlayFilled className=" size-10" />
                      </div>
                    </div>
                  </div>
                </Link>
              ),
          )}
        </div>
      </Section.Content>
    </Section.Root>
  );
}

export default LastSeenSection;
