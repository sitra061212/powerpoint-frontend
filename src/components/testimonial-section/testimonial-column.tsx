'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'

const testimonials = [
  {
    text: 'This AI PPT generator saved me hours of work! I just uploaded my content and got a professional presentation in minutes. The templates are stunning.',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    name: 'Sarah Chen',
    role: 'Marketing Manager',
  },
  {
    text: 'The file upload feature is seamless. I can drag and drop my documents and the AI creates beautiful slides automatically. Game changer for my business presentations.',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    name: 'Michael Rodriguez',
    role: 'Sales Director',
  },
  {
    text: "As a consultant, I create dozens of presentations weekly. This tool's AI suggestions and template variety have transformed my workflow completely.",
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
    name: 'Emily Watson',
    role: 'Business Consultant',
  },
  {
    text: 'The AI understands context perfectly. It organized my messy notes into a coherent, visually appealing presentation. Highly recommend for professionals.',
    image: 'https://randomuser.me/api/portraits/men/4.jpg',
    name: 'David Kim',
    role: 'Project Manager',
  },
  {
    text: "I'm not a designer, but this tool makes me look like one. The AI-generated layouts are professional and the templates are modern and clean.",
    image: 'https://randomuser.me/api/portraits/women/5.jpg',
    name: 'Lisa Thompson',
    role: 'Startup Founder',
  },
  {
    text: 'The speed is incredible. What used to take me 3-4 hours now takes 15 minutes. The AI suggestions for content flow are spot-on every time.',
    image: 'https://randomuser.me/api/portraits/women/6.jpg',
    name: 'Rachel Green',
    role: 'Content Creator',
  },
  {
    text: 'Perfect for client presentations. The AI adapts to different industries and the file upload supports multiple formats. Exactly what I needed.',
    image: 'https://randomuser.me/api/portraits/men/7.jpg',
    name: 'James Wilson',
    role: 'Account Executive',
  },
  {
    text: 'The template library is extensive and the AI customization is smart. It maintains brand consistency while creating unique, engaging presentations.',
    image: 'https://randomuser.me/api/portraits/women/8.jpg',
    name: 'Amanda Foster',
    role: 'Brand Manager',
  },
  {
    text: "As an educator, I create many presentations. This tool's AI understands educational content and creates student-friendly, engaging slides effortlessly.",
    image: 'https://randomuser.me/api/portraits/men/9.jpg',
    name: 'Professor Martinez',
    role: 'University Lecturer',
  },
]

export const TestimonialsColumn = (props: {
  className?: string
  testimonials: typeof testimonials
  duration?: number
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: '-50%',
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'linear',
          repeatType: 'loop',
        }}
        className="flex flex-col gap-6 pb-6 bg-background"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div
                  className="p-10 rounded-md border shadow-lg shadow-primary/10 max-w-xs w-full"
                  key={i}
                >
                  <div>{text}</div>
                  <div className="flex items-center gap-2 mt-5">
                    <Image
                      width={40}
                      height={40}
                      src={image || '/placeholder.svg'}
                      alt={name}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="flex flex-col">
                      <div className="font-medium tracking-tight leading-5">
                        {name}
                      </div>
                      <div className="leading-5 opacity-60 tracking-tight">
                        {role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  )
}

const firstColumn = testimonials.slice(0, 3)
const secondColumn = testimonials.slice(3, 6)
const thirdColumn = testimonials.slice(6, 9)

const Testimonials = () => {
  return (
    <section className="bg-background my-20 relative">
      <div className="container z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="text-3xl font-bold tracking-wide text-balance md:text-4xl lg:text-5xl xl:font-extrabold">
              Testimonials
            </div>
          </div>
          <h2 className=" text-sm tracking-tighter mt-5">
            Loved by professionals worldwide
          </h2>
        </motion.div>
        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  )
}

export default Testimonials
