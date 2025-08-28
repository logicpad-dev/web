import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

type HeroProps = {
  dictionary: {
    title: string;
    subtitle: string;
    ctaProject: string;
    ctaWork: string;
  };
};

export default function HeroSection({ dictionary }: HeroProps) {
  return (
    <section
      id="home"
      className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center text-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background via-white to-accent/30 -z-10" />
      <div className="container px-4 md:px-6 z-10">
        <div className="grid gap-6">
          <h1 className="font-headline tracking-tighter text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
            {dictionary.title} <span className="text-primary">Localpad</span>
          </h1>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
            {dictionary.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
            <Button asChild size="lg">
              <Link href="#contact">
                {dictionary.ctaProject}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#portfolio">{dictionary.ctaWork}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
