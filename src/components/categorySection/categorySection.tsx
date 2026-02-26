import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'

function CategorySection() {
  const CATEGORIES = [
    {
      name: 'Women',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=85',
      count: '120+ pieces',
    },
    {
      name: 'Men',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=85',
      count: '80+ pieces',
    },
    {
      name: 'Unisex',
      image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=85',
      count: '60+ pieces',
    },
  ]
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-20 md:py-28">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2 font-body">
            Shop by
          </p>
          <h2
            className="font-display text-4xl md:text-5xl text-foreground"
            style={{ letterSpacing: '-0.03em' }}
          >
            Collections
          </h2>
        </div>
        <a
          href="#"
          className="hidden sm:flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
        >
          View all <ArrowRight size={12} />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CATEGORIES.map((cat, i) => (
          <motion.a
            key={cat.name}
            href="#"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="group relative overflow-hidden rounded-sm cursor-pointer block"
          >
            <div
              className={`aspect-[3/4] ${i === 0 ? 'md:aspect-[2/3]' : ''} overflow-hidden bg-secondary`}
            >
              <motion.img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-[10px] uppercase tracking-widest text-white/60 mb-1 font-body">
                {cat.count}
              </p>
              <div className="flex items-end justify-between">
                <h3
                  className="font-display text-3xl text-white"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {cat.name}
                </h3>
                <motion.div
                  initial={{ x: 0, opacity: 0.5 }}
                  whileHover={{ x: 4, opacity: 1 }}
                  className="w-8 h-8 border border-white/40 rounded-full flex items-center justify-center"
                >
                  <ArrowRight size={13} className="text-white" />
                </motion.div>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}

export default CategorySection
