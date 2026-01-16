import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useDemoLogin } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, User, Shield } from 'lucide-react';
import { toast } from 'sonner';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const { loginAsManager, loginAsEmployee } = useDemoLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }

    setIsSubmitting(true);
    try {
      await login({ email, password });
      toast.success('Login successful');
      navigate('/');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary">
            <Zap className="w-8 h-8 text-primary-foreground" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Knowledge Matrix</h1>
            <p className="text-muted-foreground">Sign in to your account</p>
          </div>
        </div>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Enter your credentials to access the dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Login Section */}
        <Card className="border-dashed">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Demo Access</CardTitle>
            <CardDescription className="text-sm">
              Try the app with demo accounts (no backend required)
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1 gap-2"
              onClick={loginAsManager}
            >
              <Shield className="w-4 h-4" />
              Login as Manager
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 gap-2"
              onClick={loginAsEmployee}
            >
              <User className="w-4 h-4" />
              Login as Employee
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
