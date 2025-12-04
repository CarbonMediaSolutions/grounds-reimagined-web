import { Link } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import recipeRagu from "@/assets/recipe-ragu.jpg";

const Ragu = () => {
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
            Italian Style Pappardelle Ragù
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-background">
        <div className="container-wide max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <img
                src={recipeRagu}
                alt="Italian Style Pappardelle Ragù"
                className="rounded-2xl shadow-elevated w-full aspect-video object-cover mb-6"
              />
              <p className="text-muted-foreground text-center italic">
                Recipe video coming soon
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl text-charcoal mb-4">Recipe Details</h2>
              <p className="text-muted-foreground mb-6">
                Content will be added in the next update with full recipe instructions, ingredients, and a downloadable PDF.
              </p>
              <Button variant="outline" className="gap-2" disabled>
                <Download className="w-4 h-4" />
                Download Recipe PDF
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Ragu;
