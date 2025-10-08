"use client";

import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import Header from "@/components/navigation/Header";

export default function SchoolDashboard() {
  const schoolData = {
    name: "Delhi Public School, Noida",
    description:
      "Educational visionary with over 20 years of experience in academic leadership. Committed to creating an environment that fosters innovation, critical thinking, and holistic development for all students.",
    email: "school@dpsnoida.edu.in",
    phone: "+91 98765 43210",
    address:
      "Near Dr. B.R. Ambedhkar Government Hospital, Sector 30, Noida, Gautam Budh Nagar, 201303",
    logo: "https://dpsjhakri.com/images/Bgphotos/dps_logo.jpg", // DPS School Logo
    banner: "https://www.dpsmathuraroad.org/images/videobg.jpg", // DPS School building background
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      {/* Header */}
      <Header activeTab="school" />

      {/* Main Content - positioned with symmetrical spacing (130px top and bottom) */}
      <div className="relative py-[130px]">
        {/* School Info Card - Positioned at left: 130px */}
        <div className="mx-auto" style={{ marginLeft: '130px', width: '1180px' }}>
          {/* Card Container with white background */}
          <div className="relative bg-white rounded-[20px] shadow-[0px_0px_8px_rgba(0,0,0,0.06)]">
            {/* Banner Section - 220px height */}
            <div className="relative h-[220px] rounded-t-[20px] overflow-hidden">
              {/* Banner Image */}
              <Image
                src={schoolData.banner}
                alt="School banner"
                fill
                className="object-cover"
              />
              {/* Overlay - rgba(0, 0, 0, 0.3) */}
              <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* School Logo - Positioned absolutely at left: 100px (relative to card), top: 125px (from banner top) */}
            <div className="absolute left-[100px] top-[125px] w-[150px] h-[150px] rounded-full overflow-hidden border-2 border-black shadow-[0px_8px_8px_rgba(0,0,0,0.06)] bg-white">
              <Image
                src={schoolData.logo}
                alt={schoolData.name}
                width={150}
                height={150}
                className="object-cover"
              />
            </div>

            {/* Content Section - starts after banner, padding top to account for overlapping logo */}
            <div className="pt-[125px] px-[100px] pb-[96px]">
              {/* Frame 1171276062 - flex column with 30px gap */}
              <div className="flex flex-col gap-[30px] w-[980px]">
                {/* School Name and Description - Frame 1171276060 */}
                <div className="flex flex-col gap-[10px] w-[980px]">
                  {/* School Name - 28px font, 38px line-height */}
                  <h1 className="text-[28px] leading-[38px] font-semibold text-[#4E4E4E]">
                    {schoolData.name}
                  </h1>

                  {/* Description - 20px font, 28px line-height */}
                  <p className="text-[20px] leading-[28px] font-normal text-[#4E4E4E]">
                    {schoolData.description}
                  </p>
                </div>

                {/* Contact Information - Frame 1171276061 - flex wrap with gap 21px/26px */}
                <div className="flex flex-wrap gap-x-[26px] gap-y-[21px] w-[753px]">
                  {/* Email - Frame 1171275974 */}
                  <div className="flex items-center gap-2 px-[11px] py-[11px] bg-[rgba(74,143,255,0.05)] border border-[rgba(74,143,255,0.1)] rounded-[10px] w-[247px] h-[44px]">
                    <Mail className="w-4 h-4 text-[#4A8FFF]" />
                    <span className="text-[16px] leading-[22px] font-normal text-[#4E4E4E]">
                      {schoolData.email}
                    </span>
                  </div>

                  {/* Phone - Frame 1171275975 */}
                  <div className="flex items-center gap-2 px-[11px] py-[11px] bg-[rgba(74,143,255,0.05)] border border-[rgba(74,143,255,0.1)] rounded-[10px] w-[174px] h-[44px]">
                    <Phone className="w-4 h-4 text-[#4A8FFF] flex-shrink-0" />
                    <span className="text-[16px] leading-[22px] font-normal text-[#4E4E4E] whitespace-nowrap">
                      {schoolData.phone}
                    </span>
                  </div>

                  {/* Address - Frame 1171275976 - full width 753px */}
                  <div className="flex items-center gap-2 px-[11px] py-[11px] bg-[rgba(74,143,255,0.05)] border border-[rgba(74,143,255,0.1)] rounded-[10px] w-[753px] h-[44px]">
                    <MapPin className="w-4 h-4 text-[#4A8FFF] flex-shrink-0" />
                    <span className="text-[16px] leading-[22px] font-normal text-[#4E4E4E] whitespace-nowrap">
                      {schoolData.address}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
