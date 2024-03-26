"use client";

import { Accordion } from "../components/Accordion";


export default function Home() {
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
    </div>
  );
}
