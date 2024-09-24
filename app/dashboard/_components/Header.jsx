"use client";
import { useState, useEffect } from "react";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    console.log(path);
  }, [path]);

  // Function to handle navigation
  const handleNavigation = (path) => {
    router.push(path); // Use router.push to navigate to the path
    setIsMenuOpen(false); // Close the mobile menu after navigation
  };

  return (
    <header className="bg-black text-gray-300 shadow-sm sticky top-0 z-50">
      <div className="flex p-4 items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo-removebg-preview (2).svg"
            width={160}
            height={100}
            alt="logo"
          />
        </Link>

        {/* Hamburger menu icon for mobile */}
        <button
          className="md:hidden text-gray-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Desktop navigation */}
        <ul className="hidden md:flex gap-8 items-center">
          <li
            className={`hover:text-[#FFD700] hover:font-bold transition-all duration-300 ease-in-out cursor-pointer ${
              path === "/dashboard" ? "text-[#FFD700] font-bold border-b-2 border-[#FFD700]" : ""
            }`}
            onClick={() => handleNavigation("/dashboard")}
          >
            Dashboard 📊
          </li>
          <li
            className={`hover:text-[#FFD700] hover:font-bold transition-all duration-300 ease-in-out cursor-pointer ${
              path === "/dashboard/howitworks" ? "text-[#FFD700] font-bold border-b-2 border-[#FFD700]" : ""
            }`}
            onClick={() => handleNavigation("/dashboard/howitworks")}
          >
            How it Works? 📚
          </li>
          <li
            className={`hover:text-[#FFD700] hover:font-bold transition-all duration-300 ease-in-out cursor-pointer ${
              path === "/dashboard/userreviews" ? "text-[#FFD700] font-bold border-b-2 border-[#FFD700]" : ""
            }`}
            onClick={() => handleNavigation("/dashboard/userreviews")}
          >
            User Reviews 💬
          </li>
          <li
            className={`hover:text-[#FFD700] hover:font-bold transition-all duration-300 ease-in-out cursor-pointer ${
              path === "/dashboard/interviewguide" ? "text-[#FFD700] font-bold border-b-2 border-[#FFD700]" : ""
            }`}
            onClick={() => handleNavigation("/dashboard/interviewguide")}
          >
            Interview Guide 🎯
          </li>
          <li
            className={`hover:text-[#FFD700] hover:font-bold transition-all duration-300 ease-in-out cursor-pointer ${
              path === "/dashboard/upgrade" ? "text-[#FFD700] font-bold border-b-2 border-[#FFD700]" : ""
            }`}
            onClick={() => handleNavigation("/dashboard/upgrade")}
          >
            Upgrade 🚀
          </li>
        </ul>

        {/* User Button */}
        <div className="flex items-center space-x-4">
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-10 h-10 bg-gray-800 border-2 border-[#FFD700] rounded-full",
                userButtonTrigger: "hover:bg-gray-800 transition-colors duration-300 p-1 rounded-full",
              },
            }}
          />
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${
          isMenuOpen ? "max-h-40" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-4 p-4 bg-gray-800">
          <li
            className={`hover:text-[#FFD700] hover:font-bold transition-all duration-300 ease-in-out cursor-pointer ${
              path === "/dashboard" ? "text-[#FFD700] font-bold border-b-2 border-[#FFD700]" : ""
            }`}
            onClick={() => handleNavigation("/dashboard")}
          >
            Dashboard 📊
          </li>
          <li
            className={`hover:text-[#FFD700] hover:font-bold transition-all duration-300 ease-in-out cursor-pointer ${
              path === "/dashboard/howitworks" ? "text-[#FFD700] font-bold border-b-2 border-[#FFD700]" : ""
            }`}
            onClick={() => handleNavigation("/dashboard/howitworks")}
          >
            How it Works? 📚
          </li>
          <li
            className={`hover:text-[#FFD700] hover:font-bold transition-all duration-300 ease-in-out cursor-pointer ${
              path === "/dashboard/userreviews" ? "text-[#FFD700] font-bold border-b-2 border-[#FFD700]" : ""
            }`}
            onClick={() => handleNavigation("/dashboard/userreviews")}
          >
            User Reviews 💬
          </li>
          <li
            className={`hover:text-[#FFD700] hover:font-bold transition-all duration-300 ease-in-out cursor-pointer ${
              path === "/dashboard/interviewguide" ? "text-[#FFD700] font-bold border-b-2 border-[#FFD700]" : ""
            }`}
            onClick={() => handleNavigation("/dashboard/interviewguide")}
          >
            Interview Guide 🎯
          </li>
          <li
            className={`hover:text-[#FFD700] hover:font-bold transition-all duration-300 ease-in-out cursor-pointer ${
              path === "/dashboard/upgrade" ? "text-[#FFD700] font-bold border-b-2 border-[#FFD700]" : ""
            }`}
            onClick={() => handleNavigation("/dashboard/upgrade")}
          >
            Upgrade 🚀
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
