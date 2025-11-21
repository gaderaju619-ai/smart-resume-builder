import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PersonalInfo } from "@/types/resume";

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export const PersonalInfoForm = ({ data, onChange }: PersonalInfoFormProps) => {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={data.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="John Doe"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="john@example.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={data.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="+1 (555) 000-0000"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={data.location}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder="City, State"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="summary">Professional Summary</Label>
          <Textarea
            id="summary"
            value={data.summary}
            onChange={(e) => handleChange("summary", e.target.value)}
            placeholder="Brief overview of your professional background and career objectives..."
            className="min-h-[120px]"
          />
        </div>
      </CardContent>
    </Card>
  );
};
