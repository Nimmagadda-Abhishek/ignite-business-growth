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
      name: 'Peyyala satish chandra',
      role: 'CEO & Founder',
      image: 'https://media.licdn.com/dms/image/v2/D5603AQHEAJzmtbsIQQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1722711320674?e=1758153600&v=beta&t=ASv1XrEXHO02Hzj5GjYrD1Vzyj6I5-hN4xPIlzWsNu0'
    },
    {
      name: 'Lalitha Devaraya',
      role: 'HR & project manager',
      image: 'https://media.licdn.com/dms/image/v2/D4D03AQG5ueQzvytoww/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1725954059196?e=1758153600&v=beta&t=1qsGsGOGaMuGlnfbQus-znb1doefJJNHPgHMxGw-Unc'
    },
    {
      name: 'Nimmagadda Abhishek',
      role: 'Developer',
      image: 'https://media.licdn.com/dms/image/v2/D5603AQHLkiML0bYOug/profile-displayphoto-crop_800_800/B56ZgPBnBNGUAQ-/0/1752598739464?e=1758153600&v=beta&t=jA6dr6CrORIEnV19lAmKrD1whNKCUmCNDxZty1bF3hQ'
    },
    {
      name: 'Prudhvi Rao',
      role: 'General Manager',
      image: 'https://ik.imagekit.io/ya7vx4agl/New%20Folder/WhatsApp%20Image%202025-07-15%20at%2022.22.39_7d40c113.jpg?updatedAt=1752599277384'
    },
    {
      name: 'Siddhu',
      role: 'Managing Director',
      image: 'https://ik.imagekit.io/ya7vx4agl/New%20Folder/cropped_circle_image.png?updatedAt=1752604967530'
    }
  ];

  const milestones = [
    {
      year: '2025',
      title: 'Company Founded',
      description: 'Started with a vision to help businesses succeed digitally'
    },
    {
      year: '2025',
      title: '1st Project',
      description: 'Reached our first milestone of completed project'
    },
    {
      year: '2025',
      title: 'Team Expansion',
      description: 'Grew to a team of skilled professionals'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-primary text-white">
        <div className="container-width text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-accent">Asian Digital World</span>
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
                At Asian Digital World, we believe every business deserves access to world-class digital solutions. 
                Our mission is to democratize technology by making enterprise-level web development, mobile apps, 
                and digital marketing accessible to businesses of all sizes.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                We're not just service providers – we're your digital transformation partners, committed to 
                understanding your unique challenges and delivering solutions that drive real business results.
              </p>
              {/* Fix: Wrap the button in a flex container for alignment */}
              <div className="flex flex-row flex-wrap gap-4 items-center mt-4">
                <Link to="/contact" className="btn-primary inline-flex items-center">
                  Work With Us
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
            <div className="aspect-video rounded-2xl flex items-center justify-center overflow-hidden">
              <img 
                src="https://tse2.mm.bing.net/th/id/OIP.vUr1vtmB0qRtsV4YQ013ZgHaE5?rs=1&pid=ImgDetMain&o=7&rm=3"
                alt="Our Mission"
                className="w-full h-full object-cover"
              />
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

          <div className="flex flex-row flex-nowrap gap-4 overflow-x-auto justify-center items-stretch py-2">
            {team.map((member, index) => (
              <div key={index} className="service-card text-center p-9 md:p-10 lg:p-10 w-80 md:w-72 lg:w-64 mx-auto shadow-sm bg-white rounded-lg">
                <div className="w-36 h-36 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full mx-auto mb-5 flex items-center justify-center">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                </div>
                <h3 className="text-base font-semibold mb-1">{member.name}</h3>
                <p className="text-xs text-primary font-medium mb-1">{member.role}</p>
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
            <Link to="/contact" className="btn-accent inline-flex items-center">
              Start Your Project
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link to="/services" className="btn-outline border-white text-white hover:bg-white hover:text-primary inline-flex items-center">
              View Our Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;