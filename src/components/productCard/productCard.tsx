'use client'
import { motion } from 'motion/react'
import { ShoppingBag } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Link from 'next/link'

interface ProductCardProps {
  id:string
  name: string
  price: string
  image: { title: { url: string } }[]
  category: string
  index: number
}

const ProductCard = ({id, name, price, image, category, index }: ProductCardProps) => {
  return (
    <Link href={`/product/${id}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="group cursor-pointer w-full max-w-xs"
      >
        {/* Image Container */}
        <div className="relative overflow-hidden bg-secondary rounded-sm mb-4">
          <Carousel className="w-full">
            <CarouselContent>
              {image.map((ele, i) => (
                <CarouselItem key={i}>
                  <div className="aspect-[3/4] w-full overflow-hidden">
                    <img
                      src={ele?.title?.url}
                      alt={`${name} - image ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Carousel nav — only visible on hover */}
            <CarouselPrevious className="left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CarouselNext className="right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Carousel>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors duration-500 pointer-events-none" />

          {/* Add to Bag CTA */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none group-hover:pointer-events-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
              bg-gradient-gold text-primary-foreground
              px-6 py-2.5 text-xs tracking-widest uppercase
              font-body font-medium flex items-center gap-2 rounded-sm
              opacity-0 translate-y-3
              group-hover:opacity-100 group-hover:translate-y-0
              transition-all duration-500 ease-out
            "
            >
              <ShoppingBag size={14} />
              Add to Bag
            </motion.button>
          </div>
        </div>

        {/* Card Info */}
        <p className="text-[11px] tracking-widest uppercase text-muted-foreground mb-1 font-body">
          {category}
        </p>
        <h3 className="font-display text-lg text-foreground mb-1 leading-snug">{name}</h3>
        <p className="text-sm text-gold font-body font-medium">${parseInt(price).toFixed(2)}</p>
      </motion.div>
    </Link>
  )
}

export default ProductCard
