import Image from "next/image";

interface ProfileCardProps {
  name: string;
  role: string;
  avatar?: string;
  onLogin: () => void;
}

export default function ProfileCard({
  name,
  role,
  avatar,
  onLogin,
}: ProfileCardProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="border border-[#D9D9D9] rounded-[20px] p-5 hover:shadow-lg hover:border-blue-200 transition-all duration-300 bg-white">
      <div className="flex items-center gap-[21px]">
        <div className="relative w-[112px] h-[112px] rounded-full bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-500 flex-shrink-0">
          {avatar ? (
            <Image
              src={avatar}
              alt={name}
              width={112}
              height={112}
              unoptimized
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <div className="w-full h-full rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {initials}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="font-medium text-[#4E4E4E] text-[20px] leading-[28px] truncate">
              {name}
            </h3>
            <p className="text-[16px] leading-[22px] text-[#4E4E4E]">{role}</p>
          </div>
          <button
            onClick={onLogin}
            className="bg-[#1357C6] text-white px-5 py-[10px] rounded-[20px] text-[16px] leading-[22px] font-normal hover:bg-[#1e40af] active:bg-[#1e3a8a] transition-all duration-200 whitespace-nowrap self-start text-center"
          >
            Login to your profile
          </button>
        </div>
      </div>
    </div>
  );
}
