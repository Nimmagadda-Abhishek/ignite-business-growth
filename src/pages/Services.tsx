import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Code, 
  Smartphone, 
  TrendingUp, 
  Globe, 
  ShoppingCart, 
  Search,
  PenTool,
  Shield,
  Zap,
  Users,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      id: 'web',
      icon: Code,
      title: 'Web Development',
      description: 'Custom websites that drive results and engage your audience',
      features: [
        'Responsive Design',
        'SEO Optimization',
        'Fast Loading Speed',
        'Security Implementation',
        'CMS Integration',
        'API Development'
      ],
      technologies: ['React', 'Node.js', 'WordPress', 'Shopify', 'Laravel', 'Python'],
      pricing: 'Starting from $2,999',
      deliveryTime: '2-6 weeks'
    },
    {
      id: 'app',
      icon: Smartphone,
      title: 'App Development',
      description: 'Native and cross-platform mobile apps that users love',
      features: [
        'iOS & Android Development',
        'Cross-Platform Solutions',
        'UI/UX Design',
        'Push Notifications',
        'Offline Functionality',
        'App Store Optimization'
      ],
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'AWS'],
      pricing: 'Starting from $4,999',
      deliveryTime: '3-8 weeks'
    },
    {
      id: 'marketing',
      icon: TrendingUp,
      title: 'Digital Marketing',
      description: 'Strategic marketing campaigns that boost your online presence',
      features: [
        'Social Media Management',
        'Google Ads & PPC',
        'SEO & Content Marketing',
        'Email Marketing',
        'Analytics & Reporting',
        'Brand Strategy'
      ],
      technologies: ['Google Analytics', 'Facebook Ads', 'Google Ads', 'Mailchimp', 'HubSpot', 'SEMrush'],
      pricing: 'Starting from $1,999/month',
      deliveryTime: 'Results in 1-3 months'
    }
  ];

  const additionalServices = [
    {
      icon: Globe,
      title: 'Domain & Hosting',
      description: 'Reliable hosting solutions and domain management'
    },
    {
      icon: ShoppingCart,
      title: 'E-commerce Solutions',
      description: 'Complete online store development and management'
    },
    {
      icon: Search,
      title: 'SEO Services',
      description: 'Improve your search engine rankings and visibility'
    },
    {
      icon: PenTool,
      title: 'UI/UX Design',
      description: 'Beautiful, user-friendly designs that convert'
    },
    {
      icon: Shield,
      title: 'Security & Maintenance',
      description: 'Keep your digital assets secure and up-to-date'
    },
    {
      icon: Zap,
      title: 'Performance Optimization',
      description: 'Speed up your website and improve user experience'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Discovery',
      description: 'We understand your business needs and goals'
    },
    {
      step: '02',
      title: 'Planning',
      description: 'Create a detailed project roadmap and timeline'
    },
    {
      step: '03',
      title: 'Design',
      description: 'Develop wireframes and visual designs'
    },
    {
      step: '04',
      title: 'Development',
      description: 'Build your solution using best practices'
    },
    {
      step: '05',
      title: 'Testing',
      description: 'Rigorous testing across all devices and browsers'
    },
    {
      step: '06',
      title: 'Launch',
      description: 'Deploy your project and provide ongoing support'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-primary text-white">
        <div className="container-width text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="text-accent">Services</span>
          </h1>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Comprehensive IT solutions designed to help your business succeed in the digital world
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="section-padding">
        <div className="container-width">
          <div className="space-y-20">
            {services.map((service, index) => (
              <div key={service.id} className={`flex flex-col lg:flex-row items-center gap-12 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="flex-1">
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                  <p className="text-xl text-muted-foreground mb-6">{service.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-primary mr-3" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.technologies.map((tech, idx) => (
                      <span key={idx} className="px-3 py-1 bg-muted rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-6 mb-6">
                    <div>
                      <div className="font-semibold text-primary">{service.pricing}</div>
                      <div className="text-sm text-muted-foreground">Investment</div>
                    </div>
                    <div>
                      <div className="font-semibold">{service.deliveryTime}</div>
                      <div className="text-sm text-muted-foreground">Timeline</div>
                    </div>
                  </div>

                  <Link 
                    to="/contact" 
                    className="btn-primary inline-flex items-center"
                  >
                    Get Quote for {service.title}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </div>
                
                <div className="flex-1">
                  <div className="service-card">
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center">
                      <service.icon className="w-24 h-24 text-primary" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="section-padding bg-muted">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Additional <span className="text-gradient">Services</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive solutions to support every aspect of your digital presence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <div key={index} className="service-card">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <Link 
                  to="/contact" 
                  className="text-primary hover:text-primary-hover font-medium flex items-center"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-gradient">Process</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A proven methodology that ensures successful project delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-primary text-white">
        <div className="container-width text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Schedule a free consultation to discuss your project requirements
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
            <Link to="/contact" className="btn-accent inline-flex items-center">
              Schedule Consultation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link to="/portfolio" className="btn-outline border-white text-white hover:bg-white hover:text-primary inline-flex items-center">
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;