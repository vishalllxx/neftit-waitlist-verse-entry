
import React from 'react';
import { cn } from '@/lib/utils';
import { WaitlistStep } from '@/hooks/useWaitlistStore';

interface StepIndicatorProps {
  currentStep: WaitlistStep;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const steps = [
    { id: 'email', label: 'Details' },
    { id: 'twitter', label: 'Twitter' },
    { id: 'discord', label: 'Discord' },
    { id: 'confirmation', label: 'Complete' },
  ];

  // Hide step indicator on confirmation screen to match design
  if (currentStep === 'confirmation') {
    return null;
  }

  return (
    <div className="flex items-center justify-center space-x-1 sm:space-x-2 mb-5">
      {steps.slice(0, 3).map((step, index) => {
        const isActive = currentStep === step.id;
        const isPast = 
          steps.findIndex(s => s.id === currentStep) > 
          steps.findIndex(s => s.id === step.id);
        
        return (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div 
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  isActive 
                    ? "bg-white" 
                    : isPast 
                      ? "bg-white/70" 
                      : "bg-white/30"
                )}
              />
            </div>
            
            {index < steps.length - 2 && (
              <div 
                className={cn(
                  "h-[1px] w-4 sm:w-8", 
                  isPast ? "bg-white/70" : "bg-white/30"
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StepIndicator;
