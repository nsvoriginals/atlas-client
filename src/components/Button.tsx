import { BsArrowReturnRight } from "react-icons/bs";
 
interface ButtonProps{
    text:string,
    onClick?:()=>void;
}
export default function Button({ text,onClick }:ButtonProps) {
  return (
    <button onClick={onClick} className="hidden lg:inline-flex items-center justify-center px-5 py-2.5 text-base text-white bg-black rounded-full transition-all duration-200 hover:bg-blue-300 hover:text-black focus:text-black focus:bg-blue-300">
      {text}
      
    </button>
  );
}