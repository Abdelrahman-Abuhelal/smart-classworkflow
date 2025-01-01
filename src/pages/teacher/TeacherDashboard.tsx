import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { StorageService } from "../../services/storageService";
import { Lesson, Student } from "../../types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LessonForm } from "../../components/LessonForm";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "../../components/layout/Navbar";

export const TeacherDashboard = () => {
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

  const getStudentLessons = (studentId: string) => {
    return lessons.filter(lesson => lesson.studentIds.includes(studentId));
  };

  const handlePublishLesson = (lessonId: string) => {
    const lesson = lessons.find(l => l.id === lessonId);
    if (lesson) {
      const updatedLesson = {
        ...lesson,
        status: lesson.status === 'draft' ? 'published' : 'draft'
      };
      StorageService.updateLesson(updatedLesson);
      loadData();
    }
  };

  return (
    <div>
      <Navbar portalType="Teacher" />
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Create New Lesson</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Lesson</DialogTitle>
              </DialogHeader>
              <LessonForm 
                teacherId={teacherId}
                students={students}
                onSuccess={loadData}
              />
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="lessons">
          <TabsList>
            <TabsTrigger value="lessons">All Lessons</TabsTrigger>
            <TabsTrigger value="students">Student Assignments</TabsTrigger>
          </TabsList>

          <TabsContent value="lessons">
            <div className="grid md:grid-cols-2 gap-4">
              {lessons.map((lesson) => (
                <Card key={lesson.id}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>{lesson.title}</span>
                      <div className="flex items-center gap-2">
                        <Button
                          variant={lesson.status === 'published' ? "secondary" : "default"}
                          size="sm"
                          onClick={() => handlePublishLesson(lesson.id)}
                        >
                          {lesson.status === 'published' ? 'Unpublish' : 'Publish'}
                        </Button>
                        <Badge variant={lesson.status === 'published' ? "default" : "secondary"}>
                          {lesson.status}
                        </Badge>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">{lesson.content}</p>
                    <p className="text-sm">
                      Assigned to {lesson.studentIds.length} students
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="students">
            <div className="space-y-6">
              {students.map((student) => {
                const studentLessons = getStudentLessons(student.id);
                return (
                  <Card key={student.id}>
                    <CardHeader>
                      <CardTitle>{student.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Lesson</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created At</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {studentLessons.map((lesson) => (
                            <TableRow key={`${student.id}-${lesson.id}`}>
                              <TableCell>{lesson.title}</TableCell>
                              <TableCell>
                                <Badge variant={lesson.status === 'published' ? "default" : "secondary"}>
                                  {lesson.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {new Date(lesson.createdAt).toLocaleDateString()}
                              </TableCell>
                            </TableRow>
                          ))}
                          {studentLessons.length === 0 && (
                            <TableRow>
                              <TableCell colSpan={3} className="text-center">
                                No lessons assigned
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};