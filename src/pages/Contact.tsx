import { Button } from "@/components/ui/button";
import shopInterior from "@/assets/shop-interior.jpg";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { Mail } from "lucide-react";

const Contact = () => {
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
            Reach Out
          </h1>
          <p className="text-cream/80 text-lg animate-fade-up" style={{ animationDelay: "0.2s" }}>
            We'd love to hear from you
          </p>
        </div>
      </section>

      {/* WhatsApp CTA Section */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="animate-fade-up">
              <img
                src={shopInterior}
                alt="The Grounds shop interior"
                className="rounded-2xl shadow-elevated w-full object-cover aspect-[4/3]"
              />
            </div>

            <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-4 tracking-wider">
                Chat with us on WhatsApp
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                The fastest way to reach us — orders, questions, and special requests.
                We reply within trading hours.
              </p>

              <Button
                asChild
                size="lg"
                className="bg-[#25D366] hover:bg-[#1faa54] text-white h-auto py-4 px-6"
              >
                <a
                  href="https://wa.me/27608153050"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3"
                >
                  <WhatsAppIcon className="w-6 h-6" />
                  <span className="flex flex-col items-start leading-tight">
                    <span className="text-sm opacity-90">Message us on WhatsApp</span>
                    <span className="font-semibold text-lg">+27 60 815 3050</span>
                  </span>
                </a>
              </Button>

              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Prefer email?{" "}
                  <a
                    href="mailto:info@grounds.co.za"
                    className="text-primary hover:underline"
                  >
                    info@grounds.co.za
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-16 md:pb-24 bg-background">
        <div className="container-wide">
          <div className="rounded-2xl overflow-hidden shadow-elevated">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3310.8!2d18.6315!3d-33.8755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc514d4d4be3c1%3A0x4b34c8c5b8c8c8c8!2s76%20Edward%20Rd%2C%20Tygervalley%2C%20Cape%20Town%2C%207530!5e0!3m2!1sen!2sza!4v1703324400000!5m2!1sen!2sza"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="The Grounds Meat & Deli Location"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              <strong className="text-charcoal">76 Edward Road, Tygervalley, Cape Town, 7530</strong>
            </p>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=76+Edward+Road,+Tygervalley,+Cape+Town,+7530"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline mt-2 inline-block"
            >
              Get Directions →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
