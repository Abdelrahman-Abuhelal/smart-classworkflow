import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  
  // Mock data - replace with actual API calls later
  const classrooms = [
    { id: 1, name: "Mathematics 101", students: 25 },
    { id: 2, name: "Physics Advanced", students: 20 },
    { id: 3, name: "Chemistry Basics", students: 30 },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
          <Button onClick={() => navigate("/teacher/profile")}>My Profile</Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classrooms.map((classroom) => (
            <Card key={classroom.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{classroom.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {classroom.students} Students
                </p>
                <Button 
                  className="w-full"
                  onClick={() => navigate(`/teacher/classroom/${classroom.id}`)}
                >
                  Enter Classroom
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;