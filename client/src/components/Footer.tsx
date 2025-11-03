// Footer component with links and company info
import { Link } from "wouter";
import { Mountain, Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  const { data: contact } = useQuery<any>({
    queryKey: ['/api/contact-settings'],
    queryFn: getQueryFn({ on401: 'returnNull' }),
  });

    const office = (contact?.officeAddress as string) ?? 'Shaolin Temple\nNgwerere Road\nOffice # 1';
  const phone = (contact?.phone as string) ?? '+260 978 838 939';
  const email = (contact?.email as string) ?? 'info@fusionmining.com';

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
              {t('footer.tagline')}
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
            <h3 className="font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('nav.projects')}
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('nav.marketplace')}
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('nav.news')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/legal/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link href="/legal/disclaimer" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('footer.disclaimer')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span style={{ whiteSpace: 'pre-line' }}>{office}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>{phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-foreground transition-colors">
                  {email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>{t('footer.copyright')}</p>
          <div className="flex gap-6">
            <Link href="/legal/terms" className="hover:text-foreground transition-colors">
              {t('footer.terms')}
            </Link>
            <Link href="/legal/privacy" className="hover:text-foreground transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link href="/legal/disclaimer" className="hover:text-foreground transition-colors">
              {t('footer.disclaimer')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
