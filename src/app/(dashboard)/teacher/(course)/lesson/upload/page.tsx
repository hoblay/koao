import Tag from "@/app/components/Tag/Tag";
import { PlusIcon } from "@radix-ui/react-icons";
import { IconCircleMinus, IconDots, IconFolderSearch, IconTag, IconTags, IconUpload } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="px-24 py-8 border-t border-t-zinc-900"> 
      <div className="flex items-center justify-between border-b border-b-zinc-900 py-4 px-4">
        <h2 className="text-xl">Adicionar aulas</h2>
        <div className="flex gap-1.5 pl-3 border-l border-l-zinc-900">
        <Link href="/teacher/create">
            <Tag  name="Apagar tudo" startContent={<IconCircleMinus className="w-5 h-5 text-zinc-500 dark:text-zinc-400"/>}/>
          </Link>
          <Link href="/teacher/create">
            <Tag  name="Adicionar tudo" startContent={<IconUpload className="w-5 h-5 text-zinc-500 dark:text-zinc-400"/>}/>
          </Link>
        </div>
      </div>

      
      <div className="relative overflow-x-auto shadow-md rounded-lg mt-4">
          <table className="w-full text-sm text-left rtl:text-right text-zinc-500 dark:text-zinc-400">
              <thead className="text-xs text-zinc-700 uppercase bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-400">
                  <tr>
                      <th scope="col" className="px-6 py-3">
                          Aula
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Duração
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Tamanho
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Estado
                      </th>
                      <th scope="col" className="px-6 py-3">
                          <span className="sr-only">Edit</span>
                      </th>
                  </tr>
              </thead>
              <tbody>
                  <tr className="bg-zinc-50 border-b dark:bg-zinc-950 dark:border-zinc-900 py-2">
                      <th scope="row" className="px-6 py-4 font-medium text-zinc-900 whitespace-nowrap dark:text-white">
                        <div className="flex gap-4">
                          <Image src={"https://www.filepicker.io/api/file/OTjVSdC5TxvppATpCNUI"} className=" object-cover rounded-lg" width={133} height={84} alt="course" unoptimized />
                          <div className="flex flex-col gap-2 w-full">
                            <input className="max-h-10 text-xs w-full p-3 rounded-lg focus:ring-0 outline-none bg-zinc-100 hover:bg-white focus:bg-white dark:bg-zinc-900 dark:hover:bg-zinc-800/30 dark:focus:bg-zinc-800/30" type="text" name="title" value={"Curso a arte da mistura e masterização - Parte 1"} placeholder="Titulo da aula"/>
                            <div className="flex">
                              <Tag  name="Categoria" className="border border-zinc-800 border-dashed dark:bg-zinc-950" startContent={<IconTag className="w-5 h-5 text-zinc-500 dark:text-zinc-400"/>}/>
                            </div>
                          </div>
                        </div>
                      </th>
                      <td className="px-6 py-4">
                        12:37
                      </td>
                      <td className="px-6 py-4">
                        90.73 MB
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex">
                          <Tag  name="Pronto " />
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 border-zinc-800 border rounded-xl hover:bg-zinc-800/10"><IconDots /></button>
                      </td> 
                  </tr>
                  
                  
              </tbody>
          </table>
      </div>
      <div className="rounded-lg mt-2 w-full flex items-center justify-center ">
          <div className="flex items-center justify-center w-full">
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-96 border-2 border-zinc-300 border-dashed rounded-lg cursor-pointer bg-zinc-50 dark:hover:bg-zinc-900 dark:bg-zinc-950 hover:bg-zinc-100 dark:border-zinc-800 dark:hover:border-zinc-700 ">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <IconFolderSearch className="w-8 h-8 mb-4 text-zinc-600 dark:text-zinc-300" />
                      <p className="mb-2 text-sm text-zinc-500 dark:text-zinc-400"><span className="font-semibold">Arraste os videos aqui</span> ou clique para selecionar manualmente</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-500">SVG, PNG, JPG or GIF (MAX. 600MB)</p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
              </label>
          </div> 
        
      </div>

 
      
    </div>
  );
}
