import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StorageService } from "../../services/storageService";
import { Lesson } from "../../types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "../../components/layout/Navbar";

export const StudentDashboard = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const navigate = useNavigate();
  const currentUser = StorageService.getCurrentUser();

  useEffect(() => {
    if (currentUser?.id) {
      console.log("Current user:", currentUser);
      const studentLessons = StorageService.getLessonsByStudent(currentUser.id);
      console.log("Student lessons:", studentLessons);
      setLessons(studentLessons);
    } else {
      console.log("No current user found");
    }
  }, [currentUser?.id]);

  return (
    <div>
      <Navbar portalType="Student" />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">My Lessons</h1>
        
        <div className="grid md:grid-cols-2 gap-4">
          {lessons.map((lesson) => (
            <Card key={lesson.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{lesson.title}</span>
                  <Badge variant={lesson.status === 'published' ? "default" : "secondary"}>
                    {lesson.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {lesson.content}
                </p>
                <Button 
                  className="w-full"
                  onClick={() => navigate(`/student/lesson/${lesson.id}`)}
                  disabled={lesson.status !== 'published'}
                >
                  {lesson.status === 'published' ? 'View Lesson' : 'Not Available Yet'}
                </Button>
              </CardContent>
            </Card>
          ))}
          {lessons.length === 0 && (
            <p className="text-muted-foreground col-span-2 text-center py-8">
              No lessons available yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;