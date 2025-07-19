
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';

interface AdminBadgeProps {
  isAdmin: boolean;
  className?: string;
}

const AdminBadge: React.FC<AdminBadgeProps> = ({ isAdmin, className }) => {
  if (!isAdmin) return null;

  return (
    <Badge variant="default" className={`flex items-center gap-1 ${className}`}>
      <Shield className="h-3 w-3" />
      Administrator
    </Badge>
  );
};

export default AdminBadge;
