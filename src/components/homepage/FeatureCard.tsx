
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
    <Card className={`border bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 h-full`}>
      <CardContent className="pt-8 px-8 pb-6 flex flex-col h-full">
        <div className={`w-16 h-16 mx-auto mb-6 rounded-full ${bgColorClass} flex items-center justify-center`}>
          <div className={`h-8 w-8 ${iconColorClass}`}>
            {icon}
          </div>
        </div>
        <h3 className="text-xl font-semibold text-center mb-4 text-gray-800">{title}</h3>
        <p className="text-gray-600 text-center">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
