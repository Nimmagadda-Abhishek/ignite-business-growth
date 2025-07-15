import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Eye, Heart, Users, Award, Zap } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Innovation',
      description: 'We stay ahead of the curve with cutting-edge technologies and creative solutions.'
    },
    {
      icon: Eye,
      title: 'Transparency',
      description: 'Clear communication and honest pricing with no hidden surprises.'
    },
    {
      icon: Heart,
      title: 'Client-First',
      description: 'Your success is our priority. We go above and beyond to deliver results.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We work closely with you throughout the entire development process.'
    },
    {
      icon: Award,
      title: 'Quality',
      description: 'Rigorous testing and quality assurance ensure exceptional deliverables.'
    },
    {
      icon: Zap,
      title: 'Efficiency',
      description: 'Fast turnaround times without compromising on quality or attention to detail.'
    }
  ];

  const team = [
    {
      name: 'John Smith',
      role: 'CEO & Founder',
      description: 'Full-stack developer with 10+ years experience in building scalable solutions.',
      image: '/api/placeholder/300/300'
    },
    {
      name: 'Sarah Johnson',
      role: 'Lead Designer',
      description: 'Creative director specializing in user experience and interface design.',
      image: '/api/placeholder/300/300'
    },
    {
      name: 'Mike Chen',
      role: 'Senior Developer',
      description: 'Expert in mobile app development and cloud infrastructure.',
      image: '/api/placeholder/300/300'
    },
    {
      name: 'Emily Davis',
      role: 'Marketing Director',
      description: 'Digital marketing strategist with expertise in growth hacking.',
      image: '/api/placeholder/300/300'
    }
  ];

  const milestones = [
    {
      year: '2019',
      title: 'Company Founded',
      description: 'Started with a vision to help businesses succeed digitally'
    },
    {
      year: '2020',
      title: '100+ Projects',
      description: 'Reached our first major milestone of completed projects'
    },
    {
      year: '2021',
      title: 'Team Expansion',
      description: 'Grew to a team of 15+ skilled professionals'
    },
    {
      year: '2022',
      title: 'Global Reach',
      description: 'Expanded services to clients across 20+ countries'
    },
    {
      year: '2023',
      title: 'Industry Recognition',
      description: 'Received multiple awards for innovation and client satisfaction'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-primary text-white">
        <div className="container-width text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-accent">TechSolutions</span>
          </h1>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            We're a passionate team of digital experts dedicated to helping businesses thrive in the modern world.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our <span className="text-gradient">Mission</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                At TechSolutions, we believe every business deserves access to world-class digital solutions. 
                Our mission is to democratize technology by making enterprise-level web development, mobile apps, 
                and digital marketing accessible to businesses of all sizes.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                We're not just service providers – we're your digital transformation partners, committed to 
                understanding your unique challenges and delivering solutions that drive real business results.
              </p>
              <Link to="/contact" className="btn-primary">
                Work With Us
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
            <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Driven by Purpose</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-muted">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-gradient">Values</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="service-card text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet Our <span className="text-gradient">Team</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The talented individuals behind your success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="service-card text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-28 h-28 rounded-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding bg-muted">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-gradient">Journey</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Key milestones in our growth story
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-primary"></div>
              
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="service-card">
                      <div className="text-2xl font-bold text-primary mb-2">{milestone.year}</div>
                      <h3 className="text-lg font-semibold mb-2">{milestone.title}</h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg z-10"></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-primary text-white">
        <div className="container-width text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Work Together?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Let's discuss how we can help transform your business with our digital solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-accent">
              Start Your Project
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link to="/services" className="btn-outline border-white text-white hover:bg-white hover:text-primary">
              View Our Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;