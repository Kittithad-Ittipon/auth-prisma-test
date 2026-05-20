"use client";

import { FaFacebook, FaGithub, FaRegCopyright } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="w-full h-[120px] bg-black/90 dark:bg-[oklch(0.2_0_0)] flex flex-col justify-start items-center p-5 gap-6">
      <div className="w-full flex justify-center items-center gap-6">
        <a
          href="https://www.facebook.com/a.kittihad"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook className="text-white cursor-pointer h-6 w-6 hover:text-blue-400 transition duration-200" />
        </a>
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=adocs.deploy@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiGmail className="text-white cursor-pointer h-6 w-6 hover:text-red-400 transition duration-200"/>
        </a>
        <a
          href="https://github.com/Kittithad-Ittipon"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="text-white cursor-pointer h-6 w-6 hover:text-gray-400 transition duration-200"/>
        </a>
      </div>
      <div className="text-white flex justify-center items-center text-[10px] md:text-sm xl:text-sm xl:font-[500] gap-3">
        <FaRegCopyright className="text-white cursor-pointer h-4 w-4" />
        <p>1.0.1</p>
        <p>
          Kittithad Ittipon 2026
        </p>
      </div>
    </footer>
  );
}
