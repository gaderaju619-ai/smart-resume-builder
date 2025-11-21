import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PersonalInfoForm } from "@/components/resume/PersonalInfoForm";
import { ExperienceForm } from "@/components/resume/ExperienceForm";
import { SkillsForm } from "@/components/resume/SkillsForm";
import { EducationForm } from "@/components/resume/EducationForm";
import { ProjectsForm } from "@/components/resume/ProjectsForm";
import { AdditionalInfoForm } from "@/components/resume/AdditionalInfoForm";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { ResumeData, TemplateType } from "@/types/resume";
import { Download, Sparkles, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("personal");
  const [template, setTemplate] = useState<TemplateType>("modern");
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      location: "",
      summary: "",
    },
    skills: {
      technical: [],
      soft: [],
    },
    experience: [],
    education: [],
    projects: [],
    certifications: [],
    achievements: [],
    links: {},
  });

  const enhanceResume = async () => {
    setIsEnhancing(true);
    try {
      const { data, error } = await supabase.functions.invoke("enhance-resume", {
        body: { resumeData },
      });

      if (error) throw error;

      if (data.enhancedData) {
        setResumeData(data.enhancedData);
        toast({
          title: "Resume Enhanced!",
          description: "Your resume has been improved with AI suggestions.",
        });
      }
    } catch (error: any) {
      console.error("Enhancement error:", error);
      toast({
        title: "Enhancement Failed",
        description: error.message || "Failed to enhance resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsEnhancing(false);
    }
  };

  const exportToPDF = async () => {
    setIsExporting(true);
    try {
      const element = document.getElementById("resume-preview");
      if (!element) throw new Error("Resume preview not found");

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`${resumeData.personalInfo.name || "resume"}.pdf`);

      toast({
        title: "PDF Downloaded!",
        description: "Your resume has been saved as a PDF.",
      });
    } catch (error) {
      console.error("Export error:", error);
      toast({
        title: "Export Failed",
        description: "Failed to export PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50 shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Smart Resume Generator</h1>
                <p className="text-sm text-muted-foreground">
                  AI-powered resume builder
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Select value={template} onValueChange={(v) => setTemplate(v as TemplateType)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={enhanceResume}
                disabled={isEnhancing}
                variant="outline"
                className="gap-2"
              >
                <Sparkles className="w-4 h-4" />
                {isEnhancing ? "Enhancing..." : "AI Enhance"}
              </Button>
              <Button onClick={exportToPDF} disabled={isExporting} className="gap-2">
                <Download className="w-4 h-4" />
                {isExporting ? "Exporting..." : "Export PDF"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Build Your Resume</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full">
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="experience">Experience</TabsTrigger>
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                    <TabsTrigger value="education">Education</TabsTrigger>
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                    <TabsTrigger value="additional">More</TabsTrigger>
                  </TabsList>

                  <TabsContent value="personal" className="space-y-4 mt-6">
                    <PersonalInfoForm
                      data={resumeData.personalInfo}
                      onChange={(data) =>
                        setResumeData({ ...resumeData, personalInfo: data })
                      }
                    />
                  </TabsContent>

                  <TabsContent value="experience" className="space-y-4 mt-6">
                    <ExperienceForm
                      data={resumeData.experience}
                      onChange={(data) =>
                        setResumeData({ ...resumeData, experience: data })
                      }
                    />
                  </TabsContent>

                  <TabsContent value="skills" className="space-y-4 mt-6">
                    <SkillsForm
                      data={resumeData.skills}
                      onChange={(data) =>
                        setResumeData({ ...resumeData, skills: data })
                      }
                    />
                  </TabsContent>

                  <TabsContent value="education" className="space-y-4 mt-6">
                    <EducationForm
                      data={resumeData.education}
                      onChange={(data) =>
                        setResumeData({ ...resumeData, education: data })
                      }
                    />
                  </TabsContent>

                  <TabsContent value="projects" className="space-y-4 mt-6">
                    <ProjectsForm
                      data={resumeData.projects}
                      onChange={(data) =>
                        setResumeData({ ...resumeData, projects: data })
                      }
                    />
                  </TabsContent>

                  <TabsContent value="additional" className="space-y-4 mt-6">
                    <AdditionalInfoForm
                      certifications={resumeData.certifications}
                      achievements={resumeData.achievements}
                      links={resumeData.links}
                      onCertificationsChange={(certs) =>
                        setResumeData({ ...resumeData, certifications: certs })
                      }
                      onAchievementsChange={(achs) =>
                        setResumeData({ ...resumeData, achievements: achs })
                      }
                      onLinksChange={(links) =>
                        setResumeData({ ...resumeData, links })
                      }
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Live Preview</h2>
              <ResumePreview data={resumeData} template={template} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
