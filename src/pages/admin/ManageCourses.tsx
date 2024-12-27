import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash, Edit } from "lucide-react";
import { useState } from "react";

const ManageCourses = () => {
  const [courses, setCourses] = useState([
    { id: 1, name: "Mathematics", teacher: "John Doe", students: 50, status: "Active" },
    { id: 2, name: "Physics", teacher: "Jane Smith", students: 45, status: "Active" },
  ]);

  const handleDelete = (id: number) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Courses</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add New Course
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Teacher</TableHead>
            <TableHead>Students</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}>
              <TableCell>{course.name}</TableCell>
              <TableCell>{course.teacher}</TableCell>
              <TableCell>{course.students}</TableCell>
              <TableCell>{course.status}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(course.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageCourses;