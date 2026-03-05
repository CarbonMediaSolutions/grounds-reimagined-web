import { Link } from "react-router-dom";
import { Star, Download } from "lucide-react";
import recipeBurntEnds from "@/assets/recipe-burnt-ends.jpg";
import recipeLamb from "@/assets/recipe-lamb.jpg";
import recipeRagu from "@/assets/recipe-ragu.jpg";
import recipeGammon from "@/assets/recipe-gammon.jpg";
import recipePork from "@/assets/recipe-pork.jpg";
import recipeRibStew from "@/assets/recipe-rib-stew.jpg";

const Products = () => {
  const recipes = [
    { title: "Texas Style Air Fryer Burnt Ends", image: recipeBurntEnds, slug: "burnt-ends" },
    { title: "Slow Cooked Lamb Shank – Greek Style", image: recipeLamb, slug: "lamb-shank" },
    { title: "Italian Style Pappardelle Ragù", image: recipeRagu, slug: "ragu" },
    { title: "Traditional Christmas Gammon", image: recipeGammon, slug: "gammon" },
    { title: "Classic Sunday Roast – Pork Belly", image: recipePork, slug: "pork-belly" },
    { title: "Beef Short Rib Stew", image: recipeRibStew, slug: "rib-stew" },
  ];

  const reviews = [
    {
      name: "Gerrie Cronje",
      rating: 4,
      text: "If you're a meat and braai lover, this is the place for you. Something of everything available. Just a bit pricey, but the quality makes up for it.",
    },
    {
      name: "J",
      rating: 5,
      text: "Great selection, great service and great prices. Purchased over 35 kgs of meat here including some beautiful dry aged pieces. They even cut and vacuum packed it for me.",
    },
    {
      name: "Riaan Pool",
      rating: 5,
      text: "Uitstekende en vriendelike diens! Heerlike vleis!",
    },
  ];

  const hampers = [
    { name: "The Grounds Mini Hamper", price: "R2,099.99", pdf: "/hampers/mini-hamper.pdf" },
    { name: "The Grounds Midi Hamper", price: "R2,899.99", pdf: "/hampers/midi-hamper.pdf" },
    { name: "The Grounds Maxi Hamper", price: "R3,899.99", pdf: "/hampers/maxi-hamper.pdf" },
  ];

  return (
    <div>
      {/* Hero Section with Brick Background */}
      <section className="relative py-16 md:py-20">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/brick-wall.webp')" }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="container-wide relative z-10 text-center">
          <h1 className="font-display text-4xl md:text-5xl text-cream mb-4 animate-fade-up tracking-wider">
            Inspirational Cooking
          </h1>
          <p className="text-cream/80 text-lg animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Discover delicious recipes featuring our premium cuts
          </p>
        </div>
      </section>

      {/* Recipe Cards */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((recipe, index) => (
              <Link
                key={recipe.title}
                to={`/recipes/${recipe.slug}`}
                className="group bg-card rounded-2xl overflow-hidden shadow-soft hover-lift animate-fade-up block"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl text-charcoal mb-3 group-hover:text-primary transition-colors">
                    {recipe.title}
                  </h3>
                  <span className="text-primary font-medium inline-flex items-center gap-1">
                    Read More →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="section-padding bg-secondary">
        <div className="container-wide">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold mb-2">EXCELLENT</p>
            <div className="flex justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-muted-foreground">
              Based on <strong>214 reviews</strong>
            </p>
            <div className="flex justify-center mt-2">
              <span className="text-2xl font-semibold">
                <span className="text-blue-500">G</span>
                <span className="text-red-500">o</span>
                <span className="text-yellow-500">o</span>
                <span className="text-blue-500">g</span>
                <span className="text-green-500">l</span>
                <span className="text-red-500">e</span>
              </span>
            </div>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {reviews.map((review, index) => (
                <div
                  key={review.name}
                  className="bg-card rounded-2xl p-6 shadow-soft animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                      {review.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-charcoal">{review.name}</p>
                      <div className="flex gap-0.5">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hampers Section with Brick Background */}
      <section className="relative section-padding">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/brick-wall.webp')" }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="container-wide relative z-10">
          <h2 className="font-display text-3xl md:text-4xl text-center text-cream mb-12">
            Our Hamper Selection
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {hampers.map((hamper, index) => (
              <a
                key={hamper.name}
                href={hamper.pdf}
                download
                className="bg-cream/95 rounded-2xl p-8 text-center shadow-soft hover-lift animate-fade-up block"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-20 h-20 bg-secondary rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="font-display text-2xl text-primary">🎁</span>
                </div>
                <h3 className="font-display text-xl text-charcoal mb-2">{hamper.name}</h3>
                <p className="text-primary font-semibold text-lg mb-4">{hamper.price}</p>
                <span className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Download className="w-4 h-4" />
                  Download PDF
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
