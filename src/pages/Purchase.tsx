import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Textarea } from "@/components/ui/textarea";
import { Upload, X, Camera, CreditCard } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
}

const Purchase = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [formData, setFormData] = useState({
    petName: "",
    specialRequests: "",
    contactEmail: "",
    contactName: "",
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const id = Math.random().toString(36).substring(7);
        const preview = URL.createObjectURL(file);
        
        setUploadedFiles(prev => [...prev, { id, file, preview }]);
      }
    });
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => {
      const fileToRemove = prev.find(f => f.id === id);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter(f => f.id !== id);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (uploadedFiles.length === 0) {
      toast({
        title: "Photos required",
        description: "Please upload at least one photo of your pet.",
        variant: "destructive"
      });
      return;
    }

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

    // Here you would typically process the order and integrate with Stripe
    toast({
      title: "Commission request received!",
      description: "I'll review your photos and send you a custom quote within 24 hours.",
    });

    // Reset form and generate new math question
    setFormData({
      petName: "",
      specialRequests: "",
      contactEmail: "",
      contactName: "",
      honeypot: "",
      mathAnswer: ""
    });
    setMathQuestion(() => {
      const num1 = Math.floor(Math.random() * 10) + 1;
      const num2 = Math.floor(Math.random() * 10) + 1;
      return { num1, num2, answer: num1 + num2 };
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };



  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Commission Your Portrait
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Upload your pet's photos and tell me about your vision. I'll create a beautiful, custom portrait that captures their unique personality.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Photo Upload Section */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-accent" />
                  Upload Pet Photos
                </CardTitle>
                <CardDescription>
                  Upload multiple high-quality photos of your pet. The more angles and expressions, the better!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Upload Area */}
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-accent transition-colors">
                    <Input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <Label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-lg font-medium text-foreground mb-2">
                        Click to upload photos
                      </p>
                      <p className="text-sm text-muted-foreground">
                        PNG, JPG up to 10MB each
                      </p>
                    </Label>
                  </div>

                  {/* Uploaded Files Grid */}
                  {uploadedFiles.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {uploadedFiles.map(({ id, preview, file }) => (
                        <div key={id} className="relative group">
                          <img
                            src={preview}
                            alt={file.name}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeFile(id)}
                            className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Order Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle>Portrait Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="petName">Pet's Name</Label>
                    <Input
                      id="petName"
                      value={formData.petName}
                      onChange={(e) => handleChange("petName", e.target.value)}
                      placeholder="Fluffy"
                      required
                    />
                  </div>





                  <div className="space-y-2">
                    <Label htmlFor="specialRequests">Special Requests</Label>
                    <Textarea
                      id="specialRequests"
                      value={formData.specialRequests}
                      onChange={(e) => handleChange("specialRequests", e.target.value)}
                      placeholder="Any specific details, background preferences, or special elements you'd like included..."
                      className="min-h-[100px]"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Your Name</Label>
                    <Input
                      id="contactName"
                      value={formData.contactName}
                      onChange={(e) => handleChange("contactName", e.target.value)}
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Email Address</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => handleChange("contactEmail", e.target.value)}
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4 mt-6">
                    <h3 className="font-semibold text-foreground mb-2">What happens next?</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• I'll review your photos and requirements</li>
                      <li>• You'll receive a custom quote within 24 hours</li>
                      <li>• 50% deposit required to start</li>
                      <li>• Completion in 1-2 weeks</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
             </div>

             {/* Anti-bot measures */}
             <Card className="shadow-elegant">
               <CardContent className="pt-6">
                 <div className="space-y-4">
                   <div className="space-y-2">
                     <Label htmlFor="mathQuestion">Security Question: What is {mathQuestion.num1} + {mathQuestion.num2}?</Label>
                     <Input
                       id="mathAnswer"
                       name="mathAnswer"
                       type="number"
                       value={formData.mathAnswer}
                       onChange={(e) => handleChange("mathAnswer", e.target.value)}
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
                       onChange={(e) => handleChange("honeypot", e.target.value)}
                       tabIndex={-1}
                       autoComplete="off"
                     />
                   </div>
                 </div>
               </CardContent>
             </Card>

             {/* Submit Button */}
             <div className="text-center">
               <Button type="submit" variant="hero" size="lg" className="min-w-[200px]">
                 <CreditCard className="w-5 h-5 mr-2" />
                 Request Custom Quote
               </Button>
               <p className="text-sm text-muted-foreground mt-4">
                 No payment required now. You'll receive a quote first.
               </p>
             </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Purchase;