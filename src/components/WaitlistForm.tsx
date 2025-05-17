import React, { useState } from 'react';
import { useWaitlistStore, WaitlistStep } from '@/hooks/useWaitlistStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, User, Mail, Twitter } from 'lucide-react';
import StepIndicator from './StepIndicator';
import ReferralLink from './ReferralLink';
import { toast } from 'sonner';

const WaitlistForm: React.FC = () => {
  const { 
    currentStep, 
    email, 
    setEmail, 
    twitterUsername,
    setTwitterUsername,
    discordUsername,
    setDiscordUsername,
    nextStep,
    submitWaitlist
  } = useWaitlistStore();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTwitterFollowed, setIsTwitterFollowed] = useState(false);
  const [isDiscordJoined, setIsDiscordJoined] = useState(false);
  const [name, setName] = useState('');

  // Validation functions
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      toast.error("Please enter your name");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    nextStep();
  };

  const handleTwitterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!twitterUsername) {
      toast.error("Please enter your Twitter/X username");
      return;
    }
    if (!isTwitterFollowed) {
      toast.error("Please follow NEFTIT on Twitter/X");
      return;
    }
    nextStep();
  };

  const handleDiscordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!discordUsername) {
      toast.error("Please enter your Discord username");
      return;
    }
    if (!isDiscordJoined) {
      toast.error("Please join our Discord server");
      return;
    }
    
    try {
      setIsSubmitting(true);
      await submitWaitlist();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openTwitter = () => {
    window.open('https://twitter.com/NEFTIT', '_blank');
  };

  const openDiscord = () => {
    window.open('https://discord.gg/neftit', '_blank');
  };

  const renderStep = (step: WaitlistStep) => {
    switch (step) {
      case 'email':
        return (
          <form onSubmit={handleEmailSubmit} className="space-y-4 w-full">            
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-style pl-10"
                  required
                />
              </div>
              
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-5 w-5" />
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-style pl-10"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="waitlist-button w-full"
              >
                Join the waitlist
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        );
      
      case 'twitter':
        return (
          <form onSubmit={handleTwitterSubmit} className="space-y-6 w-full">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Follow NEFTIT on X</h3>
              <p className="text-sm text-muted-foreground">
                Follow us to stay updated on latest news
              </p>
            </div>
            
            <div className="space-y-4">
              <Button 
                type="button"
                variant="outline"
                onClick={openTwitter}
                className="w-full border-neftit-purple text-neftit-purple hover:bg-neftit-purple/10"
              >
                Follow @NEFTIT on X
              </Button>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="twitter-followed"
                  checked={isTwitterFollowed}
                  onChange={() => setIsTwitterFollowed(!isTwitterFollowed)}
                  className="h-4 w-4 rounded border-white/20 bg-white/5 text-neftit-purple"
                />
                <label htmlFor="twitter-followed" className="text-sm text-white/80">
                  I've followed NEFTIT on X
                </label>
              </div>
              
              <div className="relative">
                <Twitter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Your X username (without @)"
                  value={twitterUsername}
                  onChange={(e) => setTwitterUsername(e.target.value)}
                  className="input-style pl-10"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="waitlist-button w-full"
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        );
      
      case 'discord':
        return (
          <form onSubmit={handleDiscordSubmit} className="space-y-6 w-full">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Join Our Discord</h3>
              <p className="text-sm text-muted-foreground">
                Join our community to connect with the team
              </p>
            </div>
            
            <div className="space-y-4">
              <Button 
                type="button"
                variant="outline"
                onClick={openDiscord}
                className="w-full border-neftit-purple text-neftit-purple hover:bg-neftit-purple/10"
              >
                Join NEFTIT Discord
              </Button>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="discord-joined"
                  checked={isDiscordJoined}
                  onChange={() => setIsDiscordJoined(!isDiscordJoined)}
                  className="h-4 w-4 rounded border-white/20 bg-white/5 text-neftit-purple"
                />
                <label htmlFor="discord-joined" className="text-sm text-white/80">
                  I've joined the NEFTIT Discord
                </label>
              </div>
              
              <Input
                type="text"
                placeholder="Your Discord username (with tag)"
                value={discordUsername}
                onChange={(e) => setDiscordUsername(e.target.value)}
                className="input-style"
                required
              />
              
              <Button 
                type="submit" 
                className="waitlist-button w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Joining..." : "Join Waitlist"}
              </Button>
            </div>
          </form>
        );
      
      case 'confirmation':
        return (
          <div className="space-y-6 w-full animate-fade-in">
            <div className="text-center space-y-2 mb-6">
              <div className="bg-neftit-purple/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neftit-purple">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3 className="text-2xl font-bold">You're on the list!</h3>
              <p className="text-sm text-muted-foreground">
                We'll notify you when early access is available
              </p>
            </div>
            
            <ReferralLink />
          </div>
        );
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <StepIndicator currentStep={currentStep} />
      <div className="glass-card p-6">
        <div className="min-h-[200px]">
          {renderStep(currentStep)}
        </div>
      </div>
    </div>
  );
};

export default WaitlistForm;
