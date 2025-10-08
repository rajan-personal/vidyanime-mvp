import { Phone, LogOut } from "lucide-react";
import Image from "next/image";

interface PageHeaderProps {
  title: string;
  onContactSupport?: () => void;
  onLogout?: () => void;
}

export default function PageHeader({
  title,
  onContactSupport,
  onLogout,
}: PageHeaderProps) {
  return (
    <div className="max-w-7xl mx-auto mb-8">
      <div className="flex justify-between items-center flex-wrap gap-[333px]">
        <h1 className="text-[26px] leading-[36px] font-medium text-[#4E4E4E] text-center">
          {title}
        </h1>
        <div className="flex gap-3">
          {onContactSupport && (
            <button
              onClick={onContactSupport}
              className="flex items-center gap-2 px-[17px] py-3 text-[14px] leading-[20px] text-[#4E4E4E] transition-colors rounded-[10px] bg-white shadow-[0px_0px_8px_rgba(0,0,0,0.06)]"
            >
              <Phone className="w-5 h-5" />
              <span className="font-normal">Contact Support</span>
            </button>
          )}
          {onLogout && (
            <button
              onClick={onLogout}
              className="flex items-center gap-[10px] px-[17px] py-3 text-[14px] leading-[20px] text-[#4E4E4E] transition-colors rounded-[10px] bg-white shadow-[0px_0px_8px_rgba(0,0,0,0.06)]"
            >
              <LogOut className="w-5 h-5 text-[#CA0E1B]" />
              <span className="font-normal">Log out</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
