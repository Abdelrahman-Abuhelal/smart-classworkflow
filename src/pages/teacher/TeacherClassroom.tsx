import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";

const TeacherClassroom = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data - replace with actual API calls later
  const classroom = {
    id,
    name: "Mathematics 101",
    students: 25,
    lessons: [
      { id: 1, title: "Introduction to Algebra", status: "published" },
      { id: 2, title: "Linear Equations", status: "draft" },
    ],
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">{classroom.name}</h1>
            <p className="text-muted-foreground">{classroom.students} Students</p>
          </div>
          <Button onClick={() => navigate("/teacher")}>Back to Dashboard</Button>
        </div>

        <div className="space-y-4">
          <Button className="w-full">Create New Lesson</Button>
          
          <div className="grid md:grid-cols-2 gap-4">
            {classroom.lessons.map((lesson) => (
              <div key={lesson.id} className="border rounded-lg p-4">
                <h3 className="font-semibold">{lesson.title}</h3>
                <p className="text-muted-foreground capitalize">{lesson.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherClassroom;