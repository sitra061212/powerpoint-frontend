'use client'

import { motion, useReducedMotion } from 'framer-motion'
import {
  Download,
  Layout,
  MessageSquare,
  Sparkles,
  Upload,
  Zap,
} from 'lucide-react'
import type React from 'react'
import { FeatureCard } from './grid-featured-section'

const features = [
  {
    title: 'AI-Powered Generation',
    icon: Sparkles,
    description:
      'Create stunning presentations instantly with advanced AI that understands your content and context.',
  },
  {
    title: 'File Upload Support',
    icon: Upload,
    description:
      'Upload documents, images, and data files to automatically generate comprehensive presentations.',
  },
  {
    title: 'Smart Prompts',
    icon: MessageSquare,
    description:
      'Simply describe your presentation needs and let our AI create professional slides from your prompts.',
  },
  {
    title: 'Professional Templates',
    icon: Layout,
    description:
      'Choose from hundreds of professionally designed templates optimized for different industries and use cases.',
  },
  {
    title: 'Lightning Fast',
    icon: Zap,
    description:
      'Generate complete presentations in seconds, not hours. Save time and focus on what matters most.',
  },
  {
    title: 'Export & Share',
    icon: Download,
    description:
      'Export to PowerPoint, PDF, or share directly online with customizable sharing permissions.',
  },
]

export default function FeaturedSection() {
  return (
    <section className="py-10 md:py-20" id="featured-section">
      <div className="mx-auto w-full max-w-5xl space-y-8 px-4">
        <AnimatedContainer className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-wide text-balance md:text-4xl lg:text-5xl xl:font-extrabold">
           Features
          </h2>
          <p className="text-muted-foreground mt-4 text-sm tracking-wide text-balance md:text-base">
            Transform your ideas into professional presentations instantly with
            Presina AI&apos;s powerful generation engine.
          </p>
        </AnimatedContainer>
        <AnimatedContainer
          delay={0.4}
          className="grid grid-cols-1 divide-x divide-y divide-dashed border border-dashed sm:grid-cols-2 md:grid-cols-3"
        >
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} />
          ))}
        </AnimatedContainer>
      </div>
    </section>
  )
}

type ViewAnimationProps = {
  delay?: number
  className?: React.ComponentProps<typeof motion.div>['className']
  children: React.ReactNode
}

function AnimatedContainer({
  className,
  delay = 0.1,
  children,
}: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return children
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
