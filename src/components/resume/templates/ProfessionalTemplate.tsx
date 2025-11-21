import { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react";

interface ProfessionalTemplateProps {
  data: ResumeData;
}

export const ProfessionalTemplate = ({ data }: ProfessionalTemplateProps) => {
  return (
    <div className="bg-background p-8 text-foreground min-h-[1100px]">
      {/* Header - Centered */}
      <div className="text-center border-b border-border pb-6 mb-6">
        <h1 className="text-3xl font-bold mb-3">
          {data.personalInfo.name || "Your Name"}
        </h1>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          {data.personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3" />
              {data.personalInfo.email}
            </span>
          )}
          {data.personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              {data.personalInfo.phone}
            </span>
          )}
          {data.personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {data.personalInfo.location}
            </span>
          )}
        </div>
        {(data.links.portfolio || data.links.github || data.links.linkedin) && (
          <div className="flex justify-center gap-4 mt-2 text-xs">
            {data.links.linkedin && (
              <a
                href={data.links.linkedin}
                className="flex items-center gap-1 hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-3 h-3" />
                LinkedIn
              </a>
            )}
            {data.links.github && (
              <a
                href={data.links.github}
                className="flex items-center gap-1 hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-3 h-3" />
                GitHub
              </a>
            )}
            {data.links.portfolio && (
              <a
                href={data.links.portfolio}
                className="flex items-center gap-1 hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe className="w-3 h-3" />
                Portfolio
              </a>
            )}
          </div>
        )}
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="mb-5">
          <h2 className="text-lg font-bold mb-2 border-b border-border pb-1">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-sm leading-relaxed text-justify">
            {data.personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-lg font-bold mb-2 border-b border-border pb-1">
            WORK EXPERIENCE
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between mb-1">
                  <h3 className="font-bold">{exp.role}</h3>
                  <span className="text-sm text-muted-foreground whitespace-nowrap ml-4">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground italic mb-2">
                  {exp.company}
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm">
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
        <div className="mb-5">
          <h2 className="text-lg font-bold mb-2 border-b border-border pb-1">
            EDUCATION
          </h2>
          <div className="space-y-2">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-bold text-sm">{edu.degree}</h3>
                    <p className="text-sm text-muted-foreground italic">
                      {edu.institution}
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground">{edu.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {(data.skills.technical.length > 0 || data.skills.soft.length > 0) && (
        <div className="mb-5">
          <h2 className="text-lg font-bold mb-2 border-b border-border pb-1">
            SKILLS
          </h2>
          <div className="space-y-2 text-sm">
            {data.skills.technical.length > 0 && (
              <div>
                <span className="font-semibold">Technical: </span>
                {data.skills.technical.join(", ")}
              </div>
            )}
            {data.skills.soft.length > 0 && (
              <div>
                <span className="font-semibold">Professional: </span>
                {data.skills.soft.join(", ")}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mb-5">
          <h2 className="text-lg font-bold mb-2 border-b border-border pb-1">
            PROJECTS
          </h2>
          <div className="space-y-3">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <h3 className="font-bold text-sm">{proj.name}</h3>
                <p className="text-sm mb-1">{proj.description}</p>
                <div className="text-sm text-muted-foreground space-y-1">
                  {proj.techStack && (
                    <div>
                      <span className="font-semibold">Technologies:</span>{" "}
                      {proj.techStack}
                    </div>
                  )}
                  {proj.impact && (
                    <div>
                      <span className="font-semibold">Impact:</span> {proj.impact}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications & Achievements in two columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {data.certifications.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-2 border-b border-border pb-1">
              CERTIFICATIONS
            </h2>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {data.certifications.map((cert, idx) => (
                <li key={idx}>{cert}</li>
              ))}
            </ul>
          </div>
        )}

        {data.achievements.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-2 border-b border-border pb-1">
              ACHIEVEMENTS
            </h2>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {data.achievements.map((ach, idx) => (
                <li key={idx}>{ach}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
