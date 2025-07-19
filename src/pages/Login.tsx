
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import Logo from '@/components/Logo';

const Login = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { sendLoginCode } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    const { error } = await sendLoginCode(email);
    setLoading(false);

    if (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Magic Link Sent",
        description: "Please check your email and click the magic link to sign in",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Logo size="md" />
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">
              Enter your email to receive a magic link for signing in
            </p>
          </div>

          <form onSubmit={handleSendMagicLink} className="space-y-6">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="mt-1"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Sending Magic Link...' : 'Send Magic Link'}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <Button
              variant="link"
              onClick={() => navigate('/signup')}
              className="text-sm"
            >
              Don't have an account? Sign Up
            </Button>
            <br />
            <Button
              variant="link"
              onClick={() => navigate('/')}
              className="text-sm"
            >
              Back to FAQ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
