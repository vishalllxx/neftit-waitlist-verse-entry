
import React from 'react';
import { cn } from '@/lib/utils';
import { WaitlistStep } from '@/hooks/useWaitlistStore';

interface StepIndicatorProps {
  currentStep: WaitlistStep;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const steps = [
    { id: 'email', label: 'Email' },
    { id: 'twitter', label: 'Twitter' },
    { id: 'discord', label: 'Discord' },
    { id: 'confirmation', label: 'Complete' },
  ];

  return (
    <div className="flex items-center justify-center space-x-2 mb-8">
      {steps.map((step, index) => {
        const isActive = currentStep === step.id;
        const isPast = 
          steps.findIndex(s => s.id === currentStep) > 
          steps.findIndex(s => s.id === step.id);
        
        return (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div 
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  isActive 
                    ? "bg-neftit-purple scale-125" 
                    : isPast 
                      ? "bg-neftit-purple/80" 
                      : "bg-white/20"
                )}
              />
              <span 
                className={cn(
                  "text-xs mt-1 hidden sm:block",
                  isActive 
                    ? "text-white" 
                    : "text-white/50"
                )}
              >
                {step.label}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div 
                className={cn(
                  "h-[1px] w-8 sm:w-12", 
                  isPast ? "bg-neftit-purple/80" : "bg-white/20"
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
