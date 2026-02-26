import { useState } from 'react'
import { motion } from 'motion/react'
import { Check } from 'lucide-react'

function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <section className="border-t border-border bg-foreground text-background py-20 md:py-24 relative overflow-hidden">
      {/* Texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(-45deg, currentColor 0, currentColor 1px, transparent 0, transparent 6px)',
        }}
      />

      <div className="relative max-w-xl mx-auto px-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] text-background/50 mb-3 font-body">
          Join the Inner Circle
        </p>
        <h2
          className="font-display text-4xl md:text-5xl text-background mb-4"
          style={{ letterSpacing: '-0.03em' }}
        >
          New arrivals,
          <br />
          before anyone else.
        </h2>
        <p className="text-sm text-background/60 font-body mb-10 leading-relaxed">
          Early access to new collections, exclusive offers, and editorial from behind the scenes.
        </p>

        {!submitted ? (
          <div className="flex gap-2 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-11 px-4 text-xs bg-white/10 border border-white/20 text-background placeholder:text-background/40 rounded-sm outline-none focus:border-white/50 transition-colors font-body"
            />
            <button
              onClick={() => email.includes('@') && setSubmitted(true)}
              className="h-11 px-5 bg-background text-foreground text-xs uppercase tracking-widest rounded-sm hover:bg-background/90 transition-colors whitespace-nowrap font-body"
            >
              Join
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-10 h-10 rounded-full border border-background/30 flex items-center justify-center mb-1">
              <Check size={16} />
            </div>
            <p className="text-sm font-body text-background/80">
              You&apos;re on the list. Welcome to the circle.
            </p>
          </motion.div>
        )}

        <p className="text-[10px] text-background/30 mt-5 font-body">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  )
}

export default Newsletter
