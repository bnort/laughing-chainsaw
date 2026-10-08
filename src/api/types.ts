export type User = {
  id: number;
  name: string;
  balance: number;
  tier: UserTier;
};

export type UserTier = "bronze" | "silver" | "gold" | "platinum";
