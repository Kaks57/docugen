
import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";

interface Experience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
}

interface Skill {
  id: string;
  name: string;
  level: number;
}

interface ColorfulCVTemplateProps {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    objective: string;
  };
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  color?: "blue" | "green" | "purple" | "orange" | "red";
  onDownload: () => void;
}

const ColorfulCVTemplate = ({
  personalInfo,
  experiences,
  education,
  skills,
  color = "blue",
  onDownload
}: ColorfulCVTemplateProps) => {
  // Couleurs thématiques basées sur le choix
  const themeColors = {
    blue: {
      primary: "bg-blue-600",
      secondary: "bg-blue-100",
      accent: "bg-blue-200",
      text: "text-blue-700",
      border: "border-blue-300",
    },
    green: {
      primary: "bg-emerald-600",
      secondary: "bg-emerald-100",
      accent: "bg-emerald-200",
      text: "text-emerald-700",
      border: "border-emerald-300",
    },
    purple: {
      primary: "bg-purple-600",
      secondary: "bg-purple-100",
      accent: "bg-purple-200",
      text: "text-purple-700",
      border: "border-purple-300",
    },
    orange: {
      primary: "bg-orange-600",
      secondary: "bg-orange-100",
      accent: "bg-orange-200",
      text: "text-orange-700",
      border: "border-orange-300",
    },
    red: {
      primary: "bg-red-600",
      secondary: "bg-red-100",
      accent: "bg-red-200",
      text: "text-red-700",
      border: "border-red-300",
    },
  };
  
  const theme = themeColors[color];

  return (
    <div className="relative">
      <div className="absolute top-2 right-2 flex gap-2">
        <Button onClick={onDownload} size="sm" className="flex items-center gap-1">
          <Download className="w-4 h-4" />
          Télécharger
        </Button>
      </div>
      
      <div className="bg-white shadow-lg border rounded-lg overflow-hidden print:shadow-none">
        {/* En-tête avec le nom et les informations de contact */}
        <div className={`${theme.primary} text-white p-8`}>
          <h1 className="text-3xl font-bold mb-1">{personalInfo.firstName} {personalInfo.lastName}</h1>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm mt-2">
            <span>{personalInfo.email}</span>
            <span>{personalInfo.phone}</span>
            <span>{personalInfo.address}</span>
          </div>
        </div>
        
        {/* Objectif professionnel */}
        <div className={`${theme.secondary} p-4`}>
          <p className="italic">{personalInfo.objective}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {/* Colonne de gauche */}
          <div className="md:col-span-2 space-y-6">
            {/* Section Expérience */}
            <section>
              <h2 className={`text-xl font-bold mb-4 pb-2 border-b-2 ${theme.border} ${theme.text}`}>
                EXPÉRIENCE PROFESSIONNELLE
              </h2>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id} className="mb-4">
                    <h3 className="font-bold">{exp.title}</h3>
                    <div className="flex justify-between">
                      <span className="font-semibold">{exp.company}</span>
                      <span className="text-gray-600 text-sm">
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                    <p className="text-sm mt-1">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Section Formation */}
            <section>
              <h2 className={`text-xl font-bold mb-4 pb-2 border-b-2 ${theme.border} ${theme.text}`}>
                FORMATION
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="mb-4">
                    <h3 className="font-bold">{edu.degree}</h3>
                    <div className="flex justify-between">
                      <span>{edu.institution}</span>
                      <span className="text-gray-600 text-sm">{edu.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
          
          {/* Colonne de droite */}
          <div className="space-y-6">
            {/* Section Compétences */}
            <section>
              <h2 className={`text-xl font-bold mb-4 pb-2 border-b-2 ${theme.border} ${theme.text}`}>
                COMPÉTENCES
              </h2>
              <div className="space-y-3">
                {skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{skill.name}</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                      <div 
                        className={`h-full ${theme.primary}`} 
                        style={{ width: `${skill.level * 20}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Section Contact */}
            <section>
              <h2 className={`text-xl font-bold mb-4 pb-2 border-b-2 ${theme.border} ${theme.text}`}>
                CONTACT
              </h2>
              <div className="space-y-2 text-sm">
                <p>Email: {personalInfo.email}</p>
                <p>Téléphone: {personalInfo.phone}</p>
                <p>Adresse: {personalInfo.address}</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorfulCVTemplate;
