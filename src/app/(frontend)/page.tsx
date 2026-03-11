'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import InstagramSection from '@/components/instagramSection/instagramSection'
import Newsletter from '@/components/newsletter/newsletter'
import CategorySection from '@/components/categorySection/categorySection'
import ProductCardSection from '@/sections/productSection'

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1800&q=90',
    tag: 'New Season',
    title: ['The Art of', 'Dressing Well'],
    sub: 'Spring / Summer 2026 Collection',
    cta: 'Explore Women',
    ctaLink: '#',
    align: 'left',
  },
  {
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1800&q=90',
    tag: 'Just Arrived',
    title: ['Structured', 'Precision'],
    sub: "The Men's Edit — SS26",
    cta: 'Explore Men',
    ctaLink: '#',
    align: 'right',
  },
  {
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1800&q=90',
    tag: 'Beyond Definition',
    title: ['Fluid Forms,', 'Free Spirit'],
    sub: 'Unisex Collection 2026',
    cta: 'Explore Unisex',
    ctaLink: '#',
    align: 'center',
  },
]

function AnnouncementBar() {
  const messages = [
    'Complimentary shipping on orders over $200',
    'New SS26 Collection — Now Available',
    'Free returns within 30 days',
  ]
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx((v) => (v + 1) % messages.length), 3500)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="bg-foreground text-background h-9 flex items-center justify-center overflow-hidden relative">
      <AnimatePresence mode="wait">
        <motion.p
          key={idx}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="text-[10px] uppercase tracking-[0.3em] font-body absolute"
        >
          {messages[idx]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

// ─── Hero Slider ──────────────────────────────────────────────────────────────

function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const t = setInterval(() => {
      setDirection(1)
      setCurrent((v) => (v + 1) % HERO_SLIDES.length)
    }, 6000)
    return () => clearInterval(t)
  }, [])

  const go = (idx: number) => {
    setDirection(idx > current ? 1 : -1)
    setCurrent(idx)
  }

  const slide = HERO_SLIDES[current]

  return (
    <section className="relative h-[90vh] min-h-[600px] overflow-hidden bg-black">
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
        >
          <img src={slide.image} alt="" className="w-full h-full object-cover" />
          {/* Multi-layer overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div
        className={`absolute inset-0 flex flex-col justify-end px-8 sm:px-16 md:px-24 pb-16 md:pb-24 ${slide.align === 'right' ? 'items-end text-right' : slide.align === 'center' ? 'items-center text-center' : 'items-start'}`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-xl"
          >
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/70 mb-4 font-body">
              {slide.tag}
            </p>
            <h1
              className="font-display text-white leading-none mb-4"
              style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', letterSpacing: '-0.04em' }}
            >
              {slide.title.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="text-sm text-white/60 font-body mb-8">{slide.sub}</p>
            <motion.a
              href={slide.ctaLink}
              whileHover={{ x: 6 }}
              className="inline-flex items-center gap-3 text-xs uppercase tracking-widest text-white font-medium group"
            >
              <span>{slide.cta}</span>
              <span className="w-9 h-9 border border-white/40 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <ArrowRight size={14} />
              </span>
            </motion.a>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button key={i} onClick={() => go(i)} className="group p-1">
            <div
              className={`h-px transition-all duration-500 ${i === current ? 'w-10 bg-white' : 'w-4 bg-white/40 group-hover:bg-white/70'}`}
            />
          </button>
        ))}
      </div>

      {/* Prev / Next */}
      <button
        onClick={() => go((current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 border border-white/30 rounded-full flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-all"
      >
        <ChevronLeft size={16} />
      </button>
      <button
        onClick={() => go((current + 1) % HERO_SLIDES.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 border border-white/30 rounded-full flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-all"
      >
        <ChevronRight size={16} />
      </button>

      {/* Scroll hint */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-1.5 text-white/40"
      >
        <div className="w-px h-10 bg-white/20" />
        <p className="text-[9px] uppercase tracking-[0.3em] rotate-90 mt-2">Scroll</p>
      </motion.div>
    </section>
  )
}

// ─── Marquee ──────────────────────────────────────────────────────────────────

function Marquee() {
  const items = [
    'Free Returns',
    'New Season',
    'Handcrafted in Italy',
    'Sustainable Luxury',
    'Complimentary Shipping',
    'SS26 Collection',
    'Made to Last',
  ]
  const repeated = [...items, ...items, ...items]

  return (
    <div className="border-y border-border overflow-hidden bg-secondary/30 py-3">
      <motion.div
        animate={{ x: ['0%', '-33.33%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        className="flex gap-0 whitespace-nowrap"
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-6 px-6 text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-body"
          >
            {item}
            <span className="w-1 h-1 rounded-full bg-muted-foreground/40 flex-shrink-0" />
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// ─── Editorial Banner ─────────────────────────────────────────────────────────

function EditorialBanner() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section ref={ref} className="relative h-[70vh] overflow-hidden my-4">
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <img
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1800&q=85"
          alt="Editorial"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[10px] uppercase tracking-[0.4em] text-white/60 mb-4 font-body"
        >
          Our Philosophy
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-white text-4xl md:text-6xl lg:text-7xl max-w-3xl leading-tight mb-8"
          style={{ letterSpacing: '-0.04em' }}
        >
          Clothes that outlast every trend
        </motion.h2>
        <motion.a
          href="#"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.03 }}
          className="px-8 py-3.5 border border-white/60 text-white text-xs uppercase tracking-widest rounded-sm hover:bg-white/10 transition-colors"
        >
          Our Story
        </motion.a>
      </div>
    </section>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground mt-20">
      <AnnouncementBar />
      <main>
        <HeroSlider />
        <Marquee />
        <ProductCardSection />
        <CategorySection />
        <EditorialBanner />
        <InstagramSection />
        <Newsletter />
      </main>
    </div>
  )
}
