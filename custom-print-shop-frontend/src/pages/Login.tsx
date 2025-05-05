
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { LogIn } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" })
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const { toast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = location.pathname === '/admin/login' || location.search.includes('admin=true');
  
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log('Login attempt:', data, 'isAdmin:', isAdmin);
    
    try {
      const success = await login(data.email, data.password);
      
      if (success) {
        const userJson = localStorage.getItem('currentUser');
        if (!userJson) {
          toast({
            title: "Login Error",
            description: "User data not found",
            variant: "destructive"
          });
          return;
        }
        
        const { isAdmin: userIsAdmin } = JSON.parse(userJson);
        
        if (isAdmin && !userIsAdmin) {
          toast({
            title: "Access Denied",
            description: "This account doesn't have admin privileges",
            variant: "destructive"
          });
          return;
        }
        
        if (isAdmin && userIsAdmin) {
          navigate('/admin', { replace: true });
        } else {
          navigate('/', { replace: true });
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              {isAdmin ? "Admin Login" : "Login"}
            </CardTitle>
            <CardDescription className="text-center">
              {isAdmin 
                ? "Enter your admin credentials to access the dashboard" 
                : "Enter your email and password to access your account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  <LogIn className="mr-2 h-4 w-4" /> {isAdmin ? "Admin Sign In" : "Sign In"}
                </Button>
              </form>
            </Form>
            {isAdmin ? (
              <div className="mt-4 text-sm text-center">
                <p className="text-muted-foreground">
                  For demo: Login as admin with email: admin@example.com, password: admin123
                </p>
              </div>
            ) : (
              <div className="mt-4 text-sm text-center">
                <p className="text-muted-foreground">
                  For demo: Login with email: user@example.com, password: user123
                </p>
              </div>
            )}
          </CardContent>
          {!isAdmin && (
            <CardFooter className="flex flex-col space-y-2">
              <div className="text-sm text-center text-gray-500">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary hover:underline">
                  Register here
                </Link>
              </div>
            </CardFooter>
          )}
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Login;