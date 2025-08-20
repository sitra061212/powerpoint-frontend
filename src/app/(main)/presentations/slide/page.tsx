'use client'

import { useEffect, useState, useRef } from "react"
import {
  ChevronDown,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { SlideSidebar } from "@/components/slide-component/SlideSidebar"
import StoryLoading from "@/components/slide-component/StoryLoading"
import SlideList from "@/components/slide-component/SlideList"
import { Button } from "@/components/ui/button"

interface Slide {
  title: string
  points: string[]
}

export default function StoryModePage() {
  const [slides, setSlides] = useState<Slide[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [collapsed, setCollapsed] = useState(false)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("editedOutline")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setSlides(parsed)
        sectionRefs.current = parsed.map(() => null)
      } catch (err) {
        console.error("Failed to load slides:", err)
        alert("Could not load story mode presentation.")
      }
    } else {
      alert("No slides found. Please go back and generate them.")
    }
  }, [])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    sectionRefs.current.forEach((section, i) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            setActiveIndex(i)
          }
        },
        { threshold: 0.5 }
      )
      if (section) observer.observe(section)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [slides])

  const scrollToSlide = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" })
  }

  if (slides.length === 0) return <StoryLoading />

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Sidebar */}
      <SlideSidebar
        slides={slides}
        activeIndex={activeIndex}
        onNavigate={scrollToSlide}
        collapsed={collapsed}
      />

      {/* Toggle button */}
      <button
        onClick={() => setCollapsed((prev) => !prev)}
        className="absolute top-4 z-50 bg-slate-200 dark:bg-slate-700 rounded-full p-1 shadow hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
        style={{ left: collapsed ? "4rem" : "18rem" }}
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </button>

      {/* Main content */}
      <main
        className={`relative z-10 flex-1 transition-all duration-300 ${
          collapsed ? "ml-16" : "ml-72"
        }`}
      >
        <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              Slide View
            </h1>
            <button
              onClick={() =>
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: "smooth",
                })
              }
              className="text-sm text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline"
            >
              End <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </header>

        <SlideList slides={slides} sectionRefs={sectionRefs} />

        <footer className="border-t border-slate-200 dark:border-slate-700 py-8 text-center text-sm text-slate-600 dark:text-slate-400">
          <p>Created with Presina AI • {new Date().getFullYear()}</p>
        </footer>
      </main>

      {/* Cancel Button */}
      <Button
        variant="default"
        onClick={() => window.location.href = "/presentations"}
        className="fixed bottom-6 right-6 px-4 py-2 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
      >
        <ExternalLink className="h-5 w-5" />
        <span className="hidden sm:inline">Back to Presentations</span>
      </Button>
    </div>
  )
}
