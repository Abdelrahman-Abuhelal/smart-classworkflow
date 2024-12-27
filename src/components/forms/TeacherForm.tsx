import React, { useState } from 'react';
import { Teacher } from '../../types';
import { StorageService } from '../../services/storageService';
import { v4 as uuidv4 } from 'uuid';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface TeacherFormProps {
  onSuccess?: () => void;
}

export const TeacherForm: React.FC<TeacherFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subjects: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTeacher: Teacher = {
      id: uuidv4(),
      name: formData.name,
      email: formData.email,
      subjects: formData.subjects.split(',').map(s => s.trim()),
      assignedClasses: [],
    };
    StorageService.addTeacher(newTeacher);
    setFormData({ name: '', email: '', subjects: '' });
    onSuccess?.();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Teacher Name"
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
        <Label htmlFor="subjects">Subjects</Label>
        <Input
          id="subjects"
          name="subjects"
          value={formData.subjects}
          onChange={handleChange}
          placeholder="Subjects (comma-separated)"
          required
        />
      </div>

      <Button type="submit" className="w-full">Add Teacher</Button>
    </form>
  );
}; 