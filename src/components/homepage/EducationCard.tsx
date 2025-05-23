
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  linkPath?: string;
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
  buttonHoverClass,
  linkPath = "/artikel-edukasi"
}) => {
  return (
    <Card className={`border bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 h-full`}>
      <CardContent className="pt-8 px-8 pb-6 flex flex-col h-full">
        <div className={`w-16 h-16 mx-auto mb-6 rounded-full ${bgColorClass} flex items-center justify-center`}>
          <Icon className={`h-8 w-8 ${iconColorClass}`} />
        </div>
        <h3 className="text-xl font-semibold text-center mb-4 text-gray-800">{title}</h3>
        <p className="text-gray-600 text-center mb-6 flex-grow">
          {description}
        </p>
        <div className="text-center mt-auto">
          <Button 
            variant="outline" 
            size="sm" 
            className={`rounded-full px-6 py-1 border ${buttonBorderClass} ${buttonColorClass} hover:bg-opacity-10 ${buttonHoverClass}`}
            asChild
          >
            <Link to={linkPath}>
              Pelajari Lebih Lanjut
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EducationCard;
