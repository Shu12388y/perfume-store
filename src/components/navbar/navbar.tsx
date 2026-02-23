'use client'
import { useState } from 'react'
import { ShoppingBag, Search, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button className="md:hidden text-foreground" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className="hidden md:flex items-center gap-8">
          {['Shop', 'Collections', 'About'].map((item) => (
            <Link
              key={item}
              href="#"
              className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {item}
            </Link>
          ))}
        </div>

        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <h1 className="font-display text-2xl tracking-[0.3em] uppercase text-gradient-gold">
            Aurum
          </h1>
        </Link>

        <div className="flex items-center gap-5">
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Search size={18} />
          </button>
          <button className="text-muted-foreground hover:text-foreground transition-colors relative">
            <ShoppingBag size={18} />
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-gradient-gold text-[10px] font-body font-semibold text-primary-foreground flex items-center justify-center">
              0
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {['Shop', 'Collections', 'About'].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
