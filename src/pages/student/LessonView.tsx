import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StorageService } from "../../services/storageService";
import { Lesson } from "../../types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "../../components/layout/Navbar";

const LessonView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const currentUser = StorageService.getCurrentUser();

  useEffect(() => {
    if (id && currentUser?.id) {
      console.log("Looking for lesson:", id); // Debug log
      console.log("Current user:", currentUser); // Debug log
      const allLessons = StorageService.getLessons();
      console.log("All lessons:", allLessons); // Debug log
      
      const foundLesson = allLessons.find(l => 
        l.id === id && 
        l.studentIds.includes(currentUser.id) &&
        l.status === 'published'
      );
      
      console.log("Found lesson:", foundLesson); // Debug log
      if (foundLesson) {
        setLesson(foundLesson);
      }
    }
  }, [id, currentUser?.id]);

  if (!lesson) {
    return (
      <div>
        <Navbar portalType="Student" />
        <div className="container mx-auto p-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/student")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Lesson not found or not available.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar portalType="Student" />
      <div className="container mx-auto p-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/student")}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">{lesson.title}</CardTitle>
              <Badge>
                {new Date(lesson.createdAt).toLocaleDateString()}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              {lesson.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LessonView;