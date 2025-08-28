import Link from 'next/link';
import { Mountain } from 'lucide-react';

type FooterProps = {
  dictionary: {
    copyright: string;
  }
}

export default function Footer({ dictionary }: FooterProps) {
  return (
    <footer className="w-full bg-background border-t">
      <div className="container mx-auto py-8 px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Mountain className="h-6 w-6 text-primary" />
          <span className="font-headline font-bold text-lg">Logicpad</span>
        </div>
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Logicpad. {dictionary.copyright}</p>
        <div className="flex items-center gap-4">
          {/* Social links removed as per request */}
        </div>
      </div>
    </footer>
  );
}
