import teamImage from "@/assets/team.jpg";
import shopInterior from "@/assets/shop-interior.jpg";

const About = () => {
  return (
    <div>
      {/* Hero Section with Brick Background */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/brick-wall.webp')" }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="container-wide relative z-10 text-center">
          <h1 className="font-display text-5xl md:text-6xl text-cream mb-4 animate-fade-up tracking-wider">
            Our Story
          </h1>
          <p className="text-cream/80 text-lg animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Four generations of passion, quality, and craftsmanship
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-20">
            <div className="animate-fade-up">
              <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-6">
                About Us
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-6">
                <p>
                  Step into <strong className="text-foreground">The Grounds Meat & Deli</strong>, and you enter a retail experience where 
                  tradition meets excellence. Nestled between Durbanville and Bellville on 
                  Edward Street, this family-owned establishment boasts a legacy of 
                  craftsmanship spanning four generations.
                </p>
                <p>
                  With a passion for butchery that runs deep, The Grounds was founded on the 
                  principles of quality, skill, and dedication. Two master butchers and a 
                  classically trained chef combine their expertise to offer an unparalleled meat 
                  experience, ensuring every cut is treated with precision and care.
                </p>
              </div>
            </div>
            <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <img
                src={teamImage}
                alt="Our master butchers Simon and Brent"
                className="rounded-2xl shadow-elevated w-full object-cover aspect-[4/3]"
              />
            </div>
          </div>

          {/* Second Section */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
            <div className="prose prose-lg text-muted-foreground space-y-6 animate-fade-up">
              <p>
                At The Grounds, quality is not just a promise—it's a practice. Every product is 
                crafted on-site, using only the finest ingredients sourced directly from local 
                farmers. The beechwood-smoked Kassler and bacon, traditionally made 
                boerewors, and brisket burger range are just the beginning. Their dry-aged 
                steak selection, including the <strong className="text-foreground">Tennessee bourbon-drenched muslin-wrapped 
                sirloins</strong>, showcases their commitment to craftsmanship and innovation.
              </p>
              <p>
                From the moment you step inside, the aroma of <strong className="text-foreground">handmade, roast coriander-
                spiced biltong and droëwors</strong> fills the air. These hanging delicacies, prepared 
                with time-honored techniques, offer a true taste of South African tradition.
              </p>
              <p>
                But The Grounds is more than just a butcher—it's an experience. Their 
                gourmet counter is stocked with carefully curated specialties, from <strong className="text-foreground">halloumi 
                and bacon kebabs</strong> to <strong className="text-foreground">deboned chicken thigh espetada</strong> and <strong className="text-foreground">inch-cut lamb loin 
                chops</strong>. A true highlight is their <strong className="text-foreground">braai "netadelles"</strong>, a signature delicacy that 
                embodies the spirit of South African cooking.
              </p>
            </div>
            <div className="prose prose-lg text-muted-foreground space-y-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <p>
                The butchers at The Grounds are not just experts in their craft; they are 
                passionate storytellers, eager to share their knowledge and help customers 
                select the perfect cut for any occasion. Whether you're looking for <strong className="text-foreground">premium-
                grade steak for a special dinner</strong>, <strong className="text-foreground">charcuterie for an indulgent platter</strong>, or 
                <strong className="text-foreground"> weekend braai essentials</strong>, their expertise ensures you'll leave with the best.
              </p>
              <p>
                Simple yet refined, <strong className="text-foreground">The Grounds Meat & Deli</strong> is built on a foundation of 
                tradition, excellence, and an unwavering commitment to quality. It's more than 
                a destination—it's a legacy in the making.
              </p>
            </div>
          </div>

          {/* Shop Interior */}
          <div className="animate-fade-up">
            <img
              src={shopInterior}
              alt="Our beautiful shop interior"
              className="rounded-2xl shadow-elevated w-full object-cover aspect-[21/9]"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
