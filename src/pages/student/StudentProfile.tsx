import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const StudentProfile = () => {
  const navigate = useNavigate();

  // Mock data - replace with actual API calls later
  const student = {
    name: "Jane Smith",
    email: "jane.smith@school.com",
    grade: "10th Grade",
    classroom: "Mathematics 101",
    completedLessons: 15,
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-2xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Student Profile</h1>
          <Button onClick={() => navigate("/student")}>Back to Dashboard</Button>
        </div>

        <div className="space-y-6 bg-card p-6 rounded-lg shadow">
          <div>
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Name:</span> {student.name}</p>
              <p><span className="font-medium">Email:</span> {student.email}</p>
              <p><span className="font-medium">Grade:</span> {student.grade}</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Academic Progress</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Current Classroom:</span> {student.classroom}</p>
              <p><span className="font-medium">Completed Lessons:</span> {student.completedLessons}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;