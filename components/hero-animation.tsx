"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export default function HeroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Particle class
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 5 + 2 // Increased minimum size for better visibility
        this.speedX = Math.random() * 2 - 1
        this.speedY = Math.random() * 2 - 1

        // Use more vibrant turquoise colors
        const colors = [
          "rgba(64, 224, 208, ", // #40e0d0 - Classic turquoise
          "rgba(67, 232, 216, ", // #43e8d8 - Medium turquoise
          "rgba(59, 214, 198, ", // #3bd6c6 - Medium-dark turquoise
        ]

        const colorIndex = Math.floor(Math.random() * colors.length)
        // Adjust opacity based on theme
        const opacity = theme === "dark" ? Math.random() * 0.3 + 0.5 : Math.random() * 0.4 + 0.6
        this.color = colors[colorIndex] + opacity + ")"
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles
    const particlesArray: Particle[] = []
    const numberOfParticles = Math.min(120, Math.floor((canvas.width * canvas.height) / 8000)) // Increased number of particles

    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle())
    }

    // Connect particles with lines
    function connect() {
      if (!ctx) return
      const maxDistance = 180 // Increased connection distance
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x
          const dy = particlesArray[a].y - particlesArray[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance
            // More vibrant connection lines with theme-based opacity
            const lineOpacity = theme === "dark" ? opacity * 0.5 : opacity * 0.6
            ctx.strokeStyle = `rgba(64, 224, 208, ${lineOpacity})`
            ctx.lineWidth = 1.5 // Thicker lines
            ctx.beginPath()
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
            ctx.stroke()
          }
        }
      }
    }

    // Animation loop
    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
      }
      connect()
      requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: theme === "dark" ? 0.9 : 0.8 }}
    />
  )
}

