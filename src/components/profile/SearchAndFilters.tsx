import { Search } from "lucide-react";

interface SearchAndFiltersProps {
  searchValue: string;
  selectedGrade: string;
  selectedSubject: string;
  onSearchChange: (value: string) => void;
  onGradeChange: (grade: string) => void;
  onSubjectChange: (subject: string) => void;
  grades?: string[];
  subjects?: string[];
}

export default function SearchAndFilters({
  searchValue,
  selectedGrade,
  selectedSubject,
  onSearchChange,
  onGradeChange,
  onSubjectChange,
  grades = ["All Grades", "Grade 9", "Grade 10", "Grade 11", "Grade 12"],
  subjects = ["All Subjects", "Maths", "History", "Science", "English"],
}: SearchAndFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-5 mb-[60px]">
      <div className="flex-1 relative h-[52px]">
        <Search className="absolute left-[13px] top-[13px] text-[#888888] w-[26px] h-[26px]" />
        <input
          type="text"
          placeholder="Search your Name, Grade or Subject"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full h-full pl-[50px] pr-4 border border-[#D9D9D9] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-[18px] leading-[24px] font-medium tracking-[0.02em] text-[#888888] placeholder:text-[#888888] bg-[#FDFDFD]"
        />
      </div>
      <div className="flex gap-5">
        <select
          value={selectedGrade}
          onChange={(e) => onGradeChange(e.target.value)}
          className="h-[52px] pl-5 pr-4 py-[14px] border border-[#D9D9D9] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-[#FDFDFD] text-[18px] leading-[24px] font-medium tracking-[0.02em] text-[#888888] min-w-[180px] cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23888888%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:20px_20px] bg-[right_16px_center] bg-no-repeat"
        >
          {grades.map((grade) => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </select>
        <select
          value={selectedSubject}
          onChange={(e) => onSubjectChange(e.target.value)}
          className="h-[52px] pl-5 pr-4 py-[14px] border border-[#D9D9D9] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-[#FDFDFD] text-[18px] leading-[24px] font-medium tracking-[0.02em] text-[#888888] min-w-[180px] cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23888888%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:20px_20px] bg-[right_16px_center] bg-no-repeat"
        >
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
