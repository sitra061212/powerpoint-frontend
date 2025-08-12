import { RefObject } from "react";
import SlideCard from "./SlideCard";

interface Slide {
  title: string;
  points: string[];
}

interface SlideListProps {
  slides: Slide[];
  sectionRefs: RefObject<(HTMLDivElement | null)[]>;
}

export default function SlideList({ slides, sectionRefs }: SlideListProps) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 space-y-28">
      {slides.map((slide, index) => (
        <section
          key={index}
          ref={(el) => {
            if (sectionRefs.current) sectionRefs.current[index] = el;
          }}
          id={`slide-${index}`}
          className="scroll-mt-20"
        >
          <SlideCard title={slide.title} points={slide.points} />
        </section>
      ))}
    </div>
  );
}
