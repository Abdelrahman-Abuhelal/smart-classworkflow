import React, { useState } from 'react';
import { Teacher } from '../../types';
import { StorageService } from '../../services/storageService';
import { v4 as uuidv4 } from 'uuid';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@/components/ui/dialog";

interface TeacherFormProps {
  onSuccess?: () => void;
}

export const TeacherForm: React.FC<TeacherFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTeacher: Teacher = {
      id: uuidv4(),
      ...formData
    };
    StorageService.addTeacher(newTeacher);
    setFormData({ name: '', email: '' });
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

      <DialogClose asChild>
        <Button type="submit" className="w-full">Add Teacher</Button>
      </DialogClose>
    </form>
  );
}; 