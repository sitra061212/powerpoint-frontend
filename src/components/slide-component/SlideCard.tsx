import { Card } from "@/components/ui/card";

interface SlideCardProps {
  title: string;
  points: string[];
}

export default function SlideCard({ title, points }: SlideCardProps) {
  return (
    <Card className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:shadow-2xl">
      <div className="p-8 md:p-10">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-slate-800 dark:from-slate-50 to-slate-600 dark:to-slate-200">
          {title}
        </h2>

        {points.length > 0 ? (
          <ul className="space-y-4">
            {points.map((point, index) => (
              <li
                key={index}
                className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed"
              >
                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-3 mt-1"></span>
                {point.trim() || (
                  <em className="text-slate-400 dark:text-slate-500">
                    No content
                  </em>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-500 dark:text-slate-400 italic">
            No points in this slide.
          </p>
        )}
      </div>

      <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
    </Card>
  );
}
