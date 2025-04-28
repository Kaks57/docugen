
import React from "react";
import PricingCard from "./PricingCard";
import { useNavigate } from "react-router-dom";

const PricingPlans = () => {
  const navigate = useNavigate();
  
  const handleSubscription = (plan: string) => {
    // Pour l'instant, on redirige simplement vers la page d'inscription
    // Plus tard, on peut intégrer un système de paiement
    navigate("/register", { state: { selectedPlan: plan } });
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 py-10">
      <PricingCard
        title="Gratuit"
        price="Gratuit"
        description="L'essentiel pour créer des documents basiques"
        features={[
          "Création de CV standard",
          "Lettres de motivation avec IA (limitées)",
          "Lettres de résiliation basiques",
          "Téléchargement en PDF",
          "2 modèles de documents"
        ]}
        buttonText="Commencer gratuitement"
        onButtonClick={() => handleSubscription("gratuit")}
      />
      
      <PricingCard
        title="Premium"
        price="9,99€"
        description="Tout ce dont vous avez besoin pour des documents professionnels"
        features={[
          "Création de CV avancés",
          "Lettres de motivation IA illimitées",
          "Modèles premium exclusifs",
          "Export en formats multiples (PDF, Word, etc.)",
          "Stockage de documents illimité",
          "Sans publicité"
        ]}
        buttonText="Choisir ce forfait"
        onButtonClick={() => handleSubscription("premium")}
        popular={true}
      />
      
      <PricingCard
        title="Entreprise"
        price="29,99€"
        description="Solution complète pour les professionnels et entreprises"
        features={[
          "Tous les avantages Premium",
          "Modèles exclusifs entreprise",
          "Personnalisation avancée",
          "Assistance prioritaire",
          "5 comptes utilisateurs",
          "API pour intégration tierce"
        ]}
        buttonText="Contacter les ventes"
        onButtonClick={() => handleSubscription("entreprise")}
      />
    </div>
  );
};

export default PricingPlans;
