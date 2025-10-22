// Footer component with links and company info
import { Link } from "wouter";
import { Mountain, Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Mountain className="h-8 w-8 text-primary" />
              <div className="flex flex-col">
                <span className="text-lg font-bold font-display">
                  Fusion Mining
                </span>
                <span className="text-xs text-muted-foreground">
                  Limited
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Your trusted partner for mining investments and mineral trading in Zambia.
            </p>
            <div className="flex gap-2">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover-elevate active-elevate-2 p-2 rounded-lg"
                data-testid="link-facebook"
              >
                <Facebook className="h-5 w-5 text-muted-foreground" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover-elevate active-elevate-2 p-2 rounded-lg"
                data-testid="link-twitter"
              >
                <Twitter className="h-5 w-5 text-muted-foreground" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover-elevate active-elevate-2 p-2 rounded-lg"
                data-testid="link-linkedin"
              >
                <Linkedin className="h-5 w-5 text-muted-foreground" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-foreground transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-muted-foreground hover:text-foreground transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="text-muted-foreground hover:text-foreground transition-colors">
                  Marketplace
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/news" className="text-muted-foreground hover:text-foreground transition-colors">
                  News & Insights
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="text-muted-foreground hover:text-foreground transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Lusaka, Zambia</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+260 XXX XXX XXX</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:info@fusionmining.com" className="hover:text-foreground transition-colors">
                  info@fusionmining.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2024 Fusion Mining Limited. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/legal/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="/legal/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/legal/disclaimer" className="hover:text-foreground transition-colors">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
