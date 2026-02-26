'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { SlidersHorizontal, X, ChevronDown, LayoutGrid, LayoutList, Search } from 'lucide-react'
import ProductCardPage from '@/pages/productCard/index'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Product {
  id: number
  name: string
  price: number
  category: string
  image: { title: { url: string } }[]
  tags: string[]
  isNew?: boolean
  isBestseller?: boolean
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Velvet Noir Blazer',
    price: 420,
    category: 'Outerwear',
    tags: ['women', 'formal'],
    isNew: true,
    image: [
      { title: { url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80' } },
    ],
  },
  {
    id: 2,
    name: 'Cashmere Turtleneck',
    price: 280,
    category: 'Tops',
    tags: ['women', 'casual'],
    isBestseller: true,
    image: [
      { title: { url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80' } },
    ],
  },
  {
    id: 3,
    name: 'Wide Leg Trousers',
    price: 195,
    category: 'Bottoms',
    tags: ['women', 'formal'],
    image: [
      { title: { url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80' } },
    ],
  },
  {
    id: 4,
    name: 'Leather Trench Coat',
    price: 890,
    category: 'Outerwear',
    tags: ['women', 'formal'],
    isNew: true,
    image: [
      { title: { url: 'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=600&q=80' } },
    ],
  },
  {
    id: 5,
    name: 'Silk Slip Dress',
    price: 320,
    category: 'Dresses',
    tags: ['women', 'evening'],
    isBestseller: true,
    image: [
      { title: { url: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80' } },
    ],
  },
  {
    id: 6,
    name: 'Merino Wrap Coat',
    price: 540,
    category: 'Outerwear',
    tags: ['women', 'casual'],
    image: [
      { title: { url: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80' } },
    ],
  },
  {
    id: 7,
    name: 'Linen Shirt',
    price: 145,
    category: 'Tops',
    tags: ['men', 'casual'],
    isNew: true,
    image: [
      { title: { url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80' } },
    ],
  },
  {
    id: 8,
    name: 'Tailored Suit Trouser',
    price: 260,
    category: 'Bottoms',
    tags: ['men', 'formal'],
    image: [
      { title: { url: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80' } },
    ],
  },
]

const CATEGORIES = ['All', 'Outerwear', 'Tops', 'Bottoms', 'Dresses']
const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Newest', value: 'newest' },
]
const PRICE_RANGES = [
  { label: 'All', min: 0, max: Infinity },
  { label: 'Under $200', min: 0, max: 200 },
  { label: '$200 – $400', min: 200, max: 400 },
  { label: '$400 – $700', min: 400, max: 700 },
  { label: '$700+', min: 700, max: Infinity },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

const FilterChip = ({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) => (
  <button
    onClick={onClick}
    className={`
      px-4 py-1.5 text-xs tracking-widest uppercase font-medium rounded-sm border transition-all duration-200
      ${
        active
          ? 'bg-foreground text-background border-foreground'
          : 'bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground'
      }
    `}
  >
    {label}
  </button>
)

export default function ProductStorePage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [activePriceRange, setActivePriceRange] = useState(0)
  const [sortBy, setSortBy] = useState('featured')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [gridView, setGridView] = useState<'grid' | 'list'>('grid')
  const [sortOpen, setSortOpen] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showBestseller, setShowBestseller] = useState(false)

  const filtered = useMemo(() => {
    let list = [...PRODUCTS]

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q),
      )
    }
    if (activeCategory !== 'All') list = list.filter((p) => p.category === activeCategory)

    const range = PRICE_RANGES[activePriceRange]
    list = list.filter((p) => p.price >= range.min && p.price <= range.max)

    if (showNew) list = list.filter((p) => p.isNew)
    if (showBestseller) list = list.filter((p) => p.isBestseller)

    if (sortBy === 'price-asc') list.sort((a, b) => a.price - b.price)
    else if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price)
    else if (sortBy === 'newest')
      list = list.filter((p) => p.isNew).concat(list.filter((p) => !p.isNew))

    return list
  }, [activeCategory, activePriceRange, sortBy, searchQuery, showNew, showBestseller])

  const activeFilterCount = [
    activeCategory !== 'All',
    activePriceRange !== 0,
    showNew,
    showBestseller,
  ].filter(Boolean).length

  const clearAll = () => {
    setActiveCategory('All')
    setActivePriceRange(0)
    setShowNew(false)
    setShowBestseller(false)
    setSearchQuery('')
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/80 to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&q=80"
          alt="Collection"
          className="w-full h-64 object-cover object-top opacity-40"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2 font-body"
          >
            Spring / Summer 2025
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-6xl text-foreground"
          >
            The Collection
          </motion.h1>
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div className="sticky top-0 z-30 bg-background/90 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-14 flex items-center justify-between gap-4">
          {/* Left: filter toggle + search */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters((v) => !v)}
              className="flex items-center gap-2 text-xs uppercase tracking-widest text-foreground hover:text-muted-foreground transition-colors"
            >
              <SlidersHorizontal size={14} />
              <span>Filter</span>
              {activeFilterCount > 0 && (
                <span className="bg-foreground text-background text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <div className="relative hidden sm:block">
              <Search
                size={13}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-4 py-1.5 text-xs bg-secondary border border-transparent focus:border-border rounded-sm outline-none w-44 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  <X size={12} className="text-muted-foreground" />
                </button>
              )}
            </div>
          </div>

          {/* Center: product count */}
          <p className="text-xs text-muted-foreground tracking-widest hidden md:block">
            {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
          </p>

          {/* Right: sort + grid toggle */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setSortOpen((v) => !v)}
                className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-foreground"
              >
                <span>{SORT_OPTIONS.find((o) => o.value === sortBy)?.label}</span>
                <ChevronDown
                  size={12}
                  className={`transition-transform ${sortOpen ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {sortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-8 bg-background border border-border rounded-sm shadow-lg z-50 min-w-44 py-1"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setSortBy(opt.value)
                          setSortOpen(false)
                        }}
                        className={`w-full text-left px-4 py-2 text-xs tracking-wider hover:bg-secondary transition-colors ${sortBy === opt.value ? 'text-foreground font-medium' : 'text-muted-foreground'}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden border-b border-border bg-secondary/30"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Category */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3 font-medium">
                  Category
                </p>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <FilterChip
                      key={cat}
                      label={cat}
                      active={activeCategory === cat}
                      onClick={() => setActiveCategory(cat)}
                    />
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3 font-medium">
                  Price
                </p>
                <div className="flex flex-wrap gap-2">
                  {PRICE_RANGES.map((range, i) => (
                    <FilterChip
                      key={range.label}
                      label={range.label}
                      active={activePriceRange === i}
                      onClick={() => setActivePriceRange(i)}
                    />
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3 font-medium">
                  Availability
                </p>
                <div className="flex flex-wrap gap-2">
                  <FilterChip
                    label="New Arrivals"
                    active={showNew}
                    onClick={() => setShowNew((v) => !v)}
                  />
                  <FilterChip
                    label="Bestsellers"
                    active={showBestseller}
                    onClick={() => setShowBestseller((v) => !v)}
                  />
                </div>
              </div>

              {/* Clear */}
              <div className="flex items-end">
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearAll}
                    className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X size={12} /> Clear all filters
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Product Grid ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        {/* Active filter pills */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {activeCategory !== 'All' && (
              <span className="flex items-center gap-1.5 bg-secondary px-3 py-1 text-xs rounded-sm">
                {activeCategory}
                <button onClick={() => setActiveCategory('All')}>
                  <X size={10} />
                </button>
              </span>
            )}
            {activePriceRange !== 0 && (
              <span className="flex items-center gap-1.5 bg-secondary px-3 py-1 text-xs rounded-sm">
                {PRICE_RANGES[activePriceRange].label}
                <button onClick={() => setActivePriceRange(0)}>
                  <X size={10} />
                </button>
              </span>
            )}
            {showNew && (
              <span className="flex items-center gap-1.5 bg-secondary px-3 py-1 text-xs rounded-sm">
                New Arrivals
                <button onClick={() => setShowNew(false)}>
                  <X size={10} />
                </button>
              </span>
            )}
            {showBestseller && (
              <span className="flex items-center gap-1.5 bg-secondary px-3 py-1 text-xs rounded-sm">
                Bestsellers
                <button onClick={() => setShowBestseller(false)}>
                  <X size={10} />
                </button>
              </span>
            )}
          </div>
        )}

        <AnimatePresence mode="wait">
          <ProductCardPage />
        </AnimatePresence>
      </main>
    </div>
  )
}
