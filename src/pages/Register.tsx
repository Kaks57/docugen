
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormData>();
  const password = watch("password");

  const onSubmit = (data: RegisterFormData) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Create user object
      const userData = {
        id: "user-" + Math.random().toString(36).substring(2, 9),
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName
      };
      
      // Save user data to localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      
      // Create empty arrays for document storage
      localStorage.setItem("cvs", JSON.stringify([]));
      localStorage.setItem("motivationLetters", JSON.stringify([]));
      localStorage.setItem("resiliations", JSON.stringify([]));
      
      setIsLoading(false);
      
      toast({
        title: "Compte créé avec succès",
        description: "Votre compte a été créé avec succès.",
      });
      
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <Layout>
      <div className="container max-w-md py-10">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Créer un compte</CardTitle>
            <CardDescription className="text-center">
              Saisissez vos informations pour créer un compte
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input
                    id="firstName"
                    {...register("firstName", { 
                      required: "Le prénom est requis" 
                    })}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-destructive">{errors.firstName.message?.toString()}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input
                    id="lastName"
                    {...register("lastName", { 
                      required: "Le nom est requis" 
                    })}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-destructive">{errors.lastName.message?.toString()}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@example.com"
                  {...register("email", { 
                    required: "L'email est requis",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Adresse email invalide"
                    }
                  })}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message?.toString()}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password", { 
                    required: "Le mot de passe est requis",
                    minLength: {
                      value: 8,
                      message: "Le mot de passe doit contenir au moins 8 caractères"
                    }
                  })}
                />
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password.message?.toString()}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword", { 
                    required: "Veuillez confirmer le mot de passe",
                    validate: value => value === password || "Les mots de passe ne correspondent pas"
                  })}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">{errors.confirmPassword.message?.toString()}</p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" {...register("terms", { required: "Vous devez accepter les conditions" })} />
                <Label htmlFor="terms" className="text-sm">
                  J'accepte les{" "}
                  <Link to="/cgu" className="text-primary hover:underline">
                    conditions d'utilisation
                  </Link>{" "}
                  et la{" "}
                  <Link to="/confidentialite" className="text-primary hover:underline">
                    politique de confidentialité
                  </Link>
                </Label>
              </div>
              {errors.terms && (
                <p className="text-sm text-destructive">{errors.terms.message?.toString()}</p>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? "Création en cours..." : "Créer un compte"}
              </Button>
              <div className="text-center text-sm">
                Vous avez déjà un compte?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Se connecter
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default Register;
