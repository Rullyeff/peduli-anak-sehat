
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface EducationCardProps {
  borderColorClass: string;
  hoverColorClass: string;
  bgColorClass: string;
  iconColorClass: string;
  Icon: LucideIcon;
  title: string;
  description: string;
  buttonColorClass: string;
  buttonBorderClass: string;
  buttonHoverClass: string;
}

const EducationCard: React.FC<EducationCardProps> = ({
  borderColorClass,
  hoverColorClass,
  bgColorClass,
  iconColorClass,
  Icon,
  title,
  description,
  buttonColorClass,
  buttonBorderClass,
  buttonHoverClass
}) => {
  return (
    <Card className={`border-2 ${borderColorClass} ${hoverColorClass} transition-colors duration-300`}>
      <CardContent className="pt-6">
        <div className={`w-16 h-16 mx-auto mb-6 rounded-full ${bgColorClass} flex items-center justify-center`}>
          <Icon className={`h-8 w-8 ${iconColorClass}`} />
        </div>
        <h3 className="text-xl font-semibold text-center mb-4 text-gray-800">{title}</h3>
        <p className="text-gray-600 text-center mb-4">
          {description}
        </p>
        <div className="text-center">
          <Button 
            variant="outline" 
            size="sm" 
            className={`${buttonColorClass} ${buttonBorderClass} ${buttonHoverClass}`}
          >
            Pelajari Lebih Lanjut
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EducationCard;
