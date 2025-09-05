import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-xl font-medium text-foreground hover:text-accent transition-colors"
          >
            Art by Maral
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-accent ${
                isActive('/') ? 'text-accent' : 'text-muted-foreground'
              }`}
            >
              Home
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors hover:text-accent ${
                isActive('/contact') ? 'text-accent' : 'text-muted-foreground'
              }`}
            >
              Contact
            </Link>
            <Link
              to="/purchase"
              className={`text-sm font-medium transition-colors hover:text-accent ${
                isActive('/purchase') ? 'text-accent' : 'text-muted-foreground'
              }`}
            >
              Commission
            </Link>

          </nav>

          <div className="flex items-center space-x-4">
            <a
              href="https://www.ebay.co.uk/usr/artbymaral"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              eBay
            </a>
            <a 
              href="https://www.redbubble.com/people/ArtByMaral/shop" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              Redbubble
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;