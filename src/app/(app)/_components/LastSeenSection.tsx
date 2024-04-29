"use client";
import React from "react";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { trpc } from "@/app/_trpc/client";

function LastSeenSection({
  title,
  sliderOff,
}: {
  title: string;
  sliderOff?: boolean;
}) {
  const { data: session, status } = useSession();

  const lastSeen = trpc.lesson.getLastWatch.useQuery();
  if (!session?.user || !lastSeen.data) {
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
    <div className="flex flex-col gap-4 px-9">
      <h2 className=" text-[17px] font-semibold flex gap-2 items-center">
        {title}
      </h2>
      <div className="grid grid-cols-5 gap-4 border-[#1f1f1f]/10 dark:border-[#363636] border-b-2 pb-6">
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
                    className="object-cover rounded-xl w-full min-h-[100%]"
                    alt="course"
                    width={311}
                    height={182.812}
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
    </div>
  );
}

export default LastSeenSection;
