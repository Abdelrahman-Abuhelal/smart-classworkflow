import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const TeacherProfile = () => {
  const navigate = useNavigate();

  // Mock data - replace with actual API calls later
  const teacher = {
    name: "John Doe",
    email: "john.doe@school.com",
    subject: "Mathematics",
    classrooms: 3,
    students: 75,
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-2xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Teacher Profile</h1>
          <Button onClick={() => navigate("/teacher")}>Back to Dashboard</Button>
        </div>

        <div className="space-y-6 bg-card p-6 rounded-lg shadow">
          <div>
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Name:</span> {teacher.name}</p>
              <p><span className="font-medium">Email:</span> {teacher.email}</p>
              <p><span className="font-medium">Subject:</span> {teacher.subject}</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Statistics</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Active Classrooms:</span> {teacher.classrooms}</p>
              <p><span className="font-medium">Total Students:</span> {teacher.students}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;