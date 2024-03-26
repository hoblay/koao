import React, { useEffect, useRef, useState } from 'react'
import { Accordion } from '../Accordion'
import { ContentModule } from './ContentModule'
import { tv } from 'tailwind-variants';
import Link from 'next/link';
import { ContentLesson } from './ContentLesson';
import { act } from 'react-dom/test-utils';
import { PauseIcon, Pencil1Icon } from '@radix-ui/react-icons';

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

const moduleCircle = tv({
  base: ' w-9 h-9 rounded-full p-1 border-2 border-zinc-300 text-zinc-600 dark:text-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 items-center justify-center',
  variants: {
    active: {
      true: 'border-purple-500 text-purple-900  dark:text-zinc-100 dark:border-purple-700',
      
    },
    done: {
      true: 'border-purple-500 text-purple-900 dark:text-zinc-100  dark:border-purple-700 '
    }
  },
  defaultVariants: {
    active: false,
    done: false
  }
});

const lessonStyle = tv({
  base: 'absolute flex items-center justify-center w-6 h-6 bg-purple-100 rounded-full -start-[13px] ring-4 ring-zinc-50 dark:ring-zinc-900 hover:ring-8 dark:bg-zinc-800 dark:bg-zinc-800   cursor-pointer transition-all duration-150 ease-in-out',
  variants: {
    active: {
      true: 'ring-purple-500 dark:ring-purple-700 hover:ring-8 hover:ring-purple-500/30 dark:hover:ring-purple-700/30 dark:bg-zinc-800 ',
      
    },
    done: {
      true: 'ring-zinc-50 dark:ring-zinc-900 hover:ring-8 bg-purple-500 dark:bg-purple-900 '
    }
  },
  defaultVariants: {
    active: false,
    done: false
  }
});


interface LessonsDoneProps {
  index?: number,
  name?: string,
  lessons: {name?: string}[] | number[] 
}

function Prova() {
  const [coursePercentage, setCoursePercentage] = useState<number>(0);
  const [lessonsDone, setLessonsDone] = useState<LessonsDoneProps[]>([]);
  const [indexActive, setIndexActive] = useState<number>(9999);
  const [lesseonIndexActive, setlessonIndexActive] = useState<number>(999);

  const listItems = useRef(null);


  const handleActive = (indexParent: number, indexLesson: number) => {

    setIndexActive(prev => (indexParent === prev ? prev : indexParent));

    if(indexParent === indexActive) {
       setlessonIndexActive(indexLesson === lesseonIndexActive ? indexLesson : indexLesson);

    }else{
      setlessonIndexActive(indexLesson === lesseonIndexActive ? indexLesson : indexLesson);
    }
  };

  const markAsDone = (lesson: {index:number, lessons: number[]}) => {

    // adds it to the array if there's no lesson of the same module done
    !(lessonsDone.findIndex(item => item.index === lesson.index) !== -1) && setLessonsDone([...lessonsDone, lesson]);

    // if there's a lesson of the same module done
    (lessonsDone.findIndex(item => item.index === lesson.index) !== -1) && lessonsDone.forEach((element, index) => {
      
      // if the lesson belongs to the same module
      if(element.index === lesson.index) {

        
        const deletedIndex = element.lessons.findIndex(item => item === lesson.lessons[0]);
          
          // removes it from the array if the lesson already exists 
          if (deletedIndex > -1) {
              let filteredLessons = element.lessons.filter((value, i:number) => i !== deletedIndex)
              lessonsDone[index].lessons = [...filteredLessons];
             
            setLessonsDone([...lessonsDone])
          }

          // ads it to the array if the lesson doesn't exist
          else {
            lessonsDone[index].lessons = [...lessonsDone[index].lessons, lesson.lessons[0]];
            setLessonsDone([...lessonsDone])
          }
    
      }
    });   
  }


  const checkDoneModule = (courseModule:LessonsDoneProps, index:number) => {
    return ((!!lessonsDone.find(el => el.index === index + 1)) && (lessonsDone.find(ol => ol.index === index + 1))?.lessons.length === courseModule.lessons.length)
  }

  const checkDoneLesson = (parentIndex:number, index:number) => {
    let lessonsw = lessonsDone.find(item => item.index ===parentIndex + 1)

    return (lessonsw && !!lessonsw.lessons.find(item => item === index + 1))
  }

  const lessonsNumber = Object.keys(Data).length;
  useEffect(()=>{

    let pa = 100 / lessonsNumber

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

  return (
    <div className={`h-[calc(100vh-40px)] overscroll-x-none overscroll-y-none rounded-xl overflow-y-auto overflow-hidden bg-zinc-50 dark:bg-zinc-900 no-scrollbar w-[350px] shadow-sm`}>
      <div className="sticky top-0 bg-zinc-50 dark:bg-zinc-900 z-50 px-8 py-5">
        <h2 className="text-lg">Lorem ipsum dolor sit, amet consectetur adipisicing.</h2>
        <div className={`mt-3 w-full bg-zinc-200 rounded dark:bg-zinc-700 my-2`} >
          <div className={`bg-purple-300 dark:bg-purple-700 text-xs font-medium text-purple-950 dark:text-zinc-100 text-center p-0.5 leading-none rounded whitespace-nowrap transition-[width] duration-300 ease-in-out`} style={{width: `${coursePercentage}%` }} > {Math.round(coursePercentage)}%
          Completado</div>
        </div>
      </div>
      
      
      <div className="bg-zinc-100 dark:bg-zinc-950/25 p-2">
      <Accordion.Root>
        {Data.map((item, index) => (
          
          <>
            <Accordion.Item startContent={
              <div className={moduleCircle({active: (index === indexActive), done: (checkDoneModule(item,index))})}>
                <div className='flex items-center text-center justify-center'>{(index === indexActive ? <PauseIcon className='m-1 w-4 h-4'/> : item.index)}</div>
              </div>
              } index={item.index} title={item.name}>
              <div className=" text-small " >
                <div className="py-0 px-7" ref={listItems}>
                  <ol className="relative">
                  {item.lessons.map((lesson, i) => ( 
                    <> 
                      <li className= {`pb-4 p-1  border-s-2 pl-7 -ml-[2px] pt-3 ${checkDoneLesson(index, i) ? 'border-purple-500 dark:border-purple-700 ' : 'border-zinc-200 dark:border-zinc-700'}`} >
                        <span className={lessonStyle({active: (i === lesseonIndexActive && index === indexActive), done: (checkDoneLesson(index, i))})} onClick={() => markAsDone({index: item.index, lessons: [1+i]})}>
                            <span className="text-xs text-purple-800 dark:text-zinc-50" >
                                {(i === lesseonIndexActive && index === indexActive) ? <Pencil1Icon className='w-3 h-3'/> : i + 1}
                            </span>
                        </span>
                        <Link href={'#'} className="">
                          <h3 className="flex items-center text-sm text-zinc-900 dark:text-white dark:hover:text-zinc-300" onClick={() => handleActive(index, i)}>
                            {lesson.name}
                          </h3>
                        </Link>
                      </li>
                      </>
                    ))} 
                  </ol>
                </div>
              </div>
            </Accordion.Item>
          </>
        ))}
        
      </Accordion.Root>
      </div>


    </div>
  )
}

export default Prova