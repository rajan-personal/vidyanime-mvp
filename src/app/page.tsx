"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Award, Lightbulb, School, Users } from "lucide-react";
import PublicHeader from "@/components/landing/PublicHeader";
import LoginForm from "@/components/landing/LoginForm";
import { useAuth } from "@/contexts/AuthContext";

export default function HomePage() {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push("/school-dashboard");
    }
  }, [currentUser, router]);

  const benefits = [
    {
      id: 1,
      icon: <School size={32} className="text-blue-600" />,
      title: "Simplifying Complex Concepts",
      description:
        "Through story-driven animations, abstract topics in science and social studies become easy to grasp for students of all learning levels.",
    },
    {
      id: 2,
      icon: <Award size={32} className="text-purple-600" />,
      title: "Interactive Learning for Science",
      description:
        "Every science animation is designed to simulate real-world phenomena — helping students visualise and retain key principles better than static textbooks.",
    },
    {
      id: 3,
      icon: <Lightbulb size={32} className="text-orange-600" />,
      title: "Aligned with NEP 2020",
      description:
        "Vidyanime's curriculum integrates activity-based learning and conceptual understanding, as encouraged by India's National Education Policy.",
    },
    {
      id: 4,
      icon: <Users size={32} className="text-green-600" />,
      title: "Designed for Classrooms & Self-Study",
      description:
        "Whether it's a teacher-led smart classroom or a student revising at home, Vidyanime fits seamlessly into hybrid, online, or offline environments.",
    },
  ];

  const targetAudience = [
    {
      id: 1,
      name: "CBSE/ICSE Schools",
      description:
        "Schools looking to modernize teaching methods without increasing teacher workload can use Vidyanime to enhance classroom delivery.",
      image:
        "https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 2,
      name: "Educators in Tier 2 & Tier 3 Cities",
      description:
        "Teachers with limited access to advanced lab setups can use Vidyanime to visually demonstrate experiments and scientific processes.",
      image:
        "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 3,
      name: "Students Preparing for NDA",
      description:
        "Vidyanime helps students preparing for the NDA exam understand complex subjects like Mathematics, General Ability, and Current Affairs through visual, engaging, and easy-to-grasp animations.",
      image:
        "https://images.pexels.com/photos/5212686/pexels-photo-5212686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 4,
      name: "International & Indian Schools Abroad",
      description:
        "Indian curriculum schools in UAE, Singapore, and Oman can use Vidyanime to maintain a strong connection with CBSE/ICSE learning methods.",
      image:
        "https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicHeader />

      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white pt-16">
        <div className="absolute inset-0 bg-black opacity-20" />
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Transform Education Through Animation
              </motion.h1>
              <motion.p
                className="text-xl mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Vidyanime brings complex concepts to life with engaging animated lectures, interactive whiteboards, and AI assistance.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-wrap gap-3"
              >
                <a
                  href="#learn-more"
                  className="bg-white text-blue-600 px-6 py-3 rounded-full font-medium inline-flex items-center hover:bg-gray-100 transition-colors"
                >
                  Learn More
                  <ArrowRight size={18} className="ml-2" />
                </a>
              </motion.div>
            </div>

            <div className="lg:w-5/12">
              <LoginForm />
            </div>
          </div>
        </div>
      </section>

      <section id="learn-more" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Why Schools Choose <span className="text-blue-600">Vidyanime</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((item, index) => (
              <motion.div
                key={item.id}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Schools That Could Benefit from Vidyanime
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {targetAudience.map((school, index) => (
              <motion.div
                key={school.id}
                className="bg-white rounded-xl shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={school.image}
                    alt={school.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                    priority={index === 0}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{school.name}</h3>
                  <p className="text-gray-600">{school.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <h2 className="text-xl font-bold mb-4">Vidyanime Learn</h2>
              <p className="text-gray-400 max-w-md">
                Revolutionizing education through the power of animation, interactivity, and artificial intelligence.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-3">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      News
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Connect</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Facebook
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Vidyanime Learning Pvt. Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
