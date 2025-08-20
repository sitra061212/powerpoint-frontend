import { Card, CardContent } from "@/components/ui/card";

interface TwoColumnSlideProps {
  leftTitle: string;
  leftContent: string;
  rightTitle: string;
  rightContent: string;
}

export function TwoColumnSlide({
  leftTitle,
  leftContent,
  rightTitle,
  rightContent
}: TwoColumnSlideProps) {
  return (
    <Card className="w-full h-[600px] bg-white dark:bg-slate-900 rounded-2xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-800">
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        
        {/* Left Column */}
        <div className="p-8 flex flex-col bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/50 dark:to-transparent">
          <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4 leading-tight">
            {leftTitle}
          </h3>
          <CardContent className="flex-1 p-0">
            <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line">
              {leftContent}
            </p>
          </CardContent>
        </div>

        {/* Right Column */}
        <div className="p-8 flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/20">
          <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4 leading-tight">
            {rightTitle}
          </h3>
          <CardContent className="flex-1 p-0">
            <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line">
              {rightContent}
            </p>
          </CardContent>
        </div>

      </div>
    </Card>
  );
}