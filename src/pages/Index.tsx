import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import heroImage from "@/assets/hero-meat.jpg";
import butchersImage from "@/assets/butchers.jpg";

const Index = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription
    setEmail("");
  };

  const timelineItems = [
    { year: "1945", title: "The Beginning", description: "A family passion for quality meat begins" },
    { year: "1959", title: "First Shop", description: "Opening doors to the community" },
    { year: "1985", title: "Expansion", description: "Growing our selection and expertise" },
    { year: "2020", title: "New Era", description: "Modern techniques meet tradition" },
  ];

  return (
    <div>
      {/* Hero Section with Brick Background */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/brick-wall.webp')" }}
        />
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Meat overlay image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="font-display text-5xl md:text-7xl text-cream mb-6 animate-fade-up tracking-wider">
            Tradition Tastes Better.
          </h1>
          <p className="text-cream/90 text-xl md:text-2xl mb-10 font-light animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Join our WhatsApp group for weekly specials & updates.
          </p>
          <div className="animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <Button variant="whatsapp" size="lg" className="gap-3">
              Join WhatsApp Group
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="max-w-xl mx-auto">
            <div className="bg-card rounded-2xl p-8 md:p-10 shadow-card text-center">
              <h2 className="font-display text-2xl md:text-3xl text-charcoal mb-4">
                Join Our Monthly Newsletter
              </h2>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 mb-4">
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-12 rounded-lg"
                />
                <Button type="submit" className="h-12 px-8">
                  Subscribe
                </Button>
              </form>
              <p className="text-sm text-muted-foreground">
                No spam — unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="section-padding bg-secondary">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-6">
                Four Generations of Excellence
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Nestled between Durbanville and Bellville, <strong className="text-foreground">The Grounds Meat & Deli</strong> is a 
                family-owned butchery where tradition meets craftsmanship. With four 
                generations of expertise, master butchers and a classically trained chef 
                work together, creating an unparalleled meat experience, offering premium 
                cuts, dry-aged selections, and handcrafted delicacies made on-site.
              </p>
              <Link to="/about">
                <Button variant="outline" className="gap-2">
                  Discover Our Story
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img
                src={butchersImage}
                alt="Our master butchers"
                className="rounded-2xl shadow-elevated w-full object-cover aspect-[4/3]"
              />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary rounded-2xl flex items-center justify-center">
                <span className="font-display text-3xl text-primary-foreground">4th</span>
                <span className="text-primary-foreground text-sm ml-1">Gen</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Heritage Timeline with Brick Background */}
      <section className="relative section-padding text-cream">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/brick-wall.webp')" }}
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="container-wide relative z-10">
          <h2 className="font-display text-3xl md:text-4xl text-center mb-12">
            Our Heritage
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {timelineItems.map((item, index) => (
              <div
                key={item.year}
                className="bg-cream/95 rounded-2xl p-6 text-center shadow-soft hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="font-display text-4xl text-primary block mb-2">
                  {item.year}
                </span>
                <h3 className="font-semibold text-charcoal mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-background">
        <div className="container-wide text-center">
          <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-6">
            Visit Us Today
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Experience the difference that four generations of expertise makes. 
            Our master butchers are ready to help you find the perfect cut.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg">
                Get Directions
              </Button>
            </Link>
            <Link to="/products">
              <Button variant="outline" size="lg">
                View Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
