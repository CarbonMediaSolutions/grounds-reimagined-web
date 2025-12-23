import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import teamImage from "@/assets/team.jpg";
import heritage1945 from "@/assets/heritage-1945.webp";
import heritage1959 from "@/assets/heritage-1959.jpg";
import heritage1979 from "@/assets/heritage-1979.webp";
import heritage2013 from "@/assets/heritage-2013.webp";
import heritage2023 from "@/assets/heritage-2023.webp";

const Index = () => {
  const [email, setEmail] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubscribing(true);
    try {
      const { data, error } = await supabase.functions.invoke("mailblaze-subscribe", {
        body: { email },
      });

      if (error) throw error;

      toast({
        title: "Subscribed!",
        description: "Thank you for joining our newsletter.",
      });
      setEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  const timelineItems = [
    { 
      year: "1945", 
      description: "W.A Te Roller opens family Butchery in Bredell Joburg.",
      image: heritage1945
    },
    { 
      year: "1959", 
      description: "Mrs. W.A Te Roller passes blockman trade test, becoming the first woman blockman in South Africa.",
      image: heritage1959
    },
    { 
      year: "1979 - 2012", 
      description: "L.A Te Roller & his two brothers H Te Roller & W Te Roller start Ranch Meats Centres in the Western Cape.",
      image: heritage1979
    },
    { 
      year: "2013", 
      description: "Simon Parker & Brent Te Roller merge Ranch Meat Centers with a large South African retail business.",
      image: heritage2013
    },
    { 
      year: "2023", 
      description: "Simon and Brent chose to return to their family roots, and The Grounds Meat & Deli was created.",
      image: heritage2023
    },
  ];

  // Show 2 items at a time, so we have ceil(5/2) = 3 slides
  const totalSlides = Math.ceil(timelineItems.length / 2);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentItems = () => {
    const startIndex = currentSlide * 2;
    return timelineItems.slice(startIndex, startIndex + 2);
  };

  return (
    <div>
      {/* Hero Section - Clickable WhatsApp Banner */}
      <a 
        href="https://wa.me/27000000000" 
        target="_blank" 
        rel="noopener noreferrer"
        className="block relative min-h-[50vh] md:min-h-[60vh] overflow-hidden cursor-pointer"
      >
        <img
          src="/images/hero-banner.webp"
          alt="The Grounds Meat & Deli hero banner"
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
        />
      </a>

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
                  disabled={isSubscribing}
                />
                <Button type="submit" className="h-12 px-8" disabled={isSubscribing}>
                  {isSubscribing ? "Subscribing..." : "Subscribe"}
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
                src={teamImage}
                alt="Our master butchers Simon and Brent"
                className="rounded-2xl shadow-elevated w-full object-cover aspect-[4/3]"
                loading="lazy"
              />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary rounded-2xl flex items-center justify-center">
                <span className="font-display text-3xl text-primary-foreground">4th</span>
                <span className="text-primary-foreground text-sm ml-1">Gen</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Heritage Timeline */}
      <section className="relative section-padding text-cream overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/brick-wall.webp')" }}
        />
        <div className="absolute inset-0 bg-black/60" />
        
        <div className="container-wide relative z-10">
          <h2 className="font-display text-3xl md:text-4xl text-center mb-12">
            Our Heritage
          </h2>
          
          {/* Slider Container */}
          <div className="relative flex items-center gap-4">
            {/* Left Arrow */}
            <button 
              onClick={prevSlide}
              className="flex-shrink-0 w-12 h-12 bg-cream/20 hover:bg-cream/30 rounded-full flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-cream" />
            </button>
            
            {/* Cards Container */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
              {getCurrentItems().map((item) => (
                <div
                  key={item.year}
                  className="group perspective"
                >
                  <div className="relative w-full h-80 transition-transform duration-700 transform-style-3d group-hover:rotate-y-180">
                    {/* Front */}
                    <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.year}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
                      <span className="absolute bottom-8 left-1/2 -translate-x-1/2 font-display text-4xl md:text-5xl text-cream">
                        {item.year}
                      </span>
                    </div>
                    
                    {/* Back */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 bg-cream rounded-2xl p-6 flex items-center justify-center">
                      <p className="text-charcoal text-center text-base leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Right Arrow */}
            <button 
              onClick={nextSlide}
              className="flex-shrink-0 w-12 h-12 bg-cream/20 hover:bg-cream/30 rounded-full flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-cream" />
            </button>
          </div>
          
          {/* Slide Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentSlide === index ? 'bg-cream' : 'bg-cream/40'
                }`}
              />
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
