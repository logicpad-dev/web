'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const projects = [
  {
    title: 'Invoice App',
    category: 'Web',
    description: 'A web-based application for creating, sending, and managing invoices with PDF generation.',
    image: 'https://picsum.photos/id/10/600/400',
    hint: 'invoice app',
    tags: ['React', 'Node.js', 'PDF Generation'],
  },
  {
    title: 'Trash Management System',
    category: 'Web',
    description: 'A system to optimize waste collection routes and schedules using real-time data and mapping.',
    image: 'https://picsum.photos/id/54/600/400',
    hint: 'map dashboard',
    tags: ['Next.js', 'Firebase', 'Mapping API'],
  },
  {
    title: 'App Development',
    category: 'Mobile',
    description: 'Custom mobile application development for both iOS and Android platforms.',
    image: 'https://picsum.photos/id/160/600/400',
    hint: 'mobile app',
    tags: ['React Native', 'iOS', 'Android'],
  },
  {
    title: 'Web Design',
    category: 'Web',
    description: 'Designing beautiful and intuitive user interfaces and experiences for web applications.',
    image: 'https://picsum.photos/id/17/600/400',
    hint: 'website design',
    tags: ['Figma', 'UI/UX', 'CSS Grid'],
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
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
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
