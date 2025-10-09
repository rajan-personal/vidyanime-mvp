"use client";

import Image from "next/image";
import { Mail, Phone, Edit2, BookOpen, Clock, Users } from "lucide-react";
import Header from "@/components/navigation/Header";
import { profileAvatarByName, defaultMaleAvatar } from "@/data/profileAvatars";

export default function TeacherProfile() {
  const profileData = {
    name: "Mr. Ajay Singh",
    role: "Geography Teacher",
    school: "Delhi Public School, Noida",
    grade: "Grade 9 & 10",
    subject: "Geography",
    email: "ajay.singh@dpsnoida.edu.in",
    phone: "+91 98765 43211",
    avatar: profileAvatarByName["Mr. Ajay Singh"] ?? defaultMaleAvatar,
    about:
  "Dedicated geography educator with 12 years of experience helping Grades 9 and 10 students connect physical landscapes with human stories. Leads immersive field projects, integrates GIS tools into lessons, and advocates for sustainable development practices in the classroom and beyond.",
    education: [
      {
        degree: "M.A. in Geography",
        institution: "Jawaharlal Nehru University, Delhi",
        year: "2010",
      },
      {
        degree: "B.Ed. in Social Science Education",
        institution: "Delhi University",
        year: "2012",
      },
      {
        degree: "B.A. (Hons) in Geography",
        institution: "St. Stephen's College, Delhi",
        year: "2008",
      },
    ],
    achievements: [
      {
        title: "CBSE National Geography Mentor Award",
        year: "2023",
      },
      {
        title: "UNESCO Schools Sustainable Development Fellow",
        year: "2021",
      },
      {
        title: "Innovation in Experiential Learning Award",
        year: "2019",
      },
    ],
    stats: [
      {
        icon: BookOpen,
        label: "Subjects",
        value: "Physical Geography, Climatology, GIS",
      },
      {
        icon: Users,
        label: "Students",
        value: "150+ Active Students",
      },
      {
        icon: Clock,
        label: "Experience",
        value: "12 Years",
      },
    ],
  };

  const handleEditProfile = () => {
    console.log("Edit profile clicked");
    // Add edit profile logic here
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <Header activeTab="teacher" profileAvatar={profileData.avatar} />

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
                      {profileData.grade}
                    </span>
                  </div>
                  <span className="text-[18px] leading-[24px] text-[#4E4E4E]">
                    {profileData.school}
                  </span>
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {profileData.stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-[20px] shadow-[0px_0px_8px_rgba(0,0,0,0.06)] p-[25px]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-[50px] h-[50px] rounded-full bg-[rgba(74,143,255,0.1)] flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#4A8FFF]" />
                  </div>
                  <div>
                    <p className="text-[14px] leading-[20px] text-[#888888] mb-1">
                      {stat.label}
                    </p>
                    <p className="text-[16px] leading-[22px] font-semibold text-[#4E4E4E]">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
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
