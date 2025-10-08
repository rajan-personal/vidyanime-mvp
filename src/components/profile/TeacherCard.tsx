"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface TeacherCardProps {
  id: number;
  name: string;
  grade: string;
  subject: string;
  avatar?: string;
}

export default function TeacherCard({
  id,
  name,
  grade,
  subject,
  avatar,
}: TeacherCardProps) {
  const router = useRouter();
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  const handleClick = () => {
    router.push(`/teacher-dashboard?id=${id}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="border border-[#D9D9D9] rounded-[20px] p-5 hover:shadow-lg hover:border-blue-200 transition-all duration-300 bg-white cursor-pointer"
    >
      <div className="flex items-center gap-[21px]">
        <div className="relative w-[80px] h-[80px] rounded-full bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-500 flex-shrink-0">
          {avatar ? (
            <Image
              src={avatar}
              alt={name}
              width={80}
              height={80}
              unoptimized
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <div className="w-full h-full rounded-full flex items-center justify-center text-white text-xl font-bold">
              {initials}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-medium text-[#4E4E4E] text-[20px] leading-[28px]">
            {name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-[16px] leading-[22px] text-[#4E4E4E]">
              {grade}
            </span>
            <div className="w-1 h-1 rounded-full bg-[#4E4E4E]"></div>
            <span className="text-[16px] leading-[22px] text-[#4E4E4E]">
              {subject}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
