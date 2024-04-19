"use client";

import Link from "next/link";
import React from "react";
import {
  IconDeviceSpeaker,
  IconNotebook,
  IconStarFilled,
} from "@tabler/icons-react";
import Image from "next/image";
import { Card } from "@/app/components/Card";
import Tag from "@/app/components/Tag/Tag";

interface CourseProps {
  className?: string;
  progress?: number;
  img: string;
  description: string | null;
  name: string;
  price: number | 0;
  modules: number;
  category: string;
  id: string;
}

function CourseResult({
  className,
  id,
  progress,
  img,
  name,
  price,
  modules,
  category,
  description,
}: CourseProps) {
  const pp = `w-[${progress}%]`;
  return (
    <Link href={`/course/${id}`} className="">
      <Card.Root>
        <div className="flex gap-2">
          <Card.Body className="relative p-3 rounded-3xl">
            <Image
              src={img}
              className="object-cover rounded-xl w-full md:max-h-[280px] h-[100%]"
              alt="course"
              width={500}
              height={280}
              unoptimized
            />

            <div className="hidden absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-zinc-900/60"></div>
          </Card.Body>
          <Card.Footer className="justify-start items-center pr-6 h-auto flex w-full color-inherit subpixel-antialiased gap-3">
            <div className="flex flex-col gap-3">
              <div className=" flex overflow-hidden subpixel-antialiased justify-between">
                <div className="text-left flex flex-col gap-2">
                  <b className=" line-clamp-2 font-medium text-lg">{name}</b>
                  <div className="flex gap-2">
                    <Tag
                      name={`${modules} Modulos`}
                      startContent={
                        <IconNotebook className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
                      }
                    />
                    <Tag name={category} />
                  </div>
                </div>
                <p className="text-zinc-500 text-base">
                  {price ? `${price} AKZ` : "Gratis"}
                </p>
              </div>
              <p className="text-zinc-500 text-base line-clamp-4">
                {description}
              </p>
            </div>
          </Card.Footer>
        </div>
      </Card.Root>
    </Link>
  );
}

export default CourseResult;
