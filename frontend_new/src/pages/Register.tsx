import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    studentId: "",
    phone: "",
  });
  const navigate = useNavigate();

  const handleRegister = (userType: "student" | "warden") => {
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Registration successful! Please login to continue.",
    });

    navigate("/login");
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Create Account
          </CardTitle>
          <CardDescription>
            Register for hostel management system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="student" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="warden">Warden</TabsTrigger>
            </TabsList>

            <TabsContent value="student" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="student-name">Full Name *</Label>
                <Input
                  id="student-name"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => updateFormData("fullName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="student-id">Student ID</Label>
                <Input
                  id="student-id"
                  placeholder="STU2024001"
                  value={formData.studentId}
                  onChange={(e) => updateFormData("studentId", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="student-email">Email *</Label>
                <Input
                  id="student-email"
                  type="email"
                  placeholder="student@university.edu"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="student-phone">Phone Number</Label>
                <Input
                  id="student-phone"
                  placeholder="+1234567890"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="student-password">Password *</Label>
                <Input
                  id="student-password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => updateFormData("password", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="student-confirm">Confirm Password *</Label>
                <Input
                  id="student-confirm"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                />
              </div>
              <Button
                className="w-full"
                onClick={() => handleRegister("student")}
              >
                Register as Student
              </Button>
            </TabsContent>

            <TabsContent value="warden" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="warden-name">Full Name *</Label>
                <Input
                  id="warden-name"
                  placeholder="Jane Smith"
                  value={formData.fullName}
                  onChange={(e) => updateFormData("fullName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="warden-email">Email *</Label>
                <Input
                  id="warden-email"
                  type="email"
                  placeholder="warden@university.edu"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="warden-phone">Phone Number</Label>
                <Input
                  id="warden-phone"
                  placeholder="+1234567890"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="warden-password">Password *</Label>
                <Input
                  id="warden-password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => updateFormData("password", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="warden-confirm">Confirm Password *</Label>
                <Input
                  id="warden-confirm"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                />
              </div>
              <Button
                className="w-full"
                onClick={() => handleRegister("warden")}
              >
                Register as Warden
              </Button>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-4">
            <Button
              variant="link"
              onClick={() => navigate("/login")}
            >
              Already have an account? Sign in
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}