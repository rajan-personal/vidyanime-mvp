"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface HeaderProps {
  activeTab?: "principal" | "teacher" | "school";
  profileAvatar?: string;
}

export default function Header({
  activeTab = "principal",
  profileAvatar = "https://randomuser.me/api/portraits/women/44.jpg",
}: HeaderProps) {
  const router = useRouter();

  const handleNavigation = (tab: "principal" | "teacher" | "school") => {
    switch (tab) {
      case "principal":
        router.push("/principal-dashboard");
        break;
      case "teacher":
        router.push("/teachers-list");
        break;
      case "school":
        router.push("/school-dashboard");
        break;
    }
  };

  return (
    // Header - fixed positioned, full width, reduced height
    <header className="fixed top-0 left-0 w-full h-[100px] bg-white shadow-[0px_4px_8px_rgba(0,0,0,0.02)] z-50 flex items-center">
      {/* Container with horizontal padding only, centered vertically */}
      <div className="w-full px-[130px]">
        {/* Frame 1171276035 - Main content container */}
        <div className="flex flex-row items-center gap-[169px] w-[1180px]">
          {/* Frame 1171276028 - Logo and Title - Clickable to go to select-profile */}
          <Link
            href="/select-profile"
            className="flex flex-row items-center gap-[20px] w-[306px] h-[80px] cursor-pointer hover:opacity-80 transition-opacity"
          >
            {/* Logo - 80px × 80px */}
            <div className="w-[80px] h-[80px] flex-none">
              <Image
                src="/logo.svg"
                alt="Vidyanime Logo"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
            {/* Title - Poppins, 20px, line-height 28px, font-semibold */}
            <div className="w-[206px] h-[56px] flex items-center">
              <h1 className="font-semibold text-[20px] leading-[28px] text-[#1357C6]" style={{ fontFamily: 'var(--font-poppins)' }}>
                Vidyanime
              </h1>
            </div>
          </Link>

          {/* Nav - 480px × 56px */}
          <nav className="relative w-[480px] h-[56px] flex-none">
            {/* Principal tab - left: 40px, top: 14px */}
            <button
              onClick={() => handleNavigation("principal")}
              className="absolute left-[40px] top-[14px] w-[82px] h-[28px] cursor-pointer hover:opacity-70 transition-opacity"
            >
              <span
                className={`font-['Noto_Sans'] text-[20px] leading-[28px] text-center ${
                  activeTab === "principal" ? "font-medium" : "font-normal"
                } text-[#4E4E4E]`}
              >
                Principal
              </span>
            </button>

            {/* Teacher tab - left: 203px, top: 14px */}
            <button
              onClick={() => handleNavigation("teacher")}
              className="absolute left-[203px] top-[14px] w-[74px] h-[28px] cursor-pointer hover:opacity-70 transition-opacity"
            >
              <span
                className={`font-['Noto_Sans'] text-[20px] leading-[28px] text-center ${
                  activeTab === "teacher" ? "font-medium" : "font-normal"
                } text-[#4E4E4E]`}
              >
                Teacher
              </span>
            </button>

            {/* School tab - left: 367.5px, top: 14px */}
            <button
              onClick={() => handleNavigation("school")}
              className="absolute left-[367.5px] top-[14px] w-[64px] h-[28px] cursor-pointer hover:opacity-70 transition-opacity"
            >
              <span
                className={`font-['Noto_Sans'] text-[20px] leading-[28px] text-center ${
                  activeTab === "school" ? "font-medium" : "font-normal"
                } text-[#4E4E4E]`}
              >
                School
              </span>
            </button>

            {/* Active indicator - Rectangle 34 - 160px wide, 5px height */}
            {activeTab === "principal" && (
              <div className="absolute left-0 top-[51px] w-[160px] h-[5px] bg-[#1357C6] rounded-[12px]" />
            )}
            {activeTab === "teacher" && (
              <div className="absolute left-[163px] top-[51px] w-[160px] h-[5px] bg-[#1357C6] rounded-[12px]" />
            )}
            {activeTab === "school" && (
              <div className="absolute left-[320px] top-[51px] w-[160px] h-[5px] bg-[#1357C6] rounded-[12px]" />
            )}
          </nav>

          {/* Profile Avatar - Ellipse 7 - 56px × 56px */}
          <div className="w-[56px] h-[56px] rounded-full overflow-hidden flex-none">
            <Image
              src={profileAvatar}
              alt="Profile"
              width={56}
              height={56}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
