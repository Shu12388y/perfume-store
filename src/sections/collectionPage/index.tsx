'use client'

import React, {  useRef } from 'react'
import { motion, useScroll, useTransform} from 'motion/react'
import { ArrowRight } from 'lucide-react'

interface CollectionItem {
  id: number
  name: string
  itemCount: number
  image: string
  accent: string
  tag?: string
}

interface Collection {
  id: string
  title: string
  subtitle: string
  description: string
  heroImage: string
  accentColor: string
  textColor: string
  items: CollectionItem[]
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const COLLECTIONS: Collection[] = [
  {
    id: 'women',
    title: 'Women',
    subtitle: 'Effortless Elegance',
    description:
      'Refined silhouettes and considered fabrics — pieces built for the woman who moves through the world with intention.',
    heroImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400&q=80',
    accentColor: '#C9A96E',
    textColor: '#1a1209',
    items: [
      {
        id: 1,
        name: 'Outerwear',
        itemCount: 18,
        tag: 'New Season',
        image: 'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=800&q=80',
        accent: '#d4b896',
      },
      {
        id: 2,
        name: 'Dresses',
        itemCount: 24,
        image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80',
        accent: '#b8967a',
      },
      {
        id: 3,
        name: 'Tops & Blouses',
        itemCount: 31,
        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',
        accent: '#c4a882',
      },
      {
        id: 4,
        name: 'Trousers',
        itemCount: 15,
        tag: 'Bestseller',
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
        accent: '#a8917a',
      },
    ],
  },
  {
    id: 'men',
    title: 'Men',
    subtitle: 'Structured Precision',
    description:
      'Sharp tailoring meets understated luxury. Wardrobe foundations and statement pieces for the considered dresser.',
    heroImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1400&q=80',
    accentColor: '#6B8CAE',
    textColor: '#0d1520',
    items: [
      {
        id: 5,
        name: 'Suits & Blazers',
        itemCount: 12,
        tag: 'New Season',
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
        accent: '#7a9ab8',
      },
      {
        id: 6,
        name: 'Shirts',
        itemCount: 28,
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
        accent: '#5c7a96',
      },
      {
        id: 7,
        name: 'Trousers',
        itemCount: 19,
        tag: 'Bestseller',
        image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80',
        accent: '#6b8ca8',
      },
      {
        id: 8,
        name: 'Outerwear',
        itemCount: 9,
        image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80',
        accent: '#4a6878',
      },
    ],
  },
  {
    id: 'unisex',
    title: 'Unisex',
    subtitle: 'Beyond Definition',
    description:
      'Clothing that transcends categories. Essential forms and relaxed volumes designed for every body, every person.',
    heroImage: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1400&q=80',
    accentColor: '#8E8E8E',
    textColor: '#111111',
    items: [
      {
        id: 9,
        name: 'Knitwear',
        itemCount: 16,
        tag: 'New Season',
        image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80',
        accent: '#a0a0a0',
      },
      {
        id: 10,
        name: 'T-Shirts',
        itemCount: 22,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
        accent: '#888888',
      },
      {
        id: 11,
        name: 'Denim',
        itemCount: 14,
        tag: 'Bestseller',
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80',
        accent: '#707070',
      },
      {
        id: 12,
        name: 'Accessories',
        itemCount: 38,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
        accent: '#969696',
      },
    ],
  },
]

// ─── Collection Hero Section ───────────────────────────────────────────────────

function CollectionHero({
  collection,
  index,
}: {
  collection: Collection
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const isEven = index % 2 === 0

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col overflow-hidden">

      {/* ── Parallax Hero ── */}
      <div className={`relative flex-1 grid ${isEven ? 'md:grid-cols-[1fr_1fr]' : 'md:grid-cols-[1fr_1fr]'} min-h-[70vh]`}>

        {/* Image side */}
        <div className={`relative overflow-hidden ${isEven ? 'md:order-1' : 'md:order-2'}`}>
          <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110">
            <img
              src={collection.heroImage}
              alt={collection.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>

          {/* Large title overlay */}
          <div className="absolute inset-0 flex items-end p-8 md:p-12">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-white/90 leading-none select-none"
              style={{ fontSize: 'clamp(4rem, 10vw, 9rem)', letterSpacing: '-0.03em' }}
            >
              {collection.title}
            </motion.h2>
          </div>
        </div>

        {/* Text side */}
        <div
          className={`relative flex flex-col justify-center px-10 md:px-16 lg:px-24 py-16 md:py-0 ${isEven ? 'md:order-2' : 'md:order-1'}`}
          style={{ backgroundColor: collection.accentColor + '12' }}
        >
          {/* Vertical line accent */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute top-12 bottom-12 left-8 w-px origin-top"
            style={{ backgroundColor: collection.accentColor + '60' }}
          />

          <motion.div
            initial={{ opacity: 0, x: isEven ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <p
              className="text-[10px] uppercase tracking-[0.35em] mb-4 font-medium"
              style={{ color: collection.accentColor }}
            >
              {collection.subtitle}
            </p>
            <h3
              className="font-display mb-6 leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: collection.textColor }}
            >
              The {collection.title}&apos;s<br />Edit
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground max-w-xs mb-10 font-body">
              {collection.description}
            </p>
            <motion.a
              href={`/collections/${collection.id}`}
              whileHover={{ x: 6 }}
              className="inline-flex items-center gap-3 text-xs uppercase tracking-widest font-medium group"
              style={{ color: collection.textColor }}
            >
              <span>Shop {collection.title}</span>
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200"
                style={{ backgroundColor: collection.accentColor + '20' }}
              >
                <ArrowRight size={13} style={{ color: collection.accentColor }} />
              </span>
            </motion.a>
          </motion.div>

          {/* Item count badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="absolute bottom-10 right-10 text-right hidden md:block"
          >
            <p
              className="font-display leading-none"
              style={{ fontSize: '3.5rem', color: collection.accentColor + '30' }}
            >
              {collection.items.reduce((acc, i) => acc + i.itemCount, 0)}
            </p>
            <p className="text-[9px] uppercase tracking-widest text-muted-foreground">pieces</p>
          </motion.div>
        </div>
      </div>

   
      {index < COLLECTIONS.length - 1 && (
        <div className="h-px bg-border mx-8 md:mx-16" />
      )}
    </section>
  )
}

function PageHeader() {
  return (
    <div className="relative bg-background border-b border-border overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-foreground/[0.02] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-foreground/[0.03] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 md:px-16 py-20 md:py-28 relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-4 font-body"
        >
          Spring / Summer 2025
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="font-display leading-[0.9] text-foreground mb-6"
          style={{ fontSize: 'clamp(3.5rem, 8vw, 8rem)', letterSpacing: '-0.04em' }}
        >
          Shop by<br />Collection
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="text-sm text-muted-foreground font-body max-w-md leading-relaxed"
        >
          Three distinct worlds. One vision. Explore our curated collections
          crafted for every identity and every occasion.
        </motion.p>

        {/* Quick nav */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex gap-6 mt-10"
        >
          {COLLECTIONS.map((col) => (
            <a
              key={col.id}
              href={`#${col.id}`}
              className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200 font-body"
            >
              {col.title}
            </a>
          ))}
        </motion.div>
      </div>
    </div>
  )
}


function StatsBar() {
  const stats = [
    { label: 'Collections', value: '3' },
    { label: 'Total Pieces', value: '246' },
    { label: 'New Arrivals', value: '38' },
    { label: 'Categories', value: '12' },
  ]

  return (
    <div className="border-y border-border bg-secondary/30">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.07 }}
            className="px-6 py-5 text-center"
          >
            <p className="font-display text-2xl text-foreground">{stat.value}</p>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5 font-body">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}


export default function CollectionPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body">

      <PageHeader />
      <StatsBar />

      <div>
        {COLLECTIONS.map((collection, index) => (
          <div key={collection.id} id={collection.id}>
            <CollectionHero collection={collection} index={index} />
          </div>
        ))}
      </div>

      {/* ── Footer CTA ── */}
      <section className="bg-foreground text-background py-24 px-8 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)',
            backgroundSize: '20px 20px',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative z-10"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-background/50 mb-4 font-body">
            Exclusive Access
          </p>
          <h2 className="font-display text-4xl md:text-6xl mb-6 leading-tight" style={{ letterSpacing: '-0.03em' }}>
            New arrivals,<br />first.
          </h2>
          <p className="text-sm text-background/60 mb-10 max-w-sm mx-auto font-body leading-relaxed">
            Join our inner circle for early access to new collections, private sales, and curated edits.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-white/10 border border-white/20 text-background placeholder:text-background/40 px-5 py-3 text-xs rounded-sm outline-none focus:border-white/50 transition-colors"
            />
            <button className="px-6 py-3 bg-background text-foreground text-xs uppercase tracking-widest rounded-sm hover:bg-background/90 transition-colors whitespace-nowrap">
              Join Now
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  )
}