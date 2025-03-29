"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function CursorEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show custom cursor on desktop
    const isMobile = window.matchMedia("(max-width: 768px)").matches
    if (isMobile) return

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    window.addEventListener("mousemove", updateMousePosition)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Main cursor */}
          <motion.div
            className="fixed top-0 left-0 w-6 h-6 rounded-full bg-primary/30 backdrop-blur-sm z-[9999] pointer-events-none mix-blend-screen custom-cursor"
            animate={{
              x: mousePosition.x - 12,
              y: mousePosition.y - 12,
            }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
              mass: 0.5,
            }}
            exit={{ opacity: 0, scale: 0 }}
          />

          {/* Trailing effect */}
          <motion.div
            className="fixed top-0 left-0 w-12 h-12 rounded-full border border-primary/20 z-[9998] pointer-events-none custom-cursor"
            animate={{
              x: mousePosition.x - 24,
              y: mousePosition.y - 24,
            }}
            transition={{
              type: "spring",
              damping: 40,
              stiffness: 200,
              mass: 1,
              delay: 0.03,
            }}
            exit={{ opacity: 0, scale: 0 }}
          />
        </>
      )}
    </AnimatePresence>
  )
}

