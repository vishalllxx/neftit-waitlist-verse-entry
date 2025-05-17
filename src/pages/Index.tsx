
import React from 'react';
import WaitlistForm from '@/components/WaitlistForm';
import { useWaitlistStore } from '@/hooks/useWaitlistStore';

const Index = () => {
  const { currentStep } = useWaitlistStore();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4 py-12 relative overflow-hidden">
      {/* Background gradient effect (subtle) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-neftit-purple/5 rounded-full filter blur-[120px]"></div>
      </div>
      
      {/* Header Text - similar to the reference image */}
      <div className="w-full max-w-xl mx-auto mb-12 text-center">
        {currentStep !== 'confirmation' && (
          <>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 text-white leading-tight">
              Join the waitlist for<br />
              <span className="text-gradient font-light">the NEFTIT web3 experience</span>
            </h1>
          </>
        )}
      </div>
      
      {/* Form container */}
      <div className="w-full max-w-md mx-auto z-10">
        <WaitlistForm />
      </div>
      
      {/* Footer */}
      {currentStep !== 'confirmation' && (
        <div className="mt-auto pt-20 w-full max-w-lg mx-auto flex justify-center space-x-12">
          <a href="https://twitter.com/NEFTIT" target="_blank" rel="noopener noreferrer" className="flex items-center text-white/50 hover:text-white transition-colors">
            <span className="text-sm">Twitter</span>
            <span className="ml-1 text-xs">@NEFTIT</span>
          </a>
          <a href="https://medium.com/@NEFTIT" target="_blank" rel="noopener noreferrer" className="flex items-center text-white/50 hover:text-white transition-colors">
            <span className="text-sm">Medium</span>
            <span className="ml-1 text-xs">@NEFTIT</span>
          </a>
        </div>
      )}
    </div>
  );
};

export default Index;
