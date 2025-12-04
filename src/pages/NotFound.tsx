import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-background">
      <div className="text-center px-4">
        <h1 className="font-serif text-8xl text-primary mb-4">404</h1>
        <h2 className="font-serif text-2xl text-charcoal mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <Link to="/">
          <Button size="lg">Return Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
