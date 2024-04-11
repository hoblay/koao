"use client"
import { trpc } from "@/app/_trpc/client";
import HalfStarIcon from "@/app/components/Icons/HalfStar";
import StarIcon from "@/app/components/Icons/Star";
import ReactPlayer, { ReactPlayerProps } from "react-player";
export default function ClassPage({params}:{params:{lessonId:string}}) {
  const lesson = trpc.lesson.getById.useQuery(params.lessonId) 
  if (!lesson.data) {
    return null
  }


  return (
    
    <div className="px-9"> 
      
      <div className="flex relative min-w-[1022px] min-h-[601px] overflow-hidden ">
        <ReactPlayer controls width={"100%"} className="absolute top-0 left-0"  height={"100%"} url={lesson.data.video?.commitUrl ? lesson.data.video?.commitUrl : '' } config={{}}/>
      </div>

      <div className="py-4 max-w-[1022px]">
      <div className="w-full py-5 shadow-sm bg-zinc-50 dark:bg-zinc-900 rounded-xl">
          <div className="flex px-8">
            <h4 className="w-full text-xl font-semibold text-zinc-600 dark:text-zinc-100">{lesson.data.title}</h4>
            <div className="flex items-center gap-3">
              <span className="text-xl font-semibold text-zinc-600 dark:text-zinc-200">4,86</span>
              <div className="flex items-center gap-[.375rem] text-yellow-600 text-xl">
                <StarIcon className="text-yellow-700 w-6 h-6" /> 
                <StarIcon className="text-yellow-700 w-6 h-6" /> 
                <StarIcon className="text-yellow-700 w-6 h-6" /> 
                <StarIcon className="text-yellow-700 w-6 h-6" /> 
                <HalfStarIcon className="text-yellow-700 w-6 h-6" /> 
              </div>
              <span className="text-xs text-zinc-700 dark:text-zinc-200">(365)</span>
            </div>
          </div>
          <div className="px-8 pt-5 mt-5 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex flex-col gap-6 text-base text-zinc-700 dark:text-zinc-200 leading-[1.6]">
              <p>{lesson.data.description}</p>
              <p>Com uma abordagem mais prática você irá criar diversos projetos ao longo do curso, desde aplicações mais simples como um feed social simplificado até o desenvolvimento de dashboard de administração de pizzaria, com gerenciamento de pedidos e comunicação com API própria.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
