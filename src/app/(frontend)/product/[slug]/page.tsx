'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  ShoppingBag,
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
  ZoomIn,
} from 'lucide-react'
import { useParams } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import type { AppDispatch, RootState } from '@/store'
import { get_product } from '@/services/product.services'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import type { Product, Media } from '@/payload-types'

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
    {
      name: 'Midnight Black',
      hex: '#0d0d0d',
      images: [
        'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=900&q=85',
        'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=900&q=85',
        'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900&q=85',
        'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=85',
      ],
    },
    {
      name: 'Deep Burgundy',
      hex: '#4a1520',
      images: [
        'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=900&q=85',
        'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900&q=85',
        'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=900&q=85',
      ],
    },
    {
      name: 'Forest Night',
      hex: '#1a2e1a',
      images: [
        'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=900&q=85',
        'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&q=85',
      ],
    },
  ],
}

function Stars({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={size}
          className={
            s <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'
          }
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
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="text-xs uppercase tracking-widest font-medium text-foreground">
          {title}
        </span>
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

function getMediaUrl(title: (string | null) | Media | undefined): string {
  if (title && typeof title === 'object') return title.url ?? ''
  return ''
}

function getMediaFilename(title: (string | null) | Media | undefined): string {
  if (title && typeof title === 'object') return title.filename ?? ''
  return ''
}

function ImageGallery({ images }: { images: NonNullable<Product['images']> }) {
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
      <div className="hidden sm:flex flex-col gap-2 w-16 shrink-0">
        {images.map((img, i) => (
          <motion.button
            key={i}
            onClick={() => setActive(i)}
            whileHover={{ scale: 1.04 }}
            className={`aspect-3/4 overflow-hidden rounded-sm border-2 transition-colors duration-150 ${
              active === i ? 'border-foreground' : 'border-transparent'
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getMediaUrl(img?.title)}
              alt={getMediaFilename(img?.title)}
              className="w-full h-full object-cover"
            />
          </motion.button>
        ))}
      </div>

      {/* Main image */}
      <div className="flex-1 relative">
        {/* Badge */}

        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <button
            onClick={() => setZoomed((v) => !v)}
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
            className={`aspect-3/4 overflow-hidden rounded-sm bg-secondary relative ${zoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
            onMouseMove={handleMouseMove}
            onClick={() => setZoomed((v) => !v)}
          >
            <motion.img
              src={getMediaUrl(images[active]?.title)}
              alt={PRODUCT.name}
              className="w-full h-full object-cover"
              animate={
                zoomed
                  ? {
                      scale: 2,
                      x: `${-(mousePos.x - 50) * 0.8}%`,
                      y: `${-(mousePos.y - 50) * 0.8}%`,
                    }
                  : { scale: 1, x: 0, y: 0 }
              }
              transition={{ duration: zoomed ? 0 : 0.4 }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Mobile prev/next */}
        <div className="flex sm:hidden justify-between mt-3 gap-2">
          <button
            onClick={() => setActive((v) => Math.max(0, v - 1))}
            disabled={active === 0}
            className="flex-1 h-10 border border-border rounded-sm flex items-center justify-center disabled:opacity-30"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="flex items-center text-xs text-muted-foreground">
            {active + 1} / {images.length}
          </span>
          <button
            onClick={() => setActive((v) => Math.min(images.length - 1, v + 1))}
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

export default function Page() {
  const slug = useParams()
  const { loading, error, product_data } = useSelector((state: RootState) => state.product)
  const dispatch = useDispatch<AppDispatch>()
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const [price, setPrice] = useState('')

  const discount = Math.round((1 - PRODUCT.price / PRODUCT.comparePrice) * 100)

  const handleAddToCart = () => {
    if (!1) {
      return
    }
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 3000)
  }

  useEffect(() => {
    dispatch(get_product(slug.slug as string)).unwrap()
  }, [slug.slug, dispatch])

  useEffect(() => {
    const firstVariant = product_data?.variants?.[0]?.variant
    setPrice((firstVariant && typeof firstVariant === 'object' ? firstVariant.price : null) || '0')
  }, [product_data])

  if (loading) {
    return <>Loading</>
  }

  if (error) {
    return <>Error</>
  }

  console.log(product_data)

  const Content = ({ data }: { data: SerializedEditorState }) => {
    const html = convertLexicalToHTML({ data })

    return <div dangerouslySetInnerHTML={{ __html: html }} />
  }
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-10 lg:gap-20 items-start">
          {/* LEFT: Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ImageGallery images={product_data?.images ?? []} />
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
            </div>

            {/* Title */}
            <h1
              className="font-display text-3xl md:text-4xl text-foreground leading-tight mb-1"
              style={{ letterSpacing: '-0.02em' }}
            >
              {product_data?.name}
            </h1>
            {/* <p className="text-sm text-muted-foreground font-body mb-4">{PRODUCT.subtitle}</p> */}

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <Stars rating={PRODUCT.rating} />
              <span className="text-xs text-muted-foreground font-body">
                {PRODUCT.rating} · {PRODUCT.reviewCount} reviews
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-8">
              <span className="font-display text-2xl text-foreground">RS {price}</span>
              <span className="text-sm text-muted-foreground line-through font-body">
                ${PRODUCT.comparePrice}
              </span>
              <span className="text-xs bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 px-2 py-0.5 rounded-sm font-medium">
                -{discount}%
              </span>
            </div>

            <div className="h-px bg-border mb-7" />

            {/* selector */}
            <div className="mb-6">
              <div className="flex gap-2.5">
                {product_data?.variants?.map((v, i) => {
                  const variant = v?.variant && typeof v.variant === 'object' ? v.variant : null
                  const imgSrc =
                    variant?.img && typeof variant.img === 'object' ? (variant.img.url ?? '') : ''
                  return (
                    <motion.button
                      key={i}
                      onClick={() => variant && setPrice(variant.price)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      title={variant?.content ?? undefined}
                      className={`w-8 h-8 rounded-full border-2 transition-all duration-200`}
                      style={{
                        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.15)',
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={imgSrc} alt="" />
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex gap-3 mb-4">
              {/* Quantity */}
              <div className="flex items-center border border-border rounded-sm">
                <button
                  onClick={() => setQuantity((v) => Math.max(1, v - 1))}
                  className="w-10 h-12 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Minus size={13} />
                </button>
                <span className="w-8 text-center text-sm font-body">{quantity}</span>
                <button
                  onClick={() => setQuantity((v) => v + 1)}
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
                <div
                  key={label}
                  className="flex flex-col items-center text-center gap-1.5 py-3 rounded-sm bg-secondary/50"
                >
                  <Icon size={14} className="text-muted-foreground" />
                  <p className="text-[10px] uppercase tracking-wider text-foreground font-medium leading-none">
                    {label}
                  </p>
                  <p className="text-[9px] text-muted-foreground font-body leading-tight">{sub}</p>
                </div>
              ))}
            </div>

            {/* Accordions */}
            <div className="border-t border-border">
              <Accordion title="Description">
                <p>{product_data?.description}</p>
              </Accordion>
              <Accordion title="Shipping & Returns">
                <div className="space-y-3">
                  <p>
                    Complimentary standard shipping on orders over $200. Express and overnight
                    options available at checkout.
                  </p>
                  <p>
                    Returns accepted within 30 days of delivery. Items must be unworn, unwashed, and
                    with all original tags attached.
                  </p>
                  <p>SKU: {PRODUCT.sku}</p>
                </div>
              </Accordion>
            </div>
          </motion.div>
        </div>
      </div>

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

      <div>
        {product_data?.content && <Content data={product_data.content as SerializedEditorState} />}
      </div>

      <AddedToast visible={addedToCart} />
    </div>
  )
}
