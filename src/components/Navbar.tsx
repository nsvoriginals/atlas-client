import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

export default function Navbar() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const links: string[] = ["Docs", "About", "Contact"];

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-300/30 shadow-sm max-w-screen-xl mx-auto py-6 px-10 flex items-center">
      <h1 className="font-base text-2xl font-bold flex-1">LOGO</h1>

      <div className="flex-1 flex justify-center">
        <div className="flex items-center gap-10">
          {links.map((text, index) => (
            <Link
              key={index}
              className="relative font-base flex items-center gap-2"
              to={`/${text.toLowerCase()}`}
              onClick={() => setActiveIndex(index)}
            >
              <span
                className={`absolute -left-3 transition-all duration-300 ease-out transform ${
                  activeIndex === index ? "scale-100 opacity-100" : "scale-0 opacity-0"
                }`}
              >
                <span className="inline-block h-2 w-2 rounded-full bg-blue-400"></span>
              </span>
              <span className="pl-1">{text}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex-1 flex justify-end gap-5">
        <Button text="Login" />
        <Button text="Register" />
      </div>
    </div>
  );
}
