"use client";

import Image from "next/image";
import { Mail, Phone, Edit2 } from "lucide-react";
import Header from "@/components/navigation/Header";
import { profileAvatarByName, defaultFemaleAvatar } from "@/data/profileAvatars";

export default function PrincipalDashboard() {
  const profileData = {
    name: "Mrs. Pooja Tripathi",
    role: "Principal",
    school: "Delhi Public School, Noida",
    email: "principal@dpsnoida.edu.in",
    phone: "+91 98765 43210",
  avatar: profileAvatarByName["Mrs. Pooja Tripathi"] ?? defaultFemaleAvatar,
    about:
      "Educational visionary with over 20 years of experience in academic leadership. Committed to creating an environment that fosters innovation, critical thinking, and holistic development for all students.",
    education: [
      {
        degree: "Ph.D. in Educational Leadership",
        institution: "Delhi University",
        year: "2005",
      },
      {
        degree: "M.Ed. in Curriculum Development",
        institution: "Jawaharlal Nehru University",
        year: "2000",
      },
      {
        degree: "B.Ed. in Science Education",
        institution: "Banaras Hindu University",
        year: "1998",
      },
    ],
    achievements: [
      {
        title: "National Education Leadership Award",
        year: "2018",
      },
      {
        title: "CBSE Innovative Principal Award",
        year: "2016",
      },
      {
        title: "Excellence in School Administration",
        year: "2014",
      },
    ],
  };

  const handleEditProfile = () => {
    console.log("Edit profile clicked");
    // Add edit profile logic here
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <Header activeTab="principal" profileAvatar={profileData.avatar} />

      {/* Main Content - Add top padding to account for fixed header */}
      <div className="pt-[130px] max-w-7xl mx-auto px-6 py-8">
        {/* Profile Header Card */}
        <div className="bg-white rounded-[20px] shadow-[0px_0px_8px_rgba(0,0,0,0.06)] p-[35px] mb-6">
          <div className="flex items-center justify-between gap-[356px]">
            <div className="flex items-center gap-[26px]">
              <div className="w-[150px] h-[150px] overflow-hidden rounded-full flex-shrink-0">
                <Image
                  src={profileData.avatar}
                  alt={profileData.name}
                  width={150}
                  height={150}
                  unoptimized
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-[26px]">
                <div className="flex flex-col gap-1">
                  <h2 className="text-[28px] leading-[38px] font-semibold text-[#4E4E4E]">
                    {profileData.name}
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-[20px] leading-[28px] text-[#4E4E4E]">
                      {profileData.role}
                    </span>
                    <div className="w-1 h-1 rounded-full bg-[#4E4E4E]"></div>
                    <span className="text-[20px] leading-[28px] text-[#4E4E4E]">
                      {profileData.school}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-[17px]">
                  <a
                    href={`mailto:${profileData.email}`}
                    className="flex items-center gap-2 px-[11px] py-[11px] bg-[rgba(74,143,255,0.05)] border border-[rgba(74,143,255,0.1)] rounded-[10px]"
                  >
                    <Mail className="w-4 h-4 text-[#4A8FFF]" />
                    <span className="text-[16px] leading-[22px] text-[#4E4E4E]">
                      {profileData.email}
                    </span>
                  </a>
                  <a
                    href={`tel:${profileData.phone}`}
                    className="flex items-center gap-2 px-[11px] py-[11px] bg-[rgba(74,143,255,0.05)] border border-[rgba(74,143,255,0.1)] rounded-[10px]"
                  >
                    <Phone className="w-4 h-4 text-[#4A8FFF]" />
                    <span className="text-[16px] leading-[22px] text-[#4E4E4E]">
                      {profileData.phone}
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <button
              onClick={handleEditProfile}
              className="flex items-center justify-center gap-2 bg-[#1357C6] text-white px-4 py-3 rounded-[30px] text-[16px] leading-[22px] font-medium hover:bg-blue-700 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-[20px] shadow-[0px_0px_8px_rgba(0,0,0,0.06)] p-[35px] mb-6">
          <div className="flex flex-col gap-5">
            <h3 className="text-[20px] leading-[22px] font-semibold text-[#4E4E4E]">
              About
            </h3>
            <p className="text-[16px] leading-[22px] text-[#4E4E4E]">
              {profileData.about}
            </p>
          </div>
        </div>

        {/* Education and Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Education Section */}
          <div className="bg-white rounded-[20px] shadow-[0px_0px_8px_rgba(0,0,0,0.06)] p-[35px]">
            <div className="flex flex-col gap-5">
              <h3 className="text-[20px] leading-[22px] font-semibold text-[#4E4E4E]">
                Education
              </h3>
              <div className="flex flex-col gap-[15px]">
                {profileData.education.map((edu, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 h-[90px] bg-[rgba(74,143,255,0.05)] border border-[rgba(74,143,255,0.1)] rounded-[10px] overflow-hidden"
                  >
                    <div className="w-[10px] h-full bg-[#4A8FFF] flex-shrink-0"></div>
                    <div className="flex-1 pr-4">
                      <h4 className="font-semibold text-[#4E4E4E] text-[16px] leading-[22px] mb-0.5">
                        {edu.degree}
                      </h4>
                      <p className="text-[16px] leading-[22px] text-[#4E4E4E] mb-0.5">
                        {edu.institution}
                      </p>
                      <p className="text-[16px] leading-[22px] text-[#4E4E4E]">
                        {edu.year}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements Section */}
          <div className="bg-white rounded-[20px] shadow-[0px_0px_8px_rgba(0,0,0,0.06)] p-[35px]">
            <div className="flex flex-col gap-5">
              <h3 className="text-[20px] leading-[22px] font-semibold text-[#4E4E4E]">
                Achievements
              </h3>
              <div className="flex flex-col gap-[15px]">
                {profileData.achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 h-[90px] bg-[rgba(255,170,0,0.05)] border border-[rgba(255,170,0,0.1)] rounded-[10px] overflow-hidden"
                  >
                    <div className="w-[10px] h-full bg-[#FFAA00] flex-shrink-0"></div>
                    <div className="flex-1 pr-4">
                      <h4 className="font-semibold text-[#4E4E4E] text-[16px] leading-[22px] mb-0.5">
                        {achievement.title}
                      </h4>
                      <p className="text-[16px] leading-[22px] text-[#4E4E4E]">
                        {achievement.year}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
