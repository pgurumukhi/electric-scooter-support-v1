import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Users, HelpCircle, User, Search, Inbox, ShoppingCart } from "lucide-react";
import FloatingContact from "@/components/FloatingContact";
import FAQItem from "@/components/FAQItem";
import UserProfile from "@/components/UserProfile";
import AddFAQDialog from "@/components/AddFAQDialog";
import ContactSubmissionCard from "@/components/ContactSubmissionCard";
import SubmissionFilters from "@/components/SubmissionFilters";
import AddOrderDialog from "@/components/AddOrderDialog";
import OrdersTable from "@/components/OrdersTable";
import Logo from "@/components/Logo";
import { useFAQs } from "@/hooks/useFAQs";
import { useIsAdmin } from "@/hooks/useProfile";
import { useAdminContactSubmissions } from "@/hooks/useAdminContactSubmissions";
import { useOrders } from "@/hooks/useOrders";

const Index = () => {
  const { user } = useAuth();
  const { faqs, loading: faqsLoading, refetch } = useFAQs();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [submissionStatus, setSubmissionStatus] = useState<'all' | 'new' | 'in_progress' | 'resolved'>('all');
  const [submissionPage, setSubmissionPage] = useState<number>(1);
  const isAdmin = useIsAdmin();
  
  const { 
    submissions, 
    totalCount, 
    totalPages, 
    isLoading: submissionsLoading, 
    updateSubmission, 
    isUpdating 
  } = useAdminContactSubmissions({
    status: submissionStatus,
    page: submissionPage,
    limit: 5
  });

  const { data: orders, isLoading: ordersLoading } = useOrders();

  const categories = ["all", "general", "technical", "billing", "support"];
  
  // Filter FAQs based on category and search query
  const filteredFAQs = faqs?.filter(faq => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleFAQAdded = () => {
    refetch();
  };

  const handleBrowseFAQs = () => {
    setActiveTab("faqs");
  };

  const handleStatusChange = (status: 'all' | 'new' | 'in_progress' | 'resolved') => {
    setSubmissionStatus(status);
    setSubmissionPage(1); // Reset to first page when changing filter
  };

  const handlePageChange = (page: number) => {
    setSubmissionPage(page);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Logo */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Logo size="lg" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to HelpDesk Pro
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your one-stop solution for customer support and knowledge management
          </p>
          {user && (
            <div className="flex justify-center">
              <Badge variant="secondary" className="text-sm">
                Welcome back, {user.email}
              </Badge>
            </div>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`grid w-full ${isAdmin ? 'grid-cols-5' : 'grid-cols-3'}`}>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="faqs">FAQs</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            {isAdmin && <TabsTrigger value="queries">Queries</TabsTrigger>}
            {isAdmin && <TabsTrigger value="orders">Orders</TabsTrigger>}
          </TabsList>

          <TabsContent value="overview">
            {/* Feature Cards */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <BookOpen className="h-8 w-8 text-green-600" />
                    Knowledge Base
                  </CardTitle>
                  <CardDescription>
                    Browse our comprehensive FAQ section
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Find answers to common questions and learn how to make the most of our platform with detailed guides.
                  </p>
                  <Button variant="outline" className="w-full" onClick={handleBrowseFAQs}>
                    Browse FAQs
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Users className="h-8 w-8 text-purple-600" />
                    Customer Support
                  </CardTitle>
                  <CardDescription>
                    Get help when you need it most
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Use our floating contact button to get immediate assistance from our support team.
                  </p>
                  <Button variant="outline" className="w-full" disabled>
                    Contact Available 24/7
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Stats Section */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Users className="h-6 w-6" />
                  Support Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">99.9%</div>
                    <div className="text-gray-600">Uptime Guarantee</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">&lt;2min</div>
                    <div className="text-gray-600">Average Response Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">10k+</div>
                    <div className="text-gray-600">Happy Customers</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faqs">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <HelpCircle className="h-6 w-6" />
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>
                  Find answers to common questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Add FAQ Button - only show if user is admin */}
                {isAdmin && (
                  <div className="mb-6">
                    <AddFAQDialog onFAQAdded={handleFAQAdded} />
                  </div>
                )}

                {/* Search Input */}
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search FAQs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="capitalize"
                    >
                      {category}
                    </Button>
                  ))}
                </div>

                <Separator className="mb-6" />

                {/* FAQ Items */}
                {faqsLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredFAQs?.map((faq) => (
                      <FAQItem
                        key={faq.id}
                        faq={faq}
                      />
                    ))}
                    {filteredFAQs?.length === 0 && (
                      <p className="text-center text-gray-500 py-8">
                        {searchQuery ? "No FAQs found matching your search." : "No FAQs found for the selected category."}
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <div className="max-w-2xl mx-auto">
              <UserProfile />
            </div>
          </TabsContent>

          {isAdmin && (
            <TabsContent value="queries">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Inbox className="h-6 w-6" />
                    Contact Submissions
                  </CardTitle>
                  <CardDescription>
                    Manage and respond to customer queries
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {submissionsLoading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <SubmissionFilters
                        currentStatus={submissionStatus}
                        onStatusChange={handleStatusChange}
                        currentPage={submissionPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        totalCount={totalCount}
                      />
                      
                      {submissions && submissions.length > 0 ? (
                        <div className="space-y-4">
                          {submissions.map((submission) => (
                            <ContactSubmissionCard
                              key={submission.id}
                              submission={submission}
                              onUpdate={updateSubmission}
                              isUpdating={isUpdating}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Inbox className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-gray-600 mb-2">
                            {submissionStatus === 'all' ? 'No submissions yet' : `No ${submissionStatus.replace('_', ' ')} submissions`}
                          </h3>
                          <p className="text-gray-500">
                            {submissionStatus === 'all' 
                              ? 'Contact submissions will appear here when users send messages.'
                              : `No submissions with ${submissionStatus.replace('_', ' ')} status found.`
                            }
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {isAdmin && (
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <ShoppingCart className="h-6 w-6" />
                    Order Management
                  </CardTitle>
                  <CardDescription>
                    Manage customer orders and track their status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <AddOrderDialog />
                  </div>
                  
                  {ordersLoading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  ) : (
                    <OrdersTable orders={orders || []} />
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>

      <FloatingContact />
    </div>
  );
};

export default Index;
