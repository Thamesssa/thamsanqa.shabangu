"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeItem, setActiveItem] = useState("#")
  const { theme, setTheme } = useTheme()

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)

      // Find the current section
      const sections = navItems.map((item) => item.href).filter((href) => href !== "#")

      for (const section of sections.reverse()) {
        const element = document.querySelector(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100) {
            setActiveItem(section)
            break
          }
        }
      }

      // If we're at the top, set Home as active
      if (window.scrollY < 100) {
        setActiveItem("#")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle smooth scrolling
  const handleNavClick = (href: string) => {
    setActiveItem(href)
    setMobileMenuOpen(false)

    // Smooth scroll to the section
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-primary/10 py-3" : "bg-transparent py-5",
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="#"
          className="text-2xl font-bold text-foreground flex items-center"
          onClick={() => handleNavClick("#")}
        >
          <motion.div
            className="relative inline-block"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <span className="text-primary">Port</span>
            <span>folio</span>
            <motion.div
              className="absolute -bottom-1 left-0 h-[2px] bg-primary"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <NavItem
              key={item.name}
              href={item.href}
              active={activeItem === item.href}
              onClick={() => handleNavClick(item.href)}
            >
              {item.name}
            </NavItem>
          ))}

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="ml-2 text-primary hover:bg-primary/10 rounded-full"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </motion.div>
            </AnimatePresence>
            <span className="sr-only">Toggle theme</span>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="mr-2 text-primary hover:bg-primary/10 rounded-full"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-primary hover:bg-primary/10 rounded-full"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-b border-primary/10"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-3">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(item.href)
                  }}
                  className={cn(
                    "px-4 py-2 rounded-md transition-colors",
                    activeItem === item.href
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-foreground hover:bg-primary/5 hover:text-primary",
                  )}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

interface NavItemProps {
  href: string
  active: boolean
  onClick: () => void
  children: React.ReactNode
}

function NavItem({ href, active, onClick, children }: NavItemProps) {
  return (
    <motion.a
      href={href || "#"}
      onClick={(e) => {
        e.preventDefault()
        onClick()
      }}
      className="relative px-3 py-2 rounded-md text-foreground font-medium"
      whileHover="hover"
    >
      <span className={cn(active ? "text-primary" : "")}>{children}</span>

      {/* Hover effect - glowing dot */}
      <motion.span
        className="absolute inset-0 rounded-md bg-primary/5 z-0"
        initial={{ opacity: 0 }}
        variants={{
          hover: { opacity: 1 },
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Underline effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary mx-3"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: active ? 1 : 0 }}
        variants={{
          hover: { scaleX: 1 },
        }}
        transition={{ duration: 0.3 }}
        style={{ originX: 0.5 }}
      />

      {/* Hover glow effect */}
      <motion.div
        className="absolute -inset-1 rounded-lg bg-primary/20 z-[-1] blur-sm"
        initial={{ opacity: 0 }}
        variants={{
          hover: { opacity: 0.5 },
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  )
}

