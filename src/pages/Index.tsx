
import { useState } from "react";
import { Search, Zap, Battery, Shield, Users, MapPin, Wrench } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import FAQItem from "@/components/FAQItem";
import FloatingContact from "@/components/FloatingContact";

const categories = [
  { id: "all", name: "All", icon: Zap, color: "bg-gradient-to-r from-blue-500 to-purple-600" },
  { id: "battery", name: "Battery", icon: Battery, color: "bg-gradient-to-r from-green-500 to-blue-500" },
  { id: "safety", name: "Safety", icon: Shield, color: "bg-gradient-to-r from-orange-500 to-red-500" },
  { id: "account", name: "Account", icon: Users, color: "bg-gradient-to-r from-purple-500 to-pink-500" },
  { id: "locations", name: "Locations", icon: MapPin, color: "bg-gradient-to-r from-teal-500 to-green-500" },
  { id: "maintenance", name: "Maintenance", icon: Wrench, color: "bg-gradient-to-r from-yellow-500 to-orange-500" }
];

const faqData = [
  {
    id: 1,
    category: "battery",
    question: "How long does the battery last on a single charge?",
    answer: "Our electric scooters can travel up to 25-30 miles on a single charge, depending on rider weight, terrain, and riding style. The battery typically lasts 3-5 hours of continuous use."
  },
  {
    id: 2,
    category: "battery",
    question: "How long does it take to fully charge the battery?",
    answer: "A complete charge takes approximately 4-6 hours using the standard charger. We also offer fast chargers that can reduce this time to 2-3 hours."
  },
  {
    id: 3,
    category: "safety",
    question: "What safety gear do I need when riding?",
    answer: "We strongly recommend wearing a helmet at all times. Additionally, consider knee and elbow pads, especially for new riders. Always wear closed-toe shoes and avoid loose clothing."
  },
  {
    id: 4,
    category: "safety",
    question: "What's the maximum speed of the scooters?",
    answer: "Our scooters have a top speed of 15 mph to ensure rider safety while still providing an efficient commuting experience. Speed can be adjusted through our mobile app."
  },
  {
    id: 5,
    category: "account",
    question: "How do I create an account?",
    answer: "Download our mobile app and tap 'Sign Up'. You'll need to provide a valid email, phone number, and upload a photo of your driver's license for verification."
  },
  {
    id: 6,
    category: "account",
    question: "Can I share my account with family members?",
    answer: "Each rider must have their own account for safety and liability reasons. However, you can add multiple payment methods and manage rides for family members through our family plan."
  },
  {
    id: 7,
    category: "locations",
    question: "Where can I find available scooters?",
    answer: "Use our mobile app to see real-time scooter locations on the map. Scooters are typically found near transit stops, business districts, and popular destinations."
  },
  {
    id: 8,
    category: "locations",
    question: "Where can I park the scooter after my ride?",
    answer: "Park scooters upright in designated parking areas, bike racks, or against buildings. Avoid blocking sidewalks, doorways, or wheelchair access points."
  },
  {
    id: 9,
    category: "maintenance",
    question: "What should I do if the scooter isn't working properly?",
    answer: "If you encounter any issues, end your ride immediately through the app and report the problem. Our team will inspect and repair the scooter before it's made available again."
  },
  {
    id: 10,
    category: "maintenance",
    question: "How often are scooters maintained?",
    answer: "All scooters undergo daily safety checks and regular maintenance every 2-3 days. We have a dedicated team that ensures each scooter meets our safety standards."
  }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

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
        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-500 text-sm">
            {filteredFAQs.length} {filteredFAQs.length === 1 ? 'result' : 'results'} found
          </p>
        </div>

        {/* FAQ Items */}
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

        {/* Popular Categories */}
        {searchTerm === "" && activeCategory === "all" && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Popular Topics</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {categories.slice(1).map((category) => {
                const Icon = category.icon;
                const count = faqData.filter(faq => faq.category === category.id).length;
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
