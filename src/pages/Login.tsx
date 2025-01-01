import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StorageService } from "../services/storageService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const user = StorageService.getUserByEmail(formData.email);

    if (!user || user.password !== formData.password) {
      toast({
        title: "Error",
        description: "Invalid email or password",
        variant: "destructive",
      });
      return;
    }

    StorageService.setCurrentUser(user);
    navigate(`/${user.role}`);
  };

  const quickLogin = (role: 'admin' | 'teacher' | 'student') => {
    const credentials = {
      admin: { email: 'admin@gmail.com', password: 'admin' },
      teacher: { email: 'teacher@gmail.com', password: 'teacher' },
      student: { email: 'abd2@gmail.com', password: 'abd2' },
    };

    setFormData(credentials[role]);
  };

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <Button type="submit" className="w-full">Login</Button>

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Button variant="link" className="p-0" onClick={() => navigate('/signup')}>
                Sign Up
              </Button>
            </p>
          </form>

          <div className="mt-6">
            <Separator className="my-4" />
            <div className="space-y-2">
              <p className="text-sm text-center text-muted-foreground">Quick Login:</p>
              <div className="grid grid-cols-3 gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => quickLogin('admin')}
                  className="text-sm"
                >
                  Admin
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => quickLogin('teacher')}
                  className="text-sm"
                >
                  Teacher
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => quickLogin('student')}
                  className="text-sm"
                >
                  Student
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 