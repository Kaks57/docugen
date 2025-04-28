
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  popular?: boolean;
  className?: string;
  onButtonClick?: () => void;
}

const PricingCard = ({
  title,
  price,
  description,
  features,
  buttonText,
  popular,
  className,
  onButtonClick,
}: PricingCardProps) => {
  return (
    <div
      className={cn(
        "bg-white p-6 rounded-xl border shadow-sm transition-all",
        popular ? "border-primary shadow-md scale-105" : "border-gray-100",
        className
      )}
    >
      {popular && (
        <span className="bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full block w-fit mx-auto mb-4">
          Recommandé
        </span>
      )}
      <h3 className="text-xl font-medium text-center mb-2">{title}</h3>
      <div className="text-center mb-4">
        <span className="text-3xl font-bold">{price}</span>
        {price !== "Gratuit" && <span className="text-gray-500 ml-1">/mois</span>}
      </div>
      <p className="text-gray-500 text-sm text-center mb-6">{description}</p>
      <div className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="h-3 w-3 text-primary" />
            </div>
            <span className="text-sm text-gray-600">{feature}</span>
          </div>
        ))}
      </div>
      <Button
        className={cn("w-full", popular ? "" : "bg-secondary text-primary hover:bg-secondary/80")}
        variant={popular ? "default" : "outline"}
        onClick={onButtonClick}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default PricingCard;
