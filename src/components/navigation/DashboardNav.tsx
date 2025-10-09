import Image from "next/image";
import { getAssetPath } from "@/utils/paths";
import { defaultFemaleAvatar } from "@/data/profileAvatars";

interface DashboardNavProps {
  activeTab?: "principal" | "teacher" | "school";
  subtitle?: string;
  profileAvatar?: string;
}

export default function DashboardNav({
  activeTab = "principal",
  subtitle = "Principal Dashboard",
  profileAvatar = defaultFemaleAvatar,
}: DashboardNavProps) {
  return (
    // Header - absolute positioned, 1440px wide, 156px height
    <header className="fixed top-0 left-0 w-full h-[156px] bg-white shadow-[0px_4px_8px_rgba(0,0,0,0.02)] z-50">
      {/* Padding: 38px 130px */}
      <div className="flex flex-col items-start px-[130px] py-[38px] gap-[10px]">
        {/* Frame 1171276035 - Main content container */}
        <div className="flex flex-row items-center gap-[169px] w-[1180px] h-[80px]">
          {/* Frame 1171276028 - Logo and Title */}
          <div className="flex flex-row items-center gap-[20px] w-[306px] h-[80px]">
            {/* Logo - 80px × 80px */}
            <div className="w-[80px] h-[80px] flex-none">
              <Image
                src={getAssetPath("logo.svg")}
                alt="Vidyanime Logo"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
            {/* Title - Poppins, 20px, line-height 28px, font-semibold */}
            <div className="w-[206px] h-[56px]">
              <h1 className="font-['Poppins'] font-semibold text-[20px] leading-[28px] text-[#1357C6]">
                Vidyanime {subtitle}
              </h1>
            </div>
          </div>

          {/* Nav - 480px × 56px */}
          <nav className="relative w-[480px] h-[56px] flex-none">
            {/* Principal tab - left: 40px, top: 14px */}
            <button className="absolute left-[40px] top-[14px] w-[82px] h-[28px]">
              <span
                className={`font-['Noto_Sans'] text-[20px] leading-[28px] text-center ${
                  activeTab === "principal" ? "font-medium" : "font-normal"
                } text-[#4E4E4E]`}
              >
                Principal
              </span>
            </button>

            {/* Teacher tab - left: 203px, top: 14px */}
            <button className="absolute left-[203px] top-[14px] w-[74px] h-[28px]">
              <span
                className={`font-['Noto_Sans'] text-[20px] leading-[28px] text-center ${
                  activeTab === "teacher" ? "font-medium" : "font-normal"
                } text-[#4E4E4E]`}
              >
                Teacher
              </span>
            </button>

            {/* School tab - left: 367.5px, top: 14px */}
            <button className="absolute left-[367.5px] top-[14px] w-[64px] h-[28px]">
              <span
                className={`font-['Noto_Sans'] text-[20px] leading-[28px] text-center ${
                  activeTab === "school" ? "font-medium" : "font-normal"
                } text-[#4E4E4E]`}
              >
                School
              </span>
            </button>

            {/* Active indicator - Rectangle 34 */}
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
              unoptimized
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
