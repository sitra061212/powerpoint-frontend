import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="p-6 md:p-10">
      {/* Topbar */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Welcome back, Alex!</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Let’s create something powerful today.</p>
        </div>
        <div className="flex items-center gap-4">
          <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          <Avatar>
            <AvatarImage src="/user.jpg" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Feature Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <FeatureCard
          title="New Presentation"
          description="Start from an AI prompt or upload a document."
          href="/presentations/new"
          buttonLabel="+ Create"
        />
        <FeatureCard
          title="Recent Projects"
          description="Quickly access your most recent slides."
          href="/projects"
          buttonLabel="View All"
        />
        <FeatureCard
          title="Templates"
          description="Browse ready-to-use layouts and styles."
          href="/templates"
          buttonLabel="Explore Templates"
        />
      </section>

      {/* Quick Tips Section */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Quick Tips</h2>
        <ul className="list-disc pl-6 space-y-1 text-sm text-gray-600 dark:text-gray-400">
          <li>Use the AI prompt to generate slides quickly.</li>
          <li>Reorder slides using drag-and-drop editor.</li>
          <li>Collaborate with team members in real-time.</li>
        </ul>
      </section>
    </div>
  );
}

// Feature Card component
function FeatureCard({ title, description, href, buttonLabel }: { title: string; description: string; href: string; buttonLabel: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-xl transition">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{description}</p>
      <a href={href}>
        <Button className="w-full">{buttonLabel}</Button>
      </a>
    </div>
  );
}
