import { Link } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const LambShank = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-16 md:py-20">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/brick-wall.webp')" }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="container-wide relative z-10">
          <Link to="/products" className="inline-flex items-center gap-2 text-cream/80 hover:text-cream mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Recipes
          </Link>
          <h1 className="font-display text-4xl md:text-5xl text-cream tracking-wider">
            Slow Cooked Lamb Shank – Greek Style
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-background">
        <div className="container-wide max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Embedded Video */}
            <div>
              <div className="rounded-2xl overflow-hidden shadow-elevated aspect-[9/16] max-h-[500px]">
                <iframe
                  src="https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/reel/1380816476443408&show_text=false"
                  className="w-full h-full"
                  style={{ border: 'none', overflow: 'hidden' }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                />
              </div>
            </div>

            {/* Recipe Details */}
            <div>
              <h2 className="font-display text-2xl text-charcoal mb-4">Recipe Details</h2>
              <p className="text-muted-foreground mb-6">
                Discover the secrets to making perfectly tender Greek-style lamb shanks. 
                Download the full recipe PDF below for ingredients and step-by-step instructions.
              </p>
              <a 
                href="/recipes/Slow-Cooked-Lamb-Shank-Greek-Style.pdf" 
                download
                className="inline-block"
              >
                <Button className="gap-2">
                  <Download className="w-4 h-4" />
                  Download Recipe PDF
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LambShank;
