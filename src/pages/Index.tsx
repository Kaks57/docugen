
import React from "react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import FeatureCard from "@/components/FeatureCard";
import DocumentCard from "@/components/DocumentCard";
import Testimonial from "@/components/Testimonial";
import PricingCard from "@/components/PricingCard";
import { ArrowRight, Clock, FileText, FileCheck, PenTool, File, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-gradient py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Créez des documents professionnels en quelques minutes
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Générez facilement des CV, lettres de motivation et documents administratifs
              de qualité professionnelle gratuitement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2">
                Créer un document <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Découvrir les modèles
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Documents disponibles</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choisissez parmi notre sélection de modèles pour créer rapidement des documents
              professionnels adaptés à vos besoins.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DocumentCard
              title="CV professionnel"
              description="Créez un CV attrayant et professionnel pour décrocher l'emploi de vos rêves."
              icon={<FileText className="h-6 w-6" />}
              to="/cv"
              popular
            />
            <DocumentCard
              title="Lettre de motivation"
              description="Rédigez une lettre de motivation convaincante pour accompagner votre candidature."
              icon={<PenTool className="h-6 w-6" />}
              to="/lettre-motivation"
            />
            <DocumentCard
              title="Lettre de résiliation"
              description="Mettez fin à un contrat ou un abonnement avec un modèle de lettre adapté."
              icon={<File className="h-6 w-6" />}
              to="/resiliation"
            />
            <DocumentCard
              title="Attestation"
              description="Générez rapidement des attestations diverses pour vos démarches administratives."
              icon={<FileCheck className="h-6 w-6" />}
              to="/attestation"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Pourquoi choisir DocuGen ?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Notre plateforme vous offre tout ce dont vous avez besoin pour créer des documents
              professionnels en un temps record.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Clock className="h-6 w-6" />}
              title="Rapide et facile"
              description="Créez des documents de qualité en quelques minutes, sans compétences techniques particulières."
            />
            <FeatureCard
              icon={<FileText className="h-6 w-6" />}
              title="Modèles professionnels"
              description="Accédez à une bibliothèque de modèles élégants et professionnels pour tous vos besoins."
            />
            <FeatureCard
              icon={<BookOpen className="h-6 w-6" />}
              title="Conseils d'experts"
              description="Bénéficiez de conseils et d'exemples pour optimiser vos documents et maximiser leur impact."
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Ce que disent nos utilisateurs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez comment DocuGen a aidé des milliers d'utilisateurs à créer des documents professionnels rapidement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Testimonial
              content="J'ai créé mon CV en moins de 15 minutes et j'ai décroché un entretien dès la semaine suivante. Le design était vraiment professionnel !"
              author="Marie D."
              role="Assistante administrative"
            />
            <Testimonial
              content="La lettre de résiliation générée m'a fait économiser beaucoup de temps et m'a évité des recherches juridiques. Merci DocuGen !"
              author="Thomas L."
              role="Développeur web"
            />
            <Testimonial
              content="L'interface est intuitive et les conseils pour rédiger ma lettre de motivation ont été précieux. Je recommande vivement !"
              author="Sophie M."
              role="Étudiante en marketing"
            />
          </div>
        </div>
      </section>

      

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Prêt à créer votre document ?</h2>
            <p className="text-xl opacity-90 mb-8">
              Commencez gratuitement et obtenez un document professionnel en quelques minutes.
            </p>
            <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90">
              <Link to="/cv">Créer mon document maintenant</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
