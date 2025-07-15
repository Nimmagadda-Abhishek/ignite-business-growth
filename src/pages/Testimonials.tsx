import React, { useState } from 'react';
import { Star, Quote, ArrowLeft, ArrowRight, Play } from 'lucide-react';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      company: 'TechStart Inc.',
      position: 'CEO',
      text: 'TechSolutions transformed our online presence completely. Our sales increased by 150% within 3 months of launching our new website. The team was professional, responsive, and delivered beyond our expectations.',
      rating: 5,
      project: 'E-commerce Website',
      result: '+150% Sales Increase',
      image: '/api/placeholder/100/100',
      videoUrl: 'https://example.com/video1'
    },
    {
      id: 2,
      name: 'Michael Chen',
      company: 'RetailMax',
      position: 'CTO',
      text: 'The mobile app they developed for us is fantastic. User engagement has never been higher, and we\'ve seen a 300% increase in customer retention. Their attention to detail and technical expertise is outstanding.',
      rating: 5,
      project: 'Mobile App Development',
      result: '+300% User Retention',
      image: '/api/placeholder/100/100',
      videoUrl: 'https://example.com/video2'
    },
    {
      id: 3,
      name: 'Emma Davis',
      company: 'HealthCare Plus',
      position: 'Marketing Director',
      text: 'Professional, reliable, and innovative. They delivered exactly what we needed and more. Our digital marketing ROI improved by 250% thanks to their strategic approach.',
      rating: 5,
      project: 'Digital Marketing Campaign',
      result: '+250% ROI Improvement',
      image: '/api/placeholder/100/100',
      videoUrl: 'https://example.com/video3'
    },
    {
      id: 4,
      name: 'David Wilson',
      company: 'FoodChain Inc.',
      position: 'Operations Manager',
      text: 'The restaurant management system they built streamlined our operations and reduced costs by 40%. The integration was seamless and the support has been exceptional.',
      rating: 5,
      project: 'Management System',
      result: '40% Cost Reduction',
      image: '/api/placeholder/100/100',
      videoUrl: 'https://example.com/video4'
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      company: 'StartupGrow',
      position: 'Founder',
      text: 'Working with TechSolutions was the best decision we made. They understood our vision and brought it to life. Our user acquisition increased by 400% after the app launch.',
      rating: 5,
      project: 'Startup App',
      result: '+400% User Acquisition',
      image: '/api/placeholder/100/100',
      videoUrl: 'https://example.com/video5'
    },
    {
      id: 6,
      name: 'Robert Brown',
      company: 'FitLife Pro',
      position: 'Founder',
      text: 'The fitness app exceeded all our expectations. The user interface is intuitive, and the backend is robust. We now have over 50,000 active users and growing.',
      rating: 5,
      project: 'Fitness App',
      result: '50K+ Active Users',
      image: '/api/placeholder/100/100',
      videoUrl: 'https://example.com/video6'
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const stats = [
    { number: '98%', label: 'Client Satisfaction' },
    { number: '500+', label: 'Projects Completed' },
    { number: '200+', label: 'Happy Clients' },
    { number: '5+', label: 'Years Experience' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-primary text-white">
        <div className="container-width text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Client <span className="text-accent">Testimonials</span>
          </h1>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Don't just take our word for it – hear what our clients have to say about their experience working with us.
          </p>
        </div>
      </section>

      {/* Featured Testimonial */}
      <section className="section-padding">
        <div className="container-width">
          <div className="max-w-4xl mx-auto">
            <div className="service-card relative">
              <div className="absolute top-6 right-6 text-primary opacity-20">
                <Quote className="w-16 h-16" />
              </div>
              
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-1">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-xl text-muted-foreground mb-6 italic leading-relaxed">
                    "{testimonials[currentTestimonial].text}"
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img 
                        src={testimonials[currentTestimonial].image} 
                        alt={testimonials[currentTestimonial].name}
                        className="w-16 h-16 rounded-full object-cover mr-4"
                      />
                      <div>
                        <div className="font-semibold text-lg">{testimonials[currentTestimonial].name}</div>
                        <div className="text-primary font-medium">{testimonials[currentTestimonial].position}</div>
                        <div className="text-sm text-muted-foreground">{testimonials[currentTestimonial].company}</div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground mb-1">Project:</div>
                      <div className="font-semibold">{testimonials[currentTestimonial].project}</div>
                      <div className="text-primary font-bold">{testimonials[currentTestimonial].result}</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex-shrink-0">
                  <button className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors group">
                    <Play className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-8">
                <button
                  onClick={prevTestimonial}
                  className="flex items-center space-x-2 px-4 py-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Previous</span>
                </button>
                
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentTestimonial ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={nextTestimonial}
                  className="flex items-center space-x-2 px-4 py-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                >
                  <span>Next</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Testimonials Grid */}
      <section className="section-padding bg-muted">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our <span className="text-gradient">Clients Say</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real feedback from real clients who've experienced our services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-muted-foreground mb-4 italic">
                  "{testimonial.text.substring(0, 120)}..."
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                    <div>
                      <div className="font-semibold text-sm">{testimonial.name}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.company}</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xs text-primary font-bold">{testimonial.result}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-gradient">Track Record</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Numbers that speak for themselves
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-primary text-white">
        <div className="container-width text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join Our Success Stories?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Let's create your success story together. Contact us today to get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-accent">
              Get Started Now
            </a>
            <a href="/portfolio" className="btn-outline border-white text-white hover:bg-white hover:text-primary">
              View Our Work
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;