import { ResumeData, TemplateType } from "@/types/resume";
import { ModernTemplate } from "./templates/ModernTemplate";
import { ProfessionalTemplate } from "./templates/ProfessionalTemplate";
import { CreativeTemplate } from "./templates/CreativeTemplate";
import { Card } from "@/components/ui/card";

interface ResumePreviewProps {
  data: ResumeData;
  template: TemplateType;
}

export const ResumePreview = ({ data, template }: ResumePreviewProps) => {
  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} />;
      case "professional":
        return <ProfessionalTemplate data={data} />;
      case "creative":
        return <CreativeTemplate data={data} />;
      default:
        return <ModernTemplate data={data} />;
    }
  };

  return (
    <Card className="w-full overflow-hidden shadow-strong">
      <div id="resume-preview" className="bg-background">
        {renderTemplate()}
      </div>
    </Card>
  );
};
