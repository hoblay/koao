"use client";

import { Search } from "@/app/components/Search/Index";



export default function Home() {
  return (
    <div className="px-10 py-8 "> 
      <Search.Root className="">
        <Search.Section title="Colegas">
          <Search.Result type="user" user={{name: "Winslet Mateus", email: "hoblayrecords@gmail.com"}}/>
          <Search.Result type="user" user={{name: "João Francisco", email: "jfrancisco@gmail.com"}}/>
        </Search.Section>
        <Search.Section title="Materia">
          <Search.Result type="file" name="Algebra_linear.pdf"/>
          <Search.Result type="file" name="Calculo-01.pdf"/>
          <Search.Result type="file" name="Introdução_EngInf.pdf"/>
        </Search.Section>
      </Search.Root>

      <div className="py-6">
        
      </div>
    </div>
  );
}
