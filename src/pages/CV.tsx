import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ColorfulCVTemplate from "@/components/ColorfulCVTemplate";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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

const CV = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("edit");
  const [selectedColor, setSelectedColor] = useState<"blue" | "green" | "purple" | "orange" | "red">("blue");
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [objective, setObjective] = useState("");
  
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  
  const [newExperience, setNewExperience] = useState<Omit<Experience, "id">>({
    title: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  
  const [newEducation, setNewEducation] = useState<Omit<Education, "id">>({
    degree: "",
    institution: "",
    year: "",
  });
  
  const [newSkill, setNewSkill] = useState<Omit<Skill, "id">>({
    name: "",
    level: 3,
  });
  
  const addExperience = () => {
    if (newExperience.title && newExperience.company) {
      const id = Date.now().toString();
      setExperiences([...experiences, { ...newExperience, id }]);
      setNewExperience({
        title: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
      });
    }
  };
  
  const removeExperience = (id: string) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  };
  
  const addEducation = () => {
    if (newEducation.degree && newEducation.institution) {
      const id = Date.now().toString();
      setEducation([...education, { ...newEducation, id }]);
      setNewEducation({
        degree: "",
        institution: "",
        year: "",
      });
    }
  };
  
  const removeEducation = (id: string) => {
    setEducation(education.filter((edu) => edu.id !== id));
  };
  
  const addSkill = () => {
    if (newSkill.name) {
      const id = Date.now().toString();
      setSkills([...skills, { ...newSkill, id }]);
      setNewSkill({
        name: "",
        level: 3,
      });
    }
  };
  
  const removeSkill = (id: string) => {
    setSkills(skills.filter((skill) => skill.id !== id));
  };
  
  const generateCV = () => {
    if (!firstName || !lastName || !email) {
      toast({
        title: "Informations incomplètes",
        description: "Veuillez remplir au moins votre nom, prénom et email.",
        variant: "destructive",
      });
      return;
    }
    
    console.log("Form values:", { firstName, lastName, email, phone, address, objective });
    console.log("Experiences:", experiences);
    console.log("Education:", education);
    console.log("Skills:", skills);
    
    setActiveTab("preview");
    
    toast({
      title: "Préparation du téléchargement",
      description: "Génération de votre CV en cours...",
    });
  };
  
  const downloadCV = async () => {
    const cvElement = document.getElementById('cv-preview');
    if (!cvElement) return;
    
    toast({
      title: "Préparation du téléchargement",
      description: "Génération de votre CV en cours...",
    });
    
    try {
      const canvas = await html2canvas(cvElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const aspectRatio = canvas.width / canvas.height;
      const imgWidth = pdfWidth;
      const imgHeight = pdfWidth / aspectRatio;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight > pdfHeight ? pdfHeight : imgHeight);
      pdf.save(`CV_${firstName}_${lastName}.pdf`);
      
      toast({
        title: "CV téléchargé avec succès",
        description: "Votre CV a été enregistré au format PDF.",
      });
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error);
      toast({
        title: "Erreur",
        description: "Un problème est survenu lors du téléchargement de votre CV.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <Layout>
      <section className="py-8 bg-gray-50">
        <div className="container">
          <h1 className="text-3xl font-bold mb-2">Créez votre CV professionnel</h1>
          <p className="text-gray-600 mb-6">
            Remplissez le formulaire ci-dessous pour générer un CV attrayant et téléchargeable en PDF.
          </p>
        </div>
      </section>
      
      <section className="py-8">
        <div className="container">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-8">
              <TabsTrigger value="edit">Éditer</TabsTrigger>
              <TabsTrigger value="preview">Aperçu</TabsTrigger>
            </TabsList>
            
            <TabsContent value="edit">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations personnelles</CardTitle>
                    <CardDescription>
                      Remplissez vos coordonnées et informations de base
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom *</Label>
                        <Input 
                          id="firstName" 
                          value={firstName} 
                          onChange={(e) => setFirstName(e.target.value)} 
                          placeholder="Jean" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom *</Label>
                        <Input 
                          id="lastName" 
                          value={lastName} 
                          onChange={(e) => setLastName(e.target.value)} 
                          placeholder="Dupont" 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="jean.dupont@email.com" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input 
                        id="phone" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        placeholder="06 12 34 56 78" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Adresse</Label>
                      <Input 
                        id="address" 
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)} 
                        placeholder="123 Rue Example, 75000 Paris" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="objective">Objectif professionnel</Label>
                      <Textarea 
                        id="objective" 
                        value={objective} 
                        onChange={(e) => setObjective(e.target.value)} 
                        placeholder="Décrivez brièvement vos objectifs de carrière" 
                        className="min-h-[100px]" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Thème de couleur</Label>
                      <div className="flex gap-2">
                        <Button 
                          type="button" 
                          size="sm"
                          variant={selectedColor === "blue" ? "default" : "outline"}
                          className={selectedColor === "blue" ? "bg-blue-600" : "bg-blue-600/20"}
                          onClick={() => setSelectedColor("blue")}
                        >
                          Bleu
                        </Button>
                        <Button 
                          type="button" 
                          size="sm"
                          variant={selectedColor === "green" ? "default" : "outline"}
                          className={selectedColor === "green" ? "bg-emerald-600" : "bg-emerald-600/20"}
                          onClick={() => setSelectedColor("green")}
                        >
                          Vert
                        </Button>
                        <Button 
                          type="button" 
                          size="sm"
                          variant={selectedColor === "purple" ? "default" : "outline"}
                          className={selectedColor === "purple" ? "bg-purple-600" : "bg-purple-600/20"}
                          onClick={() => setSelectedColor("purple")}
                        >
                          Violet
                        </Button>
                        <Button 
                          type="button" 
                          size="sm"
                          variant={selectedColor === "orange" ? "default" : "outline"}
                          className={selectedColor === "orange" ? "bg-orange-600" : "bg-orange-600/20"}
                          onClick={() => setSelectedColor("orange")}
                        >
                          Orange
                        </Button>
                        <Button 
                          type="button" 
                          size="sm"
                          variant={selectedColor === "red" ? "default" : "outline"}
                          className={selectedColor === "red" ? "bg-red-600" : "bg-red-600/20"}
                          onClick={() => setSelectedColor("red")}
                        >
                          Rouge
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Expériences professionnelles</CardTitle>
                    <CardDescription>
                      Ajoutez vos expériences professionnelles pertinentes
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {experiences.map((exp) => (
                      <div key={exp.id} className="border p-3 rounded-md relative">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 h-6 w-6"
                          onClick={() => removeExperience(exp.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <p className="font-medium">{exp.title}</p>
                        <p className="text-sm">{exp.company}</p>
                        <p className="text-xs text-gray-600">
                          {exp.startDate} - {exp.endDate}
                        </p>
                      </div>
                    ))}
                    
                    <div className="space-y-3 border-t pt-3">
                      <div className="space-y-2">
                        <Label htmlFor="expTitle">Poste</Label>
                        <Input
                          id="expTitle"
                          value={newExperience.title}
                          onChange={(e) => setNewExperience({...newExperience, title: e.target.value})}
                          placeholder="Développeur Web"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="expCompany">Entreprise</Label>
                        <Input
                          id="expCompany"
                          value={newExperience.company}
                          onChange={(e) => setNewExperience({...newExperience, company: e.target.value})}
                          placeholder="Nom de l'entreprise"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor="expStartDate">Début</Label>
                          <Input
                            id="expStartDate"
                            value={newExperience.startDate}
                            onChange={(e) => setNewExperience({...newExperience, startDate: e.target.value})}
                            placeholder="Janv 2018"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="expEndDate">Fin</Label>
                          <Input
                            id="expEndDate"
                            value={newExperience.endDate}
                            onChange={(e) => setNewExperience({...newExperience, endDate: e.target.value})}
                            placeholder="Actuel"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="expDescription">Description</Label>
                        <Textarea
                          id="expDescription"
                          value={newExperience.description}
                          onChange={(e) => setNewExperience({...newExperience, description: e.target.value})}
                          placeholder="Décrivez vos responsabilités et réalisations"
                        />
                      </div>
                      
                      <Button type="button" onClick={addExperience} className="w-full">
                        <Plus className="h-4 w-4 mr-1" /> Ajouter cette expérience
                      </Button>
                    </div>
                  </CardContent>
                  
                  <CardHeader className="border-t">
                    <CardTitle>Formation</CardTitle>
                    <CardDescription>
                      Ajoutez votre parcours éducatif
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {education.map((edu) => (
                      <div key={edu.id} className="border p-3 rounded-md relative">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 h-6 w-6"
                          onClick={() => removeEducation(edu.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <p className="font-medium">{edu.degree}</p>
                        <p className="text-sm">{edu.institution}</p>
                        <p className="text-xs text-gray-600">{edu.year}</p>
                      </div>
                    ))}
                    
                    <div className="space-y-3 border-t pt-3">
                      <div className="space-y-2">
                        <Label htmlFor="eduDegree">Diplôme</Label>
                        <Input
                          id="eduDegree"
                          value={newEducation.degree}
                          onChange={(e) => setNewEducation({...newEducation, degree: e.target.value})}
                          placeholder="Master en Informatique"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="eduInstitution">Établissement</Label>
                        <Input
                          id="eduInstitution"
                          value={newEducation.institution}
                          onChange={(e) => setNewEducation({...newEducation, institution: e.target.value})}
                          placeholder="Nom de l'école/université"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="eduYear">Année</Label>
                        <Input
                          id="eduYear"
                          value={newEducation.year}
                          onChange={(e) => setNewEducation({...newEducation, year: e.target.value})}
                          placeholder="2015-2017"
                        />
                      </div>
                      
                      <Button type="button" onClick={addEducation} className="w-full">
                        <Plus className="h-4 w-4 mr-1" /> Ajouter cette formation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Compétences</CardTitle>
                      <CardDescription>
                        Ajoutez vos compétences techniques et personnelles
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {skills.map((skill) => (
                        <div key={skill.id} className="border p-3 rounded-md relative">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 h-6 w-6"
                            onClick={() => removeSkill(skill.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <div className="flex justify-between">
                            <p className="font-medium">{skill.name}</p>
                            <p className="text-xs font-medium text-gray-600">{skill.level}/5</p>
                          </div>
                          <div className="h-2 rounded-full bg-gray-200 mt-2 overflow-hidden">
                            <div 
                              className="h-full bg-primary" 
                              style={{ width: `${skill.level * 20}%` }}
                            />
                          </div>
                        </div>
                      ))}
                      
                      <div className="space-y-3 border-t pt-3">
                        <div className="space-y-2">
                          <Label htmlFor="skillName">Nom de la compétence</Label>
                          <Input
                            id="skillName"
                            value={newSkill.name}
                            onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
                            placeholder="React.js, Communication, etc."
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor="skillLevel">Niveau de maîtrise</Label>
                            <span className="text-sm">{newSkill.level}/5</span>
                          </div>
                          <input
                            id="skillLevel"
                            type="range"
                            min={1}
                            max={5}
                            value={newSkill.level}
                            onChange={(e) => setNewSkill({...newSkill, level: parseInt(e.target.value)})}
                            className="w-full"
                          />
                        </div>
                        
                        <Button type="button" onClick={addSkill} className="w-full">
                          <Plus className="h-4 w-4 mr-1" /> Ajouter cette compétence
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Finaliser votre CV</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button onClick={generateCV} className="w-full">
                        Générer votre CV
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="preview">
              <div className="mb-4">
                <Button onClick={() => setActiveTab("edit")} variant="outline" className="mr-4">
                  Revenir à l'éditeur
                </Button>
                <Button onClick={downloadCV} className="flex items-center gap-2">
                  <Download className="h-4 w-4" /> Télécharger en PDF
                </Button>
              </div>
              
              <div id="cv-preview" className="bg-white p-6 max-w-4xl mx-auto">
                <ColorfulCVTemplate
                  personalInfo={{ firstName, lastName, email, phone, address, objective }}
                  experiences={experiences}
                  education={education}
                  skills={skills}
                  color={selectedColor}
                  onDownload={downloadCV}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default CV;
