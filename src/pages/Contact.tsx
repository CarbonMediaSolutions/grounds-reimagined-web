import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import shopInterior from "@/assets/shop-interior.jpg";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="container-wide text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4 animate-fade-up">
            Reach Out
          </h1>
          <p className="text-muted-foreground text-lg animate-fade-up" style={{ animationDelay: "0.2s" }}>
            We'd love to hear from you
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Image */}
            <div className="animate-fade-up">
              <img
                src={shopInterior}
                alt="The Grounds shop interior"
                className="rounded-2xl shadow-elevated w-full object-cover aspect-[4/3]"
              />
            </div>

            {/* Form */}
            <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">
                    Name *
                  </label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-12 rounded-lg"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                    Email *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-12 rounded-lg"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-2">
                    Suggestions or Questions
                  </label>
                  <Textarea
                    id="message"
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="rounded-lg resize-none"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full sm:w-auto">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-16 md:pb-24 bg-background">
        <div className="container-wide">
          <div className="rounded-2xl overflow-hidden shadow-elevated">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3310.5!2d18.6389!3d-33.9089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDU0JzMyLjAiUyAxOMKwMzgnMjAuMCJF!5e0!3m2!1sen!2sza!4v1234567890"
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
              href="https://maps.google.com"
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
