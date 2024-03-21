"use client";

import Course from "../components/Course/Index";
import { Search } from "../components/Search/Index";

export default function Home() {
  return (
    <div className="px-10 py-8"> 
      <Search.Root>
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

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 py-6">
        <Course name="Building a full stack Notion clone." price={0} img="https://www.codewithantonio.com/_next/image?url=https%3A%2F%2Futfs.io%2Ff%2Fd2ebdb09-0a4d-4edf-9681-b0a864f01687-8nhtey.png&w=3840&q=75"
         modules={15}/>
        <Course name="Building a full stack Notion clone." price={0} img="https://www.codewithantonio.com/_next/image?url=https%3A%2F%2Futfs.io%2Ff%2F35b3a956-baae-4612-b385-17a835775eed-h7q22q.png&w=3840&q=75"
         modules={23}/>
        <Course name="Building a full stack Notion clone." price={0} img="https://www.codewithantonio.com/_next/image?url=https%3A%2F%2Futfs.io%2Ff%2F90531ae7-e80e-4e7e-a17d-57fe579191f9-9yhq4w.png&w=3840&q=75"
         modules={12}/>
        <Course name="Building a full stack Notion clone." price={0} img="https://www.codewithantonio.com/_next/image?url=https%3A%2F%2Futfs.io%2Ff%2F34030399-8018-4b2b-928d-b978bfe20202-5k5p0a.png&w=3840&q=75"
         modules={9}/>
        <Course name="Building a full stack Notion clone." price={0} img="https://www.codewithantonio.com/_next/image?url=https%3A%2F%2Futfs.io%2Ff%2F68decd21-7aec-4750-97c6-c5121f277a76-rrccec.png&w=3840&q=75"
         modules={26}/>
        <Course name="Building a full stack Notion clone." price={0} img="https://www.codewithantonio.com/_next/image?url=https%3A%2F%2Futfs.io%2Ff%2F7b009b26-3dd8-4947-a3d6-c3f7e7420990-c91s7l.png&w=3840&q=75"
         modules={6} progress={"45"}/>
        <Course name="Building a full stack Notion clone." price={0} img="https://www.codewithantonio.com/_next/image?url=https%3A%2F%2Futfs.io%2Ff%2Fe6f358fe-6753-4619-8ec4-23cef6f8d135-ui8fxx.jpg&w=3840&q=75"
         modules={5}/>
        <Course name="Building a full stack Notion clone." price={0} img="https://www.codewithantonio.com/_next/image?url=https%3A%2F%2Futfs.io%2Ff%2F1f1d8303-ee61-4c4f-bd11-1f2eb08f4e34-5epwqe.jpg&w=3840&q=75"
         modules={15}/>
        <Course name="Building a full stack Notion clone." price={0} img="https://www.codewithantonio.com/_next/image?url=https%3A%2F%2Futfs.io%2Ff%2F1f1d8303-ee61-4c4f-bd11-1f2eb08f4e34-5epwqe.jpg&w=3840&q=75"
         modules={34}/>
        <Course name="Building a full stack Notion clone." price={0} img="https://www.codewithantonio.com/_next/image?url=https%3A%2F%2Futfs.io%2Ff%2F06ceaef3-36db-42c0-b06e-85a81663a380-idym73.jpg&w=3840&q=75"
         modules={15}/>
        <Course name="Building a full stack Notion clone." price={0} img="https://www.codewithantonio.com/_next/image?url=https%3A%2F%2Futfs.io%2Ff%2Fb737448e-ffb5-4bee-bb92-9024975023c3-9y3shz.jpg&w=3840&q=75"
         modules={15}/>
        <Course name="Building a full stack Notion clone." price={150} img="https://www.codewithantonio.com/_next/image?url=https%3A%2F%2Futfs.io%2Ff%2F18edd9d3-68fe-4d94-b0ff-56413985fd3a-eib4az.jpg&w=3840&q=75"
          modules={15}/>
      </div>
    </div>
  );
}
