import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MessageCircle, Clock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "", // Hidden field for bot detection
    mathAnswer: ""
  });

  // Generate a simple math question
  const [mathQuestion, setMathQuestion] = useState(() => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    return { num1, num2, answer: num1 + num2 };
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Anti-bot validation
    if (formData.honeypot.trim() !== "") {
      toast({
        title: "Error",
        description: "Form submission blocked. Please try again.",
        variant: "destructive"
      });
      return;
    }

    if (parseInt(formData.mathAnswer) !== mathQuestion.answer) {
      toast({
        title: "Incorrect answer",
        description: "Please solve the math question correctly.",
        variant: "destructive"
      });
      return;
    }

    // Security prompt before submission
    const confirmed = window.confirm(
      "Are you sure you want to send this message? Please verify your information is correct before proceeding."
    );

    if (!confirmed) {
      return;
    }

    // Send email using EmailJS
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'info@artbymaral.com'
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon!",
      });
    } catch (error) {
      console.error('Email send failed:', error);
      toast({
        title: "Error sending message",
        description: "There was a problem sending your message. Please try again later.",
        variant: "destructive"
      });
      return; // Don't reset form if email failed
    }

    // Reset form and generate new math question
    setFormData({ name: "", email: "", subject: "", message: "", honeypot: "", mathAnswer: "" });
    setMathQuestion(() => {
      const num1 = Math.floor(Math.random() * 10) + 1;
      const num2 = Math.floor(Math.random() * 10) + 1;
      return { num1, num2, answer: num1 + num2 };
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to commission a beautiful portrait of your beloved pet? Let's discuss your vision together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-accent" />
                  Send a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and I'll respond within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Pet portrait commission"
                      required
                    />
                  </div>
                  
                   <div className="space-y-2">
                     <Label htmlFor="message">Message</Label>
                     <Textarea
                       id="message"
                       name="message"
                       value={formData.message}
                       onChange={handleChange}
                       placeholder="Tell me about your pet and what you have in mind for the portrait..."
                       className="min-h-[120px]"
                       required
                     />
                   </div>

                   {/* Anti-bot measures */}
                   <div className="space-y-2">
                     <Label htmlFor="mathQuestion">Security Question: What is {mathQuestion.num1} + {mathQuestion.num2}?</Label>
                     <Input
                       id="mathAnswer"
                       name="mathAnswer"
                       type="number"
                       value={formData.mathAnswer}
                       onChange={handleChange}
                       placeholder="Enter the sum"
                       required
                     />
                   </div>

                   {/* Honeypot field - hidden from users but visible to bots */}
                   <div className="hidden">
                     <Label htmlFor="honeypot">Leave this field empty</Label>
                     <Input
                       id="honeypot"
                       name="honeypot"
                       value={formData.honeypot}
                       onChange={handleChange}
                       tabIndex={-1}
                       autoComplete="off"
                     />
                   </div>

                   <Button type="submit" variant="hero" className="w-full">
                     Send Message
                   </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-accent" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Email</h3>
                    <p className="text-muted-foreground">info@artbymaral.com</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Response Time</h3>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>Usually within 24 hours</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle>Commission Process</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xs font-semibold">1</span>
                      <span>Contact me with your pet's photos and vision</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xs font-semibold">2</span>
                      <span>Receive a custom quote and timeline</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xs font-semibold">3</span>
                      <span>50% deposit to begin the artwork</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xs font-semibold">4</span>
                      <span>Receive progress updates and final artwork</span>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;