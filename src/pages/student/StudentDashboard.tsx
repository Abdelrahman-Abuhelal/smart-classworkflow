import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();
  
  // Mock data - replace with actual API calls later
  const lessons = [
    { id: 1, title: "Introduction to Algebra", subject: "Mathematics" },
    { id: 2, title: "Newton's Laws", subject: "Physics" },
    { id: 3, title: "Periodic Table", subject: "Chemistry" },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          <Button onClick={() => navigate("/student/profile")}>My Profile</Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <Card key={lesson.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{lesson.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Subject: {lesson.subject}
                </p>
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