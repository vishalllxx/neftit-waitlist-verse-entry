
import React from 'react';
import WaitlistForm from '@/components/WaitlistForm';
import { useWaitlistStore } from '@/hooks/useWaitlistStore';

const Index = () => {
  const { currentStep } = useWaitlistStore();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neftit-dark-bg px-4 py-12 relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-neftit-purple/30 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-neftit-purple/20 rounded-full filter blur-[120px]"></div>
      </div>
      
      <div className="w-full max-w-md mx-auto glass-card p-6 sm:p-8 rounded-xl z-10 mb-8">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-block mb-6">
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto"
            >
              <rect width="64" height="64" rx="16" fill="#9b87f5" fillOpacity="0.2" />
              <path
                d="M46 22H18V42H46V22Z"
                stroke="#9b87f5"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18 28H46"
                stroke="#9b87f5"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M24 22V42"
                stroke="#9b87f5"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2 tracking-tight">
            <span className="text-gradient">NEFTIT</span>
          </h1>
          <p className="text-sm sm:text-base text-white/80 mb-1 max-w-sm mx-auto">
            Be the First to Enter the New Era of Web3 Tasks & Rewards
          </p>
          {currentStep !== 'confirmation' && (
            <p className="text-xs text-white/60 max-w-xs mx-auto">
              Join the Waitlist to Unlock Early Access + Special Rewards
            </p>
          )}
        </div>
        
        {/* Waitlist Form */}
        <WaitlistForm />
      </div>
      
      {/* Footer */}
      <div className="mt-auto pt-8 text-center text-white/40 text-xs">
        &copy; {new Date().getFullYear()} NEFTIT. All rights reserved.
      </div>
    </div>
  );
};

export default Index;
