import { Student, Teacher, Class } from '../types';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

const STORAGE_KEYS = {
  STUDENTS: 'students',
  TEACHERS: 'teachers',
  CLASSES: 'classes',
};

export const StorageService = {
  // Students
  getStudents: (): Student[] => {
    return getLocalStorage(STORAGE_KEYS.STUDENTS) || [];
  },
  
  addStudent: (student: Student): void => {
    const students = StorageService.getStudents();
    students.push(student);
    setLocalStorage(STORAGE_KEYS.STUDENTS, students);
  },

  // Teachers
  getTeachers: (): Teacher[] => {
    return getLocalStorage(STORAGE_KEYS.TEACHERS) || [];
  },

  addTeacher: (teacher: Teacher): void => {
    const teachers = StorageService.getTeachers();
    teachers.push(teacher);
    setLocalStorage(STORAGE_KEYS.TEACHERS, teachers);
  },

  // Classes
  getClasses: (): Class[] => {
    return getLocalStorage(STORAGE_KEYS.CLASSES) || [];
  },

  addClass: (classData: Class): void => {
    const classes = StorageService.getClasses();
    classes.push(classData);
    setLocalStorage(STORAGE_KEYS.CLASSES, classes);
  },

  // Update methods
  updateStudent: (updatedStudent: Student): void => {
    const students = StorageService.getStudents();
    const index = students.findIndex(s => s.id === updatedStudent.id);
    if (index !== -1) {
      students[index] = updatedStudent;
      setLocalStorage(STORAGE_KEYS.STUDENTS, students);
    }
  },

  updateTeacher: (updatedTeacher: Teacher): void => {
    const teachers = StorageService.getTeachers();
    const index = teachers.findIndex(t => t.id === updatedTeacher.id);
    if (index !== -1) {
      teachers[index] = updatedTeacher;
      setLocalStorage(STORAGE_KEYS.TEACHERS, teachers);
    }
  },

  updateClass: (updatedClass: Class): void => {
    const classes = StorageService.getClasses();
    const index = classes.findIndex(c => c.id === updatedClass.id);
    if (index !== -1) {
      classes[index] = updatedClass;
      setLocalStorage(STORAGE_KEYS.CLASSES, classes);
    }
  }
}; 