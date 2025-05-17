
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Share2 } from 'lucide-react';
import { useWaitlistStore } from '@/hooks/useWaitlistStore';

const ReferralLink: React.FC = () => {
  const { referralLink, referralsCount, copyReferralLink } = useWaitlistStore();

  return (
    <div className="space-y-6 w-full">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Your Referral Link</h3>
        <p className="text-sm text-muted-foreground">
          Share this link with friends to move up the waitlist!
        </p>
      </div>
      
      <div className="flex items-center space-x-2">
        <Input 
          value={referralLink} 
          readOnly 
          className="bg-white/5 border border-white/10 text-white/80" 
        />
        <Button 
          onClick={copyReferralLink}
          size="icon" 
          variant="secondary"
          className="bg-neftit-purple/20 hover:bg-neftit-purple/40 text-white"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="bg-white/5 rounded-md p-4 flex justify-between items-center">
        <div>
          <p className="text-sm text-white/70">Your Referrals</p>
          <p className="text-2xl font-bold text-white">{referralsCount}</p>
        </div>
        <Button 
          variant="outline" 
          className="border-neftit-purple text-neftit-purple hover:bg-neftit-purple/10"
          onClick={copyReferralLink}
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </div>
      
      <div className="bg-gradient-to-r from-neftit-purple/20 to-neftit-light-purple/20 rounded-md p-4">
        <p className="text-sm font-medium">
          More referrals = earlier access + exclusive rewards!
        </p>
      </div>
    </div>
  );
};

export default ReferralLink;
