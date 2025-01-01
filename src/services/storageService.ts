import { User, Student, Teacher, Lesson } from '../types';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

const STORAGE_KEYS = {
  USERS: 'users',
  STUDENTS: 'students',
  TEACHERS: 'teachers',
  LESSONS: 'lessons',
};

export const StorageService = {
  // User Management
  getUsers: (): User[] => {
    return getLocalStorage(STORAGE_KEYS.USERS) || [];
  },

  addUser: (user: User): void => {
    const users = StorageService.getUsers();
    users.push(user);
    setLocalStorage(STORAGE_KEYS.USERS, users);
  },

  deleteUser: (userId: string): void => {
    const users = StorageService.getUsers();
    const filteredUsers = users.filter(u => u.id !== userId);
    setLocalStorage(STORAGE_KEYS.USERS, filteredUsers);
  },

  getUserByEmail: (email: string): User | undefined => {
    const users = StorageService.getUsers();
    return users.find(user => user.email === email);
  },

  getCurrentUser: (): User | null => {
    return getLocalStorage('currentUser');
  },

  setCurrentUser: (user: User): void => {
    setLocalStorage('currentUser', user);
  },

  logout: (): void => {
    localStorage.removeItem('currentUser');
  },

  // Students
  getStudents: (): Student[] => {
    const users = StorageService.getUsers();
    return users
      .filter(user => user.role === 'student')
      .map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
      }));
  },

  addStudent: (student: Student): void => {
    // No need to store separately anymore
  },

  deleteStudent: (studentId: string): void => {
    // Handled by deleteUser
  },

  // Teachers (similar to Students)
  getTeachers: (): Teacher[] => {
    const users = StorageService.getUsers();
    return users
      .filter(user => user.role === 'teacher')
      .map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
      }));
  },

  addTeacher: (teacher: Teacher): void => {
    // No need to store separately anymore
  },

  deleteTeacher: (teacherId: string): void => {
    // Handled by deleteUser
  },

  // Lessons
  getLessons: (): Lesson[] => {
    return getLocalStorage(STORAGE_KEYS.LESSONS) || [];
  },

  getLessonsByTeacher: (teacherId: string): Lesson[] => {
    const lessons = StorageService.getLessons();
    return lessons.filter(lesson => lesson.teacherId === teacherId);
  },

  getLessonsByStudent: (studentId: string): Lesson[] => {
    console.log("Getting lessons for student:", studentId); // Debug log
    const lessons = StorageService.getLessons();
    console.log("All lessons:", lessons); // Debug log
    const studentLessons = lessons.filter(lesson => 
      lesson.studentIds.includes(studentId) && 
      lesson.status === 'published'
    );
    console.log("Filtered lessons:", studentLessons); // Debug log
    return studentLessons;
  },

  addLesson: (lesson: Lesson): void => {
    const lessons = StorageService.getLessons();
    lessons.push(lesson);
    setLocalStorage(STORAGE_KEYS.LESSONS, lessons);
  },

  updateLesson: (updatedLesson: Lesson): void => {
    const lessons = StorageService.getLessons();
    const index = lessons.findIndex(l => l.id === updatedLesson.id);
    if (index !== -1) {
      lessons[index] = updatedLesson;
      setLocalStorage(STORAGE_KEYS.LESSONS, lessons);
    }
  },

  deleteLesson: (lessonId: string): void => {
    const lessons = StorageService.getLessons();
    const filteredLessons = lessons.filter(l => l.id !== lessonId);
    setLocalStorage(STORAGE_KEYS.LESSONS, filteredLessons);
  },
}; 