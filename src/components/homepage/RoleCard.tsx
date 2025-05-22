
import React from 'react';

interface RoleCardProps {
  iconBgClass: string;
  iconClass: string;
  iconSvg: React.ReactNode;
  title: string;
  features: string[];
  checkmarkColor: string;
}

const RoleCard: React.FC<RoleCardProps> = ({
  iconBgClass,
  iconClass,
  iconSvg,
  title,
  features,
  checkmarkColor
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
      <div className={`w-20 h-20 mx-auto mb-6 rounded-full ${iconBgClass} flex items-center justify-center`}>
        <div className={`h-10 w-10 ${iconClass}`}>
          {iconSvg}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-center mb-4 text-gray-800">{title}</h3>
      <ul className="space-y-2 text-gray-600">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg className={`h-6 w-6 mr-2 ${checkmarkColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoleCard;
