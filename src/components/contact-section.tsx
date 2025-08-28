'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useTransition, useState } from 'react';
// import { submitInquiry } from '@/app/actions';
import { services } from '@/lib/services';

type ContactProps = {
  dictionary: {
    tag: string;
    title: string;
    subtitle: string;
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      help: string;
      helpPlaceholder: string;
      service: string;
      selectService: string;
      submit: string;
      submitting: string;
      successTitle: string;
      successMessage: string;
      errorTitle: string;
      errorMessage: string;
    };
  };
};

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  inquiry: z.string().min(10, {
    message: 'Please describe your inquiry in at least 10 characters.',
  }),
  service: z.string({
    required_error: 'Please select a service.',
  }),
});

export default function ContactSection({ dictionary }: ContactProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      inquiry: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // Server-side submission is not possible with static export.
    // You can integrate a third-party form service like Formspree or Netlify Forms.
    console.log('Form values:', values);
    toast({
      title: 'Form Submitted (Simulated)',
      description: 'In a real application, this would send the inquiry.',
    });
    setTimeout(() => {
      setIsSubmitting(false);
      form.reset();
    }, 1000);
  }

  return (
    <section id="contact" className="w-full py-20 md:py-32 bg-secondary/50">
      <div className="container grid items-center justify-center gap-8 px-4 text-center md:px-6 lg:grid-cols-2 lg:gap-16 lg:text-left">
        <div className="space-y-4">
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">{dictionary.tag}</div>
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {dictionary.title}
          </h2>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {dictionary.subtitle}
          </p>
        </div>
        <div className="w-full max-w-md mx-auto lg:max-w-none">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{dictionary.form.name}</FormLabel>
                      <FormControl>
                        <Input placeholder={dictionary.form.namePlaceholder} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{dictionary.form.email}</FormLabel>
                      <FormControl>
                        <Input placeholder={dictionary.form.emailPlaceholder} type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="inquiry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{dictionary.form.help}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={dictionary.form.helpPlaceholder}
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{dictionary.form.service}</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={dictionary.form.selectService} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {services.map(service => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSubmitting ? dictionary.form.submitting : dictionary.form.submit}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
