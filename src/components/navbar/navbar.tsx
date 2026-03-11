'use client'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import Cart from '@/sections/cart'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const links = [
    {
      id: 0,
      title: 'Shop',
      url: '/shop',
    },
    {
      id: 1,
      title: 'Collections',
      url: '/collections',
    },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button className="md:hidden text-foreground" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className="hidden md:flex items-center gap-8">
          {links.map((item) => (
            <Link
              key={item.id}
              href={item.url}
              className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {item.title}
            </Link>
          ))}
        </div>

        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <h1 className="font-display text-2xl tracking-[0.3em] uppercase text-gradient-gold">
            Fayakun Attar
          </h1>
        </Link>

        <div className="flex items-center gap-5">
          <div className="mt-2">
            <Cart />
          </div>
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
              {links.map((item) => (
                <Link
                  key={item.id}
                  href={item.url}
                  className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.title}
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
