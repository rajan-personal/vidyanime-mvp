"use client";

import { useState } from "react";
import Header from "@/components/navigation/Header";
import SearchAndFilters from "@/components/profile/SearchAndFilters";
import TeacherCard from "@/components/profile/TeacherCard";

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
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      name: "Ms. Priyanka Subramaniam",
      grade: "Grade 9",
      subject: "History",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      id: 3,
      name: "Mrs. Sushmita Kapoor",
      grade: "Grade 9",
      subject: "Geography",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 4,
      name: "Mr. Aniket Kashyap",
      grade: "Grade 9",
      subject: "Political Science",
      avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    },
    {
      id: 5,
      name: "Mr. Manish Sahu",
      grade: "Grade 9",
      subject: "Economics",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    },
    {
      id: 6,
      name: "Ms. Kangana Rathod",
      grade: "Grade 9",
      subject: "Physics",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      id: 7,
      name: "Ms. Lavanya Rameshwar",
      grade: "Grade 9",
      subject: "Biology",
      avatar: "https://randomuser.me/api/portraits/women/72.jpg",
    },
    {
      id: 8,
      name: "Ms. Urmila Oberoi",
      grade: "Grade 9",
      subject: "Chemistry",
      avatar: "https://randomuser.me/api/portraits/women/81.jpg",
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
