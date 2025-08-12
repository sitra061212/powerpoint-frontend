import { Button } from "@/components/ui/button";

export default function EmptyState() {
  return (
    <div className="text-center py-10">
      <p className="text-gray-500 dark:text-gray-400 mb-4">
        You haven't created any slides yet.
      </p>
      <Button onClick={() => (window.location.href = "/")}>
        Create Your First Slide
      </Button>
    </div>
  );
}
