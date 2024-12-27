interface DefaultUser {
  email: string;
  password: string;
  role: 'admin' | 'teacher' | 'student';
  name: string;
}

export const defaultUsers: DefaultUser[] = [
  {
    email: 'admin@school.com',
    password: 'admin123',
    role: 'admin',
    name: 'Admin User'
  },
  {
    email: 'teacher@school.com',
    password: 'teacher123',
    role: 'teacher',
    name: 'John Teacher'
  },
  {
    email: 'student@school.com',
    password: 'student123',
    role: 'student',
    name: 'Jane Student'
  }
];

export const initializeDefaultUsers = () => {
  if (!localStorage.getItem('defaultUsersInitialized')) {
    localStorage.setItem('users', JSON.stringify(defaultUsers));
    localStorage.setItem('defaultUsersInitialized', 'true');
  }
}; 