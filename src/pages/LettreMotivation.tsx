import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import OpenAI from "openai";

const formSchema = z.object({
  nom: z.string().min(1, "Nom requis"),
  prenom: z.string().min(1, "Prénom requis"),
  email: z.string().email("Email invalide"),
  telephone: z.string().min(1, "Téléphone requis"),
  adresse: z.string().min(1, "Adresse requise"),
  entreprise: z.string().min(1, "Nom de l'entreprise requis"),
  poste: z.string().min(1, "Poste visé requis"),
  experience: z.string().min(1, "Expérience requise"),
  formation: z.string().min(1, "Formation requise"),
  motivation: z.string().min(1, "Motivation requise"),
});

const LettreMotivation = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("edition");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMotivation, setGeneratedMotivation] = useState("");
  const letterPreviewRef = React.useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      email: "",
      telephone: "",
      adresse: "",
      entreprise: "",
      poste: "",
      experience: "",
      formation: "",
      motivation: "",
    },
  });

  const generateMotivationLetter = async () => {
    const values = form.getValues();
    
    setIsGenerating(true);
    toast({
      title: "DocuGen en action",
      description: "Génération de votre lettre de motivation en cours...",
    });

    try {
      // Initialize OpenAI client
      const client = new OpenAI({
        apiKey: "YOUR_API_KEY_HERE", // This is for demonstration, in a real app you'd use environment variables
        dangerouslyAllowBrowser: true // Only for client-side use
      });
      
      // Generate prompt based on user inputs
      const prompt = `Rédige une lettre de motivation professionnelle en français pour une personne nommée ${values.prenom} ${values.nom} 
      qui postule au poste de ${values.poste} chez ${values.entreprise}.
      La personne a l'expérience suivante: ${values.experience}
      La formation de la personne: ${values.formation}
      La lettre doit être formelle, bien structurée avec une introduction, un développement et une conclusion.
      La lettre doit faire environ 300 mots.`;
      
      // Call OpenAI API
      try {
        // For demo purposes, we'll use a fallback method since OpenAI integration requires a proper API key
        // In a real implementation, uncomment this code and use a proper API key
        /*
        const response = await client.chat.completions.create({
          model: "gpt-4o",
          messages: [
            {role: "system", content: "Tu es un expert en rédaction de lettres de motivation professionnelles en français."},
            {role: "user", content: prompt}
          ],
          temperature: 0.7,
        });
        
        const generatedText = response.choices[0].message.content;
        */
        
        // Fallback method for demo purposes
        const generatedText = createAdvancedMotivationLetter(values);
        
        setGeneratedMotivation(generatedText);
        form.setValue("motivation", generatedText);
        
        toast({
          title: "Lettre générée avec succès!",
          description: "Votre lettre de motivation a été créée par DocuGen AI.",
        });
        
        // Save to localStorage if user is logged in
        const userData = localStorage.getItem("user");
        if (userData) {
          const letters = JSON.parse(localStorage.getItem("motivationLetters") || "[]");
          const newLetter = {
            id: "letter-" + Date.now(),
            name: `Lettre - ${values.entreprise} - ${values.poste}`,
            content: generatedText,
            date: new Date().toISOString(),
            ...values
          };
          
          letters.push(newLetter);
          localStorage.setItem("motivationLetters", JSON.stringify(letters));
        }
        
        // Passer à l'onglet aperçu
        setActiveTab("apercu");
      } catch (error) {
        console.error("OpenAI API error:", error);
        throw error;
      }
    } catch (error) {
      console.error("Error generating letter:", error);
      toast({
        title: "Erreur",
        description: "Un problème est survenu lors de la génération.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Function to create a motivation letter for fallback
  const createAdvancedMotivationLetter = (values: z.infer<typeof formSchema>) => {
    const currentDate = new Date().toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    
    // Extract professional keywords from experience and education
    const keywords = extractKeywords(values.experience, values.formation);
    
    return `Madame, Monsieur,

Je me permets de vous adresser ma candidature pour le poste de ${values.poste} au sein de votre entreprise ${values.entreprise}, que j'ai découvert récemment.

Actuellement ${values.experience.includes("diplômé") ? "diplômé(e)" : "professionnel(le)"} en ${values.formation}, je possède une solide expérience dans ce domaine. ${values.experience}

Au cours de mon parcours, j'ai développé des compétences en ${keywords.slice(0, 3).join(', ')}, qui me permettraient d'être rapidement opérationnel(le) au sein de votre équipe. Je suis particulièrement intéressé(e) par votre entreprise car elle incarne des valeurs auxquelles j'adhère pleinement et représente pour moi une opportunité exceptionnelle de mettre à profit mes compétences tout en relevant de nouveaux défis.

Je suis convaincu(e) que mon profil correspond aux attentes que vous avez pour ce poste. Ma capacité d'adaptation, mon sens de l'organisation et ma rigueur sont des atouts qui me permettront de m'intégrer efficacement dans vos équipes et de contribuer activement à la réussite de vos projets.

Je me tiens à votre entière disposition pour un entretien qui me permettrait de vous exposer plus en détail ma motivation et vous convaincre de l'adéquation de mon profil avec le poste proposé.

Je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.

${values.prenom} ${values.nom}`;
  };

  // Function to extract keywords from text
  const extractKeywords = (experience: string, formation: string) => {
    const combinedText = experience.toLowerCase() + " " + formation.toLowerCase();
    const keywords = [];
    
    // Liste de compétences communes à rechercher
    const skillsList = [
      "communication", "leadership", "gestion", "analyse", "développement",
      "commerce", "vente", "marketing", "finance", "informatique",
      "programmation", "design", "créativité", "organisation", "planification",
      "résolution de problèmes", "travail d'équipe", "autonomie", "adaptabilité",
      "négociation", "rédaction", "langues", "stratégie", "innovation"
    ];
    
    // Vérifier les compétences mentionnées
    skillsList.forEach(skill => {
      if (combinedText.includes(skill)) {
        keywords.push(skill);
      }
    });
    
    return keywords.length > 0 ? keywords : ["polyvalence", "rigueur", "motivation"];
  };

  const downloadLetter = async () => {
    if (!letterPreviewRef.current) return;
    
    try {
      toast({
        title: "Préparation du téléchargement",
        description: "Génération de votre lettre en cours...",
      });
      
      const canvas = await html2canvas(letterPreviewRef.current);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${form.getValues("prenom")}_${form.getValues("nom")}_LettreMotivation.pdf`);
      
      toast({
        title: "Lettre téléchargée",
        description: "Votre lettre de motivation a été enregistrée au format PDF.",
      });
    } catch (error) {
      console.error("Erreur lors du téléchargement:", error);
      toast({
        title: "Erreur",
        description: "Un problème est survenu lors du téléchargement.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <section className="py-10 bg-gray-50">
        <div className="container">
          <h1 className="text-3xl font-bold mb-2">Créer une lettre de motivation</h1>
          <p className="text-gray-600 mb-4">
            Remplissez le formulaire et utilisez notre IA DocuGen pour générer une lettre de motivation professionnelle en quelques secondes.
          </p>
          <div className="flex items-center gap-2 bg-accent/30 p-3 rounded-lg text-sm">
            <Sparkles className="h-4 w-4" />
            <span className="font-medium">Nouveau:</span>
            <span>DocuGen AI peut rédiger votre lettre à partir de vos informations de base!</span>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-8">
              <TabsTrigger value="edition">Édition</TabsTrigger>
              <TabsTrigger value="apercu">Aperçu</TabsTrigger>
            </TabsList>

            <Form {...form}>
              <TabsContent value="edition">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations pour votre lettre</CardTitle>
                    <CardDescription>
                      Complétez tous les champs pour générer une lettre de motivation personnalisée
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="prenom"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Prénom</FormLabel>
                            <FormControl>
                              <Input placeholder="Prénom" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="nom"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom</FormLabel>
                            <FormControl>
                              <Input placeholder="Nom" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="votre@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="telephone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Téléphone</FormLabel>
                            <FormControl>
                              <Input placeholder="06 12 34 56 78" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="adresse"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Adresse</FormLabel>
                          <FormControl>
                            <Input placeholder="Votre adresse" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="entreprise"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Entreprise visée</FormLabel>
                            <FormControl>
                              <Input placeholder="Nom de l'entreprise" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="poste"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Poste visé</FormLabel>
                            <FormControl>
                              <Input placeholder="Développeur web, Commercial..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Résumé de votre expérience</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Décrivez brièvement votre parcours professionnel"
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="formation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Formation</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Décrivez votre formation"
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="motivation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Motivation</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Pourquoi voulez-vous ce poste? Ou utilisez DocuGen pour générer cette section"
                              className="min-h-[150px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex flex-col md:flex-row gap-4 pt-4">
                      <Button 
                        type="button"
                        variant="outline"
                        className="flex items-center gap-2"
                        onClick={() => setActiveTab("apercu")}
                      >
                        Voir l'aperçu
                      </Button>
                      <Button 
                        type="button"
                        className="flex items-center gap-2"
                        onClick={generateMotivationLetter}
                        disabled={isGenerating}
                      >
                        <Sparkles className="h-4 w-4" />
                        {isGenerating ? "Génération en cours..." : "Générer avec DocuGen AI"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="apercu">
                <Card>
                  <CardHeader>
                    <CardTitle>Aperçu de votre lettre</CardTitle>
                    <CardDescription>
                      Voici à quoi ressemble votre lettre de motivation. Vous pouvez revenir en arrière pour effectuer des modifications.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div 
                      ref={letterPreviewRef} 
                      className="border rounded-lg p-8 bg-white shadow-sm min-h-[500px] font-serif"
                    >
                      <div className="text-right mb-8">
                        <p>{form.getValues("prenom")} {form.getValues("nom")}</p>
                        <p>{form.getValues("adresse")}</p>
                        <p>{form.getValues("telephone")}</p>
                        <p>{form.getValues("email")}</p>
                        <p>{new Date().toLocaleDateString('fr-FR')}</p>
                      </div>
                      
                      <div className="mb-8">
                        <p>À l'attention de la Direction des Ressources Humaines</p>
                        <p>{form.getValues("entreprise")}</p>
                      </div>
                      
                      <div className="mb-4">
                        <p className="font-semibold">Objet : Candidature pour le poste de {form.getValues("poste")}</p>
                      </div>
                      
                      <div className="mb-8 whitespace-pre-line">
                        {form.getValues("motivation")}
                      </div>
                      
                      <div className="text-right">
                        <p>{form.getValues("prenom")} {form.getValues("nom")}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setActiveTab("edition")}
                      >
                        Modifier
                      </Button>
                      <Button 
                        type="button"
                        onClick={downloadLetter}
                        className="flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Télécharger en PDF
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Form>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default LettreMotivation;
