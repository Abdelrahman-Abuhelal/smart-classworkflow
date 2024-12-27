import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { defaultUsers } from "../services/defaultUsers";

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = defaultUsers.find(u => 
      u.email === formData.email && u.password === formData.password
    );

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      switch (user.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'teacher':
          navigate('/teacher');
          break;
        case 'student':
          navigate('/student');
          break;
      }
    } else {
      alert('Invalid credentials');
    }
  };

  const handleQuickLogin = (userType: 'admin' | 'teacher' | 'student') => {
    const user = defaultUsers.find(u => u.role === userType);
    if (user) {
      setFormData({
        email: user.email,
        password: user.password,
      });
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
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
          </form>

          <div className="mt-6 space-y-2">
            <p className="text-sm text-center text-muted-foreground">Quick Login:</p>
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" onClick={() => handleQuickLogin('admin')}>
                Admin
              </Button>
              <Button variant="outline" onClick={() => handleQuickLogin('teacher')}>
                Teacher
              </Button>
              <Button variant="outline" onClick={() => handleQuickLogin('student')}>
                Student
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 