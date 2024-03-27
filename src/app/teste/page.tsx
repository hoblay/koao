"use client";

import { BackpackIcon, CardStackIcon, ExitIcon, GearIcon, HomeIcon, LaptopIcon, MixerHorizontalIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Accordion } from "../components/Accordion";
import { Dropdown } from "../components/Dropdown";
import { useRef } from "react";
import Prova from "../components/Card/Prova";


export default function Home() {
  const ref = useRef(null);

  function rippleEffect(event) {
    const btn = ref.current;

    
    
    const circle = document.createElement("span");
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;
  
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - (btn.offsetLeft + radius)}px`;
    circle.style.top = `${event.clientY - (btn.offsetTop + radius)}px`;
    circle.classList.add("ripple");
  
    const ripple = btn.getElementsByClassName("ripple")[0];
  
    if (ripple) {
      ripple.remove();
    }
  
    btn.appendChild(circle);
  }
  
  const btn = document.getElementById("bt");


  return (
    <div className="p-20">
      <Accordion.Root>
        <Accordion.Item startContent={
            <div className="flex-shrink-0">
              <div className={` w-9 h-9 rounded-full p-1 border-2 border-zinc-700 bg-zinc-800 items-center justify-center`}>
                <span className=''>1</span>
              </div>
            </div>
          } index={1} title={'Diagnóstico financeiro e compreendendo o mercado financeiro'}>
          <div className="px-2 py-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, consequuntur obcaecati voluptas ex nihil repellendus aut dignissimos deleniti eos aspernatur blanditiis rerum odit minus ab error suscipit pariatur, architecto quibusdam, praesentium facere enim dicta.</div>
        </Accordion.Item>
        <Accordion.Item startContent={
            <div className="flex-shrink-0">
              <div className={` w-9 h-9 rounded-full p-1 border-2 border-zinc-700 bg-zinc-800 items-center justify-center`}>
                <span className=''>2</span>
              </div>
            </div>
          } index={2} title={'Diagnóstico financeiro e compreendendo o mercado financeiro'}>
          <div className="px-2 py-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, consequuntur obcaecati voluptas ex nihil repellendus aut dignissimos deleniti eos aspernatur blanditiis rerum odit minus ab error suscipit pariatur, architecto quibusdam, praesentium facere enim dicta.</div>
        </Accordion.Item>
        <Accordion.Item startContent={
            <div className="flex-shrink-0">
              <div className={` w-9 h-9 rounded-full p-1 border-2 border-zinc-700 bg-zinc-800 items-center justify-center`}>
                <span className=''>3</span>
              </div>
            </div>
          } index={3} title={'Diagnóstico financeiro e compreendendo o mercado financeiro'}>
          <div className="px-2 py-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, consequuntur obcaecati voluptas ex nihil repellendus aut dignissimos deleniti eos aspernatur blanditiis rerum odit minus ab error suscipit pariatur, architecto quibusdam, praesentium facere enim dicta.</div>
        </Accordion.Item>

        
        
      </Accordion.Root>

      <div className="p-20">
        <div className="w-36">
        <Dropdown.Root>
          <Dropdown.Trigger>
            <button className="bg-zinc-700 p-2 rounded-lg text-zinc-200">aperta</button>
          </Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Section>
              <Dropdown.Item title={"Winslet Mateus"} description="hoblayrecords@gmail.com"/>
              <Dropdown.Item title={"Painel de control"} startContent={ <MixerHorizontalIcon/>}/>
              <Dropdown.Item title={"Definições"} startContent={<GearIcon/>}/>
              <Dropdown.Item title={"Ganhos"} startContent={<BackpackIcon/>}/>
              <Dropdown.Item title={"Modo escuro" } shortcut description="Trocar o tema" startContent={ <MoonIcon/>}/>
            </Dropdown.Section>
            <Dropdown.Section showDivider>
              
              <Dropdown.Item title="Sair" description="Encerrar sessão" startContent={ <ExitIcon/>}/>
            </Dropdown.Section>
          </Dropdown.Menu> 
        </Dropdown.Root>


        
        </div>
        <div className="p-10 flex">
        <button className="flex flex-col relative overflow-hidden h-auto text-zinc-300 box-border bg-zinc-900 rounded-xl outline-none focus:z-10 max-w-[18rem] focus:outline-2 focus:outline-focus focus:outline-offset-2 shadow-sm rounded-large cursor-pointer transition-transform-background motion-reduce:transition-none data-[pressed=true]:scale-[0.97] tap-highlight-transparent" type="button" role="button">
          <div className="relative flex w-full flex-auto flex-col h-auto break-words text-left subpixel-antialiased overflow-visible p-0">
            <div className="relative shadow-black/5 shadow-md rounded-xl max-w-[100%] z-0" > <img src="https://www.codewithantonio.com/_next/image?url=https%3A%2F%2Futfs.io%2Ff%2F35b3a956-baae-4612-b385-17a835775eed-h7q22q.png&w=3840&q=75" className="relative z-10 opacity-0 shadow-black/90 data-[loaded=true]:opacity-100 shadow-small transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-xl w-full object-cover" width="100%" alt="Orange" data-loaded="true"/>
            </div>
            </div>
            <div className="rounded-b-xl p-3 flex flex-col h-auto gap-3">
             <div className=" flex items-start overflow-hidden subpixel-antialiased  text-small justify-between">
             <div className="text-left">
             <b>Prisma & Free Databases (MySQL, Postgres & Mongo)</b>
             
              
             </div>
             <p className="text-default-500">$5.50</p>
             </div>
             <div className="flex gap-1">
            <div
              className="relative flex select-none items-center whitespace-nowrap rounded-lg bg-zinc-400/10 dark:bg-zinc-100/10 py-1.5 px-3 font-sans text-xs text-zinc-900 dark:text-zinc-100 ">
              <div className="absolute top-2/4 left-1.5 h-5 w-5 -translate-y-2/4">
                <CardStackIcon  className="w-5 h-5 dark:text-zinc-400"/>
              </div>
              <span className="ml-[18px]">23 Modulos</span>
            </div>
            <div
              className="relative flex select-none items-center whitespace-nowrap rounded-lg bg-zinc-400/10 dark:bg-zinc-100/10 py-1.5 px-3 font-sans text-xs text-zinc-900 dark:text-zinc-100 ">
              <div className="absolute top-2/4 left-1.5 h-5 w-5 -translate-y-2/4">
                <LaptopIcon  className="w-5 h-5 dark:text-zinc-400"/>
              </div>
              <span className="ml-[18px]">Programação</span>
            </div>
          </div>
            
          <div className={`w-full bg-zinc-200 rounded dark:bg-zinc-700 mt-2 hidden`} >
            <div className={`bg-purple-300 dark:bg-purple-700 text-xs font-medium text-purple-950 dark:text-zinc-100 text-center p-0.5 leading-none rounded whitespace-nowrap`} style={{width: `32%` }} > {32}% 
            Completado</div>
          </div>
            </div>
            
          </button>
        </div>

        <div className="" ref={ref} >
        <button type="button"  className="rounded px-5 py-3 min-w-max overflow-hidden shadow relative bg-indigo-500 text-white hover:bg-opacity-90" onClick={e => rippleEffect(e)}>
            Button text
          </button>  
        </div>


      </div>
    </div>
  );
}


