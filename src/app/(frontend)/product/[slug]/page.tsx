'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll } from 'motion/react'
import {
  ShoppingBag,
  Heart,
  Share2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Star,
  Truck,
  RotateCcw,
  Shield,
  Plus,
  Minus,
  Check,
  ArrowRight,
  ZoomIn,
} from 'lucide-react'


interface Review {
  id: number
  name: string
  rating: number
  date: string
  body: string
  verified: boolean
}

interface RelatedProduct {
  id: number
  name: string
  price: number
  image: string
  category: string
}


const PRODUCT = {
  name: 'Velvet Noir Blazer',
  subtitle: 'Structured Evening Jacket',
  price: 420,
  comparePrice: 580,
  category: 'Outerwear',
  collection: 'Women',
  sku: 'VNB-001-BLK',
  rating: 4.8,
  reviewCount: 124,
  isNew: true,
  inStock: true,
  description: `A defining piece in the season's edit. The Velvet Noir Blazer arrives in a deep midnight velvet with a precision-cut silhouette that balances structure with ease. Double-breasted with gilt buttons, raw-edged lapels, and a single back vent — it moves between evening events and elevated daywear with no negotiation required.`,
  details: [
    'Double-breasted, 6-button closure',
    'Peak lapels with raw-edge finish',
    'Two chest welt pockets, two hip pockets',
    'Single back vent',
    'Full satin lining',
    '100% Silk velvet shell',
    'Dry clean only',
    'Made in Italy',
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  colors: [
    { name: 'Midnight Black', hex: '#0d0d0d', images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=900&q=85',
      'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=900&q=85',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900&q=85',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=85',
    ]},
    { name: 'Deep Burgundy', hex: '#4a1520', images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=900&q=85',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900&q=85',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=900&q=85',
    ]},
    { name: 'Forest Night', hex: '#1a2e1a', images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=900&q=85',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&q=85',
    ]},
  ],
}

const REVIEWS: Review[] = [
  { id: 1, name: 'Margaux L.', rating: 5, date: 'Jan 12, 2025', verified: true, body: 'Absolutely stunning piece. The velvet quality is exceptional — rich and deep, nothing like fast fashion. I wore it to three events in one week and received compliments at every single one.' },
  { id: 2, name: 'Sofia R.', rating: 5, date: 'Dec 28, 2024', verified: true, body: 'Fits like a dream. I sized up from my usual S to M for a more relaxed shoulder and it was the right call. The lining is incredibly smooth.' },
  { id: 3, name: 'Ines K.', rating: 4, date: 'Dec 3, 2024', verified: true, body: 'Beautiful blazer. The only reason for 4 stars is the delivery took a bit longer than expected. The product itself is flawless — structured yet comfortable.' },
]

const RELATED: RelatedProduct[] = [
  { id: 1, name: 'Silk Slip Dress', price: 320, category: 'Dresses', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80' },
  { id: 2, name: 'Cashmere Turtleneck', price: 280, category: 'Tops', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80' },
  { id: 3, name: 'Wide Leg Trousers', price: 195, category: 'Bottoms', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80' },
  { id: 4, name: 'Merino Wrap Coat', price: 540, category: 'Outerwear', image: 'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=600&q=80' },
]


function Stars({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={size}
          className={s <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'}
        />
      ))}
    </div>
  )
}


function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="text-xs uppercase tracking-widest font-medium text-foreground">{title}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={14} className="text-muted-foreground" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-5 text-sm text-muted-foreground font-body leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


function ImageGallery({ images }: { images: string[] }) {
  const [active, setActive] = useState(0)
  const [zoomed, setZoomed] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <div className="flex gap-4">
      {/* Thumbnails */}
      <div className="hidden sm:flex flex-col gap-2 w-16 flex-shrink-0">
        {images.map((img, i) => (
          <motion.button
            key={i}
            onClick={() => setActive(i)}
            whileHover={{ scale: 1.04 }}
            className={`aspect-[3/4] overflow-hidden rounded-sm border-2 transition-colors duration-150 ${
              active === i ? 'border-foreground' : 'border-transparent'
            }`}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </motion.button>
        ))}
      </div>

      {/* Main image */}
      <div className="flex-1 relative">
        {/* Badge */}
        {PRODUCT.isNew && (
          <div className="absolute top-4 left-4 z-10 bg-foreground text-background text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-sm">
            New Season
          </div>
        )}
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <button
            onClick={() => setZoomed(v => !v)}
            className="w-8 h-8 bg-background/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-background transition-colors"
          >
            <ZoomIn size={13} />
          </button>
        </div>

        {/* Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={`aspect-[3/4] overflow-hidden rounded-sm bg-secondary relative ${zoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
            onMouseMove={handleMouseMove}
            onClick={() => setZoomed(v => !v)}
          >
            <motion.img
              src={images[active]}
              alt={PRODUCT.name}
              className="w-full h-full object-cover"
              animate={
                zoomed
                  ? { scale: 2, x: `${-(mousePos.x - 50) * 0.8}%`, y: `${-(mousePos.y - 50) * 0.8}%` }
                  : { scale: 1, x: 0, y: 0 }
              }
              transition={{ duration: zoomed ? 0 : 0.4 }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Mobile prev/next */}
        <div className="flex sm:hidden justify-between mt-3 gap-2">
          <button
            onClick={() => setActive(v => Math.max(0, v - 1))}
            disabled={active === 0}
            className="flex-1 h-10 border border-border rounded-sm flex items-center justify-center disabled:opacity-30"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="flex items-center text-xs text-muted-foreground">
            {active + 1} / {images.length}
          </span>
          <button
            onClick={() => setActive(v => Math.min(images.length - 1, v + 1))}
            disabled={active === images.length - 1}
            className="flex-1 h-10 border border-border rounded-sm flex items-center justify-center disabled:opacity-30"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex sm:hidden justify-center gap-1.5 mt-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${i === active ? 'bg-foreground' : 'bg-muted-foreground/30'}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Add to Cart Toast ────────────────────────────────────────────────────────

function AddedToast({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.96 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-foreground text-background px-6 py-3.5 rounded-sm flex items-center gap-3 shadow-2xl text-sm"
        >
          <div className="w-5 h-5 rounded-full bg-background/20 flex items-center justify-center">
            <Check size={11} />
          </div>
          <span className="font-body tracking-wide">Added to bag</span>
          <button className="ml-3 text-background/60 hover:text-background text-xs uppercase tracking-widest underline underline-offset-2">
            View Bag
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ProductDetailPage() {
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [wishlisted, setWishlisted] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const [sizeError, setSizeError] = useState(false)

  const activeColor = PRODUCT.colors[selectedColor]
  const discount = Math.round((1 - PRODUCT.price / PRODUCT.comparePrice) * 100)

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true)
      setTimeout(() => setSizeError(false), 2000)
      return
    }
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 3000)
  }

  const stickyRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Breadcrumb ── */}
      <div className="border-b border-border px-6 md:px-16 py-3">
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground font-body">
          <a href="#" className="hover:text-foreground transition-colors">Home</a>
          <span>/</span>
          <a href="#" className="hover:text-foreground transition-colors">{PRODUCT.collection}</a>
          <span>/</span>
          <a href="#" className="hover:text-foreground transition-colors">{PRODUCT.category}</a>
          <span>/</span>
          <span className="text-foreground">{PRODUCT.name}</span>
        </nav>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-10 lg:gap-20 items-start">

          {/* LEFT: Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ImageGallery images={activeColor.images} />
          </motion.div>

          {/* RIGHT: Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:sticky lg:top-20"
          >
            {/* Category + badges */}
            <div className="flex items-center gap-3 mb-3">
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-body">
                {PRODUCT.category}
              </p>
              {PRODUCT.isNew && (
                <span className="text-[9px] uppercase tracking-widest bg-foreground text-background px-2 py-0.5 rounded-sm">
                  New
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl text-foreground leading-tight mb-1" style={{ letterSpacing: '-0.02em' }}>
              {PRODUCT.name}
            </h1>
            <p className="text-sm text-muted-foreground font-body mb-4">{PRODUCT.subtitle}</p>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <Stars rating={PRODUCT.rating} />
              <span className="text-xs text-muted-foreground font-body">
                {PRODUCT.rating} · {PRODUCT.reviewCount} reviews
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-8">
              <span className="font-display text-2xl text-foreground">${PRODUCT.price}</span>
              <span className="text-sm text-muted-foreground line-through font-body">${PRODUCT.comparePrice}</span>
              <span className="text-xs bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 px-2 py-0.5 rounded-sm font-medium">
                -{discount}%
              </span>
            </div>

            <div className="h-px bg-border mb-7" />

            {/* Color selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs uppercase tracking-widest text-foreground font-medium">
                  Color
                </p>
                <p className="text-xs text-muted-foreground font-body">{activeColor.name}</p>
              </div>
              <div className="flex gap-2.5">
                {PRODUCT.colors.map((color, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setSelectedColor(i)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title={color.name}
                    className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                      selectedColor === i ? 'border-foreground scale-110' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color.hex, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.15)' }}
                  />
                ))}
              </div>
            </div>

            {/* Size selector */}
            <div className="mb-7">
              <div className="flex items-center justify-between mb-3">
                <p className={`text-xs uppercase tracking-widest font-medium transition-colors ${sizeError ? 'text-red-500' : 'text-foreground'}`}>
                  {sizeError ? 'Please select a size' : 'Size'}
                </p>
                <button className="text-xs text-muted-foreground underline underline-offset-2 font-body hover:text-foreground transition-colors">
                  Size guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {PRODUCT.sizes.map((size) => (
                  <motion.button
                    key={size}
                    onClick={() => { setSelectedSize(size); setSizeError(false) }}
                    whileTap={{ scale: 0.95 }}
                    className={`min-w-[3rem] h-10 px-3 text-xs uppercase tracking-widest rounded-sm border transition-all duration-150 ${
                      selectedSize === size
                        ? 'border-foreground bg-foreground text-background'
                        : sizeError
                        ? 'border-red-300 text-muted-foreground hover:border-foreground hover:text-foreground'
                        : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
                    }`}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex gap-3 mb-4">
              {/* Quantity */}
              <div className="flex items-center border border-border rounded-sm">
                <button
                  onClick={() => setQuantity(v => Math.max(1, v - 1))}
                  className="w-10 h-12 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Minus size={13} />
                </button>
                <span className="w-8 text-center text-sm font-body">{quantity}</span>
                <button
                  onClick={() => setQuantity(v => v + 1)}
                  className="w-10 h-12 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Plus size={13} />
                </button>
              </div>

              {/* Add to Cart */}
              <motion.button
                onClick={handleAddToCart}
                whileTap={{ scale: 0.98 }}
                className="flex-1 h-12 bg-foreground text-background text-xs uppercase tracking-widest font-medium rounded-sm flex items-center justify-center gap-2.5 hover:bg-foreground/90 transition-colors"
              >
                <ShoppingBag size={14} />
                Add to Bag
              </motion.button>

              {/* Wishlist */}
              <motion.button
                onClick={() => setWishlisted(v => !v)}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 border border-border rounded-sm flex items-center justify-center hover:border-foreground transition-colors"
              >
                <Heart
                  size={15}
                  className={`transition-colors ${wishlisted ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`}
                />
              </motion.button>
            </div>

            {/* Buy now */}
            <button className="w-full h-12 border border-foreground text-foreground text-xs uppercase tracking-widest font-medium rounded-sm hover:bg-foreground hover:text-background transition-all duration-200 mb-6">
              Buy it now
            </button>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { icon: Truck, label: 'Free Shipping', sub: 'On orders over $200' },
                { icon: RotateCcw, label: 'Free Returns', sub: 'Within 30 days' },
                { icon: Shield, label: 'Authenticity', sub: 'Verified genuine' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center gap-1.5 py-3 rounded-sm bg-secondary/50">
                  <Icon size={14} className="text-muted-foreground" />
                  <p className="text-[10px] uppercase tracking-wider text-foreground font-medium leading-none">{label}</p>
                  <p className="text-[9px] text-muted-foreground font-body leading-tight">{sub}</p>
                </div>
              ))}
            </div>

            {/* Share */}
            <button className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors mb-8">
              <Share2 size={12} />
              <span className="uppercase tracking-widest">Share</span>
            </button>

            {/* Accordions */}
            <div className="border-t border-border">
              <Accordion title="Description">
                <p>{PRODUCT.description}</p>
              </Accordion>
              <Accordion title="Details & Composition">
                <ul className="space-y-1.5">
                  {PRODUCT.details.map((d, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/50 mt-1.5 flex-shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </Accordion>
              <Accordion title="Shipping & Returns">
                <div className="space-y-3">
                  <p>Complimentary standard shipping on orders over $200. Express and overnight options available at checkout.</p>
                  <p>Returns accepted within 30 days of delivery. Items must be unworn, unwashed, and with all original tags attached.</p>
                  <p>SKU: {PRODUCT.sku}</p>
                </div>
              </Accordion>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Reviews ── */}
      <section className="border-t border-border bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 py-16">
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12">

            {/* Summary */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3 font-body">Customer Reviews</p>
              <div className="flex items-baseline gap-3 mb-3">
                <span className="font-display text-5xl">{PRODUCT.rating}</span>
                <span className="text-sm text-muted-foreground font-body">/ 5</span>
              </div>
              <Stars rating={PRODUCT.rating} size={16} />
              <p className="text-xs text-muted-foreground mt-2 font-body">Based on {PRODUCT.reviewCount} reviews</p>

              {/* Rating bars */}
              <div className="mt-6 space-y-2">
                {[5, 4, 3, 2, 1].map((star) => {
                  const pct = star === 5 ? 78 : star === 4 ? 16 : star === 3 ? 4 : star === 2 ? 1 : 1
                  return (
                    <div key={star} className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="w-3">{star}</span>
                      <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.7, delay: (5 - star) * 0.05 }}
                          className="h-full bg-amber-400 rounded-full"
                        />
                      </div>
                      <span className="w-6 text-right">{pct}%</span>
                    </div>
                  )
                })}
              </div>

              <button className="mt-8 w-full h-10 border border-foreground text-xs uppercase tracking-widest rounded-sm hover:bg-foreground hover:text-background transition-all duration-200">
                Write a Review
              </button>
            </div>

            {/* Review list */}
            <div className="space-y-8">
              {REVIEWS.map((review, i) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="pb-8 border-b border-border last:border-0"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium text-foreground">{review.name}</p>
                        {review.verified && (
                          <span className="text-[9px] uppercase tracking-widest text-green-600 dark:text-green-400 flex items-center gap-0.5">
                            <Check size={9} /> Verified
                          </span>
                        )}
                      </div>
                      <Stars rating={review.rating} size={11} />
                    </div>
                    <p className="text-[10px] text-muted-foreground font-body">{review.date}</p>
                  </div>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed mt-3">{review.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── You May Also Like ── */}
      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 py-16">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2 font-body">Complete the Look</p>
              <h2 className="font-display text-3xl" style={{ letterSpacing: '-0.02em' }}>You May Also Like</h2>
            </div>
            <a href="#" className="hidden sm:flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
              View all <ArrowRight size={12} />
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {RELATED.map((product, i) => (
              <motion.a
                key={product.id}
                href="#"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[3/4] overflow-hidden rounded-sm bg-secondary mb-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-0.5 font-body">{product.category}</p>
                <h4 className="font-display text-base text-foreground leading-tight mb-1">{product.name}</h4>
                <p className="text-sm font-body text-foreground">${product.price}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sticky Add to Cart (mobile) ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-background/95 backdrop-blur border-t border-border px-4 py-3 flex gap-3">
        <div className="flex-1">
          <p className="text-xs text-muted-foreground font-body truncate">{PRODUCT.name}</p>
          <p className="text-sm font-display">${PRODUCT.price}</p>
        </div>
        <motion.button
          onClick={handleAddToCart}
          whileTap={{ scale: 0.97 }}
          className="px-8 h-11 bg-foreground text-background text-xs uppercase tracking-widest rounded-sm flex items-center gap-2"
        >
          <ShoppingBag size={13} />
          Add to Bag
        </motion.button>
      </div>

      <AddedToast visible={addedToCart} />
    </div>
  )
}