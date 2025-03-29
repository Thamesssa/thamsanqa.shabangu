"use client"

import { useRef, useEffect } from "react"
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion"
import { Code, Database, Globe, Layout, Palette, Server } from "lucide-react"

const skills = [
  {
    category: "Frontend",
    icon: <Layout className="w-6 h-6" />,
    items: ["React", "Next.js", "HTML5", "CSS3", "JavaScript", "TypeScript"],
  },
  {
    category: "Backend",
    icon: <Server className="w-6 h-6" />,
    items: ["Node.js", "Express", "REST APIs", "GraphQL", "Authentication"],
  },
  {
    category: "Database",
    icon: <Database className="w-6 h-6" />,
    items: ["MongoDB", "PostgreSQL", "MySQL", "Firebase", "Prisma"],
  },
  {
    category: "UI/UX",
    icon: <Palette className="w-6 h-6" />,
    items: ["Tailwind CSS", "Figma", "Responsive Design", "Animation", "Accessibility"],
  },
  {
    category: "DevOps",
    icon: <Globe className="w-6 h-6" />,
    items: ["Git", "GitHub", "CI/CD", "Vercel", "Docker"],
  },
  {
    category: "Other",
    icon: <Code className="w-6 h-6" />,
    items: ["Testing", "SEO", "Performance Optimization", "PWA", "Agile"],
  },
]

export default function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, isInView])

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  }

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        className="grid gap-8 mt-10 sm:grid-cols-2 lg:grid-cols-3"
        variants={container}
        initial="hidden"
        animate={controls}
        exit="exit"
      >
        {skills.map((skill, index) => (
          <motion.div
            key={skill.category}
            className="p-6 rounded-lg bg-card border border-primary/20 hover:border-primary/40 transition-colors duration-300 shadow-sm"
            variants={item}
            custom={index}
          >
            <div className="flex items-center mb-4">
              <div className="p-2 mr-3 rounded-md bg-primary/20 text-primary">{skill.icon}</div>
              <h3 className="text-xl font-bold">{skill.category}</h3>
            </div>
            <ul className="space-y-2">
              {skill.items.map((item) => (
                <li key={item} className="flex items-center">
                  <div className="w-2 h-2 mr-2 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  )
}

