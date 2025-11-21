import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useState } from "react";

interface SkillsFormProps {
  data: {
    technical: string[];
    soft: string[];
  };
  onChange: (data: { technical: string[]; soft: string[] }) => void;
}

export const SkillsForm = ({ data, onChange }: SkillsFormProps) => {
  const [technicalInput, setTechnicalInput] = useState("");
  const [softInput, setSoftInput] = useState("");

  const addSkill = (type: "technical" | "soft", value: string) => {
    if (!value.trim()) return;
    
    const newSkills = {
      ...data,
      [type]: [...data[type], value.trim()],
    };
    onChange(newSkills);
    
    if (type === "technical") setTechnicalInput("");
    else setSoftInput("");
  };

  const removeSkill = (type: "technical" | "soft", index: number) => {
    const newSkills = {
      ...data,
      [type]: data[type].filter((_, i) => i !== index),
    };
    onChange(newSkills);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    type: "technical" | "soft",
    value: string
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill(type, value);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="technical-skills">Technical Skills</Label>
          <Input
            id="technical-skills"
            value={technicalInput}
            onChange={(e) => setTechnicalInput(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, "technical", technicalInput)}
            placeholder="e.g., React, Python, AWS (Press Enter to add)"
          />
          <div className="flex flex-wrap gap-2">
            {data.technical.map((skill, index) => (
              <Badge key={index} variant="secondary" className="gap-1">
                {skill}
                <button
                  onClick={() => removeSkill("technical", index)}
                  className="ml-1 hover:bg-primary/20 rounded-full"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="soft-skills">Soft Skills</Label>
          <Input
            id="soft-skills"
            value={softInput}
            onChange={(e) => setSoftInput(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, "soft", softInput)}
            placeholder="e.g., Leadership, Communication (Press Enter to add)"
          />
          <div className="flex flex-wrap gap-2">
            {data.soft.map((skill, index) => (
              <Badge key={index} variant="outline" className="gap-1">
                {skill}
                <button
                  onClick={() => removeSkill("soft", index)}
                  className="ml-1 hover:bg-primary/20 rounded-full"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
