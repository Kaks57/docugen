
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate } from "react-router-dom";
import { FileText, Mail, X, Download, Edit } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Component for displaying a document
const DocumentItem = ({ document, onEdit }) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const getIcon = () => {
    switch (document.type) {
      case "cv":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "lettre-motivation":
        return <Mail className="h-5 w-5 text-green-500" />;
      case "resiliation":
        return <X className="h-5 w-5 text-red-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTypeName = () => {
    switch (document.type) {
      case "cv":
        return "CV";
      case "lettre-motivation":
        return "Lettre de motivation";
      case "resiliation":
        return "Lettre de résiliation";
      default:
        return "Document";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleEdit = () => {
    switch (document.type) {
      case "cv":
        navigate('/cv', { state: { editingDocument: document } });
        break;
      case "lettre-motivation":
        navigate('/lettre-motivation', { state: { editingDocument: document } });
        break;
      case "resiliation":
        navigate('/resiliation', { state: { editingDocument: document } });
        break;
      default:
        break;
    }
  };

  const handleDownload = async () => {
    try {
      toast({
        title: "Préparation du téléchargement",
        description: "Génération de votre document en cours...",
      });
      
      // Create a temporary div to render the document content
      const tempDiv = document.createElement('div');
      tempDiv.className = 'p-8 bg-white font-serif';
      tempDiv.style.width = '595px'; // A4 width in pixels at 72 PPI
      
      // Create document content based on type
      let content = '';
      
      switch (document.type) {
        case "cv":
          content = `<h1 style="font-size: 24px; margin-bottom: 16px;">${document.name}</h1>
                    <div>${document.content || "Contenu du CV"}</div>`;
          break;
        case "lettre-motivation":
          content = `<h1 style="font-size: 24px; margin-bottom: 16px;">${document.name}</h1>
                    <div>${document.content || "Contenu de la lettre de motivation"}</div>`;
          break;
        case "resiliation":
          content = `<h1 style="font-size: 24px; margin-bottom: 16px;">${document.name}</h1>
                    <div>${document.content || "Contenu de la lettre de résiliation"}</div>`;
          break;
        default:
          content = `<h1 style="font-size: 24px; margin-bottom: 16px;">${document.name}</h1>`;
      }
      
      tempDiv.innerHTML = content;
      document.body.appendChild(tempDiv);
      
      const canvas = await html2canvas(tempDiv);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${document.name}.pdf`);
      
      // Clean up
      document.body.removeChild(tempDiv);
      
      toast({
        title: "Document téléchargé",
        description: "Votre document a été enregistré au format PDF.",
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
    <Card className="overflow-hidden hover:border-primary/50 transition-colors group">
      <CardContent className="p-0">
        <div className="flex items-center p-4">
          <div className="mr-4 p-2 rounded-full bg-gray-100">
            {getIcon()}
          </div>
          <div className="flex-1">
            <h4 className="font-medium">{document.name}</h4>
            <p className="text-sm text-gray-500">
              {getTypeName()} • Modifié le {formatDate(document.date)}
            </p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="ghost" onClick={handleEdit}>
              <Edit className="mr-2 h-4 w-4" />
              Modifier
            </Button>
            <Button size="sm" variant="outline" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Télécharger
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({
    name: "",
    email: "",
    avatar: "",
  });

  useEffect(() => {
    // Load user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser({
        name: `${parsedUser.firstName} ${parsedUser.lastName}`,
        email: parsedUser.email,
        avatar: "",
      });
    }
    
    // Load documents from localStorage
    const loadDocuments = () => {
      const cvs = JSON.parse(localStorage.getItem("cvs") || "[]");
      const letters = JSON.parse(localStorage.getItem("motivationLetters") || "[]");
      const resiliations = JSON.parse(localStorage.getItem("resiliations") || "[]");
      
      const allDocs = [
        ...cvs.map(doc => ({ ...doc, type: "cv" })),
        ...letters.map(doc => ({ ...doc, type: "lettre-motivation" })),
        ...resiliations.map(doc => ({ ...doc, type: "resiliation" }))
      ];
      
      // Sort by date (newest first)
      allDocs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      setDocuments(allDocs);
      setIsLoading(false);
    };

    loadDocuments();
  }, []);
  
  // Add the handleEdit function to be passed to DocumentItem
  const handleEdit = (document) => {
    switch (document.type) {
      case "cv":
        navigate('/cv', { state: { editingDocument: document } });
        break;
      case "lettre-motivation":
        navigate('/lettre-motivation', { state: { editingDocument: document } });
        break;
      case "resiliation":
        navigate('/resiliation', { state: { editingDocument: document } });
        break;
      default:
        break;
    }
  };
  
  const navigate = useNavigate();

  return (
    <Layout>
      <section className="py-10 bg-gray-50">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-xl">{user.name ? user.name.charAt(0) : "U"}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold mb-1">Tableau de bord</h1>
                <p className="text-gray-600">
                  Bienvenue, {user.name}
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button asChild>
                <Link to="/cv">
                  <FileText className="mr-2 h-4 w-4" />
                  Créer un CV
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/lettre-motivation">
                  <Mail className="mr-2 h-4 w-4" />
                  Lettre de motivation
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container">
          <Tabs defaultValue="documents" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8 w-full sm:w-auto">
              <TabsTrigger value="documents">Mes documents</TabsTrigger>
              <TabsTrigger value="profile">Mon profil</TabsTrigger>
              <TabsTrigger value="settings">Paramètres</TabsTrigger>
            </TabsList>

            <TabsContent value="documents" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Documents récents</h2>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 gap-4">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="animate-pulse">
                      <CardContent className="p-4">
                        <div className="h-12 bg-gray-200 rounded-md"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {documents.map((doc) => (
                    <DocumentItem key={doc.id} document={doc} onEdit={handleEdit} />
                  ))}
                  {documents.length === 0 && (
                    <Card className="p-8 text-center">
                      <h3 className="font-medium text-gray-600">Vous n'avez pas encore créé de documents</h3>
                      <p className="text-sm text-gray-500 mt-2">
                        Créez votre premier document en cliquant sur un des boutons ci-dessus.
                      </p>
                    </Card>
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Mon profil</CardTitle>
                  <CardDescription>
                    Gérez vos informations personnelles et préférences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Informations personnelles</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Nom complet</p>
                        <p>{user.name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Email</p>
                        <p>{user.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Préférences</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Format de téléchargement par défaut</p>
                        <p>PDF</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Langue</p>
                        <p>Français</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Modifier le profil</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Paramètres</CardTitle>
                  <CardDescription>
                    Gérez vos préférences et paramètres de sécurité
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-4">Sécurité</h3>
                    <Button variant="outline">Changer de mot de passe</Button>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-4">Notifications</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p>Emails de nouveautés</p>
                        <Button variant="ghost" size="sm">Désactiver</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <p>Rappels</p>
                        <Button variant="ghost" size="sm">Désactiver</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-4">Données</h3>
                    <div className="flex gap-2">
                      <Button variant="outline">Exporter mes données</Button>
                      <Button variant="destructive">Supprimer mon compte</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
