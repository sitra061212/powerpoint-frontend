import {
  Download,
  FileText,
  Layout,
  Lightbulb,
  Palette,
  Rocket,
  Users,
  Zap,
} from 'lucide-react'
import type React from 'react'
import { cn } from '@/lib/utils'

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: 'AI-Powered Content Generation',
      description:
        'Generate compelling slides with AI that understands your topic and creates relevant content automatically.',
      icon: <Zap className="h-6 w-6" />,
    },
    {
      title: 'Professional Templates',
      description:
        'Choose from hundreds of professionally designed templates for every industry and use case.',
      icon: <FileText className="h-6 w-6" />,
    },
    {
      title: 'Smart Layout Engine',
      description:
        'Our AI automatically arranges your content with perfect spacing, alignment, and visual hierarchy.',
      icon: <Layout className="h-6 w-6" />,
    },
    {
      title: 'Instant Export Options',
      description:
        'Export to PowerPoint, PDF, or share online with one click. Compatible with all major platforms.',
      icon: <Download className="h-6 w-6" />,
    },
    {
      title: 'Brand Consistency',
      description:
        'Upload your brand assets and maintain consistent colors, fonts, and logos across all presentations.',
      icon: <Palette className="h-6 w-6" />,
    },
    {
      title: 'Real-time Collaboration',
      description:
        'Work together with your team in real-time. Comment, suggest, and edit presentations simultaneously.',
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: 'Smart Suggestions',
      description:
        'Get AI-powered recommendations for better visuals, content improvements, and design enhancements.',
      icon: <Lightbulb className="h-6 w-6" />,
    },
    {
      title: 'Lightning Fast Generation',
      description:
        'Create complete presentations in minutes, not hours. From idea to finished slides instantly.',
      icon: <Rocket className="h-6 w-6" />,
    },
  ]

  return (
    <>
      <div className="relative text-center py-20" id="featured-section">
        <h2 className="text-4xl font-bold  mb-4">Powerful AI Features</h2>
        <p className="text-[var(--muted-foreground)] mb-12 max-w-2xl mx-auto">
          Transform your ideas into stunning presentations with our AI-powered
          PowerPoint generator. Professional results in minutes, not hours.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <Feature key={feature.title} {...feature} index={index} />
        ))}
      </div>
    </>
  )
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string
  description: string
  icon: React.ReactNode
  index: number
}) => {
  return (
    <div
      className={cn(
        'flex flex-col lg:border-r py-10 relative group/feature border-[var(--border)]',
        (index === 0 || index === 4) && 'lg:border-l border-[var(--border)]',
        index < 4 && 'lg:border-b border-[var(--border)]',
        'shadow-[var(--shadow-sm)] group-hover/feature:shadow-[var(--shadow-md)] transition-shadow duration-200'
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-[var(--muted)] to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-[var(--muted)] to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-[var(--muted-foreground)]">
        {icon}
      </div>
      <div className="text-lg  mb-2 relative z-10 px-10 font-[var(--font-sans)]">
        <div
          className={cn(
            'absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-[var(--radius)]',
            'bg-[var(--muted)] group-hover/feature:bg-[var(--primary)] transition-all duration-200 origin-center'
          )}
        />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-[var(--foreground)]">
          {title}
        </span>
      </div>
      <p className="text-sm text-[var(--muted-foreground)] max-w-xs relative z-10 px-10 font-[var(--font-sans)]">
        {description}
      </p>
    </div>
  )
}
