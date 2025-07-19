
import { useState } from "react";
import { Search, Zap, Battery, Shield, Users, MapPin, Wrench } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import FAQItem from "@/components/FAQItem";
import FloatingContact from "@/components/FloatingContact";
import { useFAQs } from "@/hooks/useFAQs";

const categories = [
  { id: "all", name: "All", icon: Zap, color: "bg-gradient-to-r from-blue-500 to-purple-600" },
  { id: "battery", name: "Battery", icon: Battery, color: "bg-gradient-to-r from-green-500 to-blue-500" },
  { id: "safety", name: "Safety", icon: Shield, color: "bg-gradient-to-r from-orange-500 to-red-500" },
  { id: "account", name: "Account", icon: Users, color: "bg-gradient-to-r from-purple-500 to-pink-500" },
  { id: "locations", name: "Locations", icon: MapPin, color: "bg-gradient-to-r from-teal-500 to-green-500" },
  { id: "maintenance", name: "Maintenance", icon: Wrench, color: "bg-gradient-to-r from-yellow-500 to-orange-500" }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const { faqs, loading, error } = useFAQs();

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <Card className="border-0 shadow-sm max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Error Loading FAQs</h3>
            <p className="text-gray-500">
              {error}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                ScootFAQ
              </h1>
            </div>
            <p className="text-gray-600 text-sm">Get instant answers to your questions</p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 bg-white border-gray-200 rounded-xl shadow-sm focus:shadow-md transition-shadow"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? `${category.color} text-white shadow-md scale-105`
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Loading State */}
        {loading && (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Card key={i} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Results Count */}
        {!loading && (
          <div className="mb-6">
            <p className="text-gray-500 text-sm">
              {filteredFAQs.length} {filteredFAQs.length === 1 ? 'result' : 'results'} found
            </p>
          </div>
        )}

        {/* FAQ Items */}
        {!loading && (
          <div className="space-y-4">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq) => (
                <FAQItem key={faq.id} faq={faq} />
              ))
            ) : (
              <Card className="border-0 shadow-sm">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">No results found</h3>
                  <p className="text-gray-500">
                    Try adjusting your search terms or browse different categories
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Popular Categories */}
        {!loading && searchTerm === "" && activeCategory === "all" && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Popular Topics</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {categories.slice(1).map((category) => {
                const Icon = category.icon;
                const count = faqs.filter(faq => faq.category === category.id).length;
                return (
                  <Card 
                    key={category.id}
                    className="border-0 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-1">{category.name}</h3>
                      <p className="text-sm text-gray-500">{count} questions</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </main>

      <FloatingContact />
    </div>
  );
};

export default Index;
