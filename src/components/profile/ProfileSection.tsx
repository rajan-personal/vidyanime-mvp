import { LucideIcon } from "lucide-react";
import ProfileCard from "./ProfileCard";

interface Profile {
  id: number;
  name: string;
  role: string;
  avatar?: string;
}

interface ProfileSectionProps {
  title: string;
  icon: LucideIcon;
  profiles: Profile[];
  onProfileLogin: (profileId: number) => void;
}

export default function ProfileSection({
  title,
  icon: Icon,
  profiles,
  onProfileLogin,
}: ProfileSectionProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-5 h-5 text-[#1357C6]" />
        <h2 className="text-[20px] leading-[28px] font-medium text-[#4E4E4E]">{title}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[60px] gap-y-[45px]">
        {profiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            name={profile.name}
            role={profile.role}
            avatar={profile.avatar}
            onLogin={() => onProfileLogin(profile.id)}
          />
        ))}
      </div>
    </div>
  );
}
