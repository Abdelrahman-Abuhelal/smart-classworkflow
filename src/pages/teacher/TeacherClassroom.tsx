import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { StorageService } from "../../services/storageService";
import { Lesson, Student } from "../../types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LessonForm } from "../../components/LessonForm";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, Trash } from "lucide-react";

const TeacherClassroom = () => {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const teacherId = "current-teacher-id"; // Replace with actual auth

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLessons(StorageService.getLessonsByTeacher(teacherId));
    setStudents(StorageService.getStudents());
  };

  const handleDeleteLesson = (lessonId: string) => {
    StorageService.deleteLesson(lessonId);
    loadData();
  };

  const handlePublishLesson = (lesson: Lesson) => {
    StorageService.updateLesson({
      ...lesson,
      status: 'published'
    });
    loadData();
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
            <p className="text-muted-foreground">{students.length} Students</p>
          </div>
          <Button onClick={() => navigate("/teacher")}>Back to Dashboard</Button>
        </div>

        <div className="space-y-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full">Create New Lesson</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Lesson</DialogTitle>
              </DialogHeader>
              <LessonForm 
                teacherId={teacherId}
                students={students}
                onSuccess={() => {
                  loadData();
                }}
              />
            </DialogContent>
          </Dialog>
          
          <div className="grid md:grid-cols-2 gap-4">
            {lessons.map((lesson) => (
              <Card key={lesson.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-bold">{lesson.title}</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handlePublishLesson(lesson)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        {lesson.status === 'draft' ? 'Publish' : 'Unpublish'}
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={() => handleDeleteLesson(lesson.id)}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent>
                  <Badge variant={lesson.status === 'published' ? "default" : "secondary"}>
                    {lesson.status}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-2">
                    Assigned to {lesson.studentIds.length} students
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherClassroom;