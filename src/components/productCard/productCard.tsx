'use client'
import { motion } from "motion/react";
import { ShoppingBag } from "lucide-react";

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
  category: string;
  index: number;
}

const ProductCard = ({ name, price, image, category, index }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden bg-secondary rounded-sm mb-4">
        <img
          src={image}
          alt={name}
          className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-500" />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gradient-gold text-primary-foreground px-6 py-2.5 text-xs tracking-widest uppercase font-body font-medium flex items-center gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 rounded-sm"
        >
          <ShoppingBag size={14} />
          Add to Bag
        </motion.button>
      </div>
      <p className="text-[11px] tracking-widest uppercase text-muted-foreground mb-1 font-body">
        {category}
      </p>
      <h3 className="font-display text-lg text-foreground mb-1">{name}</h3>
      <p className="text-sm text-gold font-body">${price}</p>
    </motion.div>
  );
};

export default ProductCard;
