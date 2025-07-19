
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MessageSquare, BookOpen, Phone, Users, HelpCircle, User } from "lucide-react";
import FloatingContact from "@/components/FloatingContact";
import FAQItem from "@/components/FAQItem";
import UserProfile from "@/components/UserProfile";
import { useFAQs } from "@/hooks/useFAQs";

const Index = () => {
  const { user } = useAuth();
  const { faqs, loading: faqsLoading } = useFAQs();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = ["all", "general", "technical", "billing", "support"];
  
  const filteredFAQs = selectedCategory === "all" 
    ? faqs 
    : faqs?.filter(faq => faq.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
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

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="faqs">FAQs</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            {/* Feature Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <MessageSquare className="h-8 w-8 text-blue-600" />
                    Live Chat Support
                  </CardTitle>
                  <CardDescription>
                    Get instant help from our support team
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Connect with our expert support agents in real-time for immediate assistance with any questions or issues.
                  </p>
                  <Button className="w-full">Start Chat</Button>
                </CardContent>
              </Card>

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
                  <Button variant="outline" className="w-full">Browse FAQs</Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Phone className="h-8 w-8 text-purple-600" />
                    Priority Support
                  </CardTitle>
                  <CardDescription>
                    24/7 premium support for urgent issues
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Get priority assistance for critical issues with our dedicated support team available around the clock.
                  </p>
                  <Button variant="outline" className="w-full">Contact Support</Button>
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
                        No FAQs found for the selected category.
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact Support</CardTitle>
                <CardDescription>
                  Get in touch with our support team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <MessageSquare className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Need Help?</h3>
                  <p className="text-gray-600 mb-6">
                    Use the floating contact button in the bottom right corner to get immediate assistance.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">Email Support</h4>
                      <p className="text-gray-600">support@helpdesk.com</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Phone Support</h4>
                      <p className="text-gray-600">1-800-HELPDESK</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Business Hours</h4>
                      <p className="text-gray-600">Monday - Friday, 9AM - 6PM EST</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <div className="max-w-2xl mx-auto">
              <UserProfile />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <FloatingContact />
    </div>
  );
};

export default Index;
