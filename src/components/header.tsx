'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Mountain, Globe, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePathname } from 'next/navigation';
import { i18n, Locale } from '@/i18n-config';

type HeaderProps = {
  lang: Locale;
  dictionary: {
    services: string;
    portfolio: string;
    contact: string;
    getQuote: string;
    language: string;
    english: string;
    spanish: string;
  };
};

export default function Header({ lang, dictionary }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#services', label: dictionary.services },
    { href: '#portfolio', label: dictionary.portfolio },
    { href: '#contact', label: dictionary.contact },
  ];

  const redirectedPathName = (locale: Locale) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href={`/${lang}/#home`} className="flex items-center gap-2 font-headline text-2xl font-bold" onClick={() => setIsMenuOpen(false)}>
          <Mountain className="h-7 w-7 text-primary" />
          <span className="text-foreground">Localpad</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={`/${lang}${link.href}`}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          <Button asChild>
            <Link href={`/${lang}/#contact`}>{dictionary.getQuote}</Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Globe className="h-4 w-4" />
                <span className='sr-only'>{dictionary.language}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href={redirectedPathName('en')}>{dictionary.english}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={redirectedPathName('es')}>{dictionary.spanish}</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </nav>
        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 p-6">
                <Link href={`/${lang}/#home`} className="flex items-center gap-2 font-headline text-2xl font-bold" onClick={() => setIsMenuOpen(false)}>
                  <Mountain className="h-6 w-6 text-primary" />
                  <span>Localpad</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {navLinks.map(link => (
                    <Link
                      key={link.href}
                      href={`/${lang}${link.href}`}
                      className="text-lg font-medium text-muted-foreground hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <Button asChild className="mt-4" onClick={() => setIsMenuOpen(false)}>
                  <Link href={`/${lang}/#contact`}>{dictionary.getQuote}</Link>
                </Button>
                <div className="mt-4">
                   <p className='mb-2 text-muted-foreground'>{dictionary.language}</p>
                   <Link href={redirectedPathName('en')} className="block py-2 text-lg font-medium text-muted-foreground hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                     {dictionary.english}
                   </Link>
                   <Link href={redirectedPathName('es')} className="block py-2 text-lg font-medium text-muted-foreground hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                     {dictionary.spanish}
                   </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
