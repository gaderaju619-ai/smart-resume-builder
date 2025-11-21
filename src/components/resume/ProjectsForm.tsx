import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { Project } from "@/types/resume";

interface ProjectsFormProps {
  data: Project[];
  onChange: (data: Project[]) => void;
}

export const ProjectsForm = ({ data, onChange }: ProjectsFormProps) => {
  const addProject = () => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name: "",
      description: "",
      techStack: "",
      impact: "",
    };
    onChange([...data, newProject]);
  };

  const removeProject = (id: string) => {
    onChange(data.filter((proj) => proj.id !== id));
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    onChange(
      data.map((proj) => (proj.id === id ? { ...proj, [field]: value } : proj))
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Projects</CardTitle>
        <Button onClick={addProject} size="sm" variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.map((proj, index) => (
          <div key={proj.id} className="p-4 border rounded-lg space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Project {index + 1}</h4>
              <Button
                onClick={() => removeProject(proj.id)}
                size="sm"
                variant="ghost"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Project Name</Label>
                <Input
                  value={proj.name}
                  onChange={(e) => updateProject(proj.id, "name", e.target.value)}
                  placeholder="My Awesome Project"
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={proj.description}
                  onChange={(e) =>
                    updateProject(proj.id, "description", e.target.value)
                  }
                  placeholder="Brief description of the project..."
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label>Tech Stack</Label>
                <Input
                  value={proj.techStack}
                  onChange={(e) =>
                    updateProject(proj.id, "techStack", e.target.value)
                  }
                  placeholder="React, Node.js, MongoDB"
                />
              </div>

              <div className="space-y-2">
                <Label>Impact/Results</Label>
                <Textarea
                  value={proj.impact}
                  onChange={(e) => updateProject(proj.id, "impact", e.target.value)}
                  placeholder="What impact did this project have?"
                  className="min-h-[60px]"
                />
              </div>
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No projects added yet. Click "Add Project" to get started.
          </div>
        )}
      </CardContent>
    </Card>
  );
};
