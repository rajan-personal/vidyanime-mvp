"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Users, GraduationCap } from "lucide-react";
import PageHeader from "@/components/profile/PageHeader";
import SearchAndFilters from "@/components/profile/SearchAndFilters";
import ProfileSection from "@/components/profile/ProfileSection";
import { profileAvatarByName, defaultFemaleAvatar, defaultMaleAvatar } from "@/data/profileAvatars";
import { useAuth } from "@/contexts/AuthContext";

export default function SelectProfile() {
  const router = useRouter();
  const { logout } = useAuth();
  const [searchValue, setSearchValue] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("All Grades");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");

  const profiles = {
    principal: [
      {
        id: 1,
        name: "Mrs. Pooja Tripathi",
        role: "Principal",
        avatar: profileAvatarByName["Mrs. Pooja Tripathi"] ?? defaultFemaleAvatar,
      },
    ],
    teachers: [
      {
        id: 2,
        name: "Mr. Ajay Singh",
        role: "Grade 9 & 10 • Geography",
        avatar: profileAvatarByName["Mr. Ajay Singh"] ?? defaultMaleAvatar,
      },
      {
        id: 3,
        name: "Ms. Priyanka Subramaniam",
        role: "Grade 9 • History",
        avatar: profileAvatarByName["Ms. Priyanka Subramaniam"] ?? defaultFemaleAvatar,
      },
    ],
  };

  const handleContactSupport = () => {
    console.log("Contact support clicked");
    // Add your contact support logic here
    // For now, could open a modal or redirect to a support page
  };

  const handleLogout = () => {
    logout();
    router.push("/");
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
