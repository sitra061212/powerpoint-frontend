'use client'

import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'
import { cn } from '@/lib/utils'

interface SocialLink {
  name: string
  href: string
}

interface FooterLink {
  name: string
  Icon: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>
  href?: string
}

interface FooterColumn {
  title: string
  links: FooterLink[]
}

interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {
  brand: {
    name: string
    description: string
  }
  socialLinks: SocialLink[]
  columns: FooterColumn[]
  copyright?: string
}

export const Footer = React.forwardRef<HTMLDivElement, FooterProps>(
  ({ className, brand, socialLinks, columns, copyright, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('pt-24', className)} {...props}>
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Link href="#" className="text-xl font-semibold flex gap-3">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      id="purpleGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#A066FF" />
                      <stop offset="100%" stopColor="#6D28D9" />
                    </linearGradient>
                    <linearGradient
                      id="shineGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  <rect width="512" height="512" rx="100" fill="#0B0016" />

                  <rect
                    x="156"
                    y="156"
                    width="140"
                    height="160"
                    rx="16"
                    fill="url(#purpleGradient)"
                    opacity="0.6"
                  />
                  <path
                    d="M156 156 L186 156 L156 186 Z"
                    fill="#BFAAFD"
                    opacity="0.5"
                  />

                  <rect
                    x="190"
                    y="196"
                    width="160"
                    height="180"
                    rx="16"
                    fill="url(#purpleGradient)"
                  />
                  <path
                    d="M190 196 L220 196 L190 226 Z"
                    fill="#E4D4FF"
                    opacity="0.7"
                  />

                  <polygon
                    points="190,196 430,160 430,200 190,236"
                    fill="url(#shineGradient)"
                  />
                </svg>
                {brand.name}
              </Link>
              <p className="mt-4 text-sm text-foreground/60">{brand.description}</p>
              <p className="text-sm font-light text-foreground/55 mt-3.5">
                {socialLinks.map((link, index) => (
                  <React.Fragment key={link.name}>
                    <a
                      className="hover:text-foreground/90"
                      target="_blank"
                      href={link.href}
                      rel="noopener noreferrer"
                    >
                      {link.name}
                    </a>
                    {index < socialLinks.length - 1 && ' • '}
                  </React.Fragment>
                ))}
              </p>
            </div>
            <div className="grid grid-cols-2 mt-16 md:grid-cols-3 lg:col-span-8 lg:justify-items-end lg:mt-0">
              {columns.map(({ title, links }) => (
                <div key={title} className="last:mt-12 md:last:mt-0">
                  <h3 className="text-sm font-semibold">{title}</h3>
                  <ul className="mt-4 space-y-2.5">
                    {links.map(({ name, Icon, href }) => (
                      <li key={name}>
                        <a
                          href={href || '#'}
                          className="text-sm transition-all text-foreground/60 hover:text-foreground/90 group"
                        >
                          <Icon className="inline stroke-2 h-4 mr-1.5 transition-all stroke-foreground/60 group-hover:stroke-foreground/90" />
                          {name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          {copyright && (
            <div className="mt-20 border-t pt-6 pb-8">
              <p className="text-xs text-foreground/55">{copyright}</p>
            </div>
          )}
        </div>
      </div>
    )
  }
)

Footer.displayName = 'Footer'
