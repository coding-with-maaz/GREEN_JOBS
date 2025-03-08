import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/services/api-service";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      return authApi.login(email, password);
    },
    onSuccess: (data) => {
      // Store token and user data (in a real app, use a more secure method)
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      toast({
        title: "Login successful",
        description: "Welcome back!",
        duration: 3000,
      });
      
      navigate('/');
    },
    onError: (error: Error) => {
      toast({
        title: "Login failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
        duration: 4000,
      });
    },
  });
}

export function useRegister() {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  return useMutation({
    mutationFn: async (userData: any) => {
      return authApi.register(userData);
    },
    onSuccess: (data) => {
      // Store token and user data (in a real app, use a more secure method)
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      toast({
        title: "Registration successful",
        description: "Your account has been created",
        duration: 3000,
      });
      
      navigate('/');
    },
    onError: (error: Error) => {
      toast({
        title: "Registration failed",
        description: error.message || "Could not create account",
        variant: "destructive",
        duration: 4000,
      });
    },
  });
}

export function useForgotPassword() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (email: string) => {
      return authApi.forgotPassword(email);
    },
    onSuccess: () => {
      toast({
        title: "Email sent",
        description: "If your email exists in our system, you will receive recovery instructions",
        duration: 5000,
      });
    },
    onError: () => {
      // For security reasons, we don't want to reveal if the email exists or not
      toast({
        title: "Email sent",
        description: "If your email exists in our system, you will receive recovery instructions",
        duration: 5000,
      });
    },
  });
}
