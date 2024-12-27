import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Navbar } from '../../components/layout/Navbar';

interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
}

export const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [lessons, setLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    const storedLessons = JSON.parse(localStorage.getItem("lessons") || "[]");
    setLessons(storedLessons);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <div>
      <Navbar portalType="Student" />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <Card key={lesson.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{lesson.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{lesson.description}</p>
                <Button 
                  className="w-full"
                  onClick={() => navigate(`/student/lesson/${lesson.id}`)}
                >
                  View Lesson
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;