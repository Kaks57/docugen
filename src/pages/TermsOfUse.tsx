
import React from "react";
import Layout from "@/components/Layout";

const TermsOfUse = () => {
  return (
    <Layout>
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-8">Conditions d'Utilisation</h1>
        
        <div className="prose prose-gray max-w-none">
          <p className="text-lg mb-6">
            Dernière mise à jour : 28 avril 2025
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptation des conditions</h2>
          <p>
            En accédant à DocuGen et en utilisant nos services, vous acceptez d'être lié par ces conditions d'utilisation. Si vous n'acceptez pas tout ou partie de ces conditions, vous ne pouvez pas utiliser notre service.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Description du service</h2>
          <p>
            DocuGen est une plateforme en ligne qui permet aux utilisateurs de créer, éditer, et gérer des documents professionnels tels que des CV, des lettres de motivation, et des lettres de résiliation.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Comptes utilisateurs</h2>
          <p>
            Pour accéder à certaines fonctionnalités de notre service, vous devez créer un compte. Vous êtes responsable de :
          </p>
          <ul className="list-disc pl-6 mt-2 mb-4 space-y-2">
            <li>Maintenir la confidentialité de votre mot de passe</li>
            <li>Limiter l'accès à votre ordinateur et à votre compte</li>
            <li>Toutes les activités qui se produisent sous votre compte</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Contenu utilisateur</h2>
          <p>
            Vous conservez tous les droits sur le contenu que vous soumettez à DocuGen. En soumettant du contenu, vous nous accordez une licence mondiale, non exclusive et libre de redevance pour utiliser, stocker et traiter ce contenu uniquement dans le but de vous fournir notre service.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Abonnements et paiements</h2>
          <p>
            Certaines fonctionnalités de notre service sont disponibles sur abonnement payant. Les conditions suivantes s'appliquent :
          </p>
          <ul className="list-disc pl-6 mt-2 mb-4 space-y-2">
            <li>Les paiements sont non remboursables sauf mention contraire</li>
            <li>Nous nous réservons le droit de modifier les tarifs avec un préavis raisonnable</li>
            <li>Vous pouvez annuler votre abonnement à tout moment</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Propriété intellectuelle</h2>
          <p>
            Le service et son contenu original, ses fonctionnalités et sa fonctionnalité sont la propriété exclusive de DocuGen et sont protégés par les lois internationales sur le droit d'auteur, les marques déposées, les brevets, les secrets commerciaux et autres lois sur la propriété intellectuelle.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Limitation de responsabilité</h2>
          <p>
            DocuGen ne sera pas responsable des dommages indirects, accessoires, spéciaux, consécutifs ou punitifs, ou de toute perte de profits ou de revenus, qu'ils soient encourus directement ou indirectement, ou de toute perte de données, d'utilisation, de fonds de commerce, ou d'autres pertes intangibles.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Modifications des conditions</h2>
          <p>
            Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications entreront en vigueur immédiatement après leur publication sur cette page.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Contact</h2>
          <p>
            Si vous avez des questions concernant ces conditions d'utilisation, veuillez nous contacter à l'adresse suivante : contact@docugen.fr
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfUse;
