"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/navigation/Header";
import { teacherChapters } from "@/data/teacherChapters";
import { Edit2 } from "lucide-react";

const teacherData = {
  name: "Mr. Ajay Singh",
  grade: "Grade 9 & 10",
  subject: "Geography",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
};

const chapterVisualStyles: Record<string, string> = {
  "india-size-and-location": "from-[#26C6DA] to-[#00ACC1]",
  "physical-features-of-india": "from-[#AED581] to-[#9CCC65]",
  "drainage-systems-of-india": "from-[#FFA726] via-[#FF7043] to-[#5C6BC0]",
  "resources-and-development": "from-[#7F7FD5] via-[#86A8E7] to-[#91EAE4]",
  "forest-and-wildlife-resources": "from-[#FF9A9E] via-[#FECFEF] to-[#FAD0C4]",
  "water-resources": "from-[#43CEA2] to-[#185A9D]",
};

const sectionConfig = [
  {
    title: "Class 9th Geography",
    grade: "Grade 9" as const,
  },
  {
    title: "Class 10th Geography",
    grade: "Grade 10" as const,
  },
];

function ChapterCard({
  slug,
  chapterNumber,
  title,
}: {
  slug: string;
  chapterNumber: number;
  title: string;
}) {
  const gradient = chapterVisualStyles[slug] ?? "from-[#26C6DA] to-[#00ACC1]";

  return (
    <Link
      href={`/teacher-dashboard/${slug}`}
  className="block border border-[#D9D9D9] bg-white rounded-[20px] shadow-[0px_0px_8px_rgba(0,0,0,0.06)] p-[16px] transition-all duration-200 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1357C6]"
    >
      <div
        className={`relative w-full h-[180px] rounded-[12px] overflow-hidden mb-[10px] bg-gradient-to-br ${gradient}`}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-4">
          <span className="text-white/80 text-xs uppercase tracking-[0.3em]">
            Chapter {chapterNumber}
          </span>
          <span className="text-white text-3xl font-semibold leading-tight drop-shadow-md">
            {title}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/15" />
      </div>
      <div className="flex items-start gap-[10px]">
        <span className="font-['Noto_Sans'] font-semibold text-[18px] leading-[24px] text-[#4E4E4E]">
          Chapter {chapterNumber}:
        </span>
        <span className="font-['Noto_Sans'] font-medium text-[18px] leading-[24px] text-[#4E4E4E]">
          {title}
        </span>
      </div>
    </Link>
  );
}

export default function TeacherDashboard() {
  const handleEditProfile = () => {
    console.log("Edit profile clicked");
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <Header activeTab="teacher" profileAvatar={teacherData.avatar} />

      <div className="pt-[156px] px-[130px] pb-8">
        <div className="w-full max-w-[1180px] mx-auto bg-white rounded-[20px] shadow-[0px_0px_8px_rgba(0,0,0,0.06)] p-[35px] mb-[30px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[26px]">
              <div className="w-[100px] h-[100px] overflow-hidden rounded-full flex-shrink-0">
                <Image
                  src={teacherData.avatar}
                  alt={teacherData.name}
                  width={100}
                  height={100}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-[4px]">
                <h2 className="font-['Noto_Sans'] font-medium text-[28px] leading-[38px] text-[#4E4E4E]">
                  {teacherData.name}
                </h2>
                <div className="flex items-center gap-[8px]">
                  <span className="font-['Noto_Sans'] font-normal text-[20px] leading-[28px] text-[#4E4E4E]">
                    {teacherData.grade}
                  </span>
                  <div className="w-[4px] h-[4px] rounded-full bg-[#4E4E4E]" />
                  <span className="font-['Noto_Sans'] font-normal text-[20px] leading-[28px] text-[#4E4E4E]">
                    {teacherData.subject}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={handleEditProfile}
              className="flex items-center justify-center gap-[8px] px-[16px] py-[12px] bg-[#1357C6] rounded-[30px] hover:bg-blue-700 transition-colors"
            >
              <Edit2 className="w-[16px] h-[16px] text-white" />
              <span className="font-['Noto_Sans'] font-medium text-[16px] leading-[22px] text-white whitespace-nowrap">
                Edit Profile
              </span>
            </button>
          </div>
        </div>

        {sectionConfig.map(({ title, grade }) => {
          const chapters = teacherChapters.filter((chapter) => chapter.grade === grade);

          return (
            <section
              key={grade}
              className="w-full max-w-[1180px] mx-auto bg-white rounded-[20px] shadow-[0px_0px_8px_rgba(0,0,0,0.06)] p-[35px] mb-[30px]"
            >
              <div className="flex items-center justify-between mb-[26px]">
                <h3 className="font-['Noto_Sans'] font-semibold text-[26px] leading-[36px] text-[#4E4E4E]">
                  {title}
                </h3>
                <button className="px-[16px] py-[12px] border border-[#D9D9D9] rounded-[40px] hover:bg-gray-50 transition-colors">
                  <span className="font-['Noto_Sans'] font-medium text-[20px] leading-[28px] text-[#4E4E4E]">
                    See All Chapters
                  </span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-[15px] sm:grid-cols-2 lg:grid-cols-3">
                {chapters.map((chapter) => (
                  <ChapterCard
                    key={chapter.slug}
                    slug={chapter.slug}
                    chapterNumber={chapter.chapterNumber}
                    title={chapter.title}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
