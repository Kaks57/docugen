
import React, { useState, useRef } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const formSchema = z.object({
  nom: z.string().min(1, "Nom requis"),
  prenom: z.string().min(1, "Prénom requis"),
  adresse: z.string().min(1, "Adresse requise"),
  codePostal: z.string().min(5, "Code postal requis"),
  ville: z.string().min(1, "Ville requise"),
  entreprise: z.string().min(1, "Nom du destinataire requis"),
  adresseEntreprise: z.string().min(1, "Adresse du destinataire requise"),
  codePostalEntreprise: z.string().min(5, "Code postal requis"),
  villeEntreprise: z.string().min(1, "Ville requise"),
  type: z.string().min(1, "Type de résiliation requis"),
  reference: z.string().min(1, "Référence client/contrat requise"),
  objet: z.string().min(1, "Objet de la résiliation requis"),
  contenu: z.string().min(10, "Contenu de la lettre requis"),
});

const typeResiliations = [
  { value: "abonnement", label: "Abonnement (téléphone, internet, streaming)" },
  { value: "assurance", label: "Assurance (auto, habitation, santé)" },
  { value: "bail", label: "Bail locatif" },
  { value: "salle_sport", label: "Salle de sport" },
  { value: "autre", label: "Autre service" },
];

const Resiliation = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("edition");
  const letterPreviewRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      adresse: "",
      codePostal: "",
      ville: "",
      entreprise: "",
      adresseEntreprise: "",
      codePostalEntreprise: "",
      villeEntreprise: "",
      type: "",
      reference: "",
      objet: "Résiliation de contrat",
      contenu: "",
    },
  });

  const handleTypeChange = (value: string) => {
    form.setValue("type", value);
    
    // Préremplir le contenu en fonction du type de résiliation
    let contenu = "";
    
    switch (value) {
      case "abonnement":
        contenu = `Je souhaite par la présente résilier mon contrat référencé ci-dessus.\n\nConformément aux dispositions légales en vigueur et aux conditions générales de vente, je vous demande de bien vouloir prendre en compte cette demande de résiliation dans les délais prévus.\n\nJe vous remercie de me confirmer la bonne réception de ce courrier ainsi que la date effective de résiliation.`;
        break;
      case "assurance":
        contenu = `Je vous informe par la présente de ma décision de résilier mon contrat d'assurance référencé ci-dessus.\n\nJe vous prie de bien vouloir procéder à la résiliation de ce contrat conformément aux dispositions légales (loi Hamon/Chatel) à compter de la réception de ce courrier.\n\nJe vous remercie de me confirmer cette résiliation par écrit et de me préciser sa date effective.`;
        break;
      case "bail":
        contenu = `Je vous informe par la présente de ma décision de résilier le bail d'habitation pour le logement situé à l'adresse mentionnée ci-dessus.\n\nConformément à la législation en vigueur, je respecte un préavis de 3 mois à compter de la réception de ce courrier.\n\nJe vous remercie de bien vouloir m'indiquer vos disponibilités pour effectuer l'état des lieux de sortie.`;
        break;
      case "salle_sport":
        contenu = `Je vous informe par la présente de ma volonté de résilier mon abonnement à votre salle de sport, référencé ci-dessus.\n\nConformément aux conditions générales d'abonnement et aux dispositions légales applicables, je vous prie de bien vouloir procéder à la résiliation de mon contrat.\n\nJe vous serais reconnaissant de bien vouloir me confirmer la prise en compte de cette demande ainsi que la date effective de résiliation.`;
        break;
      default:
        contenu = `Je vous informe par la présente de ma décision de résilier le contrat/service référencé ci-dessus.\n\nConformément aux conditions contractuelles et aux dispositions légales en vigueur, je vous demande de bien vouloir prendre en compte cette demande dans les meilleurs délais.\n\nJe vous remercie de me confirmer par écrit la bonne réception de ce courrier ainsi que la date effective de résiliation.`;
    }
    
    form.setValue("contenu", contenu);
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
      pdf.save(`${form.getValues("prenom")}_${form.getValues("nom")}_Resiliation.pdf`);
      
      toast({
        title: "Lettre téléchargée",
        description: "Votre lettre de résiliation a été enregistrée au format PDF.",
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
          <h1 className="text-3xl font-bold mb-2">Créer une lettre de résiliation</h1>
          <p className="text-gray-600 mb-4">
            Générez facilement une lettre de résiliation personnalisée pour tout type de contrat ou abonnement.
          </p>
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
                      Complétez tous les champs pour générer une lettre de résiliation personnalisée
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Vos informations</h3>
                      
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
                          name="codePostal"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Code postal</FormLabel>
                              <FormControl>
                                <Input placeholder="Code postal" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="ville"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Ville</FormLabel>
                              <FormControl>
                                <Input placeholder="Ville" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4 pt-4">
                      <h3 className="text-lg font-medium">Informations du destinataire</h3>
                      
                      <FormField
                        control={form.control}
                        name="entreprise"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom de l'entreprise / du destinataire</FormLabel>
                            <FormControl>
                              <Input placeholder="Nom de l'entreprise" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="adresseEntreprise"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Adresse du destinataire</FormLabel>
                            <FormControl>
                              <Input placeholder="Adresse du destinataire" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="codePostalEntreprise"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Code postal du destinataire</FormLabel>
                              <FormControl>
                                <Input placeholder="Code postal" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="villeEntreprise"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Ville du destinataire</FormLabel>
                              <FormControl>
                                <Input placeholder="Ville" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4 pt-4">
                      <h3 className="text-lg font-medium">Détails de la résiliation</h3>
                      
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Type de résiliation</FormLabel>
                            <Select onValueChange={handleTypeChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionnez un type de résiliation" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {typeResiliations.map((type) => (
                                  <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="reference"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Référence client / contrat</FormLabel>
                            <FormControl>
                              <Input placeholder="Numéro de client, contrat, etc." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="objet"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Objet de la lettre</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: Résiliation de contrat" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="contenu"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contenu de la lettre</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Contenu de votre lettre de résiliation"
                                className="min-h-[200px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button type="button" onClick={() => setActiveTab("apercu")}>
                        Voir l'aperçu
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
                      Voici à quoi ressemble votre lettre de résiliation. Vous pouvez revenir en arrière pour effectuer des modifications.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div 
                      ref={letterPreviewRef} 
                      className="border rounded-lg p-8 bg-white shadow-sm min-h-[600px] font-serif"
                    >
                      <div className="text-right mb-8">
                        <p>{form.getValues("prenom")} {form.getValues("nom")}</p>
                        <p>{form.getValues("adresse")}</p>
                        <p>{form.getValues("codePostal")} {form.getValues("ville")}</p>
                        <p>Référence client : {form.getValues("reference")}</p>
                        <p>{new Date().toLocaleDateString('fr-FR')}</p>
                      </div>
                      
                      <div className="mb-8">
                        <p>{form.getValues("entreprise")}</p>
                        <p>{form.getValues("adresseEntreprise")}</p>
                        <p>{form.getValues("codePostalEntreprise")} {form.getValues("villeEntreprise")}</p>
                      </div>
                      
                      <div className="mb-4">
                        <p className="font-semibold">Objet : {form.getValues("objet")}</p>
                      </div>
                      
                      <div className="mb-2">
                        <p>Madame, Monsieur,</p>
                      </div>
                      
                      <div className="mb-8 whitespace-pre-line">
                        {form.getValues("contenu")}
                      </div>
                      
                      <div className="text-right">
                        <p>Veuillez agréer, Madame, Monsieur, l'expression de mes salutations distinguées.</p>
                        <p className="mt-8">{form.getValues("prenom")} {form.getValues("nom")}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
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

export default Resiliation;
