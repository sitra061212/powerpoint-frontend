import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Slide {
  title: string;
  points: string[];
}

interface PresentationCardProps {
  id: string;
  createdAt: string;
  slides: Slide[];
  source: string;
}

export default function PresentationCard({
  id,
  createdAt,
  slides,
  source,
}: PresentationCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardContent className="p-4 flex-1">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          {new Date(createdAt).toLocaleDateString()} • {slides.length} slides
        </p>
        <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
          {slides[0]?.title || "Untitled Presentation"}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3">
          {source.substring(0, 180)}...
        </p>
      </CardContent>
      <div className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={() =>
            (window.location.href = `/presentations/slide?id=${id}`)
          }
        >
          View Slides
        </Button>
      </div>
    </Card>
  );
}
