import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Code, Smartphone, Brain, Database, TrendingUp, Globe } from "lucide-react";

const Internship = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    program: "",
    university: "",
    year: "",
    duration: "",
    cv: null as File | null,
    coverLetter: "",
    experience: "",
    skills: ""
  });

  const internshipPrograms = [
    {
      id: "web-development",
      title: "Web Development",
      description: "Build responsive websites using React, HTML, CSS, and JavaScript",
      icon: <Globe className="w-8 h-8" />
    },
    {
      id: "app-development",
      title: "App Development",
      description: "Create mobile applications for Android and iOS platforms",
      icon: <Smartphone className="w-8 h-8" />
    },
    {
      id: "machine-learning",
      title: "Machine Learning",
      description: "Work with AI algorithms and data models",
      icon: <Brain className="w-8 h-8" />
    },
    {
      id: "python-programming",
      title: "Python Programming",
      description: "Master Python for backend development and automation",
      icon: <Code className="w-8 h-8" />
    },
    {
      id: "data-analytics",
      title: "Data Analytics",
      description: "Analyze data and create insights using statistical methods",
      icon: <Database className="w-8 h-8" />
    },
    {
      id: "digital-marketing",
      title: "Digital Marketing",
      description: "Learn SEO, social media marketing, and online advertising",
      icon: <TrendingUp className="w-8 h-8" />
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, cv: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.program || !formData.cv) {
      toast({
        title: "Error",
        description: "Please fill in all required fields and upload your CV",
        variant: "destructive"
      });
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("program", formData.program);
    data.append("university", formData.university);
    data.append("year_of_study", formData.year);
    data.append("duration", formData.duration);
    data.append("resume", formData.cv); // file
    data.append("skills", formData.skills);
    data.append("experience", formData.experience);
    data.append("cover_letter", formData.coverLetter);

    try {
      const res = await fetch("http://localhost:3001/api/internship_submissions", {
        method: "POST",
        body: data
      });

      if (res.ok) {
        toast({
          title: "Application Submitted!",
          description: "Your internship application has been received. We'll contact you soon!",
        });
        navigate("/thank-you?type=internship");
      } else {
        const err = await res.json();
        toast({
          title: "Submission Failed",
          description: err.message || "Something went wrong. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Network error. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="section-padding">
      <div className="container-width">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Launch Your Career with Our{" "}
            <span className="text-gradient">Internship Programs</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Gain real-world experience in cutting-edge technologies and kickstart your career 
            in tech with hands-on projects and mentorship from industry experts.
          </p>
        </div>

        {/* Internship Programs */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {internshipPrograms.map((program) => (
            <Card key={program.id} className="service-card group">
              <CardHeader className="text-center">
                <div className="mb-4 text-primary mx-auto group-hover:scale-110 transition-transform duration-300">
                  {program.icon}
                </div>
                <CardTitle className="text-xl mb-2">{program.title}</CardTitle>
                <CardDescription>{program.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Application Form */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Apply for Internship</CardTitle>
            <CardDescription className="text-center">
              Fill out the form below to apply for our internship program
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="program">Internship Program *</Label>
                  <Select onValueChange={(value) => handleSelectChange("program", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select a program" />
                    </SelectTrigger>
                    <SelectContent>
                      {internshipPrograms.map((program) => (
                        <SelectItem key={program.id} value={program.id}>
                          {program.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Academic Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="university">University/College</Label>
                  <Input
                    id="university"
                    name="university"
                    value={formData.university}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="year">Year of Study</Label>
                  <Select onValueChange={(value) => handleSelectChange("year", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1st">1st Year</SelectItem>
                      <SelectItem value="2nd">2nd Year</SelectItem>
                      <SelectItem value="3rd">3rd Year</SelectItem>
                      <SelectItem value="4th">4th Year</SelectItem>
                      <SelectItem value="graduate">Graduate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="duration">Preferred Duration</Label>
                <Select onValueChange={(value) => handleSelectChange("duration", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-month">1 Month</SelectItem>
                    <SelectItem value="2-months">2 Months</SelectItem>
                    <SelectItem value="3-months">3 Months</SelectItem>
                    <SelectItem value="6-months">6 Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* CV Upload */}
              <div>
                <Label htmlFor="cv">Upload CV/Resume *</Label>
                <Input
                  id="cv"
                  name="resume"
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  required
                  className="mt-1"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Accepted formats: PDF, DOC, DOCX (Max size: 5MB)
                </p>
              </div>

              {/* Additional Information */}
              <div>
                <Label htmlFor="skills">Technical Skills</Label>
                <Textarea
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  placeholder="List your technical skills and programming languages"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="experience">Previous Experience</Label>
                <Textarea
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="Describe any relevant experience, projects, or achievements"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="coverLetter">Cover Letter</Label>
                <Textarea
                  id="coverLetter"
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  placeholder="Tell us why you're interested in this internship and what you hope to learn"
                  className="mt-1"
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full btn-primary">
                Submit Application
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Internship;