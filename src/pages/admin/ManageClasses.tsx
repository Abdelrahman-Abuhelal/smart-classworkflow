import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash, Edit } from "lucide-react";
import { useState } from "react";

const ManageClasses = () => {
  const [classes, setClasses] = useState([
    { id: 1, name: "Class A", grade: "10th", teacher: "John Doe", students: 25 },
    { id: 2, name: "Class B", grade: "11th", teacher: "Jane Smith", students: 22 },
  ]);

  const handleDelete = (id: number) => {
    setClasses(classes.filter(c => c.id !== id));
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Classes</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add New Class
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead>Teacher</TableHead>
            <TableHead>Students</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {classes.map((cls) => (
            <TableRow key={cls.id}>
              <TableCell>{cls.name}</TableCell>
              <TableCell>{cls.grade}</TableCell>
              <TableCell>{cls.teacher}</TableCell>
              <TableCell>{cls.students}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(cls.id)}>
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

export default ManageClasses;