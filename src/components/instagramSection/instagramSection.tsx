import {motion} from "motion/react"
import {Instagram} from "lucide-react"



const INSTAGRAM_POSTS = [
  'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&q=80',
  'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80',
  'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80',
  'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=400&q=80',
  'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80',
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&q=80',
]



function InstagramSection() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-10">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2 font-body">Follow Along</p>
          <h2 className="font-display text-3xl text-foreground mb-1" style={{ letterSpacing: '-0.02em' }}>@MaisonNoir</h2>
          <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-1 mt-1">
            <Instagram size={11} /> Follow on Instagram
          </a>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
          {INSTAGRAM_POSTS.map((post, i) => (
            <motion.a
              key={i}
              href="#"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="relative aspect-square overflow-hidden rounded-sm group bg-secondary"
            >
              <img src={post} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <Instagram size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}


export default InstagramSection;