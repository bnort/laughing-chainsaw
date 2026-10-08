import { UserTier } from "@/constants/tiers";

export type User = {
  id: number;
  name: string;
  balance: number;
  lifetimePoints: number;
};

export type Offer = {
  id: number;
  type: string;
  text: string;
  tierEligible: UserTier;
};
