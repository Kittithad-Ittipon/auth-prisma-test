"use client";

import { FaChessKnight } from "react-icons/fa";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/dist/client/components/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const toLogin = () => {
    router.push("/login");
  };
  const toRegister = () => {
    router.push("/register");
  };
  return (
    <div className="w-full h-[120px] dark:bg-[oklch(0.2_0_0)] justify-between items-center px-4 flex px-5 xl:px-20">
      <div className="flex items-center">
        <div className="text-2xl xl:text-4xl font-[800]">
          <FaChessKnight />
        </div>
        <div className="text-2xl xl:text-4xl font-[800] ml-2">AKI</div>
      </div>
      <div className="gap-4 items-center hidden md:flex">
        <Button
          className="w-[80px] xl:w-[150px] h-[45px] cursor-pointer transition-colors duration-300 hover:bg-black/80 dark:hover:bg-white/70 font-[600]"
          onClick={toLogin}
        >
          Login
        </Button>
        <Button
          className="w-[80px] xl:w-[150px] h-[45px] cursor-pointer transition-colors duration-300 hover:bg-black/80 dark:hover:bg-white/70 font-[600]"
          onClick={toRegister}
        >
          Register
        </Button>
        <ThemeToggle />
      </div>
      <div className="text-xl md:hidden items-center cursor-pointer">
        {isOpen ? (
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <X size={28} onClick={() => setIsOpen(false)} />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Menu size={28} onClick={() => setIsOpen(true)} />
          </div>
        )}
      </div>
      {isOpen && (
        <div className="px-5 overflow-hidden absolute top-[120px] left-0 w-full bg-white dark:bg-[oklch(0.2_0_0)] flex flex-col items-center gap-4 py-4 md:hidden">
          <Button
            className="w-full h-[40px] cursor-pointer transition-colors duration-300 hover:bg-black/80 dark:hover:bg-white/70 font-[600]"
            onClick={toLogin}
          >
            Login
          </Button>
          <Button
            className="w-full h-[40px] cursor-pointer transition-colors duration-300 hover:bg-black/80 dark:hover:bg-white/70 font-[600]"
            onClick={toRegister}
          >
            Register
          </Button>
        </div>
      )}
    </div>
  );
};
export default Navbar;
