
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    setIsLoading(true);
    
    console.info("Tentative de connexion avec:", data);
    
    // Simulate API call
    setTimeout(() => {
      // Mock user data
      const userData = {
        id: "user-" + Math.random().toString(36).substring(2, 9),
        email: data.email,
        firstName: data.email.split('@')[0], // For demo purposes
        lastName: "Utilisateur", // For demo purposes
      };
      
      // Save user data to localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      
      // Create empty arrays for document storage if they don't exist
      if (!localStorage.getItem("cvs")) {
        localStorage.setItem("cvs", JSON.stringify([]));
      }
      
      if (!localStorage.getItem("motivationLetters")) {
        localStorage.setItem("motivationLetters", JSON.stringify([]));
      }
      
      if (!localStorage.getItem("resiliations")) {
        localStorage.setItem("resiliations", JSON.stringify([]));
      }
      
      setIsLoading(false);
      
      toast({
        title: "Connexion réussie",
        description: "Vous êtes maintenant connecté à votre compte.",
      });
      
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <Layout>
      <div className="container max-w-md py-20">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Connexion</CardTitle>
            <CardDescription className="text-center">
              Saisissez votre email et votre mot de passe pour vous connecter
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                    Mot de passe oublié?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register("password", { 
                    required: "Le mot de passe est requis",
                    minLength: {
                      value: 6,
                      message: "Le mot de passe doit contenir au moins 6 caractères"
                    }
                  })}
                />
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password.message?.toString()}</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? "Connexion en cours..." : "Se connecter"}
              </Button>
              <div className="text-center text-sm">
                Pas encore de compte?{" "}
                <Link to="/register" className="text-primary hover:underline">
                  S'inscrire
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;
