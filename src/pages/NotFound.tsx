
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FadeIn from "@/components/ui/FadeIn";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container-custom py-20 flex flex-col items-center justify-center">
        <FadeIn>
          <div className="text-center">
            <h1 className="text-8xl font-bold text-primary">404</h1>
            <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
            <p className="text-muted-foreground mt-2 max-w-md">
              The page you are looking for doesn't exist or has been moved.
            </p>
            
            <div className="mt-8">
              <Link 
                to="/" 
                className="btn btn-primary py-2.5 px-5 inline-flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Return Home
              </Link>
            </div>
          </div>
        </FadeIn>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
