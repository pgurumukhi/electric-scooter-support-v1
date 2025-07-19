
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Mail, Calendar, MessageSquare, User } from 'lucide-react';
import { AdminContactSubmission } from '@/hooks/useAdminContactSubmissions';

interface ContactSubmissionCardProps {
  submission: AdminContactSubmission;
  onUpdate: (id: string, response: string, status: 'new' | 'in_progress' | 'resolved') => void;
  isUpdating: boolean;
}

const ContactSubmissionCard: React.FC<ContactSubmissionCardProps> = ({
  submission,
  onUpdate,
  isUpdating
}) => {
  const [response, setResponse] = useState(submission.response || '');
  const [status, setStatus] = useState<'new' | 'in_progress' | 'resolved'>(submission.status);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = () => {
    if (response.trim()) {
      onUpdate(submission.id, response, status);
      setIsEditing(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Mail className="h-4 w-4" />
              {submission.email}
            </CardTitle>
            <CardDescription className="flex items-center gap-4 mt-2">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(submission.created_at).toLocaleDateString()} at{' '}
                {new Date(submission.created_at).toLocaleTimeString()}
              </span>
            </CardDescription>
          </div>
          <Badge className={getStatusColor(submission.status)}>
            {submission.status.replace('_', ' ')}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium flex items-center gap-2 mb-2">
            <MessageSquare className="h-4 w-4" />
            Message:
          </h4>
          <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
            {submission.message}
          </p>
        </div>

        {submission.response && !isEditing && (
          <div>
            <h4 className="font-medium flex items-center gap-2 mb-2">
              <User className="h-4 w-4" />
              Response:
            </h4>
            <p className="text-gray-700 bg-blue-50 p-3 rounded-lg">
              {submission.response}
            </p>
            {submission.responded_at && (
              <p className="text-sm text-gray-500 mt-1">
                Responded on {new Date(submission.responded_at).toLocaleDateString()} at{' '}
                {new Date(submission.responded_at).toLocaleTimeString()}
              </p>
            )}
          </div>
        )}

        {isEditing && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Response:
              </label>
              <Textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Enter your response..."
                rows={4}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status:
              </label>
              <Select value={status} onValueChange={(value: 'new' | 'in_progress' | 'resolved') => setStatus(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={handleSubmit} 
                disabled={!response.trim() || isUpdating}
              >
                {isUpdating ? 'Saving...' : 'Save Response'}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsEditing(false);
                  setResponse(submission.response || '');
                  setStatus(submission.status);
                }}
                disabled={isUpdating}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {!isEditing && (
          <Button 
            variant="outline" 
            onClick={() => setIsEditing(true)}
            className="w-full"
          >
            {submission.response ? 'Edit Response' : 'Add Response'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactSubmissionCard;
