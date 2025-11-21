import { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react";

interface ModernTemplateProps {
  data: ResumeData;
}

export const ModernTemplate = ({ data }: ModernTemplateProps) => {
  return (
    <div className="bg-background p-8 text-foreground min-h-[1100px]">
      {/* Header */}
      <div className="border-b-2 border-primary pb-6 mb-6">
        <h1 className="text-4xl font-bold text-primary mb-2">
          {data.personalInfo.name || "Your Name"}
        </h1>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {data.personalInfo.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {data.personalInfo.email}
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              {data.personalInfo.phone}
            </div>
          )}
          {data.personalInfo.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {data.personalInfo.location}
            </div>
          )}
        </div>
        {(data.links.portfolio || data.links.github || data.links.linkedin) && (
          <div className="flex flex-wrap gap-4 mt-3 text-sm">
            {data.links.portfolio && (
              <a
                href={data.links.portfolio}
                className="flex items-center gap-1 text-accent hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe className="w-4 h-4" />
                Portfolio
              </a>
            )}
            {data.links.github && (
              <a
                href={data.links.github}
                className="flex items-center gap-1 text-accent hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            )}
            {data.links.linkedin && (
              <a
                href={data.links.linkedin}
                className="flex items-center gap-1 text-accent hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            )}
          </div>
        )}
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-primary mb-3 uppercase tracking-wide">
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Skills */}
      {(data.skills.technical.length > 0 || data.skills.soft.length > 0) && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-primary mb-3 uppercase tracking-wide">
            Skills
          </h2>
          {data.skills.technical.length > 0 && (
            <div className="mb-2">
              <span className="font-semibold text-sm">Technical: </span>
              <span className="text-sm">{data.skills.technical.join(" • ")}</span>
            </div>
          )}
          {data.skills.soft.length > 0 && (
            <div>
              <span className="font-semibold text-sm">Soft Skills: </span>
              <span className="text-sm">{data.skills.soft.join(" • ")}</span>
            </div>
          )}
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-primary mb-3 uppercase tracking-wide">
            Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-base">{exp.role}</h3>
                    <p className="text-sm text-muted-foreground">{exp.company}</p>
                  </div>
                  <span className="text-sm text-muted-foreground whitespace-nowrap">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-sm ml-2">
                  {exp.responsibilities.map(
                    (resp, idx) =>
                      resp && <li key={idx}>{resp}</li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-primary mb-3 uppercase tracking-wide">
            Education
          </h2>
          <div className="space-y-2">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-base">{edu.degree}</h3>
                  <p className="text-sm text-muted-foreground">{edu.institution}</p>
                </div>
                <span className="text-sm text-muted-foreground">{edu.year}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-primary mb-3 uppercase tracking-wide">
            Projects
          </h2>
          <div className="space-y-3">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <h3 className="font-bold text-base">{proj.name}</h3>
                <p className="text-sm mb-1">{proj.description}</p>
                {proj.techStack && (
                  <p className="text-sm text-muted-foreground mb-1">
                    <span className="font-semibold">Tech:</span> {proj.techStack}
                  </p>
                )}
                {proj.impact && (
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold">Impact:</span> {proj.impact}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-primary mb-3 uppercase tracking-wide">
            Certifications
          </h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            {data.certifications.map((cert, idx) => (
              <li key={idx}>{cert}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Achievements */}
      {data.achievements.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-primary mb-3 uppercase tracking-wide">
            Achievements
          </h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            {data.achievements.map((ach, idx) => (
              <li key={idx}>{ach}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
