import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useState } from "react";

interface AdditionalInfoFormProps {
  certifications: string[];
  achievements: string[];
  links: {
    portfolio?: string;
    github?: string;
    linkedin?: string;
  };
  onCertificationsChange: (certs: string[]) => void;
  onAchievementsChange: (achs: string[]) => void;
  onLinksChange: (links: {
    portfolio?: string;
    github?: string;
    linkedin?: string;
  }) => void;
}

export const AdditionalInfoForm = ({
  certifications,
  achievements,
  links,
  onCertificationsChange,
  onAchievementsChange,
  onLinksChange,
}: AdditionalInfoFormProps) => {
  const [certInput, setCertInput] = useState("");
  const [achInput, setAchInput] = useState("");

  const addItem = (type: "cert" | "ach", value: string) => {
    if (!value.trim()) return;

    if (type === "cert") {
      onCertificationsChange([...certifications, value.trim()]);
      setCertInput("");
    } else {
      onAchievementsChange([...achievements, value.trim()]);
      setAchInput("");
    }
  };

  const removeItem = (type: "cert" | "ach", index: number) => {
    if (type === "cert") {
      onCertificationsChange(certifications.filter((_, i) => i !== index));
    } else {
      onAchievementsChange(achievements.filter((_, i) => i !== index));
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    type: "cert" | "ach",
    value: string
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addItem(type, value);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Additional Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="certifications">Certifications</Label>
          <Input
            id="certifications"
            value={certInput}
            onChange={(e) => setCertInput(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, "cert", certInput)}
            placeholder="e.g., AWS Certified Developer (Press Enter to add)"
          />
          <div className="flex flex-wrap gap-2">
            {certifications.map((cert, index) => (
              <Badge key={index} variant="secondary" className="gap-1">
                {cert}
                <button
                  onClick={() => removeItem("cert", index)}
                  className="ml-1 hover:bg-primary/20 rounded-full"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="achievements">Achievements</Label>
          <Input
            id="achievements"
            value={achInput}
            onChange={(e) => setAchInput(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, "ach", achInput)}
            placeholder="e.g., Won Best Innovation Award (Press Enter to add)"
          />
          <div className="flex flex-wrap gap-2">
            {achievements.map((ach, index) => (
              <Badge key={index} variant="outline" className="gap-1">
                {ach}
                <button
                  onClick={() => removeItem("ach", index)}
                  className="ml-1 hover:bg-primary/20 rounded-full"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t">
          <h4 className="font-semibold">Professional Links</h4>
          
          <div className="space-y-2">
            <Label htmlFor="portfolio">Portfolio URL</Label>
            <Input
              id="portfolio"
              value={links.portfolio || ""}
              onChange={(e) =>
                onLinksChange({ ...links, portfolio: e.target.value })
              }
              placeholder="https://myportfolio.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="github">GitHub URL</Label>
            <Input
              id="github"
              value={links.github || ""}
              onChange={(e) => onLinksChange({ ...links, github: e.target.value })}
              placeholder="https://github.com/username"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn URL</Label>
            <Input
              id="linkedin"
              value={links.linkedin || ""}
              onChange={(e) =>
                onLinksChange({ ...links, linkedin: e.target.value })
              }
              placeholder="https://linkedin.com/in/username"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
