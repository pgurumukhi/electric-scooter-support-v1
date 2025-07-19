
import { useState } from "react";
import { ChevronDown, ChevronUp, Battery, Shield, Users, MapPin, Wrench } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FAQ {
  id: number;
  category: string;
  question: string;
  answer: string;
}

interface FAQItemProps {
  faq: FAQ;
}

const categoryConfig = {
  battery: { icon: Battery, color: "bg-green-100 text-green-700", label: "Battery" },
  safety: { icon: Shield, color: "bg-orange-100 text-orange-700", label: "Safety" },
  account: { icon: Users, color: "bg-purple-100 text-purple-700", label: "Account" },
  locations: { icon: MapPin, color: "bg-teal-100 text-teal-700", label: "Locations" },
  maintenance: { icon: Wrench, color: "bg-yellow-100 text-yellow-700", label: "Maintenance" }
};

const FAQItem = ({ faq }: FAQItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const categoryInfo = categoryConfig[faq.category as keyof typeof categoryConfig];
  const Icon = categoryInfo?.icon;

  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      <CardContent className="p-0">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-6 text-left hover:bg-gray-50/50 transition-colors duration-200"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {Icon && (
                  <Badge variant="secondary" className={`${categoryInfo.color} text-xs font-medium`}>
                    <Icon className="w-3 h-3 mr-1" />
                    {categoryInfo.label}
                  </Badge>
                )}
              </div>
              <h3 className="font-semibold text-gray-800 text-lg leading-relaxed">
                {faq.question}
              </h3>
            </div>
            <div className="flex-shrink-0 ml-4">
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-gray-400 transition-transform duration-200" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400 transition-transform duration-200" />
              )}
            </div>
          </div>
        </button>
        
        <div className={`transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <div className="px-6 pb-6">
            <div className="border-l-4 border-gradient-to-b from-blue-500 to-purple-600 pl-4 ml-2">
              <p className="text-gray-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FAQItem;
