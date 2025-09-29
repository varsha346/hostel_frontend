import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import hostelHero from "@/assets/hostel-hero.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (userType: "student" | "warden") => {
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Store user type and authentication status
    localStorage.setItem("userType", userType);
    localStorage.setItem("isAuthenticated", "true");

    toast({
      title: "Success",
      description: `Logged in successfully as ${userType}`,
    });

    // Navigate to appropriate dashboard
    navigate(userType === "student" ? "/student/dashboard" : "/warden/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Hero Image */}
        <div className="hidden lg:block">
          <img
            src={hostelHero}
            alt="University Hostel"
            className="w-full h-auto rounded-2xl shadow-2xl"
          />
        </div>

        {/* Login Form */}
        <div className="w-full max-w-md mx-auto">
          <Card className="shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Hostel Management
              </CardTitle>
              <CardDescription>
                Sign in to your account to continue
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
                    <Label htmlFor="student-email">Email</Label>
                    <Input
                      id="student-email"
                      type="email"
                      placeholder="student@university.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-password">Password</Label>
                    <Input
                      id="student-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => handleLogin("student")}
                  >
                    Sign in as Student
                  </Button>
                  <div className="text-center">
                    <Button
                      variant="link"
                      onClick={() => navigate("/register")}
                    >
                      Don't have an account? Register
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="warden" className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <Label htmlFor="warden-email">Email</Label>
                    <Input
                      id="warden-email"
                      type="email"
                      placeholder="warden@university.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="warden-password">Password</Label>
                    <Input
                      id="warden-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => handleLogin("warden")}
                  >
                    Sign in as Warden
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}