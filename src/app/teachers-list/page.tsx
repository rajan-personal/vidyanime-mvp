"use client";

import { useState } from "react";
import Header from "@/components/navigation/Header";
import SearchAndFilters from "@/components/profile/SearchAndFilters";
import TeacherCard from "@/components/profile/TeacherCard";
import {
  profileAvatarByName,
  defaultMaleAvatar,
  defaultFemaleAvatar,
} from "@/data/profileAvatars";

export default function TeachersList() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("All Grades");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");

  const teachers = [
    {
      id: 1,
      name: "Mr. Ajay Singh",
      grade: "Grade 9 & 10",
      subject: "Geography",
      avatar: profileAvatarByName["Mr. Ajay Singh"] ?? defaultMaleAvatar,
    },
    {
      id: 2,
      name: "Ms. Priyanka Subramaniam",
      grade: "Grade 9",
      subject: "History",
      avatar: profileAvatarByName["Ms. Priyanka Subramaniam"] ?? defaultFemaleAvatar,
    },
    {
      id: 3,
      name: "Mrs. Sushmita Kapoor",
      grade: "Grade 9",
      subject: "Geography",
      avatar: profileAvatarByName["Mrs. Sushmita Kapoor"] ?? defaultFemaleAvatar,
    },
    {
      id: 4,
      name: "Mr. Aniket Kashyap",
      grade: "Grade 9",
      subject: "Political Science",
      avatar: profileAvatarByName["Mr. Aniket Kashyap"] ?? defaultMaleAvatar,
    },
    {
      id: 5,
      name: "Mr. Manish Sahu",
      grade: "Grade 9",
      subject: "Economics",
      avatar: profileAvatarByName["Mr. Manish Sahu"] ?? defaultMaleAvatar,
    },
    {
      id: 6,
      name: "Ms. Kangana Rathod",
      grade: "Grade 9",
      subject: "Physics",
      avatar: profileAvatarByName["Ms. Kangana Rathod"] ?? defaultFemaleAvatar,
    },
    {
      id: 7,
      name: "Ms. Lavanya Rameshwar",
      grade: "Grade 9",
      subject: "Biology",
      avatar: profileAvatarByName["Ms. Lavanya Rameshwar"] ?? defaultFemaleAvatar,
    },
    {
      id: 8,
      name: "Ms. Urmila Oberoi",
      grade: "Grade 9",
      subject: "Chemistry",
      avatar: profileAvatarByName["Ms. Urmila Oberoi"] ?? defaultFemaleAvatar,
    },
  ];

  const subjects = [
    "All Subjects",
    "Maths",
    "History",
    "Geography",
    "Political Science",
    "Economics",
    "Physics",
    "Chemistry",
    "Biology",
  ];

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <Header activeTab="teacher" />

      {/* Main Content - Add top padding to account for fixed header */}
      <div className="pt-[130px] max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-[26px] leading-[38px] font-semibold text-[#4E4E4E] mb-6">
          Teachers List
        </h2>

        <div className="bg-white rounded-[20px] shadow-[0px_0px_8px_rgba(0,0,0,0.06)] p-[60px]">
          <SearchAndFilters
            searchValue={searchValue}
            selectedGrade={selectedGrade}
            selectedSubject={selectedSubject}
            onSearchChange={setSearchValue}
            onGradeChange={setSelectedGrade}
            onSubjectChange={setSelectedSubject}
            subjects={subjects}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[60px] gap-y-[35px]">
            {teachers.map((teacher) => (
              <TeacherCard
                key={teacher.id}
                id={teacher.id}
                name={teacher.name}
                grade={teacher.grade}
                subject={teacher.subject}
                avatar={teacher.avatar}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
