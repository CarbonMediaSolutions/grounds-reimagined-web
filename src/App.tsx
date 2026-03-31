import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import BurntEnds from "./pages/recipes/BurntEnds";
import LambShank from "./pages/recipes/LambShank";
import Ragu from "./pages/recipes/Ragu";
import Gammon from "./pages/recipes/Gammon";
import PorkBelly from "./pages/recipes/PorkBelly";
import RibStew from "./pages/recipes/RibStew";
import Blogs from "./pages/Blogs";
import BlogPost from "./pages/BlogPost";
import AdminLogin from "./pages/admin/AdminLogin";
import BlogAdmin from "./pages/admin/BlogAdmin";
import FeedbackAdmin from "./pages/admin/FeedbackAdmin";
import Feedback from "./pages/Feedback";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Standalone page - no nav/footer */}
          <Route path="/feedback" element={<Feedback />} />

          {/* Main layout with nav/footer */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/blogs" element={<Blogs />} />
                    <Route path="/blogs/:id" element={<BlogPost />} />
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin/blogs" element={<BlogAdmin />} />
                    <Route path="/recipes/burnt-ends" element={<BurntEnds />} />
                    <Route path="/recipes/lamb-shank" element={<LambShank />} />
                    <Route path="/recipes/ragu" element={<Ragu />} />
                    <Route path="/recipes/gammon" element={<Gammon />} />
                    <Route path="/recipes/pork-belly" element={<PorkBelly />} />
                    <Route path="/recipes/rib-stew" element={<RibStew />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
                <WhatsAppButton />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
