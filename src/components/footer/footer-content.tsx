'use client'

import {
  BookOpen,
  CreditCard,
  Handshake,
  HelpCircle,
  Scale,
  Upload,
  Users,
  Webhook,
  Zap,
} from 'lucide-react'
import type React from 'react'
import { Footer } from './footer'

// Custom PowerPoint icon
const PowerPointIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      strokeWidth="2"
      d="M4 4h16v16H4V4zm4 4h4c2 0 3 1 3 3s-1 3-3 3H8v2H6V8zm2 2v2h2c1 0 1-1 1-1s0-1-1-1H8z"
    />
  </svg>
)

// Custom Template icon
const TemplateIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      strokeWidth="2"
      d="M3 3h18v4H3V3zm0 6h8v12H3V9zm10 0h8v5h-8V9zm0 7h8v5h-8v-5z"
    />
  </svg>
)

// Custom AI Brain icon
const AIBrainIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      strokeWidth="2"
      d="M12 2C8 2 5 5 5 9c0 1 0 2 1 3-1 1-1 2-1 3 0 4 3 7 7 7s7-3 7-7c0-1 0-2-1-3 1-1 1-2 1-3 0-4-3-7-7-7zm-2 6h1v1h-1V8zm3 0h1v1h-1V8zm-3 3h1v1h-1v-1zm3 0h1v1h-1v-1z"
    />
  </svg>
)

export function FooterDemo() {
  return (
    <Footer
      className="mt-20"
      brand={{
        name: 'Persina AI',
        description:
          'Generate stunning PowerPoint presentations using AI with file uploads and professional templates.',
      }}
      socialLinks={[
        {
          name: 'Twitter',
          href: 'https://twitter.com/persinaai',
        },
        {
          name: 'LinkedIn',
          href: 'https://linkedin.com/company/persina-ai',
        },
        {
          name: 'Discord',
          href: 'https://discord.gg/persina-ai',
        },
      ]}
      columns={[
        {
          title: 'Features',
          links: [
            {
              name: 'AI Generator',
              Icon: AIBrainIcon,
              href: '#ai-generator',
            },
            {
              name: 'Templates',
              Icon: TemplateIcon,
              href: '#templates',
            },
            {
              name: 'File Upload',
              Icon: Upload,
              href: '#file-upload',
            },
          ],
        },
        {
          title: 'Resources',
          links: [
            {
              name: 'Documentation',
              Icon: BookOpen,
              href: '/docs',
            },
            {
              name: 'API Reference',
              Icon: Webhook,
              href: '/docs/api',
            },
            {
              name: 'Tutorials',
              Icon: Zap,
              href: '/tutorials',
            },
            {
              name: 'Help Center',
              Icon: HelpCircle,
              href: '/help',
            },
          ],
        },
        {
          title: 'Company',
          links: [
            {
              name: 'About Us',
              Icon: Users,
              href: '/about',
            },
            {
              name: 'Privacy Policy',
              Icon: Scale,
              href: '/privacy',
            },
            {
              name: 'Terms of Service',
              Icon: Handshake,
              href: '/terms',
            },
          ],
        },
      ]}
      copyright="Persina AI © 2025. All rights reserved."
    />
  )
}
