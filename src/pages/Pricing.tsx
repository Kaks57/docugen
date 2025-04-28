
import React from "react";
import Layout from "@/components/Layout";

const Pricing = () => {
  return (
    <Layout>
      <section className="py-12 bg-gradient-to-b from-blue-50 to-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Notre service</h1>
            <p className="text-xl text-gray-600 mb-6">
              DocuGen - Votre outil de création de documents
            </p>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-semibold mb-4">Service 100% gratuit</h2>
              <p className="text-gray-600 mb-4">
                Tous nos outils de création de documents sont disponibles gratuitement.
                Créez autant de CV, lettres de motivation et lettres de résiliation que vous voulez.
              </p>
              <ul className="space-y-2 text-left mx-auto max-w-md mb-6">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Création et sauvegarde de CV professionnels
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Rédaction de lettres de motivation personnalisées
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Génération de lettres de résiliation
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Téléchargement illimité en format PDF
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Assistance par IA pour la rédaction
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Questions fréquentes</h2>
            
            <div className="space-y-6 text-left">
              <div>
                <h3 className="font-medium text-lg mb-2">Est-ce que mes documents sont sauvegardés ?</h3>
                <p className="text-gray-600">
                  Oui, une fois connecté à votre compte, tous vos documents sont automatiquement sauvegardés et accessibles depuis votre tableau de bord.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">Comment fonctionne DocuGen AI ?</h3>
                <p className="text-gray-600">
                  DocuGen AI est notre technologie d'intelligence artificielle qui analyse vos informations et génère automatiquement des contenus professionnels pour vos documents.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">Puis-je télécharger mes documents ?</h3>
                <p className="text-gray-600">
                  Oui, tous les documents créés peuvent être téléchargés au format PDF pour être utilisés où vous le souhaitez.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">Les documents sont-ils personnalisables ?</h3>
                <p className="text-gray-600">
                  Absolument, tous nos modèles sont entièrement personnalisables pour répondre à vos besoins spécifiques.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
