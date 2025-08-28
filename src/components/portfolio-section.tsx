'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const projects = [
  {
    title: 'E-commerce Platform',
    category: 'Web',
    description: 'A full-featured online store with a custom CMS, payment integration, and a responsive design.',
    image: 'https://picsum.photos/600/400?random=1',
    hint: 'store website',
    tags: ['Next.js', 'Stripe', 'Tailwind CSS'],
  },
  {
    title: 'Fitness Tracker App',
    category: 'Mobile',
    description: 'A mobile application for tracking workouts, setting goals, and competing with friends.',
    image: 'https://picsum.photos/600/400?random=2',
    hint: 'fitness app',
    tags: ['React Native', 'Firebase', 'Chart.js'],
  },
  {
    title: 'SaaS Dashboard',
    category: 'Web',
    description: 'A complex data visualization dashboard for a business intelligence SaaS product.',
    image: 'https://picsum.photos/600/400?random=3',
    hint: 'dashboard analytics',
    tags: ['React', 'D3.js', 'Node.js'],
  },
  {
    title: 'Recipe Sharing App',
    category: 'Mobile',
    description: 'A social platform for users to share and discover new recipes, with ratings and comments.',
    image: 'https://picsum.photos/600/400?random=4',
    hint: 'cooking app',
    tags: ['Flutter', 'Supabase', 'Dart'],
  },
  {
    title: 'Corporate Website',
    category: 'Web',
    description: 'A professional and modern website for a financial consulting firm.',
    image: 'https://picsum.photos/600/400?random=5',
    hint: 'business website',
    tags: ['Gatsby', 'Contentful', 'GraphQL'],
  },
  {
    title: 'Real-time Chat App',
    category: 'Mobile',
    description: 'A cross-platform mobile chat application with end-to-end encryption.',
    image: 'https://picsum.photos/600/400?random=6',
    hint: 'chat interface',
    tags: ['React Native', 'WebSocket', 'MongoDB'],
  },
];

const categories = ['All', 'Web', 'Mobile'];

export default function PortfolioSection() {
  const [filter, setFilter] = useState('All');

  const filteredProjects = projects.filter(p => filter === 'All' || p.category === filter);

  return (
    <section id="portfolio" className="w-full py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Our Work</div>
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">Featured Projects</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Check out some of the amazing projects we've delivered for our clients.
            </p>
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-8 mb-12">
          {categories.map(category => (
            <Button
              key={category}
              variant={filter === category ? 'default' : 'outline'}
              onClick={() => setFilter(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <Card key={index} className="overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-300">
              <CardHeader className="p-0">
                <div className="overflow-hidden aspect-video">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint={project.hint}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="font-headline mb-2">{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map(tag => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
