import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Mail, Phone, MessageSquare } from "lucide-react";

const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "contact";

  const content = {
    contact: {
      title: "Thank You for Contacting Us!",
      description: "We've received your message and will get back to you within 24 hours.",
      details: [
        "Our team will review your inquiry carefully",
        "You'll receive a confirmation email shortly",
        "We'll contact you with next steps soon"
      ]
    },
    internship: {
      title: "Application Submitted Successfully!",
      description: "Thank you for applying to our internship program. We're excited to review your application!",
      details: [
        "Your application has been received and is being reviewed",
        "You'll receive an email confirmation shortly",
        "Our team will contact you within 5-7 business days",
        "We'll schedule an interview if your profile matches our requirements"
      ]
    }
  };

  const currentContent = content[type as keyof typeof content];

  return (
    <div className="section-padding">
      <div className="container-width">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="service-card">
            <CardHeader>
              <div className="mx-auto mb-6 text-green-500">
                <CheckCircle className="w-16 h-16" />
              </div>
              <CardTitle className="text-3xl mb-4">
                {currentContent.title}
              </CardTitle>
              <CardDescription className="text-lg">
                {currentContent.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-left">
                <h3 className="font-semibold text-lg mb-4">What happens next?</h3>
                <ul className="space-y-2">
                  {currentContent.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold text-lg mb-4">Need immediate assistance?</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-primary" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-primary" />
                    <span>info@company.com</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    <span>WhatsApp Chat</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button asChild className="btn-primary">
                  <Link to="/">Back to Home</Link>
                </Button>
                {type === "contact" && (
                  <Button asChild variant="outline">
                    <Link to="/services">View Our Services</Link>
                  </Button>
                )}
                {type === "internship" && (
                  <Button asChild variant="outline">
                    <Link to="/internship">Back to Internships</Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;