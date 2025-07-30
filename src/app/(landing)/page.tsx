import FeaturedSection from '@/components/featured-section/featured-section'
import { FooterDemo } from '@/components/footer/footer-content'
import HeroSection from '@/components/hero-section'
import TestimonialsSection from '@/components/testimonial-section/testimonial-section'
export default function Home() {
  return (
    <>
      <div className="min-h-screen w-full ">
        {/* Top Fade Grid Background */}
        <div
          className="absolute inset-0 z-0 dark:hidden"
          style={{
            backgroundImage: `
              linear-gradient(to right, #e2e8f0 1px, transparent 1px),
              linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
            `,
            backgroundSize: '20px 30px',
            WebkitMaskImage:
              'radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)',
            maskImage:
              'radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)',
          }}
        />

        <div
          className="absolute inset-0 z-0 hidden dark:block"
          style={{
            backgroundImage: `
              linear-gradient(to right, #2d3748 1px, transparent 1px),
              linear-gradient(to bottom, #2d3748 1px, transparent 1px)
            `,
            backgroundSize: '20px 30px',
            WebkitMaskImage:
              'radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)',
            maskImage:
              'radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)',
          }}
        />
        {/* Your Content/Components */}
        <HeroSection />
        <FeaturedSection />
        <TestimonialsSection />
        <FooterDemo />
      </div>
    </>
  )
}
