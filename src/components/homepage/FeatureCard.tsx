
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface FeatureCardProps {
  borderColorClass: string;
  hoverColorClass: string;
  bgColorClass: string;
  iconColorClass: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  borderColorClass,
  hoverColorClass,
  bgColorClass,
  iconColorClass,
  icon,
  title,
  description
}) => {
  return (
    <Card className={`border-2 ${borderColorClass} ${hoverColorClass} transition-all duration-300 hover:shadow-lg hover:-translate-y-2 group`}>
      <CardContent className="pt-6">
        <div className={`w-16 h-16 mx-auto mb-6 rounded-full ${bgColorClass} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
          <div className={`h-8 w-8 ${iconColorClass} transition-all duration-300 group-hover:rotate-12`}>
            {icon}
          </div>
        </div>
        <h3 className="text-xl font-semibold text-center mb-4 text-gray-800 transition-colors duration-300 group-hover:text-primary">{title}</h3>
        <p className="text-gray-600 text-center">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
