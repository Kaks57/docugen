
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface DocumentCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  popular?: boolean;
}

const DocumentCard = ({ title, description, icon, to, popular }: DocumentCardProps) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm relative">
      {popular && (
        <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
          Populaire
        </span>
      )}
      <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-lg text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-gray-500 text-sm mb-4">{description}</p>
      <Button asChild className="w-full">
        <Link to={to}>Créer maintenant</Link>
      </Button>
    </div>
  );
};

export default DocumentCard;
