import { notFound } from "next/navigation";

import Header from "@/components/navigation/Header";
import { ChapterExperienceClient } from "@/components/teacher/ChapterExperienceClient";
import { chapterBySlug, teacherChapters } from "@/data/teacherChapters";

const teacherAvatar = "https://randomuser.me/api/portraits/men/32.jpg";

interface ChapterPageProps {
  params: Promise<{
    chapterSlug: string;
  }>;
}

export default async function TeacherChapterPage({ params }: ChapterPageProps) {
  const { chapterSlug } = await params;
  const chapter = chapterBySlug(decodeURIComponent(chapterSlug));

  if (!chapter) {
    notFound();
  }

  return (
    <>
      <Header activeTab="teacher" profileAvatar={teacherAvatar} />
      <ChapterExperienceClient chapter={chapter} teacherAvatar={teacherAvatar} />
    </>
  );
}

export function generateStaticParams() {
  return teacherChapters.map((chapter) => ({
    chapterSlug: chapter.slug,
  }));
}
