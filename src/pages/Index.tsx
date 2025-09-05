import Navigation from "@/components/Navigation";
import SocialLinks from "@/components/SocialLinks";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      <main className="pt-20 pb-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center animate-fade-in">
            
            {/* Profile Image */}
            <div className="mb-8">
              <img 
                src="/lovable-uploads/5b4a7065-4da5-4b57-ae46-b71642128331.png"
                alt="Maral - Pet Portrait Artist"
                className="w-32 h-32 rounded-full object-cover shadow-elegant border-4 border-accent/20"
              />
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Art by Maral
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl">
              Pet portraits and Design
            </p>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button variant="hero" size="lg" asChild>
                <Link to="/purchase">Commission Your Portrait</Link>
              </Button>
               <Button
                 variant="elegant"
                 size="lg"
                 asChild
                 className="bg-gradient-to-r from-[hsl(266,85%,78%)] to-[hsl(231,97%,72%)] hover:from-[hsl(266,85%,70%)] hover:to-[hsl(231,97%,65%)]"
               >
                 <Link to="/contact">Get in Touch</Link>
               </Button>
            </div>

            {/* Social Links */}
            <SocialLinks />
          </div>
        </div>
        
        {/* Footer */}
        <footer className="text-center text-sm text-muted-foreground mt-16">
          © ArtByMaral
        </footer>
      </main>
    </div>
  );
};

export default Index;
