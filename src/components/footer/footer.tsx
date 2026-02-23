const Footer = () => {
  return (
    <footer className="border-t border-border py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div>
            <h3 className="font-display text-xl tracking-[0.2em] uppercase text-gradient-gold mb-6">
              Aurum
            </h3>
            <p className="text-sm text-muted-foreground font-body leading-relaxed">
              Crafting timeless fragrances since 1987. Each scent tells a story of elegance and refinement.
            </p>
          </div>
          {[
            { title: "Shop", links: ["All Fragrances", "New Arrivals", "Bestsellers", "Gift Sets"] },
            { title: "About", links: ["Our Story", "Craftsmanship", "Sustainability", "Press"] },
            { title: "Help", links: ["Contact", "Shipping", "Returns", "FAQ"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-xs tracking-widest uppercase text-foreground mb-4 font-body font-medium">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-body">
            © 2026 Aurum. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Instagram", "Pinterest", "Twitter"].map((s) => (
              <a key={s} href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors font-body">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
