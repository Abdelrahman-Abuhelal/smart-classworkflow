import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LessonView = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data - replace with actual API calls later
  const lesson = {
    id,
    title: "Introduction to Algebra",
    content: "Algebra is a branch of mathematics dealing with symbols and the rules for manipulating those symbols...",
    materials: [
      { id: 1, title: "Algebra Basics PDF", type: "pdf" },
      { id: 2, title: "Practice Problems", type: "pdf" },
      { id: 3, title: "Video Tutorial", type: "video" },
    ],
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{lesson.title}</h1>
          <Button onClick={() => navigate("/student")}>Back to Dashboard</Button>
        </div>

        <Tabs defaultValue="lesson" className="space-y-4">
          <TabsList>
            <TabsTrigger value="lesson">Lesson</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
          </TabsList>

          <TabsContent value="lesson" className="space-y-4">
            <div className="prose max-w-none">
              <p>{lesson.content}</p>
            </div>
          </TabsContent>

          <TabsContent value="materials" className="space-y-4">
            {lesson.materials.map((material) => (
              <div key={material.id} className="flex items-center justify-between p-4 border rounded-lg">
                <span>{material.title}</span>
                <Button>View {material.type.toUpperCase()}</Button>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="quiz" className="space-y-4">
            <p className="text-muted-foreground">No quiz available for this lesson yet.</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LessonView;