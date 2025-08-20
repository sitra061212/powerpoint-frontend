'use client'

import { useEffect, useState } from "react";
import LoadingState from "@/components/presentations/LoadingState";
import EmptyState from "@/components/presentations/EmptyState";
import PresentationCard from "@/components/presentations/PresentationCard";

interface SlidePresentation {
  _id: string;
  title: string;
  slides: Array<{ title: string; points: string[] }>;
  isConverted: boolean;
  createdAt: string;
}

export default function MyPresentationsPage() {
  const [slides, setSlides] = useState<SlidePresentation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/slide",{credentials: 'include',});
        if (!res.ok) throw new Error("Failed to fetch data");

        const { presentations } = await res.json()
setSlides(presentations)
      } catch (error) {
        console.error("Failed to fetch converted slides:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  if (loading) return <LoadingState />;

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        My Slides
      </h1>

      {slides.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {slides.map((slide) => (
            <PresentationCard
              key={slide._id}
              id={slide._id}
              createdAt={slide.createdAt}
              slides={slide.slides}
              title={slide.title}
            />
          ))}
        </div>
      )}
    </div>
  );
}
