import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
}

export const LessonForm = ({ onLessonAdded }: { onLessonAdded: () => void }) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const lesson: Lesson = {
      id: Date.now().toString(),
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      content: formData.get("content") as string,
    };
    
    const lessons = JSON.parse(localStorage.getItem("lessons") || "[]");
    lessons.push(lesson);
    localStorage.setItem("lessons", JSON.stringify(lessons));
    
    toast({
      title: "Success",
      description: "Lesson created successfully",
    });
    
    setOpen(false);
    onLessonAdded();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add New Lesson
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Lesson</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input name="title" placeholder="Lesson Title" required />
          </div>
          <div>
            <Input name="description" placeholder="Short Description" required />
          </div>
          <div>
            <Textarea name="content" placeholder="Lesson Content" required />
          </div>
          <Button type="submit" className="w-full">Create Lesson</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};