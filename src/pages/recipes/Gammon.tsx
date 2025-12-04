import { Link } from "react-router-dom";
import { ArrowLeft, Download, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import recipeGammon from "@/assets/recipe-gammon.jpg";

const Gammon = () => {
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
            Traditional Christmas Gammon
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-background">
        <div className="container-wide max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Video/Image */}
            <div>
              <a 
                href="https://www.facebook.com/reel/2025761834528465" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block relative rounded-2xl overflow-hidden shadow-elevated group"
              >
                <img
                  src={recipeGammon}
                  alt="Traditional Christmas Gammon"
                  className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                  <div className="w-16 h-16 bg-cream/90 rounded-full flex items-center justify-center">
                    <Play className="w-8 h-8 text-primary fill-primary ml-1" />
                  </div>
                </div>
              </a>
              <p className="text-muted-foreground text-center mt-4 text-sm">
                Click to watch the recipe video on Facebook
              </p>
            </div>

            {/* Recipe Details */}
            <div>
              <h2 className="font-display text-2xl text-charcoal mb-4">Recipe Details</h2>
              <p className="text-muted-foreground mb-6">
                Create the perfect traditional Christmas gammon for your festive table. 
                Download the full recipe PDF below for ingredients and step-by-step instructions.
              </p>
              <a 
                href="/recipes/Traditional-Christmas-Gammon.pdf" 
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

export default Gammon;
