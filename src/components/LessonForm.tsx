import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StorageService } from "../services/storageService";
import { Student } from "../types";
import { v4 as uuidv4 } from 'uuid';
import { DialogClose } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LessonFormProps {
  teacherId: string;
  students: Student[];
  onSuccess: () => void;
}

export const LessonForm = ({ teacherId, students, onSuccess }: LessonFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    studentIds: [] as string[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newLesson = {
      id: uuidv4(),
      ...formData,
      teacherId,
      status: 'draft' as const,
      createdAt: new Date().toISOString()
    };

    StorageService.addLesson(newLesson);
    setFormData({ title: '', content: '', studentIds: [] });
    onSuccess();
  };

  const handleStudentSelection = (studentId: string) => {
    setFormData(prev => ({
      ...prev,
      studentIds: prev.studentIds.includes(studentId)
        ? prev.studentIds.filter(id => id !== studentId)
        : [...prev.studentIds, studentId]
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Lesson Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Assign Students</Label>
        <div className="grid grid-cols-2 gap-2">
          {students.map((student) => (
            <div 
              key={student.id}
              className={`p-2 border rounded cursor-pointer ${
                formData.studentIds.includes(student.id) 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-muted'
              }`}
              onClick={() => handleStudentSelection(student.id)}
            >
              {student.name}
            </div>
          ))}
        </div>
      </div>

      <DialogClose asChild>
        <Button type="submit">Create Lesson</Button>
      </DialogClose>
    </form>
  );
};