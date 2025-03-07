
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Briefcase } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FadeIn from '@/components/ui/FadeIn';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, we would authenticate the user
      // const login = async () => {
      //   try {
      //     const response = await fetch('/api/auth/login', {
      //       method: 'POST',
      //       headers: {
      //         'Content-Type': 'application/json',
      //       },
      //       body: JSON.stringify({ email, password }),
      //     });
      //     const data = await response.json();
      //     if (response.ok) {
      //       // Store the token and redirect to the dashboard
      //       localStorage.setItem('token', data.token);
      //       window.location.href = '/dashboard';
      //     } else {
      //       toast.error(data.message || 'Failed to login');
      //     }
      //   } catch (error) {
      //     toast.error('An error occurred. Please try again.');
      //   }
      // };
      
      toast.success('Login successful!');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container-custom py-16">
        <div className="max-w-md mx-auto">
          <FadeIn>
            <div className="text-center mb-8">
              <div className="flex justify-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <Briefcase className="h-7 w-7 text-primary" />
                </div>
              </div>
              <h1 className="text-2xl font-bold mt-5">Welcome back</h1>
              <p className="text-muted-foreground mt-2">
                Sign in to your account to continue
              </p>
            </div>
          </FadeIn>
          
          <FadeIn delay={100}>
            <div className="bg-white p-8 rounded-xl border border-border/60 shadow-sm">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-primary border-border focus:ring-primary"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm">
                        Remember me
                      </label>
                    </div>
                    <a 
                      href="#" 
                      className="text-sm text-primary hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full btn btn-primary py-2.5"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign in'}
                  </button>
                </div>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-primary hover:underline">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
