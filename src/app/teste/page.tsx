"use client";

import {Input} from "@/app/components/Input/Input";
import Prova from "../components/Avatar/Prova";
import LoginButton from "../components/auth/loginButton";





export default function Home() {

 


  return (
    <div className="p-20">
      <LoginButton> 
        <button>APERTAR</button>
      </LoginButton>    
      <div className="p-20">
        <Input />
      </div>
    </div>
  );
}


