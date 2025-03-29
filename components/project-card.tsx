"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  imageUrl: string
  demoUrl: string
  repoUrl: string
  index: number
}

export default function ProjectCard({ title, description, tags, imageUrl, demoUrl, repoUrl, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const controls = useAnimation()

  // Ensure URLs are valid strings
  const safeDemoUrl = demoUrl || "#"
  const safeRepoUrl = repoUrl || "#"

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, isInView])

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.2,
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
      <motion.div ref={ref} variants={cardVariants} initial="hidden" animate={controls} exit="exit">
        <Card
          className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg border-primary/20"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative overflow-hidden h-48">
            <motion.img
              src={imageUrl}
              alt={title}
              className="object-cover w-full h-full"
              animate={{
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="absolute inset-0 bg-primary/70 flex items-center justify-center opacity-0"
              animate={{
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex gap-4">
                <Button size="sm" variant="secondary" asChild>
                  <Link href={safeDemoUrl} target="_blank">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Demo
                  </Link>
                </Button>
                <Button size="sm" variant="secondary" asChild>
                  <Link href={safeRepoUrl} target="_blank">
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="mt-2 text-muted-foreground">{description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-secondary text-secondary-foreground">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="px-6 pb-6 pt-0">
            <div className="flex gap-4">
              <Button
                size="sm"
                variant="outline"
                asChild
                className="border-primary/50 text-primary hover:bg-primary/10"
              >
                <Link href={safeDemoUrl} target="_blank">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </Link>
              </Button>
              <Button
                size="sm"
                variant="outline"
                asChild
                className="border-primary/50 text-primary hover:bg-primary/10"
              >
                <Link href={safeRepoUrl} target="_blank">
                  <Github className="mr-2 h-4 w-4" />
                  View Code
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}

