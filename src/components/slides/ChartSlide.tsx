// components/slides/ChartSlide.tsx
'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import type { SlideData } from '@/types/slides'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface ChartSlideProps {
  slide: SlideData
  // Optional: Use a background image from picsum.photos
  backgroundImage?: string
  theme?: 'light' | 'dark' | 'gradient'
}

export function ChartSlide({ slide, backgroundImage, theme = 'light' }: ChartSlideProps) {
  const labels = slide.data?.map(d => d.name) ?? []
  const values = slide.data?.map(d => d.value) ?? []

  const chartData = {
    labels,
    datasets: [
      {
        label: slide.title || 'Chart Data',
        data: values,
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false, // We render title separately
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  }

  // Theme classes
  const themeClasses = {
    light: 'bg-white text-slate-800',
    dark: 'bg-slate-900 text-slate-100',
    gradient: 'bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800',
  }

  return (
    <Card
      className={`w-full h-[600px] rounded-2xl shadow-lg overflow-hidden border-0 relative flex flex-col p-6`}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Background overlay for readability */}
      {backgroundImage && <div className="absolute inset-0 bg-black/50 z-0"></div>}
      {!backgroundImage && (
        <div className={`absolute inset-0 z-0 ${themeClasses[theme]} opacity-90`}></div>
      )}

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        {slide.title && (
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white drop-shadow-md text-center">
            {slide.title}
          </h3>
        )}
        <CardContent className="flex-1 p-0 mt-2">
          <div className="w-full h-64 md:h-80">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </CardContent>
      </div>

      {/* Accent bar at bottom */}
      <div className="relative z-10 h-2 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
    </Card>
  )
}