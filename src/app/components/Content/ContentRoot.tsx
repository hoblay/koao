"use client";
import { ArrowLeftIcon, ChevronDownIcon, ChevronLeftIcon, HamburgerMenuIcon, PauseIcon, WidthIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { createContext, useContext } from 'react';

interface ContentProps{
  children?: ReactNode,
  className?: string,
  logo?: Boolean | false,
  brand?: string,
}

const Data = [
  {
    index: 1,
    
    name: 'Diagnóstico financeiro e compreendendo o mercado financeiro',
    lessons: [
      {
        name: 'Estrategia de orçamentação',
        
        
      },
      
      {
        name: 'Definição do perfil de investidor',
        
        
      },
      {
        name: 'Controle e gestão de dívidas',
        
        
      },
      {
        name: 'Como usar o dinheiro como marionete',
        
        
      }
    ]
  },
  {
    index: 2,
    
    name: 'Investir em Angola: Renda fixa',
    lessons: [
      {
        name: 'Como funciona o sistema financeiro',
        
        },
      
      {
        name: 'Reservas financeiros como estrategia de investimento bem sucedido',
        
        
      },
      {
        name: 'Estudo profundo da inflação e seus efeitos no seu dinheiro',
        
        
      },
      {
        name: 'O poder dos juros compostos',
        
        
      }
    ]
  },
  {
    index: 3,
    
    name: 'Investir em Angola: Renda variavel',
    lessons: [
      {
        name: 'Fundos de investimentos em valores mobiliários',
        
        },
      
      {
        name: 'Fundos de investimento imobiliários',
        
        
      },
      {
        name: 'Ações angolanas e activos futuros',
        
        
      },
      {
        name: 'A estratégia de investimento Hat-trick (montagem da carteira em Angola)',
        
        
      }
    ]
  },
  {
    index: 4,
    name: 'Ações internacionais e valuation de empresas na bolsa',
    lessons: [
      {
        name: 'Como funciona o mercado de ações',
        },
      
      {
        name: 'Index funds, ETFs e Mutual funds',
        
      },
      {
        name: 'Análise fundamentalista de ações',
        
      },
      {
        name: 'Como funciona o mercado de ações',
        
      },
      {
        name: 'Index funds, ETFs e Mutual funds',
        active: true,
      },
      {
        name: 'Análise fundamentalista de ações',
        
      }
    ]
  
  },
  {
    index: 5,
    name: 'Análise técnica de ações',
    lessons: [
      {
        name: 'Subscrição em correctoras em 3 internacionais (passo à passo) e abertura de conta no estrangeiro',
        },
      
      {
        name: 'dentificação e entendimento os principais indicadores técnicos',
        
      },
      {
        name: 'Usando indicadores na prática',
        
      },
    ]
  
  },
  {
    index: 6,
    name: 'REITS (Real Estate Investment Trust - Fundos imobiliários)',
    lessons: [
      {
        name: 'Como funcionam e suas diferenças com as empresas comuns',
        },
      
      {
        name: 'Análise de fundos imobiliários',
        
      },
      {
        name: 'Screening (seleção) de fundos imobiliários',
        
      },
      {
        name: 'Estrategia de investimento em dividendos com REITs',
        
      }
    ]
  
  },
  {
    index: 7,
    name: 'Alocação de ativos e a montagem da carteira de investimentos',
    lessons: [
      {
        name: 'Stock Screening',
        },
      
      {
        name: 'Montagem final da carteira (no estrangeiro)',
        
      },
    ]
  
  },
  {
    index: 8,
    name: 'Renda extra e negócios',
    lessons: [
      {
        name: 'Pensamento criativo e geração de ideias de valor',
        },
      
      {
        name: 'Business Model Canvas',
        
      },
      {
        name: '7 dominios – Análise SWOT',
        
      },
      {
        name: 'Factores críticos de sucesso',
        
      },
      {
        name: 'Definição de mercado  Custo de oportunidade – Análise da competição',
        
      }
    ]
  
  },
]

import { ContentModule } from "./ContentModule";

export const ContentContext = createContext({});

export function ContentRoot({ children, className, logo, brand }:ContentProps) {
  const [coursePercentage, setCoursePercentage] = useState<number>(0);
  const [lessonsDone, setLessonsDone] = useState([]);
  const [indexopen, setIndexOpen] = useState<number>(99999);
  const [indexActive, setIndexActive] = useState<number>(9999);

  const handleClick = (index: number) => {
    setIndexOpen(index === indexopen ? 99999 : index);
  };

  const handleActive = (index: number) => {
    setIndexActive(index === indexActive ? 99999 : index);
  };

  const addLessons = (lesson: {index:number, lessons: []}) => {
    
    let li = lessonsDone;
    
    const i = li.findIndex(item => item.index === lesson.index);
    !(li.findIndex(item => item.index === lesson.index) !== -1) && setLessonsDone([...lessonsDone, lesson]);

    
    (li.findIndex(item => item.index === lesson.index) !== -1) && lessonsDone.forEach((element, index) => {
      if(element.index === lesson.index) {
        const deletedIndex = element.lessons.findIndex(item => item === lesson.lessons[0]);
          
          if (deletedIndex > -1) { // only splice array when item is found
              let la = element.lessons.filter((value, i) => i !== deletedIndex)
              lessonsDone[index].lessons = [...la];
             
            setLessonsDone([...lessonsDone])
          }else {
            lessonsDone[index].lessons = [...lessonsDone[index].lessons, lesson.lessons[0]];
            setLessonsDone([...lessonsDone])
          }
    
          


          
      }
    });   
  }
  
  const itemsOndData = Object.keys(Data).length;
  useEffect(()=>{

    let pa = 100 / itemsOndData

    let a;


    let ami = 0

    lessonsDone.forEach(element => {
      Data.forEach(item => {
        if (element.index === item.index) {

          a = pa / item.lessons.length * element.lessons.length
          ami = ami + a;

        }
      });
    });

    setCoursePercentage(ami)

    




},[lessonsDone]);
  
  return(
    
    <div className={`h-[calc(100vh-40px)] overscroll-x-none overscroll-y-none rounded-xl overflow-y-auto overflow-hidden bg-zinc-50 dark:bg-zinc-900 no-scrollbar w-[350px] shadow-sm ${className}`}>
      <div className="sticky top-0 bg-zinc-50 dark:bg-zinc-900 z-50 px-8 py-5">
        <h2 className="text-lg">Lorem ipsum dolor sit, amet consectetur adipisicing.</h2>
        <div className={`mt-3 w-full bg-zinc-200 rounded dark:bg-zinc-700 my-2`} >
          <div className={`bg-purple-300 dark:bg-purple-700 text-xs font-medium text-purple-950 dark:text-zinc-100 text-center p-0.5 leading-none rounded whitespace-nowrap transition-[width] duration-300 ease-in-out`} style={{width: `${coursePercentage}%` }} > {Math.round(coursePercentage)}% 
          Completado</div>
        </div>
      </div>
      
      <div className=" w-full space-y-2 overscroll-y-auto bg-zinc-100 dark:bg-zinc-950/25 px-3 pt-1 pb-3">
        {Data.map((item, index) => (
          <>
            <ContentModule
              open={index === indexopen}
              index={item.index}
              onClick={() => handleClick(index)}
              onActive={() => handleActive(index)}
              active={index === indexActive}
              done={(!!lessonsDone.find(item => item.index === index + 1)) && (lessonsDone.find(item => item.index === index + 1))?.lessons.length === item.lessons.length  }
              name={item.name}
              lessonsDone={lessonsDone.find(item => item.index === index + 1)}
              lessons={item.lessons}
              addLesson={ addLessons}
            >
              {children}
            </ContentModule>
            {itemsOndData - index < 2 ? null : <span></span> }
          </>
        ))}
      </div>


    </div>
      
  );
}