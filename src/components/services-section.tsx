import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Smartphone, Palette, CloudCog } from 'lucide-react';

const services = [
  {
    icon: <Code className="w-10 h-10 text-primary" />,
    title: 'Web Development',
    description: 'High-performance websites and web applications using modern tech like React, Next.js, and Node.js.',
  },
  {
    icon: <Smartphone className="w-10 h-10 text-primary" />,
    title: 'Mobile App Development',
    description: 'Crafting beautiful and intuitive native mobile apps for iOS and Android that deliver seamless user experiences.',
  },
  {
    icon: <Palette className="w-10 h-10 text-primary" />,
    title: 'UI/UX Design',
    description: 'Engaging and user-friendly interfaces that are both aesthetically pleasing and highly functional.',
  },
  {
    icon: <CloudCog className="w-10 h-10 text-primary" />,
    title: 'Cloud & DevOps',
    description: 'Leveraging cloud platforms like Firebase and AWS to build scalable infrastructure and streamline pipelines.',
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="w-full py-20 md:py-32 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Our Services</div>
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">What We Do</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We offer a complete suite of software development services to bring your ideas to life.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-4 mt-12">
          {services.map(service => (
            <Card
              key={service.title}
              className="text-center group hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-2"
            >
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4 transition-transform duration-300 group-hover:scale-110">
                  {service.icon}
                </div>
                <CardTitle className="font-headline">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
