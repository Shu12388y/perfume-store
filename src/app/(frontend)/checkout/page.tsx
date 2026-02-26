'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  ChevronRight,
  ChevronDown,
  Lock,
  Check,
  CreditCard,
  Truck,
  MapPin,
  Tag,
  X,
  ShoppingBag,
  ArrowLeft,
  Shield,
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

type Step = 'information' | 'shipping' | 'payment'

interface CartItem {
  id: number
  name: string
  variant: string
  price: number
  qty: number
  image: string
}

interface FormData {
  email: string
  firstName: string
  lastName: string
  address: string
  apartment: string
  city: string
  country: string
  state: string
  zip: string
  phone: string
  saveInfo: boolean
  shippingMethod: string
  cardNumber: string
  cardName: string
  expiry: string
  cvv: string
  billingAddressSame: boolean
}

// ─── Mock Cart ────────────────────────────────────────────────────────────────

const CART_ITEMS: CartItem[] = [
  {
    id: 1,
    name: 'Velvet Noir Blazer',
    variant: 'Midnight Black / M',
    price: 420,
    qty: 1,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&q=80',
  },
  {
    id: 2,
    name: 'Cashmere Turtleneck',
    variant: 'Ivory / S',
    price: 280,
    qty: 1,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200&q=80',
  },
  {
    id: 3,
    name: 'Wide Leg Trousers',
    variant: 'Charcoal / M',
    price: 195,
    qty: 2,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200&q=80',
  },
]

const SHIPPING_METHODS = [
  { id: 'standard', label: 'Standard Shipping', sub: '5–7 business days', price: 0 },
  { id: 'express', label: 'Express Shipping', sub: '2–3 business days', price: 15 },
  { id: 'overnight', label: 'Overnight Delivery', sub: 'Next business day', price: 35 },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STEPS: Step[] = ['information', 'shipping', 'payment']

const stepLabel = (s: Step) =>
  s === 'information' ? 'Information' : s === 'shipping' ? 'Shipping' : 'Payment'

function formatCard(val: string) {
  return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
}
function formatExpiry(val: string) {
  const clean = val.replace(/\D/g, '').slice(0, 4)
  return clean.length > 2 ? clean.slice(0, 2) + ' / ' + clean.slice(2) : clean
}

// ─── Input Component ──────────────────────────────────────────────────────────

function Field({
  label, value, onChange, placeholder = '', type = 'text', half = false, required = false,
}: {
  label: string; value: string; onChange: (v: string) => void
  placeholder?: string; type?: string; half?: boolean; required?: boolean
}) {
  const [focused, setFocused] = useState(false)
  const filled = value.length > 0

  return (
    <div className={half ? 'col-span-1' : 'col-span-2'}>
      <div
        className={`relative border rounded-sm transition-all duration-150 ${
          focused ? 'border-foreground' : filled ? 'border-border' : 'border-border'
        } bg-background`}
      >
        <label
          className={`absolute left-3 transition-all duration-150 pointer-events-none font-body text-muted-foreground ${
            focused || filled ? 'top-1.5 text-[9px] uppercase tracking-wider' : 'top-1/2 -translate-y-1/2 text-xs'
          }`}
        >
          {label}{required && ' *'}
        </label>
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={focused ? placeholder : ''}
          className="w-full pt-5 pb-1.5 px-3 text-sm bg-transparent outline-none text-foreground font-body"
        />
      </div>
    </div>
  )
}

// ─── Order Summary (sidebar) ──────────────────────────────────────────────────

function OrderSummary({
  items, shipping, coupon, onCoupon, couponInput, setCouponInput, couponApplied, onApplyCoupon,
}: {
  items: CartItem[]
  shipping: number
  coupon: number
  onCoupon: () => void
  couponInput: string
  setCouponInput: (v: string) => void
  couponApplied: boolean
  onApplyCoupon: () => void
}) {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
  const total = subtotal + shipping - coupon

  return (
    <div className="space-y-6">
      {/* Items */}
      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="flex gap-3 items-start">
            <div className="relative flex-shrink-0">
              <div className="w-14 h-14 rounded-sm overflow-hidden bg-secondary border border-border">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-muted-foreground text-background text-[9px] rounded-full flex items-center justify-center font-medium">
                {item.qty}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate font-body">{item.name}</p>
              <p className="text-[11px] text-muted-foreground font-body">{item.variant}</p>
            </div>
            <p className="text-sm font-body text-foreground flex-shrink-0">${(item.price * item.qty).toFixed(2)}</p>
          </div>
        ))}
      </div>

      <div className="h-px bg-border" />

      {/* Coupon */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Discount code"
            value={couponInput}
            onChange={e => setCouponInput(e.target.value.toUpperCase())}
            disabled={couponApplied}
            className="w-full pl-8 pr-3 h-10 text-xs bg-background border border-border rounded-sm outline-none focus:border-foreground transition-colors font-body disabled:opacity-50"
          />
        </div>
        <button
          onClick={onApplyCoupon}
          disabled={couponApplied || !couponInput}
          className="px-4 h-10 bg-foreground text-background text-xs uppercase tracking-widest rounded-sm disabled:opacity-40 hover:bg-foreground/90 transition-colors"
        >
          {couponApplied ? <Check size={13} /> : 'Apply'}
        </button>
      </div>
      {couponApplied && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[11px] text-green-600 dark:text-green-400 flex items-center gap-1 -mt-3"
        >
          <Check size={10} /> Code WELCOME20 applied — 20% off
        </motion.p>
      )}

      <div className="h-px bg-border" />

      {/* Totals */}
      <div className="space-y-2.5 text-sm font-body">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        {couponApplied && (
          <div className="flex justify-between text-green-600 dark:text-green-400">
            <span>Discount (WELCOME20)</span>
            <span>−${coupon.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-muted-foreground">
          <span>Shipping</span>
          <span>{shipping === 0 ? <span className="text-green-600 dark:text-green-400">Free</span> : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Tax (est.)</span>
          <span>${(subtotal * 0.08).toFixed(2)}</span>
        </div>
      </div>

      <div className="h-px bg-border" />

      <div className="flex justify-between items-baseline font-body">
        <span className="text-sm uppercase tracking-widest text-foreground font-medium">Total</span>
        <div className="text-right">
          <span className="text-xs text-muted-foreground mr-1">USD</span>
          <span className="font-display text-2xl">${(total + subtotal * 0.08).toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}

// ─── Step Breadcrumb ──────────────────────────────────────────────────────────

function StepBreadcrumb({ current, onNavigate }: { current: Step; onNavigate: (s: Step) => void }) {
  const currentIdx = STEPS.indexOf(current)
  return (
    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-body flex-wrap">
      {STEPS.map((step, i) => (
        <React.Fragment key={step}>
          {i > 0 && <ChevronRight size={10} className="text-muted-foreground/50" />}
          <button
            onClick={() => i < currentIdx && onNavigate(step)}
            disabled={i >= currentIdx}
            className={`transition-colors ${
              i < currentIdx
                ? 'text-muted-foreground hover:text-foreground cursor-pointer'
                : i === currentIdx
                ? 'text-foreground font-medium'
                : 'text-muted-foreground/40 cursor-default'
            }`}
          >
            {stepLabel(step)}
          </button>
        </React.Fragment>
      ))}
    </div>
  )
}

// ─── Confirmation Screen ──────────────────────────────────────────────────────

function Confirmation({ email }: { email: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center py-12 px-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }}
        className="w-16 h-16 rounded-full bg-foreground flex items-center justify-center mb-6"
      >
        <Check size={28} className="text-background" />
      </motion.div>
      <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3 font-body">Order Confirmed</p>
      <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3" style={{ letterSpacing: '-0.02em' }}>
        Thank you!
      </h2>
      <p className="text-sm text-muted-foreground font-body mb-1">
        Your order <span className="text-foreground font-medium">#VN-28461</span> is confirmed.
      </p>
      <p className="text-sm text-muted-foreground font-body mb-10">
        A confirmation has been sent to <span className="text-foreground">{email || 'your email'}</span>.
      </p>

      <div className="w-full max-w-sm bg-secondary/50 border border-border rounded-sm divide-y divide-border mb-10 text-left">
        {[
          { icon: MapPin, label: 'Delivery address', value: '123 Rue de Rivoli, Paris, 75001' },
          { icon: Truck, label: 'Shipping method', value: 'Standard · 5–7 business days' },
          { icon: CreditCard, label: 'Payment', value: 'Visa ending in 4242' },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-4 px-4 py-3.5">
            <Icon size={14} className="text-muted-foreground flex-shrink-0" />
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-body">{label}</p>
              <p className="text-sm text-foreground font-body">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3 flex-col sm:flex-row w-full max-w-sm">
        <a
          href="#"
          className="flex-1 h-11 border border-foreground text-foreground text-xs uppercase tracking-widest rounded-sm flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-200"
        >
          Track Order
        </a>
        <a
          href="#"
          className="flex-1 h-11 bg-foreground text-background text-xs uppercase tracking-widest rounded-sm flex items-center justify-center hover:bg-foreground/90 transition-colors"
        >
          Continue Shopping
        </a>
      </div>
    </motion.div>
  )
}

// ─── Main Checkout Page ───────────────────────────────────────────────────────

export default function CheckoutPage() {
  const [step, setStep] = useState<Step>('information')
  const [confirmed, setConfirmed] = useState(false)
  const [summaryOpen, setSummaryOpen] = useState(false)
  const [couponInput, setCouponInput] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)

  const subtotal = CART_ITEMS.reduce((s, i) => s + i.price * i.qty, 0)

  const [form, setForm] = useState<FormData>({
    email: '',
    firstName: '', lastName: '',
    address: '', apartment: '',
    city: '', country: 'United States', state: '', zip: '',
    phone: '',
    saveInfo: true,
    shippingMethod: 'standard',
    cardNumber: '', cardName: '', expiry: '', cvv: '',
    billingAddressSame: true,
  })

  const setField = (key: keyof FormData) => (val: string | boolean) =>
    setForm(f => ({ ...f, [key]: val }))

  const couponDiscount = couponApplied ? subtotal * 0.2 : 0
  const shippingCost = SHIPPING_METHODS.find(m => m.id === form.shippingMethod)?.price ?? 0

  const handleContinue = () => {
    if (step === 'information') setStep('shipping')
    else if (step === 'shipping') setStep('payment')
    else setConfirmed(true)
  }

  const stepIdx = STEPS.indexOf(step)

  // Mobile summary toggle total
  const displayTotal = subtotal + shippingCost - couponDiscount + subtotal * 0.08

  if (confirmed) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <CheckoutHeader />
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-lg">
            <Confirmation email={form.email} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <CheckoutHeader />

      {/* Mobile: collapsible order summary */}
      <div className="lg:hidden border-b border-border">
        <button
          onClick={() => setSummaryOpen(v => !v)}
          className="w-full flex items-center justify-between px-4 py-3.5 bg-secondary/40"
        >
          <div className="flex items-center gap-2 text-xs font-medium text-foreground">
            <ShoppingBag size={14} />
            <span>{summaryOpen ? 'Hide' : 'Show'} order summary</span>
            <motion.div animate={{ rotate: summaryOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={13} />
            </motion.div>
          </div>
          <span className="font-display text-base">${displayTotal.toFixed(2)}</span>
        </button>
        <AnimatePresence>
          {summaryOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-4 py-5 border-t border-border">
                <OrderSummary
                  items={CART_ITEMS}
                  shipping={shippingCost}
                  coupon={couponDiscount}
                  onCoupon={() => {}}
                  couponInput={couponInput}
                  setCouponInput={setCouponInput}
                  couponApplied={couponApplied}
                  onApplyCoupon={() => couponInput === 'WELCOME20' && setCouponApplied(true)}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_420px] min-h-[calc(100vh-60px)]">

        {/* LEFT: Form */}
        <div className="px-4 sm:px-10 md:px-16 py-10 border-r border-border">
          {/* Store name */}
          <div className="mb-8">
            <StepBreadcrumb current={step} onNavigate={setStep} />
          </div>

          <AnimatePresence mode="wait">
            {step === 'information' && (
              <motion.div
                key="information"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
              >
                <h2 className="font-display text-2xl mb-6" style={{ letterSpacing: '-0.02em' }}>Contact</h2>

                {/* Express checkout */}
                <div className="mb-6">
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {['Shop Pay', 'PayPal', 'Apple Pay', 'Google Pay'].map(method => (
                      <button
                        key={method}
                        className="h-11 border border-border rounded-sm text-xs font-medium text-muted-foreground hover:border-foreground hover:text-foreground transition-all duration-150 flex items-center justify-center"
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                  <div className="relative flex items-center gap-3 my-5">
                    <div className="flex-1 h-px bg-border" />
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Or continue below</span>
                    <div className="flex-1 h-px bg-border" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-8">
                  <Field label="Email" value={form.email} onChange={setField('email')} type="email" required placeholder="you@example.com" />
                </div>

                <h2 className="font-display text-2xl mb-6" style={{ letterSpacing: '-0.02em' }}>Shipping address</h2>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="First name" value={form.firstName} onChange={setField('firstName')} half required />
                  <Field label="Last name" value={form.lastName} onChange={setField('lastName')} half required />
                  <Field label="Address" value={form.address} onChange={setField('address')} required placeholder="123 Street Name" />
                  <Field label="Apartment, suite, etc. (optional)" value={form.apartment} onChange={setField('apartment')} />
                  <Field label="City" value={form.city} onChange={setField('city')} half required />
                  <Field label="ZIP / Postal code" value={form.zip} onChange={setField('zip')} half required />
                  <div className="col-span-2">
                    <div className="relative border border-border rounded-sm bg-background">
                      <label className="absolute left-3 top-1.5 text-[9px] uppercase tracking-wider text-muted-foreground pointer-events-none">Country</label>
                      <select
                        value={form.country}
                        onChange={e => setField('country')(e.target.value)}
                        className="w-full pt-5 pb-1.5 px-3 text-sm bg-transparent outline-none text-foreground appearance-none"
                      >
                        {['United States', 'Canada', 'United Kingdom', 'France', 'Germany', 'Italy', 'Australia'].map(c => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                      <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                  <Field label="Phone (optional)" value={form.phone} onChange={setField('phone')} type="tel" />
                </div>

                <label className="flex items-center gap-2.5 mt-5 cursor-pointer group">
                  <div
                    onClick={() => setField('saveInfo')(!form.saveInfo)}
                    className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${form.saveInfo ? 'bg-foreground border-foreground' : 'border-border'}`}
                  >
                    {form.saveInfo && <Check size={10} className="text-background" />}
                  </div>
                  <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">Save my information for next time</span>
                </label>
              </motion.div>
            )}

            {step === 'shipping' && (
              <motion.div
                key="shipping"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
              >
                {/* Contact & address summary */}
                <div className="border border-border rounded-sm divide-y divide-border mb-8">
                  {[
                    { label: 'Contact', value: form.email || 'Not provided', icon: null },
                    { label: 'Ship to', value: [form.address, form.city, form.zip, form.country].filter(Boolean).join(', ') || 'Not provided', icon: null },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between px-4 py-3">
                      <div className="flex gap-4">
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground w-14 pt-0.5">{label}</span>
                        <span className="text-sm text-foreground truncate max-w-48 sm:max-w-xs">{value}</span>
                      </div>
                      <button onClick={() => setStep('information')} className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 ml-2 flex-shrink-0">
                        Change
                      </button>
                    </div>
                  ))}
                </div>

                <h2 className="font-display text-2xl mb-6" style={{ letterSpacing: '-0.02em' }}>Shipping method</h2>
                <div className="space-y-2.5">
                  {SHIPPING_METHODS.map(method => (
                    <label key={method.id} className="cursor-pointer">
                      <div
                        className={`flex items-center justify-between border rounded-sm px-4 py-3.5 transition-all duration-150 ${
                          form.shippingMethod === method.id ? 'border-foreground bg-secondary/30' : 'border-border hover:border-muted-foreground'
                        }`}
                        onClick={() => setField('shippingMethod')(method.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                            form.shippingMethod === method.id ? 'border-foreground' : 'border-muted-foreground'
                          }`}>
                            {form.shippingMethod === method.id && (
                              <div className="w-2 h-2 rounded-full bg-foreground" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm text-foreground font-medium">{method.label}</p>
                            <p className="text-[11px] text-muted-foreground">{method.sub}</p>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-foreground">
                          {method.price === 0 ? 'Free' : `$${method.price}`}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 'payment' && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
              >
                {/* Summary pills */}
                <div className="border border-border rounded-sm divide-y divide-border mb-8">
                  {[
                    { label: 'Contact', value: form.email || 'Not provided' },
                    { label: 'Ship to', value: [form.address, form.city, form.zip].filter(Boolean).join(', ') || 'Not provided' },
                    { label: 'Shipping', value: SHIPPING_METHODS.find(m => m.id === form.shippingMethod)?.label + ' · ' + (shippingCost === 0 ? 'Free' : `$${shippingCost}`) },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between px-4 py-3">
                      <div className="flex gap-4">
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground w-14 pt-0.5">{label}</span>
                        <span className="text-sm text-foreground truncate max-w-48 sm:max-w-xs">{value}</span>
                      </div>
                      <button
                        onClick={() => setStep(label === 'Shipping' ? 'shipping' : 'information')}
                        className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 ml-2 flex-shrink-0"
                      >
                        Change
                      </button>
                    </div>
                  ))}
                </div>

                <h2 className="font-display text-2xl mb-6" style={{ letterSpacing: '-0.02em' }}>Payment</h2>

                <div className="border border-border rounded-sm overflow-hidden mb-4">
                  {/* Card header */}
                  <div className="px-4 py-3 bg-secondary/40 flex items-center justify-between border-b border-border">
                    <div className="flex items-center gap-2 text-xs font-medium text-foreground">
                      <CreditCard size={13} />
                      Credit card
                    </div>
                    <div className="flex gap-1.5">
                      {['VISA', 'MC', 'AMEX', 'DISCOVER'].map(b => (
                        <span key={b} className="text-[9px] border border-border rounded px-1.5 py-0.5 text-muted-foreground font-medium">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card fields */}
                  <div className="p-4 grid grid-cols-2 gap-3">
                    <Field
                      label="Card number"
                      value={formatCard(form.cardNumber)}
                      onChange={v => setField('cardNumber')(v.replace(/\s/g, ''))}
                      placeholder="1234 5678 9012 3456"
                    />
                    <Field label="Name on card" value={form.cardName} onChange={setField('cardName')} placeholder="Full name" />
                    <Field
                      label="Expiry date"
                      value={formatExpiry(form.expiry)}
                      onChange={v => setField('expiry')(v.replace(/\s|\/|\//g, ''))}
                      placeholder="MM / YY"
                      half
                    />
                    <Field label="CVV" value={form.cvv} onChange={v => setField('cvv')(v.replace(/\D/g, '').slice(0, 4))} placeholder="•••" half />
                  </div>
                </div>

                {/* Billing address */}
                <div className="border border-border rounded-sm overflow-hidden mb-6">
                  <div className="px-4 py-3 bg-secondary/40 border-b border-border">
                    <p className="text-xs font-medium text-foreground uppercase tracking-widest">Billing address</p>
                  </div>
                  <div className="p-4 space-y-3">
                    {[
                      { id: true, label: 'Same as shipping address' },
                      { id: false, label: 'Use a different billing address' },
                    ].map(opt => (
                      <label key={String(opt.id)} className="flex items-center gap-3 cursor-pointer">
                        <div
                          onClick={() => setField('billingAddressSame')(opt.id)}
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                            form.billingAddressSame === opt.id ? 'border-foreground' : 'border-muted-foreground'
                          }`}
                        >
                          {form.billingAddressSame === opt.id && <div className="w-2 h-2 rounded-full bg-foreground" />}
                        </div>
                        <span className="text-sm text-foreground">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Security note */}
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-2">
                  <Lock size={11} />
                  <span>All transactions are encrypted and secure</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
            {stepIdx > 0 ? (
              <button
                onClick={() => setStep(STEPS[stepIdx - 1])}
                className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft size={12} /> Back
              </button>
            ) : (
              <a href="#" className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft size={12} /> Return to cart
              </a>
            )}

            <motion.button
              onClick={handleContinue}
              whileTap={{ scale: 0.98 }}
              className="px-10 h-12 bg-foreground text-background text-xs uppercase tracking-widest font-medium rounded-sm hover:bg-foreground/90 transition-colors flex items-center gap-2"
            >
              {step === 'payment' ? (
                <>
                  <Lock size={12} />
                  Pay ${(subtotal + shippingCost - couponDiscount + subtotal * 0.08).toFixed(2)}
                </>
              ) : (
                <>
                  Continue to {stepLabel(STEPS[stepIdx + 1])}
                  <ChevronRight size={13} />
                </>
              )}
            </motion.button>
          </div>

          {/* Bottom trust */}
          <div className="mt-10 flex flex-wrap items-center gap-4 text-[10px] text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Refund policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Shipping policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of service</a>
          </div>
        </div>

        {/* RIGHT: Order Summary (desktop) */}
        <div className="hidden lg:block px-10 py-10 bg-secondary/20 border-l border-border">
          <div className="sticky top-10">
            <OrderSummary
              items={CART_ITEMS}
              shipping={shippingCost}
              coupon={couponDiscount}
              onCoupon={() => {}}
              couponInput={couponInput}
              setCouponInput={setCouponInput}
              couponApplied={couponApplied}
              onApplyCoupon={() => couponInput === 'WELCOME20' && setCouponApplied(true)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Header ───────────────────────────────────────────────────────────────────

function CheckoutHeader() {
  return (
    <header className="border-b border-border h-14 flex items-center justify-between px-6 sm:px-12">
      <a href="#" className="font-display text-xl tracking-tight text-foreground" style={{ letterSpacing: '-0.03em' }}>
        Maison Noir
      </a>
      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
        <Lock size={11} />
        <span className="hidden sm:inline uppercase tracking-widest">Secure checkout</span>
      </div>
    </header>
  )
}