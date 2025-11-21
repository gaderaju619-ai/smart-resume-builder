import { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react";

interface CreativeTemplateProps {
  data: ResumeData;
}

export const CreativeTemplate = ({ data }: CreativeTemplateProps) => {
  return (
    <div className="bg-gradient-to-br from-background to-muted p-8 text-foreground min-h-[1100px]">
      {/* Header with accent background */}
      <div className="bg-primary text-primary-foreground p-6 rounded-lg mb-6 shadow-medium">
        <h1 className="text-4xl font-bold mb-3">
          {data.personalInfo.name || "Your Name"}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm opacity-90">
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
                className="flex items-center gap-1 hover:underline"
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
                className="flex items-center gap-1 hover:underline"
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
                className="flex items-center gap-1 hover:underline"
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - 1/3 width */}
        <div className="space-y-6">
          {/* Summary */}
          {data.personalInfo.summary && (
            <div className="bg-card p-4 rounded-lg shadow-soft">
              <h2 className="text-lg font-bold text-accent mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-accent rounded"></span>
                About Me
              </h2>
              <p className="text-sm leading-relaxed">{data.personalInfo.summary}</p>
            </div>
          )}

          {/* Skills */}
          {(data.skills.technical.length > 0 || data.skills.soft.length > 0) && (
            <div className="bg-card p-4 rounded-lg shadow-soft">
              <h2 className="text-lg font-bold text-accent mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-accent rounded"></span>
                Skills
              </h2>
              <div className="space-y-3">
                {data.skills.technical.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-sm mb-2">Technical</h3>
                    <div className="flex flex-wrap gap-2">
                      {data.skills.technical.map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-accent/10 text-accent px-2 py-1 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {data.skills.soft.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-sm mb-2">Soft Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {data.skills.soft.map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-muted px-2 py-1 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Certifications */}
          {data.certifications.length > 0 && (
            <div className="bg-card p-4 rounded-lg shadow-soft">
              <h2 className="text-lg font-bold text-accent mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-accent rounded"></span>
                Certifications
              </h2>
              <ul className="space-y-2 text-sm">
                {data.certifications.map((cert, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-accent mt-1">●</span>
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column - 2/3 width */}
        <div className="md:col-span-2 space-y-6">
          {/* Experience */}
          {data.experience.length > 0 && (
            <div className="bg-card p-6 rounded-lg shadow-soft">
              <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <span className="w-1 h-7 bg-primary rounded"></span>
                Experience
              </h2>
              <div className="space-y-5">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="relative pl-6 border-l-2 border-accent/30">
                    <div className="absolute -left-2 top-0 w-3 h-3 rounded-full bg-accent"></div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-base">{exp.role}</h3>
                        <p className="text-sm text-muted-foreground">{exp.company}</p>
                      </div>
                      <span className="text-xs bg-muted px-3 py-1 rounded-full whitespace-nowrap">
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </span>
                    </div>
                    <ul className="space-y-1 text-sm">
                      {exp.responsibilities.map(
                        (resp, idx) =>
                          resp && (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-accent mt-1">→</span>
                              <span>{resp}</span>
                            </li>
                          )
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <div className="bg-card p-6 rounded-lg shadow-soft">
              <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <span className="w-1 h-7 bg-primary rounded"></span>
                Education
              </h2>
              <div className="space-y-3">
                {data.education.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">{edu.degree}</h3>
                      <p className="text-sm text-muted-foreground">{edu.institution}</p>
                    </div>
                    <span className="text-xs bg-muted px-3 py-1 rounded-full">
                      {edu.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <div className="bg-card p-6 rounded-lg shadow-soft">
              <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <span className="w-1 h-7 bg-primary rounded"></span>
                Projects
              </h2>
              <div className="space-y-4">
                {data.projects.map((proj) => (
                  <div key={proj.id} className="border-l-2 border-accent/30 pl-4">
                    <h3 className="font-bold">{proj.name}</h3>
                    <p className="text-sm my-2">{proj.description}</p>
                    {proj.techStack && (
                      <p className="text-xs text-muted-foreground mb-1">
                        <span className="font-semibold">Tech:</span> {proj.techStack}
                      </p>
                    )}
                    {proj.impact && (
                      <p className="text-xs text-muted-foreground">
                        <span className="font-semibold">Impact:</span> {proj.impact}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements */}
          {data.achievements.length > 0 && (
            <div className="bg-card p-6 rounded-lg shadow-soft">
              <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <span className="w-1 h-7 bg-primary rounded"></span>
                Achievements
              </h2>
              <ul className="space-y-2 text-sm">
                {data.achievements.map((ach, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-accent mt-1">★</span>
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
