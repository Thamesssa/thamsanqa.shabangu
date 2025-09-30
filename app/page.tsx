import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import HeroAnimation from "@/components/hero-animation"
import ProjectCard from "@/components/project-card"
import SkillsSection from "@/components/skills-section"
import ContactForm from "@/components/contact-form"

export default function Home() {
  // Define URLs for projects
  const projectsData = [
    {
      title: "SA-Job-AI",
      description: "A full-featured online store built with Next.js, Tailwind CSS, and Stripe integration.",
      tags: ["Next.js", "Tailwind CSS", "MongoDB"],
      imageUrl: "/placeholder.svg?height=400&width=600",
      demoUrl: "https://example.com",
      repoUrl: "https://github.com/Thamesssa/Job-Match-AI",
    },
    {
      title: "Sphathlo Hub",
      dzescription: "A productivity app with drag-and-drop functionality, user authentication, and real-time updates.",
      tags: ["React", "Firebase", "Framer Motion"],
      imageUrl: "/placeholder.svg?height=400&width=600",
      demoUrl: "https://example.com/task-app",
      repoUrl: "https://github.com/example/task-app",
    },
    {
      title: "Portfolio Website",
      description: "A responsive portfolio website with smooth animations and modern design.",
      tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
      imageUrl: "/placeholder.svg?height=400&width=600",
      demoUrl: "https://Thamsanqa.shabangu.tech",
      repoUrl: "https://github.com/Thamesssa/thamsanqa.shabangu",
    },
  ]

  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-4 py-20 overflow-hidden bg-gradient-to-b from-background to-background/80">
        <div className="absolute inset-0 z-0">
          <HeroAnimation />
        </div>
        <div className="container relative z-10 flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block">Hi, I'm </span>
            <span className="block mt-2 text-primary">Thamsanqa Shabangu</span>
          </h1>
          <p className="max-w-[700px] mt-6 text-xl ">
            A Full-Stack developer
          </p>
          <p className="max-w-[700px] mt-6 text-xl text-muted-foreground">
           Specializing in building exceptional digital experiences.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="#projects">
                View Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="border-primary text-primary hover:bg-primary/10">
              <Link href="#contact">Get In Touch</Link>
            </Button>
          </div>
          <div className="flex gap-4 mt-8">
            <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10 text-primary">
              <Link href="https://github.com/Thamesssa" target="_blank" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10 text-primary">
              <Link href="https://www.linkedin.com/in/thamsanqa-shabangu-8b497b205/" target="_blank" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10 text-primary">
              <Link href="mailto:tummysanqa@gmail.com" aria-label="Email">
                <Mail className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      {/* About Section */}
      <section id="about" className="py-20 bg-muted/50">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Me</h2>
          <div className="grid gap-10 mt-10 md:grid-cols-2">
            <div>
              <p className="text-lg text-muted-foreground">
              I build digital solutions that work. Skilled in Angular, Java Spring Boot, and PostgreSQL, I create both back-end systems and user-friendly interfaces. My focus is on making technology simple and effective. 
             </p>
              <p className="mt-4 text-lg text-muted-foreground">
              I hold a Computer Science degree from UNISA, with knowledge in full-stack development and AI. I enjoy solving technical challenges and keeping up with new tech trends.

When not coding, I recharge outdoors. I believe good technology should be invisible - it just works.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-64 h-64 px-20 overflow-hidden rounded-full">
                <Image
                  src="/images/profile.png"
                  alt="Profile"
                  fill
                  sizes="(max-width: 768px) 100vw, 256px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">My Skills</h2>
          <SkillsSection />
        </div>
      </section>
      {/* Projects Section */}
      <section id="projects" className="py-20 bg-muted/50">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">My Projects</h2>
          <div className="grid gap-8 mt-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {projectsData.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                tags={project.tags}
                imageUrl={project.imageUrl}
                demoUrl={project.demoUrl}
                repoUrl={project.repoUrl}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get In Touch</h2>
          <div className="grid gap-10 mt-10 md:grid-cols-2">
            <div>
              <p className="text-lg text-muted-foreground">
              I'm currently seeking junior developer positions where I can contribute my full-stack skills and continue growing. If you're looking for a dedicated team member or just want to connect, I'd love to chat.
              </p>
              <div className="mt-6 space-y-4">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-primary" />
                  <span>tummysanqa@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <Linkedin className="w-5 h-5 mr-3 text-primary" />
                  <span>linkedin.com/in/thamsanqa-shabangu</span>
                </div>
                <div className="flex items-center">
                  <Github className="w-5 h-5 mr-3 text-primary" />
                  <span>github.com/thamesssa</span>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="py-6 border-t border-primary/20 bg-background">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Thamsanqa Shabangu. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" asChild className="text-primary hover:bg-primary/10">
                <Link href="https://github.com/Thamesssa" target="_blank" aria-label="GitHub">
                  <Github className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild className="text-primary hover:bg-primary/10">
                <Link href="https://www.linkedin.com/in/thamsanqa-shabangu-8b497b205/" target="_blank" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild className="text-primary hover:bg-primary/10">
                <Link href="mailto:tummysanqa@gmail.com" aria-label="Email">
                  <Mail className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

