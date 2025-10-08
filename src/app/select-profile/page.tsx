"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Users, GraduationCap } from "lucide-react";
import PageHeader from "@/components/profile/PageHeader";
import SearchAndFilters from "@/components/profile/SearchAndFilters";
import ProfileSection from "@/components/profile/ProfileSection";

export default function SelectProfile() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("All Grades");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");

  const profiles = {
    principal: [
      {
        id: 1,
        name: "Mrs. Pooja Tripathi",
        role: "Principal",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      },
    ],
    teachers: [
      {
        id: 2,
        name: "Mr. Ajay Singh",
        role: "Grade 9 & 10 • Geography",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      {
        id: 3,
        name: "Ms. Priyanka Subramaniam",
        role: "Grade 9 • History",
        avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      },
    ],
  };

  const handleContactSupport = () => {
    console.log("Contact support clicked");
    // Add your contact support logic here
    // For now, could open a modal or redirect to a support page
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    // Navigate to login page or clear session
    router.push("/login");
  };

  const handleProfileLogin = (profileId: number) => {
    console.log("Login to profile:", profileId);
    // Navigate based on profile type
    if (profileId === 1) {
      // Principal profile
      router.push("/principal-dashboard");
    } else {
      // Teacher profiles - go to teachers list
      router.push("/teachers-list");
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] py-8 px-4">
      <PageHeader
        title="Select Your Profile to Access Dashboard"
        onContactSupport={handleContactSupport}
        onLogout={handleLogout}
      />

      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-[20px] shadow-[0px_0px_8px_rgba(0,0,0,0.06)] p-[60px]">
          <SearchAndFilters
            searchValue={searchValue}
            selectedGrade={selectedGrade}
            selectedSubject={selectedSubject}
            onSearchChange={setSearchValue}
            onGradeChange={setSelectedGrade}
            onSubjectChange={setSelectedSubject}
          />

          <div className="mb-[30px]">
            <ProfileSection
              title="Principal"
              icon={GraduationCap}
              profiles={profiles.principal}
              onProfileLogin={handleProfileLogin}
            />
          </div>

          <ProfileSection
            title="Teachers"
            icon={Users}
            profiles={profiles.teachers}
            onProfileLogin={handleProfileLogin}
          />
        </div>
      </div>
    </div>
  );
}
