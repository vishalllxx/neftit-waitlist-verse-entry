
import { create } from 'zustand';
import { toast } from 'sonner';

export type WaitlistStep = 'email' | 'twitter' | 'discord' | 'confirmation';

interface WaitlistState {
  currentStep: WaitlistStep;
  email: string;
  twitterUsername: string;
  discordUsername: string;
  referrer: string | null;
  referralsCount: number;
  referralLink: string;
  
  setEmail: (email: string) => void;
  setTwitterUsername: (username: string) => void;
  setDiscordUsername: (username: string) => void;
  setReferrer: (referrer: string | null) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: WaitlistStep) => void;
  submitWaitlist: () => Promise<void>;
  copyReferralLink: () => void;
}

// Extract referrer from URL if present
const getInitialReferrer = (): string | null => {
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('ref');
  }
  return null;
};

// Generate a random user ID for demo purposes
// In a real app, this would come from the backend after registration
const generateUserId = () => {
  return Math.random().toString(36).substring(2, 10);
};

export const useWaitlistStore = create<WaitlistState>((set, get) => ({
  currentStep: 'email',
  email: '',
  twitterUsername: '',
  discordUsername: '',
  referrer: getInitialReferrer(),
  referralsCount: 0,
  referralLink: '',
  
  setEmail: (email) => set({ email }),
  setTwitterUsername: (username) => set({ twitterUsername: username }),
  setDiscordUsername: (username) => set({ discordUsername: username }),
  setReferrer: (referrer) => set({ referrer }),
  
  nextStep: () => set((state) => {
    const steps: WaitlistStep[] = ['email', 'twitter', 'discord', 'confirmation'];
    const currentIndex = steps.indexOf(state.currentStep);
    const nextIndex = Math.min(currentIndex + 1, steps.length - 1);
    return { currentStep: steps[nextIndex] };
  }),
  
  prevStep: () => set((state) => {
    const steps: WaitlistStep[] = ['email', 'twitter', 'discord', 'confirmation'];
    const currentIndex = steps.indexOf(state.currentStep);
    const prevIndex = Math.max(currentIndex - 1, 0);
    return { currentStep: steps[prevIndex] };
  }),
  
  goToStep: (step) => set({ currentStep: step }),
  
  submitWaitlist: async () => {
    const { email, twitterUsername, discordUsername, referrer } = get();
    
    // In a real application, this would be a call to your API
    // For now, we're just simulating a successful submission
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate demo referral link
      const userId = generateUserId();
      const referralLink = `${window.location.origin}/?ref=${userId}`;
      
      set({ 
        referralLink,
        referralsCount: 0,
        currentStep: 'confirmation' 
      });
      
      toast.success("Successfully joined the waitlist!");
      
      // Store submission data in localStorage for demo purposes
      // In a real app, this would be stored in your database
      localStorage.setItem('neftit_waitlist_data', JSON.stringify({
        email,
        twitterUsername,
        discordUsername,
        referrer,
        userId,
        referralLink
      }));
      
    } catch (error) {
      toast.error("Failed to join waitlist. Please try again.");
      console.error("Error submitting waitlist:", error);
    }
  },
  
  copyReferralLink: () => {
    const { referralLink } = get();
    navigator.clipboard.writeText(referralLink);
    toast.success("Referral link copied to clipboard!");
  }
}));
