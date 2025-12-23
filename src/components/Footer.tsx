import { Link } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";
import logo from "@/assets/logo.png";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
const Footer = () => {
  return (
    <footer className="relative text-cream">
      {/* Brick Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/brick-wall.webp')" }}
      />
      <div className="absolute inset-0 bg-black/60" />
      
      <div className="container-wide py-16 relative z-10">
        {/* Logo centered at top */}
        <div className="flex justify-center mb-10">
          <img 
            src={logo} 
            alt="The Grounds Logo" 
            className="w-28 h-28"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Links */}
          <div>
            <h3 className="font-display text-xl mb-6 border-b border-cream/20 pb-2">Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-cream/80 hover:text-cream transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-cream/80 hover:text-cream transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-cream/80 hover:text-cream transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-cream/80 hover:text-cream transition-colors">
                  Terms and Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="text-center">
            <h3 className="font-display text-xl mb-6 border-b border-cream/20 pb-2">Hours</h3>
            <ul className="space-y-3 text-cream/80">
              <li>Monday – Friday: 9am – 6pm</li>
              <li>Saturday: 8am – 4pm</li>
              <li>Sunday and Public Holidays: 9am – 2pm</li>
            </ul>
          </div>

          {/* Visit Us */}
          <div className="text-right md:text-right">
            <h3 className="font-display text-xl mb-6 border-b border-cream/20 pb-2">Visit Us</h3>
            <p className="text-cream/80 mb-6">
              76 Edward Road, Bellville,<br />
              Cape Town.
            </p>
            
            {/* Socials */}
            <div>
              <h4 className="font-display text-lg mb-4 border-b border-cream/20 pb-2">Socials</h4>
              <div className="flex gap-4 justify-end">
                <a
                  href="https://www.instagram.com/thegrounds_deli/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-cream/20 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.facebook.com/p/The-Grounds-Meat-Deli-61550779858277/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-cream/20 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://wa.me/27000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center hover:bg-[#20BD5A] transition-colors text-white"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-cream/20 text-center text-cream/60 text-sm">
          <p>© {new Date().getFullYear()} The Grounds Meat & Deli. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
