
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useProfile, useIsAdmin } from '@/hooks/useProfile';
import { useAuth } from '@/contexts/AuthContext';
import AdminBadge from './AdminBadge';
import { User, Mail, Calendar, Shield } from 'lucide-react';

const UserProfile: React.FC = () => {
  const { user, signOut } = useAuth();
  const { data: profile, isLoading } = useProfile();
  const isAdmin = useIsAdmin();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">No profile data available.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              User Profile
            </CardTitle>
            <CardDescription>Your account information</CardDescription>
          </div>
          <AdminBadge isAdmin={isAdmin} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <span>{profile.email}</span>
        </div>
        
        <div className="flex items-center gap-3">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>Member since {new Date(profile.created_at).toLocaleDateString()}</span>
        </div>
        
        {isAdmin && (
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <Shield className="h-4 w-4 text-primary" />
            <span className="font-medium">Administrator Access Enabled</span>
          </div>
        )}
        
        <div className="pt-4 border-t">
          <Button 
            onClick={signOut}
            variant="outline"
            className="w-full"
          >
            Sign Out
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
