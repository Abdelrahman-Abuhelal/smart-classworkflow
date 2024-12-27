import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>, role: string) => {
    e.preventDefault();
    toast({
      title: "Logging in",
      description: `Welcome to the ${role} portal!`,
    });
    navigate(`/${role.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-purple-800 dark:text-purple-400 mb-4">Smart School System</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">Empowering Education Through Technology</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Teacher Card */}
          <Card className="hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-purple-700 dark:text-purple-400">Teacher Portal</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                Manage your classes and create engaging lessons
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Enter as Teacher
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Teacher Login</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={(e) => handleLogin(e, "teacher")} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="teacher-email">Email</Label>
                      <Input id="teacher-email" type="email" placeholder="teacher@school.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="teacher-password">Password</Label>
                      <Input id="teacher-password" type="password" required />
                    </div>
                    <Button type="submit" className="w-full">Login</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Student Card */}
          <Card className="hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-purple-700 dark:text-purple-400">Student Portal</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                Access your lessons and track your progress
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Enter as Student
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Student Login</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={(e) => handleLogin(e, "student")} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="student-email">Email</Label>
                      <Input id="student-email" type="email" placeholder="student@school.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="student-password">Password</Label>
                      <Input id="student-password" type="password" required />
                    </div>
                    <Button type="submit" className="w-full">Login</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Admin Card */}
          <Card className="hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-purple-700 dark:text-purple-400">Admin Portal</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                Manage system settings and user accounts
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Enter as Admin
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Admin Login</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={(e) => handleLogin(e, "admin")} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="admin-email">Email</Label>
                      <Input id="admin-email" type="email" placeholder="admin@school.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="admin-password">Password</Label>
                      <Input id="admin-password" type="password" required />
                    </div>
                    <Button type="submit" className="w-full">Login</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>

        <footer className="mt-12 text-center text-gray-600 dark:text-gray-400">
          <p>© 2024 Smart School System. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;