export interface Student {
  id: string;
  name: string;
  email: string;
  classId: string;
  enrolledClasses: string[];
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  subjects: string[];
  assignedClasses: string[];
}

export interface Class {
  id: string;
  name: string;
  subject: string;
  teacherId: string;
  students: string[];
  schedule: string;
} 