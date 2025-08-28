'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type Project = {
  title: string;
  category: string;
  description: string;
  image: string;
  hint: string;
  tags: string[];
};

type PortfolioProps = {
  dictionary: {
    tag: string;
    title: string;
    subtitle: string;
    all: string;
    web: string;
    mobile: string;
    projects: {
      invoice: Omit<Project, 'image' | 'hint'>;
      trash: Omit<Project, 'image' | 'hint'>;
      appDev: Omit<Project, 'image' | 'hint'>;
      webDesign: Omit<Project, 'image' | 'hint'>;
    };
  };
};

export default function PortfolioSection({ dictionary }: PortfolioProps) {
  const [filter, setFilter] = useState('All');

  const projects: Project[] = [
    {
      ...dictionary.projects.invoice,
      image: 'https://picsum.photos/id/24/600/400',
      hint: 'messy desk papers',
    },
    {
      ...dictionary.projects.trash,
      image: 'https://picsum.photos/id/1015/600/400',
      hint: 'elegant trash bins',
    },
    {
      ...dictionary.projects.appDev,
      image: 'https://picsum.photos/id/160/600/400',
      hint: 'mobile app',
    },
    {
      ...dictionary.projects.webDesign,
      image: 'https://picsum.photos/id/5/600/400',
      hint: 'web design',
    },
  ];

  const categories = [dictionary.all, dictionary.web, dictionary.mobile];
  const categoryMap: { [key: string]: string } = {
    [dictionary.all]: 'All',
    [dictionary.web]: 'Web',
    [dictionary.mobile]: 'Mobile',
  };

  const filteredProjects = projects.filter(p => categoryMap[filter] === 'All' || p.category === categoryMap[filter]);

  return (
    <section id="portfolio" className="w-full py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">{dictionary.tag}</div>
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">{dictionary.title}</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {dictionary.subtitle}
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
