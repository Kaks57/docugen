
import React from "react";
import Layout from "@/components/Layout";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-8">Politique de Confidentialité</h1>
        
        <div className="prose prose-gray max-w-none">
          <p className="text-lg mb-6">
            Dernière mise à jour : 28 avril 2025
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
          <p>
            Bienvenue sur DocuGen. Nous sommes engagés à protéger vos données personnelles et votre vie privée. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations lorsque vous utilisez notre service.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Collecte des données</h2>
          <p>
            Nous collectons plusieurs types d'informations pour diverses raisons :
          </p>
          <ul className="list-disc pl-6 mt-2 mb-4 space-y-2">
            <li>
              <strong>Informations personnelles</strong> : Lorsque vous créez un compte, nous collectons votre nom, prénom, adresse e-mail et mot de passe.
            </li>
            <li>
              <strong>Données de document</strong> : Les informations que vous saisissez dans vos CV, lettres de motivation, et autres documents générés.
            </li>
            <li>
              <strong>Données d'utilisation</strong> : Informations sur la façon dont vous accédez et utilisez notre service.
            </li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Utilisation des données</h2>
          <p>
            Nous utilisons vos données pour :
          </p>
          <ul className="list-disc pl-6 mt-2 mb-4 space-y-2">
            <li>Fournir et maintenir notre service</li>
            <li>Améliorer et personnaliser votre expérience</li>
            <li>Communiquer avec vous concernant votre compte</li>
            <li>Sauvegarder vos documents et configurations</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Partage des données</h2>
          <p>
            Nous ne vendons pas vos données personnelles. Nous pouvons partager certaines informations avec :
          </p>
          <ul className="list-disc pl-6 mt-2 mb-4 space-y-2">
            <li>Nos prestataires de services qui nous aident à exploiter notre plateforme</li>
            <li>Les autorités légales lorsque la loi l'exige</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Sécurité des données</h2>
          <p>
            Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données contre l'accès, l'altération, la divulgation ou la destruction non autorisés.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Vos droits</h2>
          <p>
            Vous avez le droit de :
          </p>
          <ul className="list-disc pl-6 mt-2 mb-4 space-y-2">
            <li>Accéder à vos données personnelles</li>
            <li>Rectifier vos données si elles sont inexactes</li>
            <li>Demander la suppression de vos données</li>
            <li>Vous opposer au traitement de vos données</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contact</h2>
          <p>
            Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter à l'adresse suivante : contact@docugen.fr
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
