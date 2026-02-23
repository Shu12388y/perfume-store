'use client'
import { motion } from 'motion/react'
import ProductCard from '@/components/productCard/productCard'

const categories = [
  { name: 'For Her', description: 'Floral & Oriental' },
  { name: 'For Him', description: 'Woody & Aromatic' },
  { name: 'Unisex', description: 'Bold & Distinctive' },
]

const products = [
  {
    name: 'Noir Absolu',
    price: 285,
    image:
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyZnVtZXxlbnwwfHwwfHx8MA%3D%3D',
    category: 'Eau de Parfum',
  },
  {
    name: 'Rose Éternelle',
    price: 320,
    image:
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVyZnVtZXxlbnwwfHwwfHx8MA%3D%3D',
    category: 'Extrait',
  },
  {
    name: 'Ombre Mystique',
    price: 245,
    image:
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBlcmZ1bWV8ZW58MHx8MHx8fDA%3D',
    category: 'Eau de Parfum',
  },
]

const Page = () => {
  return (
    <>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1623742310401-d8057c3c43c8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHBlcmZ1bWV8ZW58MHx8MHx8fDA%3D"
            alt="Luxury perfume"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-linear-to-r from-background/90 via-background/50 to-background/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-xs tracking-[0.4em] uppercase text-gold mb-6 font-body"
            >
              New Collection 2026
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-display text-5xl md:text-7xl font-medium leading-[1.1] mb-6"
            >
              The Art of
              <br />
              <span className="text-gradient-gold italic">Essence</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-muted-foreground font-body text-base leading-relaxed mb-8 max-w-md"
            >
              Discover our curated collection of rare and exquisite fragrances, crafted by the
              world&apos;s finest perfumers.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex gap-4"
            >
              <a
                href="#products"
                className="bg-gradient-gold text-primary-foreground px-8 py-3 text-xs tracking-widest uppercase font-body font-medium rounded-sm hover:shadow-gold transition-shadow duration-300"
              >
                Explore Now
              </a>
              <a
                href="#"
                className="border border-gold/30 text-foreground px-8 py-3 text-xs tracking-widest uppercase font-body font-medium rounded-sm hover:border-gold/60 transition-colors duration-300"
              >
                Our Story
              </a>
            </motion.div>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-px h-12 bg-linear-to-b from-gold/0 via-gold to-gold/0" />
        </motion.div>
      </section>

      <section id="products" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs tracking-[0.4em] uppercase text-gold mb-4 font-body">
              Curated Selection
            </p>
            <h2 className="font-display text-4xl md:text-5xl">Signature Fragrances</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <ProductCard key={product.name} {...product} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {categories.map((cat, i) => (
              <motion.a
                key={cat.name}
                href="#"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group bg-background p-12 text-center hover:bg-secondary transition-colors duration-500"
              >
                <p className="text-[11px] tracking-[0.4em] uppercase text-gold mb-3 font-body">
                  {cat.description}
                </p>
                <h3 className="font-display text-3xl mb-4">{cat.name}</h3>
                <span className="text-xs tracking-widest uppercase text-muted-foreground group-hover:text-foreground transition-colors font-body">
                  Explore →
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Page
