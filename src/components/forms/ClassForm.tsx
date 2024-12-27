import React, { useState } from 'react';
import { Class } from '../../types';
import { StorageService } from '../../services/storageService';
import { v4 as uuidv4 } from 'uuid';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface ClassFormProps {
  onSuccess?: () => void;
}

export const ClassForm: React.FC<ClassFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    schedule: '',
    teacherId: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newClass: Class = {
      id: uuidv4(),
      ...formData,
      students: [],
    };
    StorageService.addClass(newClass);
    setFormData({ name: '', subject: '', schedule: '', teacherId: '' });
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
        <Label htmlFor="name">Class Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Class Name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Subject"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="schedule">Schedule</Label>
        <Input
          id="schedule"
          name="schedule"
          value={formData.schedule}
          onChange={handleChange}
          placeholder="Schedule"
          required
        />
      </div>

      <Button type="submit" className="w-full">Add Class</Button>
    </form>
  );
}; 