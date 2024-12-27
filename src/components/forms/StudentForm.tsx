import React, { useState, useEffect } from 'react';
import { Student, Class } from '../../types';
import { StorageService } from '../../services/storageService';
import { v4 as uuidv4 } from 'uuid';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StudentFormProps {
  onSuccess?: () => void;
}

export const StudentForm: React.FC<StudentFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    classId: '',
  });
  const [availableClasses, setAvailableClasses] = useState<Class[]>([]);

  useEffect(() => {
    setAvailableClasses(StorageService.getClasses());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newStudent: Student = {
      id: uuidv4(),
      ...formData,
      enrolledClasses: [formData.classId],
    };
    StorageService.addStudent(newStudent);
    setFormData({ name: '', email: '', classId: '' });
    onSuccess?.();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClassChange = (value: string) => {
    setFormData({
      ...formData,
      classId: value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Student Name"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="class">Class</Label>
        <Select
          value={formData.classId}
          onValueChange={handleClassChange}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a class" />
          </SelectTrigger>
          <SelectContent>
            {availableClasses.map((classItem) => (
              <SelectItem key={classItem.id} value={classItem.id}>
                {classItem.name} - {classItem.subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit">Add Student</Button>
    </form>
  );
}; 