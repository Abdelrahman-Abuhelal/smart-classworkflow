export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'teacher' | 'student';
}

export interface Student {
  id: string;
  name: string;
  email: string;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  teacherId: string;
  studentIds: string[];
  status: 'draft' | 'published';
  createdAt: string;
} 