"use client";

import { trpc } from "@/app/_trpc/client";
import { Card } from "@/app/components/Card";
import { Search } from "@/app/components/Search/Index";
import { CardStackIcon, EraserIcon, CodeIcon, ChevronDownIcon, LaptopIcon, ArrowTopRightIcon, ResumeIcon, VideoIcon } from "@radix-ui/react-icons";
import { IconPlayerPlay, IconPlayerPlayFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";



export default function Home({params}:{params:{courseId:string}}) {
    
  const course = trpc.course.getById.useQuery(params.courseId) 
  if (!course.data) {
    return null
  }
  return (
    <div className="px-9 "> 
      <div className="relative  flex-col items-start bg-zinc-700 dark:bg-zinc-950 min-h-[252px] md:min-h-[288px] rounded-xl max-h-[343px]">
        <div className="py-20 px-10 space-y-2 max-w-[70%]">
          <h2 className="text-zinc-100 pr-20 dark:text-zinc-100 text-xl md:text-4xl font-bold md:leading-[140%] line-clamp-2">{course.data.title}</h2>
          <p className="text-zinc-200 dark:text-zinc-200 text-sm md:text-base line-clamp-2 md:line-clamp-2">{course.data.description}</p>
          <div className="flex gap-3">
          <div className="flex p-2 rounded-xl text-sm text-zinc-50 bg-zinc-50/10 hover:bg-zinc-50/15 dark:text-zinc-50 dark:bg-zinc-50/10 dark:hover:bg-zinc-100/15 space-x-2 text-center items-center hover:cursor-pointer">
              <LaptopIcon className="w-4 h-4 text-zinc-50 dark:text-zinc-400"/>
              <span className=" ">Programação</span>
            </div>
            <div className="flex p-2 rounded-xl text-sm text-zinc-50 bg-zinc-50/10 hover:bg-zinc-50/15 dark:text-zinc-50 dark:bg-zinc-100/10 dark:hover:bg-zinc-100/15 space-x-2 text-center items-center hover:cursor-pointer">
              <span className=" ">Avançado</span>
            </div>
            <div className="flex p-2 rounded-xl text-sm text-zinc-50 bg-zinc-50/10 hover:bg-zinc-50/15 dark:text-zinc-50 dark:bg-zinc-100/10 dark:hover:bg-zinc-100/15 space-x-2 text-center items-center hover:cursor-pointer">
              <span className=" ">Javascript</span>
            </div>
            <div className="flex p-2 rounded-xl text-sm text-zinc-50 bg-zinc-50/10 hover:bg-zinc-50/15 dark:text-zinc-50 dark:bg-zinc-100/10 dark:hover:bg-zinc-100/15 space-x-2 text-center items-center hover:cursor-pointer">
              <span className=" ">Mais</span>
              <ChevronDownIcon className="w-4 h-4 text-zinc-50 dark:text-zinc-400 "/> 
            </div>
          </div>
        </div>
        <div className="absolute max-w-[345px] right-8 top-8 justify-center items-center pt-4 pb-6 px-4 bg-zinc-50 dark:bg-zinc-900 w-full  rounded-xl shadow-sm flex-col space-y-4">
        <div className="relative rounded-xl">
        <img src={course.data.imageUrl ? course.data.imageUrl  : ''} className="rounded-xl w-[313px] max-h-[176px] object-cover"  alt="course"  />
      
        </div>

      {course?.data?.chapters[0]?.lessons[0] && <div className="px-2">
        <Link href={`/watch/${course.data.id}/${course.data.chapters[0].lessons[0].id}`} className="">
          <button type="button" className="relative inline-flex flex-shrink-0 justify-center items-center rounded-md transition-colors ease-in-out duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:select-none border-none cursor-pointer bg-[#015F43] hover:bg-[#143229] text-white px-8 py-3 text-2xl w-full">
            <div className="flex flex-1 justify-center items-center gap-2">
              <span className="text-base leading-6">Continuar a assistir</span>
              <IconPlayerPlay />
            </div> 
          </button>
        </Link>
        </div>} 
        </div>
      </div>
      <div className="py-4 flex gap-4">
        <div className="w-full max-w-[923px] space-y-4">
        <Card.Root className="">
          <Card.Header showDivider className="flex px-8 py-5">
            <h4 className="text-zinc-600 dark:text-zinc-100 text-xl font-semibold w-full">Sobre o curso</h4>
            <div className="flex items-center gap-3">
              <span className="text-zinc-600 dark:text-zinc-200 text-xl font-semibold">4,86</span>
              <div className="flex items-center gap-[.375rem] text-yellow-600 text-xl">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1em" height="1em"><path d="M394 480a16 16 0 01-9.39-3L256 383.76 127.39 477a16 16 0 01-24.55-18.08L153 310.35 23 221.2a16 16 0 019-29.2h160.38l48.4-148.95a16 16 0 0130.44 0l48.4 149H480a16 16 0 019.05 29.2L359 310.35l50.13 148.53A16 16 0 01394 480z"></path></svg>
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1em" height="1em"><path d="M394 480a16 16 0 01-9.39-3L256 383.76 127.39 477a16 16 0 01-24.55-18.08L153 310.35 23 221.2a16 16 0 019-29.2h160.38l48.4-148.95a16 16 0 0130.44 0l48.4 149H480a16 16 0 019.05 29.2L359 310.35l50.13 148.53A16 16 0 01394 480z"></path></svg>
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1em" height="1em"><path d="M394 480a16 16 0 01-9.39-3L256 383.76 127.39 477a16 16 0 01-24.55-18.08L153 310.35 23 221.2a16 16 0 019-29.2h160.38l48.4-148.95a16 16 0 0130.44 0l48.4 149H480a16 16 0 019.05 29.2L359 310.35l50.13 148.53A16 16 0 01394 480z"></path></svg>
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1em" height="1em"><path d="M394 480a16 16 0 01-9.39-3L256 383.76 127.39 477a16 16 0 01-24.55-18.08L153 310.35 23 221.2a16 16 0 019-29.2h160.38l48.4-148.95a16 16 0 0130.44 0l48.4 149H480a16 16 0 019.05 29.2L359 310.35l50.13 148.53A16 16 0 01394 480z"></path></svg>
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1em" height="1em"><path d="M480 208H308L256 48l-52 160H32l140 96-54 160 138-100 138 100-54-160z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"></path><path d="M256 48v316L118 464l54-160-140-96h172l52-160z"></path></svg>
              </div>
              <span className="text-zinc-700 dark:text-zinc-200 text-xs">(365)</span>
            </div>
          </Card.Header>
          <Card.Body className="py-5 px-8">
            <div className="flex flex-col gap-6 leading-[1.6]">
              <p>{course.data.description}</p>
            </div>
          </Card.Body>
        </Card.Root>
        <div className="py-5  bg-zinc-50 dark:bg-zinc-900 w-full rounded-xl shadow-sm">
          <div className="flex px-8">
            <h4 className="text-zinc-600 dark:text-zinc-100 text-xl font-semibold w-full">Educador</h4>
            
          </div>
          <div className=" border-t border-zinc-200 dark:border-zinc-800 mt-5 pt-5 px-8">
            <div className="flex flex-col gap-6 text-base text-zinc-700 dark:text-zinc-200 leading-[1.6]">
              <div className="flex gap-4">
              <span className="inline-flex items-center justify-center size-[52px] text-lg font-semibold leading-none rounded-full bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500 select-none cursor-pointer"
              
              >
                JF
              </span>
              <div className="flex flex-col align-center justify-center">
                <span className="text-zinc-800 dark:text-zinc-100 text-base">{course.data.author.name}</span>
                <span className="text-zinc-600 dark:text-zinc-400 text-sm">Front End Developer</span>
              </div>
              </div>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex, qui expedita! Assumenda, doloribus. Aperiam, natus! Eius a sed dicta vero nobis officia deserunt ratione, harum minima enim quo quaerat consequuntur ipsam! Hic, enim ex voluptatum totam doloremque nobis.</p>
            </div>
          </div>
        </div>
        </div>
        
        <div className="max-w-[352px] space-y-4">
          <div className="justify-center items-center pt-4 pb-7 bg-zinc-50 dark:bg-zinc-900 w-full  rounded-xl shadow-sm flex-col space-y-4">
          
            <div className="flex px-7 pt-24 flex-col items-center gap-2 self-stretch">
              <h3 className="text-zinc-700 dark:text-zinc-100 text-center text-base font-semibold">Tenha acesso a todas as formações da plataforma em uma única assinatura</h3>
              <p className="text-zinc-700 dark:text-zinc-200 text-center text-xs">Assinando você recebe acesso imediato a todas as formações do zero ao avançado</p>
            </div>
            <div className="px-7">
              <Link href="#" className="items-center flex justify-center">
              
              <button className="rounded-2xl flex border-2 border-dashed border-emerald-950 bg-[#015F43] px-6 py-3 font-semibold uppercase text-white transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_#02533a] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none">
                    <span className="text-base leading-6">Quero assinar</span>
                    <ArrowTopRightIcon />
                </button>
              </Link>
            </div>
          </div>
        <div className="flex flex-col self-stretch rounded-xl bg-zinc-50 dark:bg-zinc-900 px-6 py-5 gap-4">
          <h3 className="text-sm text-zinc-600 dark:text-zinc-300 font-semibold">Detalhes do curso</h3>
          <div className="flex flex-col items-start gap-3 self-stretch">
            <div className="flex items-center gap-4 self-stretch">
              <div className="flex w-8 h-8 justify-center items-center rounded-full border dark:border-zinc-800 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-400 text-base">
                <EraserIcon />
              </div>
              <div className="flex flex-col justify-center items-start flex-1">
                <p className="text-zinc-700 dark:text-zinc-300 text-xs">Nível de dificuldade</p>
                <p className="text-zinc-600 dark:text-zinc-100 text-sm">Intermediário</p>
              </div>
            </div>
            <div className="flex items-center gap-4 self-stretch">
              <div className="flex w-8 h-8 justify-center items-center rounded-full border dark:border-zinc-800 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-400 text-base">
                <VideoIcon />
              </div>
              <div className="flex flex-col justify-center items-start flex-1">
                <p className="text-zinc-700 dark:text-zinc-300 text-xs">Aulas</p>
                <p className="text-zinc-600 dark:text-zinc-100 text-sm">299 aulas</p>
              </div>
            </div>
            <div className="flex items-center gap-4 self-stretch">
              <div className="flex w-8 h-8 justify-center items-center rounded-full border dark:border-zinc-800 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-400 text-base"><CodeIcon />
              </div>
              <div className="flex flex-col justify-center items-start flex-1">
                <p className="text-zinc-700 dark:text-zinc-300 text-xs">Atividades</p>
                <p className="text-zinc-600 dark:text-zinc-100 text-sm">6 desafios e 34 testes</p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
