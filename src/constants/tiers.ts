export type UserTier = (typeof TIERS)[number];
export const TIERS = ["bronze", "silver", "gold", "platinum"] as const;
export const TIER_THRESHOLDS: Record<UserTier, number> = {
  bronze: 0,
  silver: 500,
  gold: 2000,
  platinum: 5000,
};
