import React, { useState } from 'react';
import { ExternalLink, Code, Smartphone, TrendingUp, Filter } from 'lucide-react';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      category: 'web',
      client: 'RetailMax',
      description: 'Custom e-commerce solution that increased sales by 250%',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: '/api/placeholder/600/400',
      results: '+250% Sales Increase',
      link: 'https://example.com'
    },
    {
      id: 2,
      title: 'HealthCare Mobile App',
      category: 'app',
      client: 'MedTech Solutions',
      description: 'HIPAA-compliant mobile app for patient management',
      technologies: ['React Native', 'Firebase', 'Node.js'],
      image: '/api/placeholder/600/400',
      results: '10K+ Downloads',
      link: 'https://example.com'
    },
    {
      id: 3,
      title: 'Digital Marketing Campaign',
      category: 'marketing',
      client: 'StartupGrow',
      description: 'Multi-channel marketing campaign for B2B SaaS',
      technologies: ['Google Ads', 'Facebook Ads', 'SEO', 'Content Marketing'],
      image: '/api/placeholder/600/400',
      results: '300% Lead Increase',
      link: 'https://example.com'
    },
    {
      id: 4,
      title: 'Restaurant Management System',
      category: 'web',
      client: 'FoodChain Inc.',
      description: 'Complete restaurant management and ordering system',
      technologies: ['Vue.js', 'Laravel', 'MySQL', 'PWA'],
      image: '/api/placeholder/600/400',
      results: '40% Cost Reduction',
      link: 'https://example.com'
    },
    {
      id: 5,
      title: 'Fitness Tracking App',
      category: 'app',
      client: 'FitLife Pro',
      description: 'Cross-platform fitness app with wearable integration',
      technologies: ['Flutter', 'Dart', 'Firebase', 'HealthKit'],
      image: '/api/placeholder/600/400',
      results: '50K+ Active Users',
      link: 'https://example.com'
    },
    {
      id: 6,
      title: 'Brand Transformation',
      category: 'marketing',
      client: 'TechCorp',
      description: 'Complete brand overhaul and digital presence',
      technologies: ['Brand Strategy', 'Social Media', 'Content Marketing', 'PR'],
      image: '/api/placeholder/600/400',
      results: '400% Brand Awareness',
      link: 'https://example.com'
    }
  ];

  const filters = [
    { key: 'all', label: 'All Projects', icon: Filter },
    { key: 'web', label: 'Web Development', icon: Code },
    { key: 'app', label: 'App Development', icon: Smartphone },
    { key: 'marketing', label: 'Digital Marketing', icon: TrendingUp }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-primary text-white">
        <div className="container-width text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="text-accent">Portfolio</span>
          </h1>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Discover the successful projects we've delivered for businesses across various industries
          </p>
        </div>
      </section>

      {/* Portfolio Content */}
      <section className="section-padding">
        <div className="container-width">
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all ${
                  activeFilter === filter.key
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-muted text-muted-foreground hover:bg-primary/10'
                }`}
              >
                <filter.icon className="w-5 h-5" />
                <span>{filter.label}</span>
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="portfolio-card group">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-semibold">{project.results}</span>
                        <a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <span className="text-sm text-primary font-medium">{project.client}</span>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-muted">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-gradient">Impact</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Numbers that speak for themselves
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'Projects Delivered', description: 'Successfully completed projects' },
              { number: '200+', label: 'Happy Clients', description: 'Satisfied customers worldwide' },
              { number: '99%', label: 'Success Rate', description: 'Project completion rate' },
              { number: '24/7', label: 'Support', description: 'Round-the-clock assistance' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-lg font-semibold mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-primary text-white">
        <div className="container-width text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Let's create something amazing together. Contact us to discuss your vision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
            <a href="/contact" className="btn-accent inline-flex items-center">
              Start Your Project
            </a>
            <a href="/services" className="btn-outline border-white text-white hover:bg-white hover:text-primary inline-flex items-center">
              View Our Services
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;