import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import TeacherClassroom from "./pages/teacher/TeacherClassroom";
import TeacherProfile from "./pages/teacher/TeacherProfile";
import StudentProfile from "./pages/student/StudentProfile";
import LessonView from "./pages/student/LessonView";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageClasses from "./pages/admin/ManageClasses";
import ManageCourses from "./pages/admin/ManageCourses";
import ManageTeachers from "./pages/admin/ManageTeachers";
import ManageStudents from "./pages/admin/ManageStudents";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/teacher/profile" element={<TeacherProfile />} />
          <Route path="/teacher/classroom/:id" element={<TeacherClassroom />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/lesson/:id" element={<LessonView />} />
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/classes" element={<ManageClasses />} />
          <Route path="/admin/courses" element={<ManageCourses />} />
          <Route path="/admin/teachers" element={<ManageTeachers />} />
          <Route path="/admin/students" element={<ManageStudents />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;