import Header from '@/components/header';
import HeroSection from '@/components/hero-section';
import ServicesSection from '@/components/services-section';
import PortfolioSection from '@/components/portfolio-section';
import ContactSection from '@/components/contact-section';
import Footer from '@/components/footer';
import { getDictionary } from '@/lib/get-dictionary';
import { Locale } from '@/i18n-config';

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header lang={lang} dictionary={dictionary.header} />
      <main className="flex-grow">
        <HeroSection dictionary={dictionary.hero} />
        <ServicesSection dictionary={dictionary.services} />
        <PortfolioSection dictionary={dictionary.portfolio} />
        <ContactSection dictionary={dictionary.contact} />
      </main>
      <Footer dictionary={dictionary.footer} />
    </div>
  );
}
