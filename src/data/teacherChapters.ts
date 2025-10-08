import { getAssetPath } from "@/utils/paths";

export type ChapterTimelineEntry = {
  label: string;
  timestamp: number; // seconds
};

export type ChapterDetails = {
  slug: string;
  title: string;
  chapterNumber: number;
  grade: string;
  subject: string;
  description: string;
  videoUrl: string;
  videoStreamUrl?: string;
  videoPoster?: string;
  timeline: ChapterTimelineEntry[];
  aiPrompt: string;
  aiSampleResponse: string[];
};

export const teacherChapters: ChapterDetails[] = [
  {
    slug: "india-size-and-location",
    title: "India: Size and Location",
    chapterNumber: 1,
    grade: "Grade 9",
    subject: "Geography",
    description:
      "Locate India on the globe, interpret its latitudinal and longitudinal extent, and analyse how position influences climate and connections with neighbouring countries.",
  videoUrl: getAssetPath("video.mp4"),
  videoStreamUrl: getAssetPath("video.mp4"),
    timeline: [
      { label: "Locating India globally", timestamp: 0 },
      { label: "Latitudes and longitudes", timestamp: 65 },
      { label: "India and its neighbours", timestamp: 135 },
      { label: "Time zones and IST", timestamp: 210 },
      { label: "Strategic significance", timestamp: 280 },
    ],
    aiPrompt:
  "Draft 4 reflective prompts that help Grade 9 learners analyse how India's location impacts its economy and culture.",
    aiSampleResponse: [
      "How does India's latitudinal extent contribute to the diversity in climate and vegetation?",
      "Why is the Indian Ocean named after India, and what does that reveal about India's maritime importance?",
      "How might India's location between West Asia and Southeast Asia have shaped historical trade routes?",
      "Explain how the longitudinal extent of India leads to time variation and why IST was standardised.",
    ],
  },
  {
    slug: "physical-features-of-india",
    title: "Physical Features of India",
    chapterNumber: 2,
    grade: "Grade 9",
    subject: "Geography",
    description:
      "Explore India's physiographic divisions—from the Himalayas to the coastal plains—and understand how each landscape influences settlement and economic activity.",
  videoUrl: getAssetPath("video.mp4"),
  videoStreamUrl: getAssetPath("video.mp4"),
    timeline: [
      { label: "Formation of the Himalayas", timestamp: 0 },
      { label: "Northern plains", timestamp: 70 },
      { label: "Peninsular plateau", timestamp: 150 },
      { label: "Coastal plains and islands", timestamp: 220 },
      { label: "Physiography and livelihoods", timestamp: 300 },
    ],
    aiPrompt:
  "Create 3 case-based questions that connect India's physical divisions with human activities.",
    aiSampleResponse: [
      "How do the alluvial soils of the Northern Plains make it India's food bowl?",
      "In what ways do the Western Ghats influence rainfall patterns and biodiversity?",
      "Why are the Himalayan ranges crucial for both climate regulation and river systems?",
    ],
  },
  {
    slug: "drainage-systems-of-india",
    title: "Drainage",
    chapterNumber: 3,
    grade: "Grade 9",
    subject: "Geography",
    description:
      "Understand India's river systems, trace their origins, and see how they shape agriculture, hydropower, and cultural practices across regions.",
  videoUrl: getAssetPath("video.mp4"),
  videoStreamUrl: getAssetPath("video.mp4"),
    timeline: [
      { label: "Himalayan vs Peninsular rivers", timestamp: 0 },
      { label: "Indus river system", timestamp: 75 },
      { label: "Ganga and Brahmaputra", timestamp: 150 },
      { label: "Peninsular river basins", timestamp: 225 },
      { label: "River management challenges", timestamp: 295 },
    ],
    aiPrompt:
      "Suggest 4 discussion starters on the socio-economic importance of Indian rivers.",
    aiSampleResponse: [
      "Why do Himalayan rivers create fertile plains while Peninsular rivers assist in hydropower projects?",
      "How have Indian rivers shaped religious and cultural practices across regions?",
      "What are the major threats facing Indian rivers today, and how can communities respond?",
      "How does river interlinking aim to address water scarcity, and what are the concerns around it?",
    ],
  },
  {
    slug: "resources-and-development",
    title: "Resources and Development",
    chapterNumber: 1,
    grade: "Grade 10",
    subject: "Geography",
    description:
      "Analyse resource types, utilisation patterns, and the need for sustainable development to balance growth with conservation.",
  videoUrl: getAssetPath("video.mp4"),
  videoStreamUrl: getAssetPath("video.mp4"),
    timeline: [
      { label: "Classification of resources", timestamp: 0 },
      { label: "Land resources", timestamp: 65 },
      { label: "Soil types and distribution", timestamp: 135 },
      { label: "Resource planning", timestamp: 205 },
      { label: "Sustainable development", timestamp: 270 },
    ],
    aiPrompt:
      "Frame 3 inquiry questions that encourage learners to think about sustainable resource use in their locality.",
    aiSampleResponse: [
      "What steps can our community take to prevent soil erosion in nearby farmlands?",
      "Which renewable resources are underutilised locally, and how might we promote them?",
      "How does resource planning help balance economic growth with environmental health?",
    ],
  },
  {
    slug: "forest-and-wildlife-resources",
    title: "Forest and Wildlife Resources",
    chapterNumber: 2,
    grade: "Grade 10",
    subject: "Geography",
    description:
      "Study India's biodiversity, conservation strategies, and the role communities play in protecting forests and wildlife habitats.",
  videoUrl: getAssetPath("video.mp4"),
  videoStreamUrl: getAssetPath("video.mp4"),
    timeline: [
      { label: "Types of vegetation", timestamp: 0 },
      { label: "Biodiversity hotspots", timestamp: 70 },
      { label: "Threats to flora and fauna", timestamp: 140 },
      { label: "Conservation initiatives", timestamp: 210 },
      { label: "Community participation", timestamp: 280 },
    ],
    aiPrompt:
      "Write 4 prompts that help students evaluate conservation policies and community roles.",
    aiSampleResponse: [
      "How do joint forest management programmes empower local communities?",
      "What measures can schools adopt to support biodiversity conservation?",
      "Why is poaching a socio-economic issue and not just an environmental one?",
      "How have national parks and biosphere reserves contributed to wildlife protection?",
    ],
  },
  {
    slug: "water-resources",
    title: "Water Resources",
    chapterNumber: 3,
    grade: "Grade 10",
    subject: "Geography",
    description:
      "Investigate the status of India's water resources, the importance of water harvesting, and strategies for sustainable management.",
    videoUrl: getAssetPath("video.mp4"),
    timeline: [
      { label: "Need for water conservation", timestamp: 0 },
      { label: "Multipurpose river valley projects", timestamp: 80 },
      { label: "Rainwater harvesting", timestamp: 160 },
      { label: "Traditional practices", timestamp: 230 },
      { label: "Water conflicts and solutions", timestamp: 300 },
    ],
    aiPrompt:
      "Generate 3 critical thinking questions about balancing water demands in agriculture, industry, and households.",
    aiSampleResponse: [
      "How can rainwater harvesting reduce dependence on groundwater in urban areas?",
      "What trade-offs arise when building large dams, and how can they be mitigated?",
      "In what ways can behavioural changes at home contribute to national water security?",
    ],
  },
];

export const chapterBySlug = (slug: string): ChapterDetails | undefined =>
  teacherChapters.find((chapter) => chapter.slug === slug);
