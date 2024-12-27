import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LessonForm } from "@/components/LessonForm";
import { useState, useEffect } from "react";
import { Edit, Trash, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
}

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);

  const loadLessons = () => {
    const storedLessons = JSON.parse(localStorage.getItem("lessons") || "[]");
    setLessons(storedLessons);
  };

  useEffect(() => {
    loadLessons();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const handleDelete = (id: string) => {
    const updatedLessons = lessons.filter(lesson => lesson.id !== id);
    localStorage.setItem("lessons", JSON.stringify(updatedLessons));
    setLessons(updatedLessons);
    toast({
      title: "Success",
      description: "Lesson deleted successfully",
    });
  };

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingLesson) return;

    const formData = new FormData(e.currentTarget);
    const updatedLesson = {
      ...editingLesson,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      content: formData.get("content") as string,
    };

    const updatedLessons = lessons.map(lesson =>
      lesson.id === editingLesson.id ? updatedLesson : lesson
    );

    localStorage.setItem("lessons", JSON.stringify(updatedLessons));
    setLessons(updatedLessons);
    setEditingLesson(null);
    toast({
      title: "Success",
      description: "Lesson updated successfully",
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
        <div className="flex gap-4">
          <LessonForm onLessonAdded={loadLessons} />
          <Button variant="destructive" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <Card key={lesson.id}>
            <CardHeader>
              <CardTitle>{lesson.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{lesson.description}</p>
              <div className="flex gap-2">
                <Dialog open={editingLesson?.id === lesson.id} onOpenChange={(open) => !open && setEditingLesson(null)}>
                  <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => setEditingLesson(lesson)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Lesson</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleEdit} className="space-y-4">
                      <div>
                        <Input 
                          name="title" 
                          defaultValue={lesson.title}
                          placeholder="Lesson Title" 
                          required 
                        />
                      </div>
                      <div>
                        <Input 
                          name="description" 
                          defaultValue={lesson.description}
                          placeholder="Short Description" 
                          required 
                        />
                      </div>
                      <div>
                        <Textarea 
                          name="content" 
                          defaultValue={lesson.content}
                          placeholder="Lesson Content" 
                          required 
                        />
                      </div>
                      <Button type="submit" className="w-full">Update Lesson</Button>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button variant="destructive" onClick={() => handleDelete(lesson.id)}>
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeacherDashboard;