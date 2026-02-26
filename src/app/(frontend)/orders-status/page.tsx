'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  ChevronDown,
  ChevronRight,
  RotateCcw,
  MessageCircle,
  Download,
  Star,
  X,
  Check,
  ArrowLeft,
  ExternalLink,
  ShoppingBag,
  AlertCircle,
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

type OrderStatus = 'processing' | 'confirmed' | 'shipped' | 'out_for_delivery' | 'delivered'
type FilterTab = 'all' | 'active' | 'delivered' | 'cancelled'

interface TrackingEvent {
  date: string
  time: string
  status: string
  location: string
  active: boolean
}

interface OrderItem {
  id: number
  name: string
  variant: string
  price: number
  qty: number
  image: string
}

interface Order {
  id: string
  number: string
  date: string
  status: OrderStatus
  estimatedDelivery: string
  carrier: string
  trackingNumber: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  shippingAddress: string
  paymentMethod: string
  events: TrackingEvent[]
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const ORDERS: Order[] = [
  {
    id: '1',
    number: 'VN-28461',
    date: 'Feb 20, 2026',
    status: 'shipped',
    estimatedDelivery: 'Feb 27–Mar 1, 2026',
    carrier: 'DHL Express',
    trackingNumber: '1Z999AA10123456784',
    shippingAddress: '123 Rue de Rivoli, Paris, 75001, France',
    paymentMethod: 'Visa ending in 4242',
    subtotal: 895,
    shipping: 0,
    tax: 71.6,
    total: 966.6,
    items: [
      { id: 1, name: 'Velvet Noir Blazer', variant: 'Midnight Black / M', price: 420, qty: 1, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&q=80' },
      { id: 2, name: 'Cashmere Turtleneck', variant: 'Ivory / S', price: 280, qty: 1, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200&q=80' },
      { id: 3, name: 'Wide Leg Trousers', variant: 'Charcoal / M', price: 195, qty: 1, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200&q=80' },
    ],
    events: [
      { date: 'Feb 24, 2026', time: '3:42 PM', status: 'In Transit — Frankfurt Hub', location: 'Frankfurt, Germany', active: true },
      { date: 'Feb 23, 2026', time: '11:15 AM', status: 'Departed from Origin Facility', location: 'Milan, Italy', active: true },
      { date: 'Feb 22, 2026', time: '8:00 AM', status: 'Picked up by Carrier', location: 'Milan, Italy', active: true },
      { date: 'Feb 21, 2026', time: '2:30 PM', status: 'Label Created', location: 'Maison Noir Warehouse', active: true },
      { date: 'Feb 20, 2026', time: '10:05 AM', status: 'Order Confirmed', location: 'Maison Noir', active: true },
    ],
  },
  {
    id: '2',
    number: 'VN-27830',
    date: 'Jan 15, 2026',
    status: 'delivered',
    estimatedDelivery: 'Delivered Jan 21, 2026',
    carrier: 'FedEx',
    trackingNumber: '774899172937',
    shippingAddress: '123 Rue de Rivoli, Paris, 75001, France',
    paymentMethod: 'Visa ending in 4242',
    subtotal: 540,
    shipping: 15,
    tax: 44.4,
    total: 599.4,
    items: [
      { id: 4, name: 'Merino Wrap Coat', variant: 'Camel / S', price: 540, qty: 1, image: 'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=200&q=80' },
    ],
    events: [
      { date: 'Jan 21, 2026', time: '1:14 PM', status: 'Delivered — Left at door', location: 'Paris, France', active: true },
      { date: 'Jan 21, 2026', time: '8:22 AM', status: 'Out for Delivery', location: 'Paris, France', active: true },
      { date: 'Jan 20, 2026', time: '6:00 PM', status: 'Arrived at Local Facility', location: 'Paris CDG, France', active: true },
      { date: 'Jan 18, 2026', time: '3:30 PM', status: 'In Transit', location: 'Lyon, France', active: true },
      { date: 'Jan 15, 2026', time: '9:00 AM', status: 'Order Confirmed', location: 'Maison Noir', active: true },
    ],
  },
  {
    id: '3',
    number: 'VN-26991',
    date: 'Dec 5, 2025',
    status: 'delivered',
    estimatedDelivery: 'Delivered Dec 11, 2025',
    carrier: 'UPS',
    trackingNumber: '1Z999AA10123456000',
    shippingAddress: '123 Rue de Rivoli, Paris, 75001, France',
    paymentMethod: 'Mastercard ending in 8110',
    subtotal: 320,
    shipping: 0,
    tax: 25.6,
    total: 345.6,
    items: [
      { id: 5, name: 'Silk Slip Dress', variant: 'Champagne / XS', price: 320, qty: 1, image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=200&q=80' },
    ],
    events: [
      { date: 'Dec 11, 2025', time: '2:45 PM', status: 'Delivered', location: 'Paris, France', active: true },
      { date: 'Dec 10, 2025', time: '9:10 AM', status: 'Out for Delivery', location: 'Paris, France', active: true },
      { date: 'Dec 8, 2025', time: '4:00 PM', status: 'In Transit', location: 'Brussels, Belgium', active: true },
      { date: 'Dec 5, 2025', time: '11:30 AM', status: 'Order Confirmed', location: 'Maison Noir', active: true },
    ],
  },
]

// ─── Status Config ────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<OrderStatus, {
  label: string; color: string; bg: string; icon: React.ElementType; progress: number
}> = {
  processing:        { label: 'Processing',        color: 'text-amber-600 dark:text-amber-400',   bg: 'bg-amber-50 dark:bg-amber-900/20',   icon: Clock,         progress: 10 },
  confirmed:         { label: 'Confirmed',          color: 'text-blue-600 dark:text-blue-400',     bg: 'bg-blue-50 dark:bg-blue-900/20',     icon: CheckCircle,   progress: 30 },
  shipped:           { label: 'Shipped',            color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-50 dark:bg-violet-900/20', icon: Package,       progress: 60 },
  out_for_delivery:  { label: 'Out for Delivery',   color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-900/20', icon: Truck,         progress: 85 },
  delivered:         { label: 'Delivered',          color: 'text-green-600 dark:text-green-400',   bg: 'bg-green-50 dark:bg-green-900/20',   icon: CheckCircle,   progress: 100 },
}

const TIMELINE_STEPS: { key: OrderStatus; label: string; icon: React.ElementType }[] = [
  { key: 'confirmed',        label: 'Confirmed',     icon: CheckCircle },
  { key: 'shipped',          label: 'Shipped',       icon: Package },
  { key: 'out_for_delivery', label: 'On the Way',    icon: Truck },
  { key: 'delivered',        label: 'Delivered',     icon: MapPin },
]

const STATUS_ORDER: OrderStatus[] = ['processing', 'confirmed', 'shipped', 'out_for_delivery', 'delivered']

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: OrderStatus }) {
  const cfg = STATUS_CONFIG[status]
  const Icon = cfg.icon
  return (
    <span className={`inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-medium px-2.5 py-1 rounded-sm ${cfg.color} ${cfg.bg}`}>
      <Icon size={10} />
      {cfg.label}
    </span>
  )
}

function ProgressTracker({ status }: { status: OrderStatus }) {
  const currentIdx = STATUS_ORDER.indexOf(status)

  return (
    <div className="relative py-2">
      {/* Track steps */}
      <div className="flex items-start justify-between relative">
        {/* Background line */}
        <div className="absolute top-4 left-0 right-0 h-px bg-border z-0" />
        {/* Progress line */}
        <motion.div
          className="absolute top-4 left-0 h-px bg-foreground z-10"
          initial={{ width: 0 }}
          animate={{ width: `${STATUS_CONFIG[status].progress}%` }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
        />

        {TIMELINE_STEPS.map((step, i) => {
          const stepIdx = STATUS_ORDER.indexOf(step.key)
          const done = stepIdx <= currentIdx
          const active = step.key === status
          const Icon = step.icon

          return (
            <div key={step.key} className="flex flex-col items-center gap-2 z-20 flex-1 first:items-start last:items-end">
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors duration-500 ${
                  done
                    ? active
                      ? 'bg-foreground border-foreground text-background ring-4 ring-foreground/10'
                      : 'bg-foreground border-foreground text-background'
                    : 'bg-background border-border text-muted-foreground'
                }`}
              >
                {done && !active ? <Check size={12} /> : <Icon size={12} />}
              </motion.div>
              <p className={`text-[10px] uppercase tracking-wider text-center leading-tight ${done ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                {step.label}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function TrackingTimeline({ events }: { events: TrackingEvent[] }) {
  return (
    <div className="space-y-0">
      {events.map((event, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.07 }}
          className="flex gap-4 group"
        >
          {/* Line + dot */}
          <div className="flex flex-col items-center">
            <div className={`w-2.5 h-2.5 rounded-full border-2 flex-shrink-0 mt-1 ${i === 0 ? 'bg-foreground border-foreground' : 'bg-background border-border'}`} />
            {i < events.length - 1 && <div className="w-px flex-1 bg-border my-1" />}
          </div>

          {/* Content */}
          <div className={`pb-5 flex-1 ${i === events.length - 1 ? 'pb-0' : ''}`}>
            <p className={`text-sm font-medium leading-snug ${i === 0 ? 'text-foreground' : 'text-muted-foreground'}`}>
              {event.status}
            </p>
            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
              <p className="text-[11px] text-muted-foreground font-body">{event.location}</p>
              <span className="text-muted-foreground/30">·</span>
              <p className="text-[11px] text-muted-foreground font-body">{event.date} at {event.time}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function ReviewModal({ item, onClose }: { item: OrderItem; onClose: () => void }) {
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [review, setReview] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{ duration: 0.25 }}
        onClick={e => e.stopPropagation()}
        className="w-full max-w-md bg-background border border-border rounded-sm shadow-2xl p-6"
      >
        {!submitted ? (
          <>
            <div className="flex items-start justify-between mb-5">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1 font-body">Review Your Purchase</p>
                <h3 className="font-display text-lg text-foreground leading-tight">{item.name}</h3>
                <p className="text-xs text-muted-foreground font-body">{item.variant}</p>
              </div>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors mt-1">
                <X size={16} />
              </button>
            </div>

            {/* Star rating */}
            <div className="flex items-center gap-1 mb-5">
              {[1,2,3,4,5].map(s => (
                <button
                  key={s}
                  onMouseEnter={() => setHovered(s)}
                  onMouseLeave={() => setHovered(0)}
                  onClick={() => setRating(s)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    size={28}
                    className={`transition-colors ${s <= (hovered || rating) ? 'fill-amber-400 text-amber-400' : 'text-border'}`}
                  />
                </button>
              ))}
              {(hovered || rating) > 0 && (
                <span className="ml-2 text-xs text-muted-foreground">
                  {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][hovered || rating]}
                </span>
              )}
            </div>

            <textarea
              value={review}
              onChange={e => setReview(e.target.value)}
              placeholder="Share your thoughts about this piece..."
              rows={4}
              className="w-full border border-border rounded-sm px-3 py-3 text-sm bg-background outline-none focus:border-foreground transition-colors font-body text-foreground placeholder:text-muted-foreground resize-none mb-4"
            />

            <div className="flex gap-2">
              <button onClick={onClose} className="flex-1 h-10 border border-border text-xs uppercase tracking-widest rounded-sm hover:border-foreground transition-colors">
                Cancel
              </button>
              <button
                onClick={() => rating > 0 && setSubmitted(true)}
                disabled={rating === 0}
                className="flex-1 h-10 bg-foreground text-background text-xs uppercase tracking-widest rounded-sm disabled:opacity-40 hover:bg-foreground/90 transition-colors"
              >
                Submit Review
              </button>
            </div>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
            <div className="w-12 h-12 rounded-full bg-foreground flex items-center justify-center mx-auto mb-4">
              <Check size={20} className="text-background" />
            </div>
            <h3 className="font-display text-xl mb-2">Thank you!</h3>
            <p className="text-sm text-muted-foreground font-body mb-5">Your review has been submitted.</p>
            <button onClick={onClose} className="px-6 h-10 bg-foreground text-background text-xs uppercase tracking-widest rounded-sm">
              Done
            </button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

// ─── Order Card ───────────────────────────────────────────────────────────────

function OrderCard({ order, onSelect }: { order: Order; onSelect: () => void }) {
  const cfg = STATUS_CONFIG[order.status]
  const Icon = cfg.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-border rounded-sm overflow-hidden hover:border-foreground/30 transition-colors duration-200 group"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-secondary/20">
        <div className="flex items-center gap-4 flex-wrap">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-body">Order</p>
            <p className="text-sm font-medium text-foreground font-body">#{order.number}</p>
          </div>
          <div className="hidden sm:block w-px h-8 bg-border" />
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-body">Placed</p>
            <p className="text-sm text-foreground font-body">{order.date}</p>
          </div>
          <div className="hidden sm:block w-px h-8 bg-border" />
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-body">Total</p>
            <p className="text-sm font-medium text-foreground font-body">${order.total.toFixed(2)}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={order.status} />
          <button
            onClick={onSelect}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="hidden sm:inline uppercase tracking-widest">Details</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Items preview */}
      <div className="px-5 py-4">
        <div className="flex gap-3 items-center">
          <div className="flex -space-x-2">
            {order.items.slice(0, 3).map(item => (
              <div key={item.id} className="w-12 h-12 rounded-sm overflow-hidden border-2 border-background bg-secondary flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
            ))}
            {order.items.length > 3 && (
              <div className="w-12 h-12 rounded-sm border-2 border-background bg-secondary flex items-center justify-center text-[10px] font-medium text-muted-foreground flex-shrink-0">
                +{order.items.length - 3}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-foreground font-body truncate">
              {order.items.map(i => i.name).join(', ')}
            </p>
            <p className="text-[11px] text-muted-foreground font-body mt-0.5">
              {order.items.length} {order.items.length === 1 ? 'item' : 'items'} · {order.estimatedDelivery}
            </p>
          </div>
          <button
            onClick={onSelect}
            className="hidden sm:flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors border border-border hover:border-foreground px-3 h-8 rounded-sm"
          >
            Track
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Order Detail View ────────────────────────────────────────────────────────

function OrderDetail({ order, onBack }: { order: Order; onBack: () => void }) {
  const [trackingOpen, setTrackingOpen] = useState(true)
  const [reviewItem, setReviewItem] = useState<OrderItem | null>(null)
  const cfg = STATUS_CONFIG[order.status]

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft size={12} /> All Orders
      </button>

      {/* Order header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-1 font-body">Order #{order.number}</p>
          <h2 className="font-display text-3xl text-foreground mb-2" style={{ letterSpacing: '-0.02em' }}>
            Order Details
          </h2>
          <p className="text-sm text-muted-foreground font-body">Placed on {order.date}</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <StatusBadge status={order.status} />
          <button className="flex items-center gap-1.5 h-8 px-3 border border-border rounded-sm text-xs text-muted-foreground hover:border-foreground hover:text-foreground transition-colors uppercase tracking-widest">
            <Download size={11} /> Invoice
          </button>
          {order.status !== 'delivered' && (
            <button className="flex items-center gap-1.5 h-8 px-3 border border-border rounded-sm text-xs text-muted-foreground hover:border-foreground hover:text-foreground transition-colors uppercase tracking-widest">
              <X size={11} /> Cancel
            </button>
          )}
        </div>
      </div>

      {/* Status Progress */}
      <div className="border border-border rounded-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1 font-body">Current Status</p>
            <p className={`text-sm font-medium ${cfg.color}`}>{cfg.label}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1 font-body">
              {order.status === 'delivered' ? 'Delivered' : 'Estimated Delivery'}
            </p>
            <p className="text-sm font-medium text-foreground font-body">{order.estimatedDelivery}</p>
          </div>
        </div>
        <ProgressTracker status={order.status} />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        <div className="space-y-5">

          {/* Tracking */}
          <div className="border border-border rounded-sm overflow-hidden">
            <button
              onClick={() => setTrackingOpen(v => !v)}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-secondary/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-secondary rounded-sm flex items-center justify-center">
                  <Truck size={14} className="text-muted-foreground" />
                </div>
                <div className="text-left">
                  <p className="text-xs uppercase tracking-widest font-medium text-foreground">{order.carrier}</p>
                  <p className="text-[11px] text-muted-foreground font-body">{order.trackingNumber}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="#"
                  onClick={e => e.stopPropagation()}
                  className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                >
                  Track <ExternalLink size={9} />
                </a>
                <motion.div animate={{ rotate: trackingOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={14} className="text-muted-foreground" />
                </motion.div>
              </div>
            </button>

            <AnimatePresence initial={false}>
              {trackingOpen && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 py-5 border-t border-border">
                    <TrackingTimeline events={order.events} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Items */}
          <div className="border border-border rounded-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <p className="text-xs uppercase tracking-widest font-medium text-foreground">
                {order.items.length} {order.items.length === 1 ? 'Item' : 'Items'}
              </p>
            </div>
            <div className="divide-y divide-border">
              {order.items.map(item => (
                <div key={item.id} className="flex gap-4 px-5 py-4 items-start">
                  <div className="w-16 h-16 flex-shrink-0 rounded-sm overflow-hidden bg-secondary border border-border">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground font-body">{item.name}</p>
                    <p className="text-[11px] text-muted-foreground font-body mb-2">{item.variant}</p>
                    <p className="text-xs text-muted-foreground font-body">Qty: {item.qty}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-medium text-foreground font-body mb-2">${(item.price * item.qty).toFixed(2)}</p>
                    <div className="flex flex-col gap-1 items-end">
                      {order.status === 'delivered' && (
                        <button
                          onClick={() => setReviewItem(item)}
                          className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Star size={9} /> Review
                        </button>
                      )}
                      <button className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
                        <RotateCcw size={9} /> Return
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right sidebar */}
        <div className="space-y-5">

          {/* Order summary */}
          <div className="border border-border rounded-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <p className="text-xs uppercase tracking-widest font-medium text-foreground">Order Summary</p>
            </div>
            <div className="px-5 py-4 space-y-2.5 text-sm font-body">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>{order.shipping === 0 ? <span className="text-green-600 dark:text-green-400">Free</span> : `$${order.shipping}`}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Tax</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              <div className="h-px bg-border" />
              <div className="flex justify-between font-medium">
                <span className="text-foreground">Total</span>
                <span className="font-display text-lg text-foreground">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Shipping info */}
          <div className="border border-border rounded-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <p className="text-xs uppercase tracking-widest font-medium text-foreground">Shipping Details</p>
            </div>
            <div className="px-5 py-4 space-y-4 text-sm font-body">
              <div className="flex gap-3">
                <MapPin size={14} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Address</p>
                  <p className="text-foreground text-sm leading-relaxed">{order.shippingAddress}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Truck size={14} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Carrier</p>
                  <p className="text-foreground">{order.carrier}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Package size={14} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Payment</p>
                  <p className="text-foreground">{order.paymentMethod}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Help */}
          <div className="border border-border rounded-sm p-5">
            <p className="text-xs uppercase tracking-widest font-medium text-foreground mb-3">Need Help?</p>
            <div className="space-y-2">
              {[
                { icon: MessageCircle, label: 'Contact Support' },
                { icon: RotateCcw, label: 'Start a Return' },
                { icon: AlertCircle, label: 'Report an Issue' },
              ].map(({ icon: Icon, label }) => (
                <button key={label} className="w-full flex items-center gap-2.5 text-xs text-muted-foreground hover:text-foreground transition-colors py-1.5 group">
                  <Icon size={12} />
                  <span className="font-body group-hover:underline underline-offset-2">{label}</span>
                  <ChevronRight size={10} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Review modal */}
      <AnimatePresence>
        {reviewItem && <ReviewModal item={reviewItem} onClose={() => setReviewItem(null)} />}
      </AnimatePresence>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [filter, setFilter] = useState<FilterTab>('all')

  const filtered = ORDERS.filter(order => {
    if (filter === 'all') return true
    if (filter === 'active') return order.status !== 'delivered'
    if (filter === 'delivered') return order.status === 'delivered'
    return false
  })

  const tabs: { key: FilterTab; label: string; count?: number }[] = [
    { key: 'all', label: 'All Orders', count: ORDERS.length },
    { key: 'active', label: 'Active', count: ORDERS.filter(o => o.status !== 'delivered').length },
    { key: 'delivered', label: 'Delivered', count: ORDERS.filter(o => o.status === 'delivered').length },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground font-body">

      {/* Header */}
      <header className="border-b border-border h-14 flex items-center justify-between px-6 sm:px-12">
        <a href="#" className="font-display text-xl text-foreground" style={{ letterSpacing: '-0.03em' }}>
          Maison Noir
        </a>
        <nav className="flex items-center gap-6 text-[10px] uppercase tracking-widest text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors hidden sm:block">Shop</a>
          <a href="#" className="text-foreground font-medium">Orders</a>
          <a href="#" className="hover:text-foreground transition-colors hidden sm:block">Account</a>
        </nav>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 md:py-14">
        <AnimatePresence mode="wait">
          {selectedOrder ? (
            <motion.div key="detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <OrderDetail order={selectedOrder} onBack={() => setSelectedOrder(null)} />
            </motion.div>
          ) : (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Page title */}
              <div className="mb-10">
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2 font-body">Account</p>
                <h1 className="font-display text-4xl text-foreground" style={{ letterSpacing: '-0.02em' }}>My Orders</h1>
              </div>

              {/* Filter tabs */}
              <div className="flex items-center gap-1 border-b border-border mb-8">
                {tabs.map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setFilter(tab.key)}
                    className={`relative px-4 py-2.5 text-xs uppercase tracking-widest transition-colors ${
                      filter === tab.key ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {tab.label}
                    {tab.count !== undefined && (
                      <span className={`ml-1.5 text-[9px] px-1.5 py-0.5 rounded-full ${filter === tab.key ? 'bg-foreground text-background' : 'bg-secondary text-muted-foreground'}`}>
                        {tab.count}
                      </span>
                    )}
                    {filter === tab.key && (
                      <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-px bg-foreground" />
                    )}
                  </button>
                ))}
              </div>

              {/* Orders list */}
              {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <ShoppingBag size={32} className="text-muted-foreground/30 mx-auto mb-4" />
                  <p className="font-display text-2xl text-foreground mb-2">No orders yet</p>
                  <p className="text-sm text-muted-foreground font-body mb-6">When you place an order, it will appear here.</p>
                  <a href="#" className="px-6 h-10 inline-flex items-center bg-foreground text-background text-xs uppercase tracking-widest rounded-sm hover:bg-foreground/90 transition-colors">
                    Start Shopping
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  {filtered.map((order, i) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                    >
                      <OrderCard order={order} onSelect={() => setSelectedOrder(order)} />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}